import React from 'react';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { CORE_SERVICES } from '../data/solarData';
import { ServiceItem } from '../types';

interface ServiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId: string | null;
  onOpenConsultation: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  isOpen,
  onClose,
  serviceId,
  onOpenConsultation,
}) => {
  if (!isOpen || !serviceId) return null;

  const service = CORE_SERVICES.find((s) => s.id === serviceId) || CORE_SERVICES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#DFEADE] overflow-hidden my-auto">
        
        {/* Header */}
        <div className="relative h-48 sm:h-56">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-[10px] font-extrabold uppercase tracking-widest bg-[#0284C7] text-white px-2.5 py-0.5 rounded-full inline-block mb-1.5">
              GVP Solar Specialized EPC
            </span>
            <h3 className="text-xl sm:text-2xl font-black">{service.title}</h3>
            <p className="text-xs text-white/80 mt-0.5">{service.subtitle}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <p className="text-sm text-[#5A6E85] leading-relaxed">
            {service.description}
          </p>

          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#0284C7] mb-3">
              KEY TECHNICAL CAPABILITIES & DELIVERABLES
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.features.map((feat) => (
                <div key={feat} className="flex items-start gap-2.5 text-xs text-[#334E68]">
                  <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#DCEAF2]">
            <span className="text-[11px] font-bold text-[#5A6E85] uppercase tracking-wider block mb-1">
              BEST SUITED FOR
            </span>
            <p className="text-xs text-[#0A192F] font-semibold">
              {service.idealFor}
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#EAF2F8]">
            <span className="text-xs text-[#5A6E85]">
              Ready to verify solar viability for your site?
            </span>
            <button
              onClick={() => {
                onClose();
                onOpenConsultation();
              }}
              className="w-full sm:w-auto bg-[#0A192F] hover:bg-[#142A4A] text-white font-bold text-xs px-6 py-3 rounded-full transition-all flex items-center justify-center gap-2 group"
            >
              <span>Get Feasibility Proposal</span>
              <ArrowRight className="w-4 h-4 text-[#F5A623] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
