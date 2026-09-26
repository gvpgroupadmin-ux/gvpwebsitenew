import crypto from 'crypto';
import {
  getClientIP,
  isRateLimited,
  sendJson,
  setSecurityHeaders,
} from './_lib/auth.ts';
import {
  auditLog,
  getStoredLeads,
  sanitizeLeadData,
  saveSingleLeadToSupabase,
  saveStoredLeads,
} from './_lib/storage.ts';
import type { StoredLead } from './_lib/storage.ts';

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
      if (body.length > 32 * 1024) {
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

  // Block public GET on /api/leads
  if (req.method === 'GET') {
    return sendJson(res, 401, {
      success: false,
      error: 'Authentication required to access leads registry.',
    });
  }

  if (req.method !== 'POST') {
    return sendJson(res, 405, { success: false, error: 'Method not allowed' });
  }

  // Rate limit: 5 submissions per IP per 60 seconds
  if (isRateLimited(`leads_${clientIP}`, 5, 60_000)) {
    auditLog('RATE_LIMITED', { ip: clientIP, endpoint: '/api/leads' });
    return sendJson(res, 429, {
      success: false,
      error: 'Too many requests. Please wait a moment before trying again.',
    });
  }

  try {
    const rawData = await parseBody(req);
    if (!rawData) {
      return sendJson(res, 413, { success: false, error: 'Payload too large.' });
    }

    const data = sanitizeLeadData(rawData);
    if (!data || !data.name || !data.phone) {
      return sendJson(res, 400, {
        success: false,
        error: 'Name and a valid phone number are required.',
      });
    }

    const digitsOnly = data.phone.replace(/\D/g, '');
    if (digitsOnly.length < 10 || digitsOnly.length > 13) {
      return sendJson(res, 400, {
        success: false,
        error: 'Please provide a valid Indian contact number.',
      });
    }

    const leadId = `GVP-LEAD-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
    const newLead: StoredLead = {
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

    const existingLeads = await getStoredLeads();

    // Check duplicate within 60s
    const isDuplicate = existingLeads.some(
      (l) =>
        l.phone === data.phone &&
        Date.now() - new Date(l.receivedAt).getTime() < 60000
    );

    if (isDuplicate) {
      const match = existingLeads.find((l) => l.phone === data.phone);
      return sendJson(res, 200, {
        success: true,
        leadId: match?.leadId || leadId,
        message: 'Lead already received. Our solar engineers are already notified!',
      });
    }

    existingLeads.unshift(newLead);
    await Promise.allSettled([
      saveSingleLeadToSupabase(newLead),
      saveStoredLeads(existingLeads),
    ]);

    auditLog('LEAD_CREATED', { leadId, phone: data.phone, ip: clientIP });

    return sendJson(res, 200, {
      success: true,
      leadId,
      message: 'Feasibility survey request stored successfully.',
    });
  } catch (err: any) {
    return sendJson(res, 500, {
      success: false,
      error: 'An unexpected error occurred while saving your lead.',
    });
  }
}
