import React from 'react';
import { ArrowRight, Factory, Home, Wrench, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { CORE_SERVICES } from '../data/solarData';

interface MissionSectionProps {
  onExploreProjects: () => void;
  onOpenConsultation: () => void;
  onSelectService: (serviceId: string) => void;
}

export const MissionSection: React.FC<MissionSectionProps> = ({
  onExploreProjects,
  onOpenConsultation,
  onSelectService,
}) => {
  return (
    <section id="mission" className="py-20 sm:py-28 bg-[#FFFFFF] relative overflow-hidden border-t border-[#EAF2F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          
          {/* LEFT SIDE: Heading & Philosophy */}
          <div className="lg:col-span-4 xl:col-span-5 flex flex-col justify-between h-full pt-2">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#F0F7FD] border border-[#DCEAF2] px-3.5 py-1.5 rounded-full mb-6">
                <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" />
                <span className="text-[11.5px] font-bold uppercase tracking-wider text-[#0284C7]">
                  OUR MISSION & EXPERTISE
                </span>
              </div>

              {/* Headline matching GVP brand style */}
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-[-0.03em] leading-[1.14] text-[#0A192F] mb-6">
                We’re Building a <br className="hidden sm:inline" />
                <span className="text-[#0284C7]">Greener</span>, <br />
                Cleaner, Stronger <br className="hidden sm:inline" />
                Maharashtra.
              </h2>

              {/* Narrative */}
              <p className="text-base text-[#5A6E85] leading-relaxed mb-8 max-w-md">
                From high-capacity textile mills in Ichalkaranji to industrial giants across the Kolhapur–Sangli belt, 
                GVP Solar engineers bankable rooftop and ground-mount infrastructure built to produce peak kWh yields 
                for 25+ years with zero downtime.
              </p>
            </div>

            {/* Action buttons matching GVP blue palette */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={onExploreProjects}
                className="bg-[#0A192F] hover:bg-[#142A4A] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-full flex items-center gap-2 transition-all shadow-[0_4px_14px_rgba(10,25,47,0.16)] hover:gap-3 cursor-pointer"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 text-[#F5A623]" />
              </button>

              <button
                onClick={onOpenConsultation}
                className="bg-white hover:bg-[#F0F7FD] text-[#0A192F] text-xs sm:text-sm font-semibold px-6 py-3 rounded-full border border-[#DCEAF2] transition-colors cursor-pointer"
              >
                Learn More
              </button>
            </div>

            {/* Micro assurance list */}
            <div className="mt-10 pt-6 border-t border-[#EAF2F8] grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#475569]">
                <ShieldCheck className="w-4 h-4 text-[#0284C7] shrink-0" />
                <span>MSEDCL Net-Meter Approved</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#475569]">
                <Zap className="w-4 h-4 text-[#F5A623] shrink-0" />
                <span>CEIG Electrical Cleared</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: 3 Tall Vertical Cards with Imagery */}
          <div className="lg:col-span-8 xl:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            
            {/* Card 1: Commercial & Industrial */}
            <div
              onClick={() => onSelectService('ci-solar')}
              className="group relative h-[380px] sm:h-[450px] rounded-3xl overflow-hidden shadow-md shadow-[#0A192F]/5 border border-[#E2EEF8] cursor-pointer transition-all duration-300 hover:-translate-y-1.5"
            >
              <img
                src={CORE_SERVICES[0].image}
                alt={CORE_SERVICES[0].title}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              {/* Subtle navy/blue gradient overlay for legibility without darkness */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/90 via-[#0A192F]/25 to-transparent" />

              {/* Content positioned at bottom */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white flex flex-col justify-end">
                {/* Icon pill */}
                <div className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm text-[#0A192F] flex items-center justify-center mb-3 shadow-md group-hover:bg-[#0284C7] group-hover:text-white transition-colors">
                  <Factory className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug mb-1.5">
                  Commercial & Industrial (C&I)
                </h3>
                <p className="text-xs text-white/85 line-clamp-2 leading-relaxed font-normal">
                  High-yield rooftop powerplants for textile mills, foundries & engineering units.
                </p>
              </div>
            </div>

            {/* Card 2: Residential Rooftop */}
            <div
              onClick={() => onSelectService('residential-solar')}
              className="group relative h-[380px] sm:h-[450px] rounded-3xl overflow-hidden shadow-md shadow-[#0A192F]/5 border border-[#E2EEF8] cursor-pointer transition-all duration-300 hover:-translate-y-1.5"
            >
              <img
                src={CORE_SERVICES[1].image}
                alt={CORE_SERVICES[1].title}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/90 via-[#0A192F]/25 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white flex flex-col justify-end">
                <div className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm text-[#0A192F] flex items-center justify-center mb-3 shadow-md group-hover:bg-[#0284C7] group-hover:text-white transition-colors">
                  <Home className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug mb-1.5">
                  Residential Rooftop Solar
                </h3>
                <p className="text-xs text-white/85 line-clamp-2 leading-relaxed font-normal">
                  PM Surya Ghar subsidy up to ₹78,000 & 70-90% domestic bill elimination.
                </p>
              </div>
            </div>

            {/* Card 3: EPC & Maintenance */}
            <div
              onClick={() => onSelectService('epc-om')}
              className="group relative h-[380px] sm:h-[450px] rounded-3xl overflow-hidden shadow-md shadow-[#0A192F]/5 border border-[#E2EEF8] cursor-pointer transition-all duration-300 hover:-translate-y-1.5"
            >
              <img
                src={CORE_SERVICES[2].image}
                alt={CORE_SERVICES[2].title}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/90 via-[#0A192F]/25 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white flex flex-col justify-end">
                <div className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm text-[#0A192F] flex items-center justify-center mb-3 shadow-md group-hover:bg-[#0284C7] group-hover:text-white transition-colors">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug mb-1.5">
                  Turnkey EPC & Care
                </h3>
                <p className="text-xs text-white/85 line-clamp-2 leading-relaxed font-normal">
                  CEIG approvals, bi-directional net-metering & 25-year performance monitoring.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
