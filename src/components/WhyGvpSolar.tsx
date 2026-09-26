import React from 'react';
import { Sun, TrendingDown, FileCheck, Award, ShieldAlert, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { WHY_CHOOSE_US, COMPANY_INFO } from '../data/solarData';

interface WhyGvpSolarProps {
  onOpenConsultation: () => void;
}

export const WhyGvpSolar: React.FC<WhyGvpSolarProps> = ({ onOpenConsultation }) => {
  const iconMap: Record<string, React.ReactNode> = {
    Sun: <Sun className="w-5 h-5 text-[#0284C7] group-hover:text-white transition-colors" />,
    TrendingDown: <TrendingDown className="w-5 h-5 text-[#0284C7] group-hover:text-white transition-colors" />,
    FileCheck: <FileCheck className="w-5 h-5 text-[#0284C7] group-hover:text-white transition-colors" />,
    Award: <Award className="w-5 h-5 text-[#0284C7] group-hover:text-white transition-colors" />,
    ShieldAlert: <ShieldAlert className="w-5 h-5 text-[#0284C7] group-hover:text-white transition-colors" />,
    Clock: <Clock className="w-5 h-5 text-[#0284C7] group-hover:text-white transition-colors" />,
  };

  return (
    <section id="why-us" className="py-20 sm:py-28 bg-[#FFFFFF] relative overflow-hidden border-t border-[#EAF2F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#F0F7FD] border border-[#DCEAF2] px-3.5 py-1.5 rounded-full mb-4">
              <Award className="w-3.5 h-3.5 text-[#0284C7]" />
              <span className="text-[12px] font-bold uppercase tracking-wider text-[#0284C7]">
                THE GVP SOLAR STANDARD
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-[-0.03em] leading-[1.14] text-[#0A192F]">
              Engineered for Maharashtra’s <br />
              Toughest Industrial Demands.
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm text-[#5A6E85] leading-relaxed mb-4">
              With 13+ years and over 500 installations across Ichalkaranji, Kolhapur, Sangli, and Solapur, 
              we combine civil precision, top-tier electrical safety, and seamless government sanctioning.
            </p>
            <button
              onClick={onOpenConsultation}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#0284C7] hover:text-[#0369A1] group"
            >
              <span>Schedule an In-Person Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F5A623] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* 6-Card Apple-Grade Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US.map((item, index) => (
            <div
              key={item.title}
              className="group p-8 rounded-3xl bg-[#F8FAFC] border border-[#DCEAF2] hover:border-[#0284C7]/40 hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#DCEAF2] flex items-center justify-center mb-6 shadow-xs group-hover:bg-[#0284C7] transition-colors">
                  {iconMap[item.icon]}
                </div>
                <h3 className="text-lg font-bold text-[#0A192F] mb-2 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5A6E85] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#EAF2F8] flex items-center justify-between text-xs text-[#0284C7] font-semibold">
                <span>Pillar 0{index + 1}</span>
                <CheckCircle2 className="w-4 h-4 text-[#0284C7]" />
              </div>
            </div>
          ))}
        </div>

        {/* Highlight quote banner */}
        <div className="mt-12 bg-[#0A192F] rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-[#142A4A]">
          <div className="max-w-2xl">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#F5A623] block mb-2">
              LOCAL PRESENCE & RAPID SUPPORT
            </span>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-snug text-white">
              Headquartered right in Kapad Market, Ichalkaranji.
            </h3>
            <p className="text-xs sm:text-sm text-white/80 mt-2">
              Unlike out-of-state aggregators, our certified engineers and rapid maintenance vehicles are stationed locally 
              for immediate same-day site visits and proactive preventive care.
            </p>
          </div>
          <button
            onClick={onOpenConsultation}
            className="shrink-0 bg-[#0284C7] hover:bg-[#0369A1] text-white font-extrabold text-xs sm:text-sm px-7 py-3.5 rounded-full transition-all shadow-md flex items-center gap-2 group"
          >
            <span>Book Site Assessment</span>
            <ArrowRight className="w-4 h-4 text-[#F5A623] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
