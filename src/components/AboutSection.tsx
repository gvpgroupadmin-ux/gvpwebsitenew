import React from 'react';
import { Sun, CheckCircle, Award, Users, Shield, Zap, Sparkles, Building2, MapPin } from 'lucide-react';
import { COMPANY_INFO } from '../data/solarData';

interface AboutSectionProps {
  onOpenConsultation: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenConsultation }) => {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#FFFFFF] relative overflow-hidden border-t border-[#EAF2F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Visual collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#DCEAF2]">
              <img
                src="/projects/kesare-group.jpg"
                alt="GVP Solar 580 kW industrial rooftop solar EPC installation at Kesare Group, Ichalkaranji"
                loading="lazy"
                width={1000}
                height={520}
                onError={(e) => {
                  // Fallback slot architecture for genuine assets
                  (e.target as HTMLImageElement).src = '/projects/industrial-midc.jpg';
                }}
                className="w-full h-[460px] sm:h-[520px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/85 via-transparent to-transparent" />

              {/* Dual Presence Floating Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-[#DCEAF2] shadow-lg text-[#0A192F]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0284C7]">
                    REGIONAL OPERATIONS
                  </span>
                  <span className="text-[11px] font-extrabold bg-[#F0F7FD] border border-[#DCEAF2] text-[#0284C7] px-2.5 py-0.5 rounded-full">
                    Western India
                  </span>
                </div>
                
                <div className="space-y-2.5 pt-1 text-xs">
                  <div className="flex items-start gap-2 border-b border-[#EAF2F8] pb-2">
                    <span className="w-2 h-2 rounded-full bg-[#0284C7] shrink-0 mt-1" />
                    <div>
                      <span className="font-bold text-[#0A192F]">Maharashtra: </span>
                      <span className="text-[#5A6E85]">GVP Solar Energy • Ichalkaranji</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#F5A623] shrink-0 mt-1" />
                    <div>
                      <span className="font-bold text-[#0A192F]">Rajasthan: </span>
                      <span className="text-[#5A6E85]">GVP Solar Energy Pvt. Ltd.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Top Badge */}
            <div className="absolute -top-4 -right-4 bg-[#0A192F] text-white p-4 rounded-2xl shadow-xl border border-white/20 hidden sm:block">
              <span className="text-2xl font-black text-[#F5A623] block leading-none">13+</span>
              <span className="text-[11px] font-semibold text-white/80 uppercase tracking-wider">
                Years of Trust
              </span>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 bg-[#F0F7FD] border border-[#DCEAF2] px-3.5 py-1.5 rounded-full mb-4">
              <Sun className="w-3.5 h-3.5 text-[#0284C7]" />
              <span className="text-[12px] font-bold uppercase tracking-wider text-[#0284C7]">
                ABOUT GVP SOLAR ENERGY
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-[-0.03em] leading-[1.15] text-[#0A192F] mb-5">
              Solar Energy for Better Tomorrow.
            </h2>

            <blockquote className="border-l-4 border-[#0284C7] pl-4 italic text-base sm:text-lg text-[#0A192F] font-medium mb-6">
              "From our base in Ichalkaranji, Maharashtra, GVP Solar Energy delivers solar solutions across residential, commercial and industrial applications, with operations extending beyond Maharashtra."
            </blockquote>

            <p className="text-sm sm:text-base text-[#5A6E85] leading-relaxed mb-6">
              Founded on strict tier-1 engineering ethics and precision design, GVP Solar Energy has established a premier reputation across heavy textile spinning hubs, sizing complexes, foundries, commercial establishments, and residential rooftops. 
            </p>

            {/* Operating Businesses Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7">
              {/* Maharashtra Card */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#DCEAF2] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#0284C7] bg-[#E0F2FE] px-2 py-0.5 rounded">
                      MAHARASHTRA
                    </span>
                    <span className="text-xs text-[#5A6E85] font-medium">Headquarters</span>
                  </div>
                  <h4 className="text-sm font-extrabold text-[#0A192F]">GVP Solar Energy</h4>
                  <p className="text-xs text-[#5A6E85] mt-1">
                    Ichalkaranji, Maharashtra
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-[#EAF2F8] text-[11px] text-[#5A6E85]">
                  Operations lead: <strong className="text-[#0A192F]">Giriraj Dhoot</strong>
                </div>
              </div>

              {/* Rajasthan Card */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#DCEAF2] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#F5A623] bg-[#FEF3C7] px-2 py-0.5 rounded">
                      RAJASTHAN
                    </span>
                    <span className="text-xs text-[#5A6E85] font-medium">Expansion Entity</span>
                  </div>
                  <h4 className="text-sm font-extrabold text-[#0A192F]">GVP Solar Energy Private Limited</h4>
                  <p className="text-xs text-[#5A6E85] mt-1">
                    Rajasthan Operations
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-[#EAF2F8] text-[11px] text-[#5A6E85]">
                  Handled by: <strong className="text-[#0A192F]">Vrushabh Dhoot</strong>
                </div>
              </div>
            </div>

            {/* Features Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
              <div className="p-3.5 rounded-xl bg-white border border-[#EAF2F8] flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-[#0A192F]">Industrial & Commercial EPC</h5>
                  <p className="text-[11px] text-[#5A6E85]">High-yield rooftop solar for textile, auto & manufacturing.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#EAF2F8] flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-[#0A192F]">End-to-End Execution</h5>
                  <p className="text-[11px] text-[#5A6E85]">Survey, DISCOM liaisoning, net-metering & 25-yr support.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenConsultation}
                className="bg-[#0A192F] hover:bg-[#142A4A] text-white text-xs sm:text-sm font-bold px-7 py-3.5 rounded-full transition-all shadow-sm"
              >
                Meet Our Engineering Team
              </button>

              <a
                href="#projects"
                className="text-xs sm:text-sm font-bold text-[#0284C7] hover:text-[#0369A1] px-5 py-3.5 rounded-full border border-[#DCEAF2] hover:bg-[#F0F7FD] transition-colors"
              >
                Explore Projects
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
