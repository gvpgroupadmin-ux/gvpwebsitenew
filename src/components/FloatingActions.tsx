import React from 'react';
import { MessageCircle, Phone, Calculator, ArrowUp, Send } from 'lucide-react';
import { COMPANY_INFO } from '../data/solarData';

interface FloatingActionsProps {
  onOpenCalculator: () => void;
  onOpenConsultation: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  onOpenCalculator,
  onOpenConsultation,
}) => {
  const [showScrollTop, setShowScrollTop] = React.useState(false);
  const [showMobileBar, setShowMobileBar] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setShowScrollTop(y > 400);
      setShowMobileBar(y > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = `https://wa.me/917665165666?text=${encodeURIComponent(
    'Hello GVP Solar, I would like to schedule a free solar site feasibility survey for my premise.'
  )}`;

  const phoneTel = `tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`;

  return (
    <>
      {/* Desktop & Tablet Floating Actions (Hidden on mobile when mobile bar is active) */}
      <aside aria-label="Quick Actions" className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        {/* Scroll to top */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-md text-[#0A192F] border border-[#DCEAF2] shadow-md flex items-center justify-center hover:bg-white transition-all hover:scale-105 cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        {/* Instant Calculator Pill - Desktop/Tablet */}
        <button
          onClick={onOpenCalculator}
          aria-label="Open solar savings calculator"
          className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md text-[#0A192F] border border-[#DCEAF2] px-3.5 py-2 rounded-full shadow-md hover:bg-[#F0F7FD] transition-all hover:scale-102 text-xs font-bold cursor-pointer"
        >
          <Calculator className="w-3.5 h-3.5 text-[#0284C7]" />
          <span>Solar ROI Calc</span>
        </button>

        {/* WhatsApp Action Button - Desktop/Tablet (and mobile before scroll) */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className={`group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20BA59] text-white px-4 py-2.5 rounded-full shadow-lg shadow-[#25D366]/30 transition-all hover:scale-105 ${
            showMobileBar ? 'hidden sm:flex' : 'flex'
          }`}
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span className="text-xs font-extrabold tracking-wide hidden sm:inline">
            WhatsApp Audit
          </span>
        </a>
      </aside>

      {/* Subtle Persistent Mobile Conversion Dock (Mobile Only) */}
      {showMobileBar && (
        <div
          role="region"
          aria-label="Mobile quick contact actions"
          className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#DCEAF2] px-3 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center justify-between gap-2 transition-all duration-300 animate-slide-up"
          style={{ paddingBottom: 'max(0.625rem, env(safe-area-inset-bottom))' }}
        >
          {/* Quick Call */}
          <a
            href={phoneTel}
            aria-label="Call GVP Solar engineer"
            className="flex-1 py-2 px-2.5 rounded-xl border border-[#DCEAF2] bg-[#F8FAFC] active:bg-[#EAF2F8] text-[#0A192F] flex items-center justify-center gap-1.5 transition-colors text-xs font-bold"
          >
            <Phone className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>Call</span>
          </a>

          {/* Quick WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp with GVP Solar"
            className="flex-1 py-2 px-2.5 rounded-xl bg-[#25D366] active:bg-[#20BA59] text-white flex items-center justify-center gap-1.5 transition-colors text-xs font-bold shadow-xs"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>WhatsApp</span>
          </a>

          {/* Get a Quote */}
          <button
            onClick={onOpenConsultation}
            aria-label="Get a free solar quote"
            className="flex-1.2 py-2 px-3 rounded-xl bg-[#F5A623] active:bg-[#E59819] text-[#0A192F] flex items-center justify-center gap-1.5 transition-colors text-xs font-extrabold shadow-xs cursor-pointer"
          >
            <Send className="w-3 h-3 text-[#0A192F]" />
            <span>Get Quote</span>
          </button>
        </div>
      )}
    </>
  );
};
