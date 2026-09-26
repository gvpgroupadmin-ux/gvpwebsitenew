import {
  extractBearerToken,
  sendJson,
  setSecurityHeaders,
  verifySessionToken,
} from '../_lib/auth.ts';

export default async function handler(req: any, res: any) {
  setSecurityHeaders(res);

  if (req.method !== 'GET') {
    return sendJson(res, 405, { success: false, error: 'Method not allowed' });
  }

  const token = extractBearerToken(req.headers?.authorization || req.headers?.Authorization);
  const result = verifySessionToken(token);

  if (result.valid) {
    return sendJson(res, 200, { success: true, valid: true, email: result.email });
  } else {
    return sendJson(res, 401, { success: false, valid: false, error: 'Session expired or invalid.' });
  }
}
