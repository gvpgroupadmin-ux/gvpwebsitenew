import fs from 'fs';
import path from 'path';

export interface StoredLead {
  leadId: string;
  name: string;
  phone: string;
  email?: string;
  city?: string;
  requirement?: string;
  monthlyBill?: string;
  capacity?: string;
  message?: string;
  source?: string;
  status: string;
  receivedAt: string;
  updatedAt?: string;
}

const MAX_LEADS = 10000;
const IS_VERCEL = Boolean(process.env.VERCEL);
const DATA_DIR = IS_VERCEL ? '/tmp' : path.resolve(process.cwd(), '.data');
const LEADS_FILE = path.resolve(DATA_DIR, 'leads.json');
const AUDIT_FILE = path.resolve(DATA_DIR, 'audit.log');

// Seed file path (included in repo for initial leads)
const SEED_FILE = path.resolve(process.cwd(), '.data', 'leads.json');

// Memory fallback in case disk is unavailable
let memoryLeads: StoredLead[] = [];

// Initialize data directory if writable
try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  // If in Vercel /tmp and file does not exist, copy from seed file if available
  if (IS_VERCEL && !fs.existsSync(LEADS_FILE) && fs.existsSync(SEED_FILE)) {
    try {
      fs.copyFileSync(SEED_FILE, LEADS_FILE);
    } catch {
      // Ignore copy error
    }
  }
} catch {
  // Silent fail
}

// ─── UPSTASH / VERCEL KV INTEGRATION (Optional) ─────────────────────────────
const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

async function getFromKV(): Promise<StoredLead[] | null> {
  if (!KV_URL || !KV_TOKEN) return null;
  try {
    const res = await fetch(`${KV_URL}/get/gvp_solar_leads`, {
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data && data.result) {
      return typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
    }
    return [];
  } catch {
    return null;
  }
}

async function saveToKV(leads: StoredLead[]): Promise<boolean> {
  if (!KV_URL || !KV_TOKEN) return false;
  try {
    const res = await fetch(`${KV_URL}/set/gvp_solar_leads`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${KV_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leads.slice(0, MAX_LEADS)),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// ─── FILE STORAGE ───────────────────────────────────────────────────────────
function getFromFile(): StoredLead[] {
  try {
    if (fs.existsSync(LEADS_FILE)) {
      const content = fs.readFileSync(LEADS_FILE, 'utf-8');
      return JSON.parse(content || '[]');
    }
    if (fs.existsSync(SEED_FILE)) {
      const content = fs.readFileSync(SEED_FILE, 'utf-8');
      return JSON.parse(content || '[]');
    }
  } catch {
    // Ignore parse error
  }
  return memoryLeads;
}

function saveToFile(leads: StoredLead[]): void {
  const capped = leads.slice(0, MAX_LEADS);
  memoryLeads = capped;
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(capped, null, 2), 'utf-8');
  } catch {
    // Read-only filesystem fallback
  }
}

// ─── PUBLIC STORAGE API ─────────────────────────────────────────────────────
export async function getStoredLeads(): Promise<StoredLead[]> {
  const kvLeads = await getFromKV();
  if (kvLeads !== null) return kvLeads;
  return getFromFile();
}

export async function saveStoredLeads(leads: StoredLead[]): Promise<void> {
  const capped = leads.slice(0, MAX_LEADS);
  const kvSaved = await saveToKV(capped);
  if (!kvSaved) {
    saveToFile(capped);
  }
}

export function auditLog(event: string, details: Record<string, any>): void {
  const entry = {
    timestamp: new Date().toISOString(),
    event,
    ...details,
  };
  try {
    fs.appendFileSync(AUDIT_FILE, JSON.stringify(entry) + '\n', 'utf-8');
  } catch {
    // Silent fail
  }
}

// ─── SANITIZATION ───────────────────────────────────────────────────────────
export function sanitizeString(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value.replace(/[\x00-\x1F\x7F]/g, '').trim().slice(0, maxLength);
}

export function sanitizeLeadData(raw: any): Record<string, string> | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;

  return {
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
}
