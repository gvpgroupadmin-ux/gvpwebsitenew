import React, { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MissionSection } from './components/MissionSection';
import { TrustedClientsMarquee } from './components/TrustedClientsMarquee';
import { LandmarkProjectsSection } from './components/LandmarkProjectsSection';
import { GeographicPresenceSection } from './components/GeographicPresenceSection';
import { SolarSavingsCalculator } from './components/SolarSavingsCalculator';
import { WhyGvpSolar } from './components/WhyGvpSolar';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AboutSection } from './components/AboutSection';
import { SolarKnowledgeHub } from './components/SolarKnowledgeHub';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectShowcaseModal } from './components/ProjectShowcaseModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { ConsultationModal } from './components/ConsultationModal';
import { FloatingActions } from './components/FloatingActions';
import { AdminLeadsDashboard } from './components/AdminLeadsDashboard';
import { Project } from './types';
import { NOTABLE_PROJECTS, findOrMapProject } from './data/solarData';

export default function App() {
  // Check for admin route: /cfladmin, /admin, /login (or hash variants)
  const checkIsAdmin = () => {
    const path = window.location.pathname.toLowerCase().replace(/\/$/, '');
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    return (
      path === '/cfladmin' ||
      path.startsWith('/cfladmin') ||
      path === '/admin' ||
      path.startsWith('/admin') ||
      path === '/login' ||
      path.startsWith('/login') ||
      path === '/admin-login' ||
      path === '/cfl-admin' ||
      hash === '#cfladmin' ||
      hash === '#admin' ||
      hash === '#login' ||
      hash === '#admin-login' ||
      hash.includes('cfladmin') ||
      hash.includes('admin') ||
      hash.includes('login') ||
      search.includes('admin') ||
      search.includes('login')
    );
  };

  const [isAdminRoute, setIsAdminRoute] = useState(checkIsAdmin);

  React.useEffect(() => {
    const handleRouteChange = () => {
      setIsAdminRoute(checkIsAdmin());
    };

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []);

  if (isAdminRoute) {
    return (
      <>
        <AdminLeadsDashboard />
        <Analytics />
      </>
    );
  }
  // Modal states
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [consultationPrefill, setConsultationPrefill] = useState<{
    type?: string;
    bill?: number;
    capacity?: number;
  } | null>(null);

  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  const [navbarVisible, setNavbarVisible] = useState(false);

  // Quick inquiry toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleOpenConsultation = (details?: { type: string; bill: number; capacity: number }) => {
    if (details) {
      setConsultationPrefill(details);
    } else {
      setConsultationPrefill(null);
    }
    setConsultationOpen(true);
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setProjectModalOpen(true);
  };

  const handleSelectProjectByName = (projectName: string) => {
    const mapped = findOrMapProject(projectName);
    setSelectedProject(mapped);
    setProjectModalOpen(true);
  };

  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setServiceModalOpen(true);
  };

  const handleQuickInquiry = (contact: string) => {
    triggerToast(
      `Thank you! Quick solar audit initiated for ${contact}. Our Ichalkaranji team will contact you within 4 hours.`
    );
  };

  const scrollToCalculator = () => {
    const el = document.getElementById('calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#0A192F] flex flex-col font-sans selection:bg-[#F5A623]/25 selection:text-[#0A192F]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#0A192F] text-white px-6 py-3 rounded-full shadow-2xl border border-[#F5A623]/30 text-xs sm:text-sm font-semibold flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-[#F5A623] animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar - Initially hidden, reveals at 85%+ of cinematic intro */}
      <Navbar
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenCalculator={scrollToCalculator}
        isVisible={navbarVisible}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Cinematic Scroll-Driven Hero Section */}
        <HeroSection
          onOpenConsultation={() => handleOpenConsultation()}
          onQuickInquiry={handleQuickInquiry}
          onProgressChange={(progress) => {
            setNavbarVisible(progress >= 0.74);
          }}
        />

        {/* Section 2: Our Mission matching the 3 tall vertical cards */}
        <MissionSection
          onExploreProjects={() => setProjectModalOpen(true)}
          onOpenConsultation={() => handleOpenConsultation()}
          onSelectService={handleSelectService}
        />

        {/* Section 3: Trusted By Client Marquee */}
        <TrustedClientsMarquee onSelectProjectName={handleSelectProjectByName} />

        {/* Section 4: Landmark Projects & Signature Project Showcase */}
        <LandmarkProjectsSection
          onViewAllProjects={() => setProjectModalOpen(true)}
          onSelectProject={handleSelectProject}
          onOpenCalculator={scrollToCalculator}
          onOpenConsultation={handleOpenConsultation}
        />

        {/* Section 4B: Geographic Presence & Expansion (Maharashtra & Rajasthan) */}
        <GeographicPresenceSection
          onOpenConsultation={handleOpenConsultation}
        />

        {/* Section 5: Interactive Solar ROI & Subsidy Calculator */}
        <SolarSavingsCalculator onOpenConsultation={handleOpenConsultation} />

        {/* Section 6: Engineering Pillars & Why GVP Solar */}
        <WhyGvpSolar onOpenConsultation={() => handleOpenConsultation()} />

        {/* Section 6B: Verified Industrial Customer Testimonials & Social Proof */}
        <TestimonialsSection onOpenConsultation={() => handleOpenConsultation()} />

        {/* Section 7: Company Story & Ichalkaranji Heritage */}
        <AboutSection onOpenConsultation={() => handleOpenConsultation()} />

        {/* Section 7B: AEO Technical Knowledge Hub & Subsidy Matrix */}
        <SolarKnowledgeHub
          onOpenConsultation={handleOpenConsultation}
          onOpenCalculator={scrollToCalculator}
        />

        {/* Section 8: Direct Contact & Feasibility Booking */}
        <ContactSection />
      </main>

      {/* Corporate Footer */}
      <Footer
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenCalculator={scrollToCalculator}
      />

      {/* Floating Action Controls */}
      <FloatingActions
        onOpenCalculator={scrollToCalculator}
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* Interactive Modals */}
      <ProjectShowcaseModal
        isOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
        initialProject={selectedProject}
        onOpenConsultation={() => handleOpenConsultation()}
      />

      <ServiceDetailModal
        isOpen={serviceModalOpen}
        onClose={() => setServiceModalOpen(false)}
        serviceId={selectedServiceId}
        onOpenConsultation={() => handleOpenConsultation()}
      />

      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
        prefillData={consultationPrefill}
      />

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}
