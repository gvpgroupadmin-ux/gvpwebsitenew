import React from 'react';
import { Zap, ArrowRight, MapPin, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/solarData';

interface GeographicPresenceSectionProps {
  onOpenConsultation: (details?: { type: string; bill: number; capacity: number }) => void;
}

export const GeographicPresenceSection: React.FC<GeographicPresenceSectionProps> = ({
  onOpenConsultation,
}) => {
  const verifiedHubs = [
    'Ichalkaranji',
    'Kolhapur',
    'Kagal',
    'Kagal MIDC',
    'Sangli',
    'Barshi',
    'Pune',
    'Nashik',
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FFFFFF] border-t border-[#EAF2F8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-[#F0F7FD] border border-[#DCEAF2] px-3.5 py-1.5 rounded-full mb-3.5">
            <Zap className="w-3.5 h-3.5 text-[#0284C7]" />
            <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-wider text-[#0284C7]">
              OPERATIONS &amp; PRESENCE
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-[#0A192F] mb-3 leading-tight">
            Operating Across Maharashtra &amp; Rajasthan.
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#5A6E85] max-w-2xl mx-auto leading-relaxed">
            One EPC engineering standard serving high-consumption textile mills, engineering foundries, 
            and commercial enterprises across Western India.
          </p>
        </div>

        {/* Main Content Grid: Left Map (55-60%), Right Operations Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* LEFT: Map Visual Panel (Desktop 7 cols, Mobile order-1) */}
          <div className="lg:col-span-7 flex flex-col order-1">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#DCEAF2] bg-[#FFFFFF] shadow-[0_12px_45px_-15px_rgba(2,132,199,0.08)]">
              
              {/* Floating Top UI: SOLAR OPERATIONS & MAHARASHTRA + RAJASTHAN */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 z-10 flex items-center justify-between pointer-events-none">
                <div className="bg-white/95 backdrop-blur-md px-3 py-1 sm:py-1.5 rounded-full border border-[#DCEAF2] shadow-xs text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#0A192F] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
                  <span>SOLAR OPERATIONS</span>
                </div>

                <div className="bg-white/95 backdrop-blur-md px-3 py-1 sm:py-1.5 rounded-full border border-[#DCEAF2] shadow-xs text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-[#0284C7] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-pulse" />
                  <span>MAHARASHTRA + RAJASTHAN</span>
                </div>
              </div>

              {/* Main Realistic Editorial Solar Map Visual */}
              <div className="pt-8 sm:pt-6 pb-2 px-2 sm:px-4 bg-[#FFFFFF] flex items-center justify-center">
                <img
                  src="/projects/maharashtra-rajasthan-map.jpg"
                  alt="GVP Solar Energy Operations in Maharashtra and Rajasthan"
                  className="w-full h-auto object-contain max-h-[380px] sm:max-h-[440px] lg:max-h-[480px] select-none"
                  loading="eager"
                />
              </div>

              {/* Bottom Map Stats UI */}
              <div className="border-t border-[#EAF2F8] bg-[#F8FAFC]/90 px-4 sm:px-6 py-3 flex items-center justify-between text-xs text-[#0A192F]">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-[#0A192F] text-[11px] sm:text-xs">13+ Years</span>
                  <span className="text-[#94A3B8]">•</span>
                  <span className="font-extrabold text-[#0A192F] text-[11px] sm:text-xs">500+ Sites</span>
                  <span className="text-[#94A3B8]">•</span>
                  <span className="font-extrabold text-[#0284C7] text-[11px] sm:text-xs">18+ MW Commissioned</span>
                </div>
                <div className="hidden sm:flex items-center gap-1 text-[10px] font-semibold text-[#5A6E85]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
                  <span>Ichalkaranji Central Base</span>
                </div>
              </div>

            </div>

            {/* Desktop Installation Hubs placed directly below the Map */}
            <div className="hidden lg:block mt-4 px-4 py-3 rounded-2xl bg-[#F8FAFC] border border-[#DCEAF2]">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-extrabold uppercase tracking-wider text-[#0A192F] text-[11px] whitespace-nowrap">
                  VERIFIED INSTALLATION HUBS:
                </span>
                <span className="text-[#5A6E85] font-medium leading-relaxed">
                  {verifiedHubs.join(' · ')}
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT: Two Operation Cards Stacked Vertically (Desktop 5 cols, Mobile order-2 and order-3) */}
          <div className="lg:col-span-5 flex flex-col space-y-4 sm:space-y-5 order-2">
            
            {/* Card 1: MAHARASHTRA OPERATIONS */}
            <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#DCEAF2] shadow-xs hover:border-[#0284C7]/40 transition-all">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#0284C7] bg-[#F0F7FD] border border-[#DCEAF2] px-2.5 py-0.5 rounded-full">
                  MAHARASHTRA OPERATIONS
                </span>
                <span className="text-[11px] sm:text-xs font-black text-[#0284C7]">
                  18+ MW Commissioned
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-[#0A192F] tracking-tight">
                {COMPANY_INFO.maharashtraOperations.entity}
              </h3>

              <p className="text-xs sm:text-sm text-[#5A6E85] mt-1 leading-relaxed">
                Headquartered in Ichalkaranji. Primary engineering stronghold covering textile mills, heavy foundries, and industrial MIDCs.
              </p>

              <div className="mt-4 pt-3.5 border-t border-[#EAF2F8] grid grid-cols-2 gap-3 text-xs text-[#334E68]">
                <div>
                  <span className="text-[#7E92A2] block text-[10px] uppercase font-bold tracking-wider">
                    Headquartered
                  </span>
                  <span className="font-bold text-[#0A192F] text-xs sm:text-sm">
                    Ichalkaranji
                  </span>
                </div>
                <div>
                  <span className="text-[#7E92A2] block text-[10px] uppercase font-bold tracking-wider">
                    Operation Head
                  </span>
                  <span className="font-bold text-[#0A192F] text-xs sm:text-sm">
                    {COMPANY_INFO.maharashtraOperations.leader}
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: RAJASTHAN OPERATIONS */}
            <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#DCEAF2] shadow-xs hover:border-[#0284C7]/40 transition-all">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#F5A623] bg-[#FEF6E9] border border-[#FDE6C4] px-2.5 py-0.5 rounded-full">
                  RAJASTHAN OPERATIONS
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-[#5A6E85]">
                  High Solar Irradiance
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-[#0A192F] tracking-tight">
                {COMPANY_INFO.rajasthanOperations.entity}
              </h3>

              <p className="text-xs sm:text-sm text-[#5A6E85] mt-1 leading-relaxed">
                Commercial &amp; Industrial Solar EPC delivering high-capacity rooftop powerplants and turnkey captive installations.
              </p>

              <div className="mt-4 pt-3.5 border-t border-[#EAF2F8] grid grid-cols-2 gap-3 text-xs text-[#334E68]">
                <div>
                  <span className="text-[#7E92A2] block text-[10px] uppercase font-bold tracking-wider">
                    Focus
                  </span>
                  <span className="font-bold text-[#0A192F] text-xs sm:text-sm">
                    Commercial &amp; Industrial EPC
                  </span>
                </div>
                <div>
                  <span className="text-[#7E92A2] block text-[10px] uppercase font-bold tracking-wider">
                    Handled by
                  </span>
                  <span className="font-bold text-[#0A192F] text-xs sm:text-sm">
                    {COMPANY_INFO.rajasthanOperations.leader}
                  </span>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-1">
              <button
                onClick={() => onOpenConsultation()}
                className="w-full bg-[#0A192F] hover:bg-[#142A4A] text-white font-extrabold text-xs sm:text-sm py-3 sm:py-3.5 px-6 rounded-xl sm:rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Request Feasibility Study for Your State</span>
                <ArrowRight className="w-4 h-4 text-[#F5A623] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

          {/* MOBILE ONLY: Installation Hubs at bottom of section (Mobile order-4) */}
          <div className="block lg:hidden col-span-1 order-3 mt-1">
            <div className="px-4 py-3 rounded-2xl bg-[#F8FAFC] border border-[#DCEAF2]">
              <span className="font-extrabold uppercase tracking-wider text-[#0A192F] text-[10.5px] block mb-1">
                VERIFIED INSTALLATION HUBS:
              </span>
              <p className="text-xs text-[#5A6E85] font-medium leading-relaxed">
                {verifiedHubs.join(' · ')}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

