import { sendJson, setSecurityHeaders } from '../_lib/auth.ts';

export default async function handler(req: any, res: any) {
  setSecurityHeaders(res);
  return sendJson(res, 200, {
    success: true,
    message: 'Logged out successfully.',
  });
}
