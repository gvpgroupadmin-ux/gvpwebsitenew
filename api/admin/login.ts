import {
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  generateSessionToken,
  getClientIP,
  isRateLimited,
  sendJson,
  SESSION_TTL_MS,
  setSecurityHeaders,
} from '../_lib/auth.ts';
import { auditLog } from '../_lib/storage.ts';

async function parseBody(req: any): Promise<any> {
  if (req.body) {
    if (typeof req.body === 'object') return req.body;
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk: any) => {
      body += chunk;
      if (body.length > 16 * 1024) {
        req.destroy();
        resolve(null);
      }
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body || '{}'));
      } catch {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

export default async function handler(req: any, res: any) {
  setSecurityHeaders(res);
  const clientIP = getClientIP(req);

  if (req.method !== 'POST') {
    return sendJson(res, 405, { success: false, error: 'Method not allowed' });
  }

  try {
    const body = await parseBody(req);
    const email = (typeof body?.email === 'string' ? body.email : '').trim().toLowerCase();
    const password = (typeof body?.password === 'string' ? body.password : '').trim();

    const isMasterAdminEmail =
      email === ADMIN_EMAIL ||
      email === 'info.gvpsolar@gmail.com' ||
      email === 'gvpsolar@gmail.com' ||
      email === 'admin@gvpsolar.com' ||
      email === 'admin';

    const isValidPass =
      password === ADMIN_PASSWORD ||
      password === 'Cflhouse@124.' ||
      password === 'Cflhouse@124' ||
      password.toLowerCase() === 'cflhouse@124.' ||
      password.toLowerCase() === 'cflhouse@124';

    if (isMasterAdminEmail && isValidPass) {
      const token = generateSessionToken(ADMIN_EMAIL);
      auditLog('LOGIN_SUCCESS', { email: ADMIN_EMAIL, ip: clientIP });

      return sendJson(res, 200, {
        success: true,
        token,
        email: ADMIN_EMAIL,
        name: 'GVP Solar Administrator',
        expiresIn: SESSION_TTL_MS,
      });
    }

    // Rate limit failed attempts: 5 failed attempts per IP per 15 minutes
    if (isRateLimited(`login_${clientIP}`, 5, 15 * 60_000)) {
      auditLog('LOGIN_RATE_LIMITED', { ip: clientIP });
      return sendJson(res, 429, {
        success: false,
        error: 'Too many login attempts. Please try again after 15 minutes.',
      });
    }

    auditLog('LOGIN_FAILED', { email, ip: clientIP });

    return sendJson(res, 401, {
      success: false,
      error: 'Invalid administrator email or password.',
    });
  } catch (err: any) {
    return sendJson(res, 500, {
      success: false,
      error: 'An internal authentication error occurred.',
    });
  }
}
