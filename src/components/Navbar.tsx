import React, { useState } from 'react';
import { Menu, X, Lock } from 'lucide-react';

interface NavbarProps {
  onOpenConsultation: () => void;
  onOpenCalculator: () => void;
  isVisible?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenConsultation,
  onOpenCalculator,
  isVisible = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Our Mission', href: '#mission' },
    { label: 'Projects', href: '#projects' },
    { label: 'Calculator', href: '#calculator' },
    { label: 'Knowledge Hub', href: '#knowledge-hub' },
    { label: 'About Us', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 h-16 sm:h-[68px] flex items-center bg-white/95 md:bg-white/90 backdrop-blur-md border-b border-black/5 shadow-xs transition-all duration-300 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-3 pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between w-full">
        
        {/* Brand Logo - Official GVP Solar Logo & Name */}
        <a href="#home" className="flex items-center gap-2 sm:gap-2.5 md:gap-3 group py-0.5" aria-label="GVP Solar Energy Home">
          <img
            src="/gvp-logo.png"
            srcSet="/gvp-logo.png 1x, /gvp-logo@2x.png 2x"
            alt="GVP Solar Energy - Solar Energy for Better Tomorrow"
            className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105 shrink-0"
          />
          <span className="font-extrabold text-[#000000] tracking-tight text-xs sm:text-sm md:text-base leading-tight uppercase font-sans select-none whitespace-nowrap">
            GVP SOLAR ENERGY
          </span>
        </a>

        {/* Center Navigation Links - Editorial & refined */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[13px] font-medium text-[#64748B] hover:text-[#0A192F] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA Button - Solar Gold Pill */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenConsultation}
            className="bg-[#F5A623] hover:bg-[#E59819] text-[#0A192F] font-semibold text-xs sm:text-[13px] px-5 py-2 rounded-full transition-all shadow-xs"
          >
            Get a Quote
          </button>
        </div>

        {/* Mobile menu hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#0A192F] hover:bg-neutral-100 rounded-lg transition-colors"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full inset-x-0 bg-white border-b border-neutral-200 px-4 pt-2 pb-5 space-y-2 shadow-lg animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-[#475569] hover:bg-[#F8FAFC] rounded-lg"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full bg-[#F5A623] text-[#0A192F] font-semibold text-sm py-2.5 rounded-full"
            >
              Get a Quote
            </button>
          </div>
          <div className="pt-2 border-t border-slate-100">
            <a
              href="/cfladmin"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                window.history.pushState({}, '', '/cfladmin');
                window.dispatchEvent(new PopStateEvent('popstate'));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-500 hover:text-[#0284C7] hover:bg-[#F8FAFC] rounded-lg cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-[#F5A623]" />
              <span>Admin Login Portal</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
