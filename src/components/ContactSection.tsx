import React, { useState } from 'react';
import { MapPin, Phone, Mail, Globe, Send, CheckCircle2, MessageCircle, Clock, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/solarData';
import { submitLead } from '../utils/leadService';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Ichalkaranji',
    connectionType: 'Industrial (C&I)',
    monthlyBill: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [leadRefId, setLeadRefId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    const res = await submitLead({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      city: formData.city,
      requirement: formData.connectionType,
      monthlyBill: formData.monthlyBill,
      message: formData.message,
      source: 'contact_form',
    });

    setIsSubmitting(false);

    if (res.success) {
      setSubmitted(true);
      setLeadRefId(res.leadId || null);
    } else {
      setSubmitError(res.error || res.message || 'Submission failed. Please check details or contact us directly on WhatsApp.');
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello GVP Solar, I am interested in a solar site audit for my ${formData.connectionType} setup in ${formData.city}. My monthly bill is ₹${formData.monthlyBill || 'N/A'}. Please share a feasibility proposal.`
  );

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#FFFFFF] relative border-t border-[#EAF2F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#F0F7FD] border border-[#DCEAF2] px-3.5 py-1.5 rounded-full mb-4">
            <Mail className="w-3.5 h-3.5 text-[#0284C7]" />
            <span className="text-[12px] font-bold uppercase tracking-wider text-[#0284C7]">
              GET IN TOUCH
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[#0A192F] mb-4">
            Start Your Solar Journey with GVP Solar.
          </h2>
          <p className="text-sm sm:text-base text-[#5A6E85]">
            Visit our office in Kapad Market, Ichalkaranji or request a free technical feasibility audit for your rooftop.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* LEFT: Office Information & Quick Connect (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Headquarters Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCEAF2] shadow-xs space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F0F7FD] text-[#0284C7] flex items-center justify-center shrink-0 border border-[#DCEAF2]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0A192F] mb-1">
                    Head Office & Experience Center
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5A6E85] leading-relaxed">
                    {COMPANY_INFO.address}
                  </p>
                  <span className="inline-block mt-2 text-[11px] font-bold text-[#0284C7] bg-[#F0F7FD] border border-[#DCEAF2] px-2.5 py-0.5 rounded-full">
                    Operations: Kolhapur • Sangli • Solapur • Belagavi
                  </span>
                </div>
              </div>

              <div className="border-t border-[#EAF2F8] pt-6 space-y-4">
                <a
                  href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-3 text-sm text-[#334E68] hover:text-[#0284C7] font-medium transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#F0F7FD] border border-[#DCEAF2] flex items-center justify-center text-[#0284C7]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-[#7E92A2]">Call Our Solar Engineers</span>
                    <span className="font-bold text-[#0A192F]">{COMPANY_INFO.phoneFormatted}</span>
                  </div>
                </a>

                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="flex items-center gap-3 text-sm text-[#334E68] hover:text-[#0284C7] font-medium transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#F0F7FD] border border-[#DCEAF2] flex items-center justify-center text-[#0284C7]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-[#7E92A2]">Email for EPC RFPs</span>
                    <span className="font-bold text-[#0A192F]">{COMPANY_INFO.email}</span>
                  </div>
                </a>

                <a
                  href="https://www.gvpsolutions.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-[#334E68] hover:text-[#0284C7] font-medium transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#F0F7FD] border border-[#DCEAF2] flex items-center justify-center text-[#0284C7]">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-[#7E92A2]">Official Portal</span>
                    <span className="font-bold text-[#0A192F]">{COMPANY_INFO.website}</span>
                  </div>
                </a>
              </div>

              {/* Instant WhatsApp Support Button */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/917665165666?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20BA59] text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>
            </div>

            {/* Operating Hours & Response SLA */}
            <div className="bg-[#0A192F] rounded-3xl p-6 text-white space-y-3 shadow-md border border-[#142A4A]">
              <div className="flex items-center gap-2 text-xs font-bold text-[#F5A623]">
                <Clock className="w-4 h-4" />
                <span>OPERATING HOURS & O&M DISPATCH</span>
              </div>
              <p className="text-xs text-white/80 leading-relaxed">
                Monday to Saturday: 9:00 AM – 7:30 PM <br />
                Emergency O&M hotline active 24/7 for grid-tied industrial installations.
              </p>
              <div className="pt-2 flex items-center gap-2 text-[11.5px] text-[#0284C7]">
                <ShieldCheck className="w-4 h-4 text-[#F5A623]" />
                <span className="text-white/90">Local technicians stationed in Ichalkaranji & Kolhapur</span>
              </div>
            </div>

          </div>

          {/* RIGHT: Site Survey & Feasibility Request Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#DCEAF2] shadow-[0_12px_45px_-15px_rgba(2,132,199,0.08)]">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-[#F0F7FD] text-[#0284C7] rounded-full flex items-center justify-center mx-auto border border-[#DCEAF2]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#0A192F]">
                  Feasibility Request Received!
                </h3>
                {leadRefId && (
                  <div className="inline-block bg-[#F8FAFC] border border-[#DCEAF2] text-[#0284C7] px-3.5 py-1 rounded-full text-xs font-mono font-bold">
                    Ref ID: {leadRefId}
                  </div>
                )}
                <p className="text-sm text-[#5A6E85] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. A senior solar EPC engineer from our 
                  Ichalkaranji office will contact you at <strong>{formData.phone}</strong> within 4 business hours 
                  with a customized rooftop generation report.
                </p>
                <div className="pt-4 flex flex-wrap justify-center gap-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setLeadRefId(null);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        city: 'Ichalkaranji',
                        connectionType: 'Industrial (C&I)',
                        monthlyBill: '',
                        message: '',
                      });
                    }}
                    className="text-xs font-bold text-[#0284C7] bg-[#F0F7FD] border border-[#DCEAF2] px-5 py-2.5 rounded-full hover:bg-[#E2EEF8] transition-colors"
                  >
                    Submit Another Query
                  </button>
                  <a
                    href={`https://wa.me/917665165666?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-white bg-[#25D366] px-5 py-2.5 rounded-full hover:bg-[#20BA59] transition-colors flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Us Now</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <h3 className="text-xl font-bold text-[#0A192F] tracking-tight">
                    Request a Free Site Feasibility Survey
                  </h3>
                  <p className="text-xs text-[#5A6E85] mt-1">
                    Fill out the form below. We'll conduct a preliminary satellite 3D solar yield simulation.
                  </p>
                </div>

                {submitError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-bold text-[#5A6E85] uppercase tracking-wider mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Ramesh Patil / Kesare Textiles"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#DCEAF2] text-sm text-[#0A192F] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-bold text-[#5A6E85] uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#DCEAF2] text-sm text-[#0A192F] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-bold text-[#5A6E85] uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#DCEAF2] text-sm text-[#0A192F] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-city" className="block text-xs font-bold text-[#5A6E85] uppercase tracking-wider mb-1.5">
                      City / Operational Region *
                    </label>
                    <select
                      id="contact-city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#DCEAF2] text-sm text-[#0A192F] bg-white focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7]"
                    >
                      <optgroup label="Maharashtra Operations (GVP Solar Energy)">
                        <option value="Ichalkaranji">Ichalkaranji (HQ)</option>
                        <option value="Kolhapur">Kolhapur (MIDC / Kagal / Shiroli)</option>
                        <option value="Sangli">Sangli / Miraj / Kupwad</option>
                        <option value="Barshi / Solapur">Barshi / Solapur</option>
                        <option value="Tardal / Korochi / Hatkanangle">Tardal / Korochi / Hatkanangle</option>
                        <option value="Amravati / Nandurbar">Amravati / Nandurbar / Other MH</option>
                      </optgroup>
                      <optgroup label="Rajasthan Operations (GVP Solar Energy Pvt. Ltd.)">
                        <option value="Rajasthan">Rajasthan (Jaipur / Jodhpur / Industrial Clusters)</option>
                      </optgroup>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-connection" className="block text-xs font-bold text-[#5A6E85] uppercase tracking-wider mb-1.5">
                      Connection Category
                    </label>
                    <select
                      id="contact-connection"
                      value={formData.connectionType}
                      onChange={(e) => setFormData({ ...formData, connectionType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#DCEAF2] text-sm text-[#0A192F] bg-white focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7]"
                    >
                      <option value="Commercial & Industrial (C&I)">Commercial & Industrial (C&I / HT)</option>
                      <option value="Textile Mill / Spinning / Weaving">Textile Mill / Spinning / Sizing Shed</option>
                      <option value="Residential Rooftop">Residential Rooftop (Bungalow / Villa)</option>
                      <option value="Institutional / Hospital / College">Institutional / Hospital / College</option>
                      <option value="Agro Solar / Cold Storage">Agro Solar / Cold Storage</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-bill" className="block text-xs font-bold text-[#5A6E85] uppercase tracking-wider mb-1.5">
                      Approx Monthly Electricity Bill (₹)
                    </label>
                    <input
                      id="contact-bill"
                      type="text"
                      placeholder="e.g. ₹50,000 or ₹2,50,000"
                      value={formData.monthlyBill}
                      onChange={(e) => setFormData({ ...formData, monthlyBill: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#DCEAF2] text-sm text-[#0A192F] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-notes" className="block text-xs font-bold text-[#5A6E85] uppercase tracking-wider mb-1.5">
                    Roof Type or Specific Requirements (Optional)
                  </label>
                  <textarea
                    id="contact-notes"
                    rows={3}
                    placeholder="e.g. Metal sheet PEB roof, RCC flat terrace, sanctioned load 100kVA, etc."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DCEAF2] text-sm text-[#0A192F] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7]"
                  />
                </div>

                <button
                  type="submit"
                  id="contact-submit-btn"
                  disabled={isSubmitting}
                  className="w-full bg-[#0A192F] hover:bg-[#142A4A] disabled:bg-slate-400 text-white font-extrabold text-sm py-3.5 px-6 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#F5A623]" />
                      <span>Submitting Feasibility Request...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#F5A623] group-hover:translate-x-1 transition-transform" />
                      <span>Request Free Rooftop Assessment</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-[#7E92A2]">
                  🔒 Your information is confidential. We will never spam or share your contact.
                </p>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
