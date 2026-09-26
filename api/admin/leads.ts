import {
  extractBearerToken,
  getClientIP,
  sendJson,
  setSecurityHeaders,
  verifySessionToken,
} from '../_lib/auth.ts';
import {
  auditLog,
  getStoredLeads,
  sanitizeString,
  saveStoredLeads,
} from '../_lib/storage.ts';

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

  // Authenticate every admin action
  const token = extractBearerToken(req.headers?.authorization || req.headers?.Authorization);
  const auth = verifySessionToken(token);

  if (!auth.valid) {
    return sendJson(res, 401, {
      success: false,
      error: 'Unauthorized. Please log in with administrator credentials.',
    });
  }

  // ─── 1. GET ALL LEADS ──────────────────────────────────────────────────
  if (req.method === 'GET') {
    try {
      const leads = await getStoredLeads();
      auditLog('LEADS_VIEWED', { ip: clientIP, count: leads.length });
      return sendJson(res, 200, { success: true, leads, total: leads.length });
    } catch (err: any) {
      return sendJson(res, 500, { success: false, error: 'Failed to retrieve leads.' });
    }
  }

  // ─── 2. UPDATE LEAD STATUS ─────────────────────────────────────────────
  if (req.method === 'POST' || req.method === 'PATCH') {
    try {
      const body = await parseBody(req);
      const safeLeadId = sanitizeString(body?.leadId, 50);
      const safeStatus = sanitizeString(body?.status, 30);

      const validStatuses = ['New', 'Contacted', 'Survey Scheduled', 'Proposal Sent', 'Closed'];
      if (!validStatuses.includes(safeStatus)) {
        return sendJson(res, 400, { success: false, error: 'Invalid status value.' });
      }

      const leads = await getStoredLeads();
      const lead = leads.find((l) => l.leadId === safeLeadId);

      if (!lead) {
        return sendJson(res, 404, { success: false, error: 'Lead not found.' });
      }

      lead.status = safeStatus;
      lead.updatedAt = new Date().toISOString();
      await saveStoredLeads(leads);

      auditLog('LEAD_STATUS_UPDATED', {
        leadId: safeLeadId,
        newStatus: safeStatus,
        ip: clientIP,
      });

      return sendJson(res, 200, {
        success: true,
        message: 'Status updated successfully.',
        lead,
      });
    } catch (err: any) {
      return sendJson(res, 500, { success: false, error: 'Failed to update lead status.' });
    }
  }

  // ─── 3. DELETE LEAD ────────────────────────────────────────────────────
  if (req.method === 'DELETE') {
    try {
      const body = await parseBody(req);
      const safeLeadId = sanitizeString(body?.leadId, 50);

      if (!safeLeadId) {
        return sendJson(res, 400, { success: false, error: 'Lead ID is required.' });
      }

      const leads = await getStoredLeads();
      const leadIndex = leads.findIndex((l) => l.leadId === safeLeadId);

      if (leadIndex === -1) {
        return sendJson(res, 404, { success: false, error: 'Lead not found.' });
      }

      const [deletedLead] = leads.splice(leadIndex, 1);
      await saveStoredLeads(leads);

      auditLog('LEAD_DELETED', {
        leadId: safeLeadId,
        deletedName: deletedLead.name,
        deletedPhone: deletedLead.phone,
        ip: clientIP,
      });

      return sendJson(res, 200, {
        success: true,
        message: `Lead ${safeLeadId} deleted successfully.`,
        deletedLeadId: safeLeadId,
      });
    } catch (err: any) {
      return sendJson(res, 500, { success: false, error: 'Failed to delete lead.' });
    }
  }

  return sendJson(res, 405, { success: false, error: 'Method not allowed' });
}
