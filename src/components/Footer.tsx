import React from 'react';
import { Phone, Mail, Globe, MapPin, ArrowUpRight, ShieldCheck, Heart } from 'lucide-react';
import { COMPANY_INFO, CLIENT_LOGOS } from '../data/solarData';

interface FooterProps {
  onOpenConsultation: () => void;
  onOpenCalculator: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConsultation, onOpenCalculator }) => {
  return (
    <footer className="bg-[#0A192F] text-white/90 pt-16 pb-12 border-t border-[#142A4A] relative overflow-hidden">
      {/* Decorative ambient gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0284C7]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          
          {/* Brand info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-block bg-white px-3.5 py-2 rounded-xl shadow-sm border border-[#DCEAF2]">
              <img
                src="/gvp-logo.png"
                srcSet="/gvp-logo.png 1x, /gvp-logo@2x.png 2x"
                alt="GVP Solar Energy - Solar Energy for Better Tomorrow"
                className="h-10 w-auto object-contain"
              />
            </div>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-sm">
              Premier solar EPC and rooftop installation company headquartered in Ichalkaranji, Maharashtra. 
              Over 13 years of engineering excellence, 500+ completed installations, and 18+ MW commissioned 
              across Maharashtra's industrial belt.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onOpenConsultation}
                className="bg-[#0284C7] hover:bg-[#0369A1] text-white font-extrabold text-xs px-5 py-2.5 rounded-full transition-all shadow-sm flex items-center gap-1.5 group"
              >
                <span>Free Rooftop Audit</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#F5A623] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={onOpenCalculator}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-4 py-2.5 rounded-full transition-colors border border-white/10"
              >
                ROI Calculator
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#0284C7]">
              SOLUTIONS & EPC
            </h4>
            <ul className="space-y-2 text-xs text-white/75 font-medium">
              <li>
                <a href="#mission" className="hover:text-white transition-colors">
                  Commercial & Industrial (C&I)
                </a>
              </li>
              <li>
                <a href="#mission" className="hover:text-white transition-colors">
                  Textile Shed Solar Rooftop
                </a>
              </li>
              <li>
                <a href="#mission" className="hover:text-white transition-colors">
                  Residential PM Surya Ghar
                </a>
              </li>
              <li>
                <a href="#mission" className="hover:text-white transition-colors">
                  Turnkey EPC & Liaisoning
                </a>
              </li>
              <li>
                <a href="#knowledge-hub" className="hover:text-white transition-colors text-[#F5A623]">
                  Solar Cost &amp; Subsidy Guide
                </a>
              </li>
              <li>
                <a href="#mission" className="hover:text-white transition-colors">
                  MSEDCL Net Metering &amp; CEIG
                </a>
              </li>
              <li>
                <a href="#mission" className="hover:text-white transition-colors">
                  25-Year Operation &amp; Maintenance
                </a>
              </li>
            </ul>
          </div>

          {/* Landmark Projects */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#0284C7]">
              KEY INSTALLATIONS
            </h4>
            <ul className="space-y-2 text-xs text-white/75 font-medium">
              <li>
                <a href="#projects" className="text-white font-bold flex items-center gap-1.5 hover:text-[#0284C7] transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
                  <span>Arvind Group (1.4 MW)</span>
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Fibrosa Industry (850 kW, Nandurbar)
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Kesare Textile Ind (580 kW)
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Maruti Ropes (400 kW, Barshi)
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Sanskar Group (510 kW)
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Shri Ram Group (380 kW)
                </a>
              </li>
            </ul>
          </div>

          {/* Regional Operations & Contact Details */}
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#0284C7] mb-2">
                MAHARASHTRA OPERATIONS
              </h4>
              <p className="text-xs font-bold text-white mb-1">GVP Solar Energy</p>
              <div className="space-y-1.5 text-xs text-white/75">
                <p className="flex items-start gap-1.5 leading-relaxed">
                  <MapPin className="w-3.5 h-3.5 text-[#F5A623] shrink-0 mt-0.5" />
                  <span>{COMPANY_INFO.address}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-[#0284C7] shrink-0" />
                  <a href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`} className="hover:text-white font-semibold">
                    {COMPANY_INFO.phoneFormatted}
                  </a>
                </p>
                <p className="flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-[#0284C7] shrink-0" />
                  <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white">
                    {COMPANY_INFO.email}
                  </a>
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#F5A623] mb-1">
                RAJASTHAN OPERATIONS
              </h4>
              <p className="text-xs font-bold text-white mb-0.5">GVP Solar Energy Private Limited</p>
              <p className="text-[11px] text-white/60">
                Operations handled by: <strong className="text-white/80">Vrushabh Dhoot</strong>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0284C7]" />
            <span>
              Approved Solar EPC &bull; Maharashtra &amp; Rajasthan Presence &bull; 13+ Years of Clean Energy Delivery
            </span>
          </div>

          <div className="text-center sm:text-right">
            <span>&copy; {new Date().getFullYear()} GVP Solar Energy &bull; GVP Solar Energy Private Limited. All rights reserved.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
