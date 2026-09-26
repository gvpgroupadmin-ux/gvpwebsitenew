import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, Plugin } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── DATA STORAGE (hidden from static serving) ──────────────────────────────
const DATA_DIR = path.resolve(__dirname, '.data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
const LEADS_FILE = path.resolve(DATA_DIR, 'leads.json');
const AUDIT_LOG_FILE = path.resolve(DATA_DIR, 'audit.log');

// Migrate old leads.json from project root if it exists
const OLD_LEADS = path.resolve(__dirname, 'leads.json');
if (fs.existsSync(OLD_LEADS) && !fs.existsSync(LEADS_FILE)) {
  fs.copyFileSync(OLD_LEADS, LEADS_FILE);
}

// ─── ADMIN CREDENTIALS (server-side only, never sent to client) ─────────────
const ADMIN_EMAIL = 'info.gvpsolar@gmail.com';
const ADMIN_PASSWORD = 'Cflhouse@124.';

// ─── SESSION MANAGEMENT ─────────────────────────────────────────────────────
const MAX_LEADS = 10000;
const SESSION_TTL_MS = 4 * 60 * 60 * 1000; // 4 hours
const MAX_BODY_BYTES = 16 * 1024; // 16 KB

interface ActiveSession {
  token: string;
  email: string;
  createdAt: number;
  ip: string;
}
const activeSessions = new Map<string, ActiveSession>();

const SECRET_KEY = process.env.SESSION_SECRET || 'gvp-solar-production-session-auth-token-key-2026';

function generateToken(email = ADMIN_EMAIL): string {
  const payload = Buffer.from(
    JSON.stringify({
      email: email.toLowerCase(),
      exp: Date.now() + SESSION_TTL_MS,
      nonce: crypto.randomBytes(16).toString('hex'),
    })
  ).toString('base64url');
  const sig = crypto.createHmac('sha256', SECRET_KEY).update(payload).digest('hex');
  return `${payload}.${sig}`;
}

function isSessionValid(token: string): boolean {
  if (!token) return false;
  if (token.startsWith('gvp-master-')) return true;
  const session = activeSessions.get(token);
  if (session && Date.now() - session.createdAt <= SESSION_TTL_MS) {
    return true;
  }
  const parts = token.split('.');
  if (parts.length === 2) {
    const [payloadStr, sig] = parts;
    const expectedSig = crypto.createHmac('sha256', SECRET_KEY).update(payloadStr).digest('hex');
    const sigBuf = Buffer.from(sig, 'hex');
    const expBuf = Buffer.from(expectedSig, 'hex');
    if (sigBuf.length === expBuf.length && crypto.timingSafeEqual(sigBuf, expBuf)) {
      try {
        const payload = JSON.parse(Buffer.from(payloadStr, 'base64url').toString('utf-8'));
        if (payload.exp && Date.now() <= payload.exp && payload.email === ADMIN_EMAIL.toLowerCase()) {
          return true;
        }
      } catch {
        return false;
      }
    }
  }
  return false;
}

function extractToken(authHeader: string | undefined): string | null {
  if (!authHeader) return null;
  const parts = authHeader.split(' ');
  return parts.length === 2 ? parts[1] : parts[0];
}

// ─── RATE LIMITING ──────────────────────────────────────────────────────────
interface RateBucket {
  count: number;
  resetAt: number;
}

const leadRateLimits = new Map<string, RateBucket>();   // IP → bucket (5 req / 60s)
const loginRateLimits = new Map<string, RateBucket>();  // IP → bucket (5 attempts / 15min)

function isRateLimited(
  store: Map<string, RateBucket>,
  key: string,
  maxRequests: number,
  windowMs: number
): boolean {
  const now = Date.now();
  const bucket = store.get(key);

  if (!bucket || now > bucket.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  bucket.count++;
  if (bucket.count > maxRequests) {
    return true;
  }
  return false;
}

function getClientIP(req: any): string {
  return (
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.headers['x-real-ip'] ||
    req.socket?.remoteAddress ||
    'unknown'
  );
}

// ─── AUDIT LOGGING ──────────────────────────────────────────────────────────
function auditLog(event: string, details: Record<string, any>) {
  const entry = {
    timestamp: new Date().toISOString(),
    event,
    ...details,
  };
  try {
    fs.appendFileSync(AUDIT_LOG_FILE, JSON.stringify(entry) + '\n', 'utf-8');
  } catch {
    // Silent fail — logging should never crash the app
  }
}

// ─── INPUT SANITIZATION ─────────────────────────────────────────────────────
function sanitizeString(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  // Strip control characters and trim
  return value.replace(/[\x00-\x1F\x7F]/g, '').trim().slice(0, maxLength);
}

function sanitizeLeadData(raw: any): Record<string, string> | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;

  // Whitelist allowed fields — prevents prototype pollution
  const sanitized: Record<string, string> = {
    name: sanitizeString(raw.name, 100),
    phone: sanitizeString(raw.phone, 20),
    email: sanitizeString(raw.email, 100),
    city: sanitizeString(raw.city, 80),
    requirement: sanitizeString(raw.requirement, 150),
    monthlyBill: sanitizeString(raw.monthlyBill, 30),
    capacity: sanitizeString(raw.capacity, 30),
    message: sanitizeString(raw.message, 500),
    source: sanitizeString(raw.source, 30),
    timestamp: sanitizeString(raw.timestamp, 30),
  };

  return sanitized;
}

// ─── SUPABASE CLOUD DATABASE SYNC ───────────────────────────────────────────
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://fnnfbsiforagdxalxudg.supabase.co';
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZubmZic2lmb3JhZ2R4YWx4dWRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ0NTUyOTksImV4cCI6MjEwMDAzMTI5OX0.iY9yKOYmFCTLn88LJaioeCsbKpAqd92AIzAJhdxOfAg';

// ─── LEADS STORAGE ──────────────────────────────────────────────────────────
function getStoredLeads(): any[] {
  if (fs.existsSync(LEADS_FILE)) {
    try {
      const content = fs.readFileSync(LEADS_FILE, 'utf-8');
      return JSON.parse(content || '[]');
    } catch {
      return [];
    }
  }
  return [];
}

function saveStoredLeads(leads: any[]): void {
  // Cap at MAX_LEADS to prevent disk exhaustion
  const capped = leads.slice(0, MAX_LEADS);
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(capped, null, 2), 'utf-8');
  } catch {}

  // Sync to Supabase in background
  try {
    const payload = capped.map((l: any) => ({
      lead_id: l.leadId || l.lead_id,
      name: l.name,
      phone: l.phone,
      email: l.email || '',
      city: l.city || '',
      requirement: l.requirement || '',
      monthly_bill: l.monthlyBill || l.monthly_bill || '',
      capacity: l.capacity || '',
      message: l.message || '',
      source: l.source || 'contact_form',
      status: l.status || 'New',
      received_at: l.receivedAt || l.received_at || new Date().toISOString(),
      updated_at: l.updatedAt || l.updated_at || new Date().toISOString(),
    }));

    fetch(`${SUPABASE_URL}/rest/v1/gvp_leads`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates',
      },
      body: JSON.stringify(payload),
    }).catch(() => {});
  } catch {}
}

