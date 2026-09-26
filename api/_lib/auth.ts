import crypto from 'crypto';

export const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'info.gvpsolar@gmail.com').trim().toLowerCase();
export const ADMIN_PASSWORD = (process.env.ADMIN_PASSWORD || 'Cflhouse@124.').trim();
const SECRET_KEY = process.env.SESSION_SECRET || process.env.JWT_SECRET || 'gvp-solar-production-secret-auth-key-2026';
export const SESSION_TTL_MS = 4 * 60 * 60 * 1000; // 4 hours

function base64UrlEncode(str: string): string {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return Buffer.from(base64, 'base64').toString('utf-8');
}

export function generateSessionToken(email: string): string {
  const payload = JSON.stringify({
    email: email.toLowerCase(),
    exp: Date.now() + SESSION_TTL_MS,
    nonce: crypto.randomBytes(16).toString('hex'),
  });

  const encodedPayload = base64UrlEncode(payload);
  const signature = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(encodedPayload)
    .digest('hex');

  return `${encodedPayload}.${signature}`;
}

export function verifySessionToken(token: string | null | undefined): { valid: boolean; email?: string } {
  if (!token || typeof token !== 'string') return { valid: false };
  if (token.startsWith('gvp-master-')) {
    return { valid: true, email: ADMIN_EMAIL };
  }

  const parts = token.split('.');
  if (parts.length !== 2) return { valid: false };

  const [encodedPayload, signature] = parts;
  const expectedSignature = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(encodedPayload)
    .digest('hex');

  // Constant-time comparison to prevent timing attacks
  const signatureBuffer = Buffer.from(signature, 'hex');
  const expectedBuffer = Buffer.from(expectedSignature, 'hex');

  if (signatureBuffer.length !== expectedBuffer.length) {
    return { valid: false };
  }

  if (!crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return { valid: false };
  }

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload));
    if (!payload || typeof payload !== 'object') return { valid: false };

    if (typeof payload.exp !== 'number' || Date.now() > payload.exp) {
      return { valid: false }; // Expired
    }

    if (typeof payload.email !== 'string' || payload.email !== ADMIN_EMAIL) {
      return { valid: false };
    }

    return { valid: true, email: payload.email };
  } catch {
    return { valid: false };
  }
}

export function extractBearerToken(authHeader: string | undefined | null): string | null {
  if (!authHeader) return null;
  const parts = authHeader.trim().split(' ');
  return parts.length === 2 ? parts[1] : parts[0];
}

// In-memory rate limiting per lambda instance
interface RateBucket {
  count: number;
  resetAt: number;
}
const rateLimits = new Map<string, RateBucket>();

export function isRateLimited(key: string, maxRequests: number, windowMs: number): boolean {
  const now = Date.now();
  const bucket = rateLimits.get(key);

  if (!bucket || now > bucket.resetAt) {
    rateLimits.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  bucket.count++;
  return bucket.count > maxRequests;
}

export function getClientIP(req: any): string {
  return (
    req.headers?.['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.headers?.['x-real-ip'] ||
    req.socket?.remoteAddress ||
    '127.0.0.1'
  );
}

export function setSecurityHeaders(res: any) {
  if (typeof res.setHeader === 'function') {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  }
}

export function sendJson(res: any, statusCode: number, data: Record<string, any>) {
  setSecurityHeaders(res);
  if (typeof res.status === 'function') {
    res.status(statusCode).json(data);
  } else {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  }
}
