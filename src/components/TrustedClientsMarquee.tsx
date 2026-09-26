import React from 'react';
import { CLIENT_LOGOS } from '../data/solarData';
import { ShieldCheck, Award, Zap } from 'lucide-react';

interface TrustedClientsMarqueeProps {
  onSelectProjectName?: (projectName: string) => void;
}

export const TrustedClientsMarquee: React.FC<TrustedClientsMarqueeProps> = ({ onSelectProjectName }) => {
  return (
    <section className="py-12 bg-[#F8FAFC] border-y border-[#EAF2F8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#5A6E85]">
              TRUSTED BY 500+ ENTERPRISES ACROSS MAHARASHTRA
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-[#0284C7]">
            <span className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#0284C7]" /> 13+ Years Experience
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#0284C7]" /> 18+ MW Installed
            </span>
          </div>
        </div>
      </div>

      {/* Marquee ticker */}
      <div className="relative w-full overflow-hidden mask-fade">
        <div className="flex items-center gap-6 animate-marquee whitespace-nowrap">
          {/* Double the list for infinite seamless marquee */}
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              onClick={() => onSelectProjectName && onSelectProjectName(client.name)}
              className="inline-flex items-center gap-3 bg-white hover:bg-[#F0F7FD] px-5 py-3 rounded-2xl border border-[#DCEAF2] shadow-xs cursor-pointer transition-all hover:scale-102 hover:border-[#0284C7]/50"
            >
              <div className="w-7 h-7 rounded-lg bg-[#F0F7FD] border border-[#DCEAF2] flex items-center justify-center text-[#0284C7] font-black text-xs">
                {client.name.charAt(0)}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-bold text-[#0A192F] tracking-tight">
                  {client.name}
                </span>
                <div className="flex items-center gap-2 text-[11px] text-[#5A6E85]">
                  <span className="font-extrabold text-[#0284C7] bg-[#F0F7FD] border border-[#DCEAF2] px-1.5 py-0.2 rounded">
                    {client.capacity}
                  </span>
                  <span>• {client.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
