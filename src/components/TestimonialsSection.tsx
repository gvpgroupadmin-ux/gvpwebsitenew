import React from 'react';
import { Star, Quote, Building2, MapPin, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { TESTIMONIALS } from '../data/solarData';

interface TestimonialsSectionProps {
  onOpenConsultation: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onOpenConsultation }) => {
  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-[#F8FAFC] relative border-t border-[#EAF2F8] overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#0284C7]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#F0F7FD] border border-[#DCEAF2] px-3.5 py-1.5 rounded-full mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0284C7]" />
            <span className="text-[12px] font-bold uppercase tracking-wider text-[#0284C7]">
              VERIFIED INDUSTRIAL PROOF
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[#0A192F] mb-4">
            Trusted by Western Maharashtra's Leading Industries.
          </h2>
          <p className="text-sm sm:text-base text-[#5A6E85]">
            Authentic feedback from enterprise leaders, textile owners, and factory promoters powered by GVP Solar.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-14">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DCEAF2] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative group"
            >
              <div>
                {/* Top Row: Rating & Verified Tag */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#F5A623] text-[#F5A623]" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0284C7] bg-[#F0F7FD] border border-[#DCEAF2] px-2.5 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3 text-[#0284C7]" />
                    {item.tag}
                  </span>
                </div>

                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-[#DCEAF2] mb-3 group-hover:text-[#0284C7]/30 transition-colors" />

                {/* Quote Text */}
                <p className="text-sm text-[#334E68] leading-relaxed mb-6 italic">
                  "{item.text}"
                </p>
              </div>

              {/* Author & Project Details */}
              <div className="border-t border-[#EAF2F8] pt-4 mt-auto">
                <h3 className="font-bold text-[#0A192F] text-sm">
                  {item.name}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-xs text-[#5A6E85]">
                  <Building2 className="w-3.5 h-3.5 text-[#0284C7] shrink-0" />
                  <span className="font-medium truncate">{item.company}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-[#7E92A2]">
                  <MapPin className="w-3 h-3 text-[#7E92A2] shrink-0" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Social Proof Bar */}
        <div className="bg-[#0A192F] text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#142A4A] shadow-lg">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-bold text-white">
              Want to inspect an operating installation near your facility?
            </h4>
            <p className="text-xs sm:text-sm text-white/70">
              We arrange on-site reference visits to live textile & industrial solar plants in Kolhapur, Ichalkaranji, and Sangli.
            </p>
          </div>
          <button
            onClick={onOpenConsultation}
            className="shrink-0 bg-[#F5A623] hover:bg-[#E59819] text-[#0A192F] font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <span>Request Reference Visit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
