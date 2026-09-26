export interface LeadPayload {
  name: string;
  phone: string;
  email?: string;
  city: string;
  requirement?: string; // e.g. 'Residential', 'Commercial', 'Industrial (C&I)'
  monthlyBill?: string;
  capacity?: string;
  message?: string;
  source: 'contact_form' | 'consultation_modal' | 'calculator_cta' | 'mobile_persistent_bar';
  timestamp?: string;
}

export interface LeadSubmissionResponse {
  success: boolean;
  leadId?: string;
  message: string;
  error?: string;
}

const STORAGE_KEY = 'gvp_solar_leads_backup';

/**
 * Validates lead information on the client before network transmission.
 */
export function validateLead(payload: LeadPayload): { valid: boolean; error?: string } {
  if (!payload.name || payload.name.trim().length < 2) {
    return { valid: false, error: 'Please enter your full name (minimum 2 characters).' };
  }

  // Normalize Indian mobile numbers: strip non-digits
  const digitsOnly = payload.phone.replace(/\D/g, '');
  // Valid if 10 digits, or 12 digits starting with 91, or 11 digits starting with 0
  const isValidPhone =
    digitsOnly.length === 10 ||
    (digitsOnly.length === 12 && digitsOnly.startsWith('91')) ||
    (digitsOnly.length === 11 && digitsOnly.startsWith('0'));

  if (!isValidPhone) {
    return { valid: false, error: 'Please enter a valid 10-digit Indian mobile number.' };
  }

  if (payload.email && payload.email.trim().length > 0) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.email.trim())) {
      return { valid: false, error: 'Please enter a valid email address or leave it blank.' };
    }
  }

  if (!payload.city || payload.city.trim().length < 2) {
    return { valid: false, error: 'Please select or enter your city/region.' };
  }

  return { valid: true };
}

/**
 * Persists lead to local storage as client-side backup.
 */
function backupLeadLocally(lead: LeadPayload & { leadId: string; timestamp: string }) {
  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    const list = existing ? JSON.parse(existing) : [];
    list.unshift(lead);
    // Keep last 50 leads locally
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, 50)));
  } catch (err) {
    console.warn('Unable to backup lead to localStorage:', err);
  }
}

/**
 * Submits lead to backend API with validation, timeout, and persistent backup.
 */
export async function submitLead(payload: LeadPayload): Promise<LeadSubmissionResponse> {
  // Step 1: Client-side validation
  const validation = validateLead(payload);
  if (!validation.valid) {
    return {
      success: false,
      message: validation.error || 'Validation failed',
      error: validation.error,
    };
  }

  const timestamp = new Date().toISOString();
  const enrichedPayload = {
    ...payload,
    name: payload.name.trim(),
    phone: payload.phone.trim(),
    email: payload.email?.trim() || '',
    city: payload.city.trim(),
    timestamp,
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-second network timeout

    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enrichedPayload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error || result.message || 'Failed to submit lead to server.');
    }

    const leadId = result.leadId || `GVP-${Date.now().toString(36).toUpperCase()}`;

    // Backup locally
    backupLeadLocally({
      ...enrichedPayload,
      leadId,
      timestamp,
    });

    return {
      success: true,
      leadId,
      message: result.message || 'Feasibility request received successfully!',
    };
  } catch (err: any) {
    console.error('Lead submission network/server error:', err);

    // [SECURITY FIX M5] — Don't pretend failures are successes.
    // Backup locally but warn the user so they can retry or call directly.
    const fallbackId = `GVP-OFFLINE-${Date.now().toString(36).toUpperCase()}`;
    backupLeadLocally({
      ...enrichedPayload,
      leadId: fallbackId,
      timestamp,
    });

    return {
      success: false,
      leadId: fallbackId,
      message: 'Your request was saved locally but may not have reached our server. Please call us at +91 76651 65666 or WhatsApp to confirm your inquiry.',
      error: 'Network error — local backup created',
    };
  }
}