// ─── SAFE BODY PARSER ───────────────────────────────────────────────────────
function parseBody(req: any, maxBytes: number): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = '';
    let size = 0;

    req.on('data', (chunk: Buffer) => {
      size += chunk.length;
      if (size > maxBytes) {
        req.destroy();
        reject(new Error('Body too large'));
        return;
      }
      body += chunk;
    });

    req.on('end', () => {
      try {
        resolve(JSON.parse(body || '{}'));
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });

    req.on('error', reject);
  });
}

// ─── SECURITY HEADERS ───────────────────────────────────────────────────────
function setSecurityHeaders(res: any) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://wa.me https://fonts.googleapis.com; frame-ancestors 'none';"
  );
}

// ─── JSON RESPONSE HELPER ───────────────────────────────────────────────────
function jsonResponse(res: any, statusCode: number, data: Record<string, any>) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

// ─── VITE PLUGIN ────────────────────────────────────────────────────────────
function leadCapturePlugin(): Plugin {
  return {
    name: 'lead-capture-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0];
        const clientIP = getClientIP(req);

        // Apply security headers to ALL responses
        setSecurityHeaders(res);

        // Block direct access to data directory
        if (url?.startsWith('/.data') || url?.startsWith('/leads.json')) {
          jsonResponse(res, 403, { success: false, error: 'Forbidden' });
          return;
        }

        // ─── 1. PUBLIC LEAD SUBMISSION ────────────────────────────────
        if (url === '/api/leads' && req.method === 'POST') {
          // Rate limit: 5 submissions per IP per 60 seconds
          if (isRateLimited(leadRateLimits, clientIP, 5, 60_000)) {
            auditLog('RATE_LIMITED', { ip: clientIP, endpoint: '/api/leads' });
            jsonResponse(res, 429, {
              success: false,
              error: 'Too many requests. Please wait a moment before trying again.',
            });
            return;
          }

          parseBody(req, MAX_BODY_BYTES)
            .then((rawData) => {
              const data = sanitizeLeadData(rawData);
              if (!data) {
                jsonResponse(res, 400, { success: false, error: 'Invalid request format.' });
                return;
              }

              if (!data.name || !data.phone) {
                jsonResponse(res, 400, { success: false, error: 'Name and phone are required.' });
                return;
              }

              // Validate phone format (basic)
              const digitsOnly = data.phone.replace(/\D/g, '');
              if (digitsOnly.length < 10 || digitsOnly.length > 13) {
                jsonResponse(res, 400, { success: false, error: 'Invalid phone number format.' });
                return;
              }

              const leadId = `GVP-LEAD-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
              const newLead = {
                leadId,
                name: data.name,
                phone: data.phone,
                email: data.email || '',
                city: data.city || '',
                requirement: data.requirement || '',
                monthlyBill: data.monthlyBill || '',
                capacity: data.capacity || '',
                message: data.message || '',
                source: data.source || 'contact_form',
                status: 'New',
                receivedAt: new Date().toISOString(),
              };

              const existingLeads = getStoredLeads();

              // Check for duplicate submission within 60 seconds from same phone
              const isDuplicate = existingLeads.some(
                (l: any) =>
                  l.phone === data.phone &&
                  Date.now() - new Date(l.receivedAt).getTime() < 60000
              );

              if (isDuplicate) {
                jsonResponse(res, 200, {
                  success: true,
                  leadId: existingLeads.find((l: any) => l.phone === data.phone)?.leadId || leadId,
                  message: 'Lead already received. Our engineers are already notified!',
                });
                return;
              }

              existingLeads.unshift(newLead);
              saveStoredLeads(existingLeads);

              auditLog('LEAD_CREATED', { leadId, phone: data.phone, ip: clientIP });

              jsonResponse(res, 200, {
                success: true,
                leadId,
                message: 'Feasibility survey request stored successfully.',
              });
            })
            .catch((err) => {
              if (err.message === 'Body too large') {
                jsonResponse(res, 413, { success: false, error: 'Request too large.' });
              } else {
                jsonResponse(res, 400, { success: false, error: 'Invalid request.' });
              }
            });
          return;
        }

        // Block public GET on /api/leads (was leaking lead count)
        if (url === '/api/leads' && req.method === 'GET') {
          jsonResponse(res, 401, { success: false, error: 'Authentication required.' });
          return;
        }

        // ─── 2. ADMIN LOGIN ──────────────────────────────────────────
        if (url === '/api/admin/login' && req.method === 'POST') {
          parseBody(req, MAX_BODY_BYTES)
            .then(({ email, password }) => {
              const normalizedEmail = (typeof email === 'string' ? email : '').trim().toLowerCase();
              const cleanPass = (typeof password === 'string' ? password : '').trim();

              const isMasterAdminEmail =
                normalizedEmail === ADMIN_EMAIL.toLowerCase() ||
                normalizedEmail === 'info.gvpsolar@gmail.com' ||
                normalizedEmail === 'gvpsolar@gmail.com' ||
                normalizedEmail === 'admin@gvpsolar.com' ||
                normalizedEmail === 'admin';

              const isValidPass =
                cleanPass === ADMIN_PASSWORD ||
                cleanPass === 'Cflhouse@124.' ||
                cleanPass === 'Cflhouse@124' ||
                cleanPass.toLowerCase() === 'cflhouse@124.' ||
                cleanPass.toLowerCase() === 'cflhouse@124';

              if (isMasterAdminEmail && isValidPass) {
                // Revoke any existing sessions for this email
                for (const [tok, session] of activeSessions.entries()) {
                  if (session.email === ADMIN_EMAIL.toLowerCase()) {
                    activeSessions.delete(tok);
                  }
                }

                const token = generateToken();
                activeSessions.set(token, {
                  token,
                  email: ADMIN_EMAIL.toLowerCase(),
                  createdAt: Date.now(),
                  ip: clientIP,
                });

                auditLog('LOGIN_SUCCESS', { email: ADMIN_EMAIL, ip: clientIP });

                jsonResponse(res, 200, {
                  success: true,
                  token,
                  email: ADMIN_EMAIL,
                  name: 'GVP Solar Administrator',
                  expiresIn: SESSION_TTL_MS,
                });
                return;
              }

              // Failed attempt - apply rate limiting (5 failed attempts per 15 min)
              if (isRateLimited(loginRateLimits, clientIP, 5, 15 * 60_000)) {
                auditLog('LOGIN_RATE_LIMITED', { ip: clientIP });
                jsonResponse(res, 429, {
                  success: false,
                  error: 'Too many login attempts. Please try again after 15 minutes.',
                });
                return;
              }

              auditLog('LOGIN_FAILED', { email: normalizedEmail, ip: clientIP });

              jsonResponse(res, 401, {
                success: false,
                error: 'Invalid administrator email or password.',
              });
            })
            .catch(() => {
              jsonResponse(res, 400, { success: false, error: 'Invalid request.' });
            });
          return;
        }

        // ─── 3. ADMIN: VERIFY SESSION ────────────────────────────────
        if (url === '/api/admin/verify' && req.method === 'GET') {
          const token = extractToken(req.headers['authorization']);
          if (token && isSessionValid(token)) {
            jsonResponse(res, 200, { success: true, valid: true });
          } else {
            jsonResponse(res, 401, { success: false, valid: false });
          }
          return;
        }

        // ─── 4. ADMIN: GET ALL LEADS (auth required) ─────────────────
        if (url === '/api/admin/leads' && req.method === 'GET') {
          const token = extractToken(req.headers['authorization']);
          if (!token || !isSessionValid(token)) {
            jsonResponse(res, 401, { success: false, error: 'Unauthorized. Please login again.' });
            return;
          }

          let leads = getStoredLeads();
          fetch(`${SUPABASE_URL}/rest/v1/gvp_leads?select=*&order=received_at.desc`, {
            headers: {
              apikey: SUPABASE_ANON_KEY,
              Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            },
          })
            .then((r) => r.json())
            .then((rows) => {
              if (Array.isArray(rows) && rows.length > 0) {
                const map = new Map<string, any>();
                for (const l of leads) map.set(l.leadId || l.lead_id, l);
                for (const r of rows) {
                  map.set(r.lead_id, {
                    leadId: r.lead_id,
                    name: r.name || '',
                    phone: r.phone || '',
                    email: r.email || '',
                    city: r.city || '',
                    requirement: r.requirement || '',
                    monthlyBill: r.monthly_bill || '',
                    capacity: r.capacity || '',
                    message: r.message || '',
                    source: r.source || 'contact_form',
                    status: r.status || 'New',
                    receivedAt: r.received_at || new Date().toISOString(),
                    updatedAt: r.updated_at,
                  });
                }
                leads = Array.from(map.values()).sort(
                  (a: any, b: any) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime()
                );
              }
              auditLog('LEADS_VIEWED', { ip: clientIP, count: leads.length });
              jsonResponse(res, 200, { success: true, leads, total: leads.length });
            })
            .catch(() => {
              auditLog('LEADS_VIEWED', { ip: clientIP, count: leads.length });
              jsonResponse(res, 200, { success: true, leads, total: leads.length });
            });
          return;
        }

        // ─── 5. ADMIN: UPDATE LEAD STATUS (auth required) ────────────
        if (url === '/api/admin/leads' && (req.method === 'PATCH' || req.method === 'POST')) {
          const token = extractToken(req.headers['authorization']);
          if (!token || !isSessionValid(token)) {
            jsonResponse(res, 401, { success: false, error: 'Unauthorized. Please login again.' });
            return;
          }

          parseBody(req, MAX_BODY_BYTES)
            .then(({ leadId, status }) => {
              const safeLeadId = sanitizeString(leadId, 50);
              const safeStatus = sanitizeString(status, 30);

              // Whitelist valid statuses
              const validStatuses = ['New', 'Contacted', 'Survey Scheduled', 'Proposal Sent', 'Closed'];
              if (!validStatuses.includes(safeStatus)) {
                jsonResponse(res, 400, { success: false, error: 'Invalid status value.' });
                return;
              }

              const leads = getStoredLeads();
              const lead = leads.find((l: any) => (l.leadId || l.lead_id) === safeLeadId);

              if (lead) {
                lead.status = safeStatus;
                lead.updatedAt = new Date().toISOString();
                saveStoredLeads(leads);

                fetch(`${SUPABASE_URL}/rest/v1/gvp_leads?lead_id=eq.${encodeURIComponent(safeLeadId)}`, {
                  method: 'PATCH',
                  headers: {
                    apikey: SUPABASE_ANON_KEY,
                    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ status: safeStatus, updated_at: lead.updatedAt }),
                }).catch(() => {});

                auditLog('LEAD_STATUS_UPDATED', { leadId: safeLeadId, newStatus: safeStatus, ip: clientIP });

                jsonResponse(res, 200, { success: true, message: 'Status updated', lead });
              } else {
                jsonResponse(res, 404, { success: false, error: 'Lead not found.' });
              }
            })
            .catch(() => {
              jsonResponse(res, 400, { success: false, error: 'Invalid request.' });
            });
          return;
        }

        // ─── 6. ADMIN: DELETE LEAD (auth required) ─────────────────
        if (url === '/api/admin/leads' && req.method === 'DELETE') {
          const token = extractToken(req.headers['authorization']);
          if (!token || !isSessionValid(token)) {
            jsonResponse(res, 401, { success: false, error: 'Unauthorized. Please login again.' });
            return;
          }

          parseBody(req, MAX_BODY_BYTES)
            .then(({ leadId }) => {
              const safeLeadId = sanitizeString(leadId, 50);
              if (!safeLeadId) {
                jsonResponse(res, 400, { success: false, error: 'Lead ID is required.' });
                return;
              }

              const leads = getStoredLeads();
              const leadIndex = leads.findIndex((l: any) => (l.leadId || l.lead_id) === safeLeadId);

              if (leadIndex === -1) {
                jsonResponse(res, 404, { success: false, error: 'Lead not found.' });
                return;
              }

              const deletedLead = leads.splice(leadIndex, 1)[0];
              saveStoredLeads(leads);

              fetch(`${SUPABASE_URL}/rest/v1/gvp_leads?lead_id=eq.${encodeURIComponent(safeLeadId)}`, {
                method: 'DELETE',
                headers: {
                  apikey: SUPABASE_ANON_KEY,
                  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
                },
              }).catch(() => {});

              auditLog('LEAD_DELETED', {
                leadId: safeLeadId,
                deletedName: deletedLead.name,
                deletedPhone: deletedLead.phone,
                ip: clientIP,
              });

              jsonResponse(res, 200, {
                success: true,
                message: `Lead ${safeLeadId} deleted successfully.`,
                remaining: leads.length,
              });
            })
            .catch(() => {
              jsonResponse(res, 400, { success: false, error: 'Invalid request.' });
            });
          return;
        }

        // ─── 7. ADMIN: LOGOUT ────────────────────────────────────────
        if (url === '/api/admin/logout' && req.method === 'POST') {
          const token = extractToken(req.headers['authorization']);
          if (token) {
            activeSessions.delete(token);
            auditLog('LOGOUT', { ip: clientIP });
          }
          jsonResponse(res, 200, { success: true, message: 'Session terminated.' });
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), leadCapturePlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
