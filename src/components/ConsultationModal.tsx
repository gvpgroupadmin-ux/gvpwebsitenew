import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { submitLead } from '../utils/leadService';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillData?: {
    type?: string;
    bill?: number;
    capacity?: number;
  } | null;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  prefillData,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Ichalkaranji',
    type: prefillData?.type || 'commercial',
    monthlyBill: prefillData?.bill ? `₹ ${prefillData.bill.toLocaleString('en-IN')}` : '',
    notes: prefillData?.capacity ? `Interested in ~${prefillData.capacity} kW Solar EPC setup.` : '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [leadRefId, setLeadRefId] = useState<string | null>(null);

  React.useEffect(() => {
    if (prefillData) {
      setFormData((prev) => ({
        ...prev,
        type: prefillData.type || 'commercial',
        monthlyBill: prefillData.bill ? `₹ ${prefillData.bill.toLocaleString('en-IN')}` : prev.monthlyBill,
        notes: prefillData.capacity
          ? `Calculated estimate: ~${prefillData.capacity} kW plant.`
          : prev.notes,
      }));
    }
  }, [prefillData]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    const res = await submitLead({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      city: formData.city,
      requirement: formData.type,
      monthlyBill: formData.monthlyBill,
      message: formData.notes,
      source: 'consultation_modal',
    });

    setIsSubmitting(false);

    if (res.success) {
      setSubmitted(true);
      setLeadRefId(res.leadId || null);
    } else {
      setSubmitError(res.error || res.message || 'Submission failed. Please check details or connect via WhatsApp.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#DFEADE] overflow-hidden my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EAF2F8] bg-[#F8FAFC]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7] animate-pulse" />
            <h3 className="font-extrabold text-[#0A192F] text-base">
              Book Free Rooftop Solar Feasibility Audit
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-[#F0F7FD] text-[#0284C7] border border-[#DCEAF2] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#0A192F]">
                Audit Request Confirmed!
              </h3>
              {leadRefId && (
                <div className="inline-block bg-[#F8FAFC] border border-[#DCEAF2] text-[#0284C7] px-3.5 py-1 rounded-full text-xs font-mono font-bold">
                  Ref ID: {leadRefId}
                </div>
              )}
              <p className="text-sm text-[#5A6E85] leading-relaxed max-w-md mx-auto">
                Thank you, <strong>{formData.name}</strong>. Our engineering manager will call you at{' '}
                <strong>{formData.phone}</strong> to coordinate a complimentary 3D shadow analysis 
                and load verification for your site in {formData.city}.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setLeadRefId(null);
                    onClose();
                  }}
                  className="bg-[#0A192F] text-white text-xs font-bold px-6 py-3 rounded-full hover:bg-[#142A4A] transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <p className="text-xs text-[#5A6E85]">
                Get a comprehensive 3D shadow report, expected generation units (kWh), subsidy calculation, 
                and exact bill reduction roadmap.
              </p>

              {submitError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              <div>
                <label htmlFor="modal-name" className="block text-xs font-bold text-[#5A6E85] uppercase tracking-wider mb-1">
                  Full Name / Enterprise Name *
                </label>
                <input
                  id="modal-name"
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patil / Kesare Textiles"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCEAF2] text-sm text-[#0A192F] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0284C7]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="modal-phone" className="block text-xs font-bold text-[#5A6E85] uppercase tracking-wider mb-1">
                    Phone Number *
                  </label>
                  <input
                    id="modal-phone"
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCEAF2] text-sm text-[#0A192F] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0284C7]"
                  />
                </div>

                <div>
                  <label htmlFor="modal-city" className="block text-xs font-bold text-[#5A6E85] uppercase tracking-wider mb-1">
                    City / Operational Region *
                  </label>
                  <select
                    id="modal-city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCEAF2] text-sm text-[#0A192F] bg-white focus:outline-none focus:border-[#0284C7]"
                  >
                    <optgroup label="Maharashtra (GVP Solar Energy)">
                      <option value="Ichalkaranji">Ichalkaranji (HQ)</option>
                      <option value="Kolhapur">Kolhapur / Kagal MIDC</option>
                      <option value="Sangli">Sangli / Miraj / Kupwad</option>
                      <option value="Solapur">Solapur / Barshi</option>
                      <option value="Other MH">Other Maharashtra</option>
                    </optgroup>
                    <optgroup label="Rajasthan (GVP Solar Energy Pvt. Ltd.)">
                      <option value="Rajasthan">Rajasthan (Jaipur / Jodhpur / Other)</option>
                    </optgroup>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="modal-type" className="block text-xs font-bold text-[#5A6E85] uppercase tracking-wider mb-1">
                    Installation Sector
                  </label>
                  <select
                    id="modal-type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCEAF2] text-sm text-[#0A192F] bg-white focus:outline-none focus:border-[#0284C7]"
                  >
                    <option value="commercial">Industrial / C&I (Textile, Mill, Factory)</option>
                    <option value="residential">Residential Rooftop (PM Surya Ghar)</option>
                    <option value="commercial-office">Commercial Complex / Hospital</option>
                    <option value="agro">Agro / Cold Storage</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="modal-bill" className="block text-xs font-bold text-[#5A6E85] uppercase tracking-wider mb-1">
                    Current Monthly Bill (₹)
                  </label>
                  <input
                    id="modal-bill"
                    type="text"
                    placeholder="e.g. ₹50,000 or ₹3,00,000"
                    value={formData.monthlyBill}
                    onChange={(e) => setFormData({ ...formData, monthlyBill: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCEAF2] text-sm text-[#0A192F] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0284C7]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="modal-notes" className="block text-xs font-bold text-[#5A6E85] uppercase tracking-wider mb-1">
                  Additional Notes / Roof Details (Optional)
                </label>
                <textarea
                  id="modal-notes"
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Tin shed, RCC roof, connected load 65 HP, etc."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCEAF2] text-sm text-[#0A192F] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0284C7]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0A192F] hover:bg-[#142A4A] disabled:bg-slate-400 text-white font-extrabold text-sm py-3.5 px-6 rounded-2xl transition-all shadow-sm flex items-center justify-center gap-2 group cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#F5A623]" />
                      <span>Confirming Site Survey...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#F5A623] group-hover:translate-x-1 transition-transform" />
                      <span>Confirm Free Rooftop Site Survey</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#7E92A2] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0284C7]" />
                <span>Zero obligations. Trusted by 500+ Maharashtra clients.</span>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
