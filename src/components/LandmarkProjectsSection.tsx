import React, { useMemo } from 'react';
import { ArrowRight, MapPin, Zap, Building2, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { NOTABLE_PROJECTS, COMPANY_INFO } from '../data/solarData';
import { Project } from '../types';

interface LandmarkProjectsSectionProps {
  onViewAllProjects: () => void;
  onSelectProject: (project: Project) => void;
  onOpenCalculator?: () => void;
  onOpenConsultation?: (details?: { type: string; bill: number; capacity: number }) => void;
}

export const LandmarkProjectsSection: React.FC<LandmarkProjectsSectionProps> = ({
  onViewAllProjects,
  onSelectProject,
}) => {
  // Dynamically derive the exactly 3 highest-capacity projects from the single source of truth
  const topProjects = useMemo(() => {
    return [...NOTABLE_PROJECTS]
      .sort((a, b) => (b.capacityKw || 0) - (a.capacityKw || 0))
      .slice(0, 3);
  }, []);

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 bg-[#FFFFFF] relative overflow-hidden border-t border-[#EAF2F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Total Count */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#F0F7FD] border border-[#DCEAF2] px-3.5 py-1.5 rounded-full mb-3">
              <Zap className="w-3.5 h-3.5 text-[#0284C7]" />
              <span className="text-[12px] font-bold uppercase tracking-wider text-[#0284C7]">
                LANDMARK PROJECTS
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold tracking-[-0.03em] leading-tight text-[#0A192F]">
              Engineering High-Capacity Solar EPC
            </h2>
          </div>

          {/* Dynamic Project Count Badge & Top 'View All Projects' Link */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-[#F8FAFC] border border-[#DCEAF2] px-3.5 py-1.5 rounded-full text-xs font-bold text-[#0A192F]">
              <span className="w-2 h-2 rounded-full bg-[#F5A623] animate-pulse" />
              <span>{COMPANY_INFO.completedInstallations} Installations</span>
            </span>

            <button
              onClick={onViewAllProjects}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#0284C7] hover:text-[#0369A1] transition-colors cursor-pointer group"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F5A623] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3 PROJECT PREVIEW CARDS (Desktop 3-Column Layout, Mobile Responsive) */}
        {/* Dynamically sorted by numeric capacity descending, Arvind Group first */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {topProjects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-[#DCEAF2] shadow-[0_4px_20px_-4px_rgba(2,132,199,0.06)] hover:border-[#0284C7] hover:shadow-[0_16px_40px_-10px_rgba(2,132,199,0.16)] transition-all duration-300 cursor-pointer hover:-translate-y-1.5"
            >
              {/* Project Image & Overlay Badges */}
              <div className="relative h-52 sm:h-56 overflow-hidden bg-neutral-100">
                <img
                  src={project.image}
                  alt={`${project.name} Solar EPC Project`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/70 via-transparent to-transparent" />

                {/* Top-Left: Highlight / Category Pill */}
                <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md text-[#0284C7] border border-[#DCEAF2] px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider shadow-xs">
                  {project.highlightTag || project.category}
                </div>

                {/* Top-Right: Capacity Badge */}
                <div className="absolute top-3.5 right-3.5 bg-[#0A192F]/90 backdrop-blur-md text-white border border-white/20 px-3 py-1 rounded-full text-xs font-black tracking-tight shadow-md flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] animate-pulse" />
                  <span>{project.capacity}</span>
                </div>

                {/* Bottom on Image: Location overlay */}
                <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center gap-1.5 text-xs text-white font-medium drop-shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-[#F5A623] shrink-0" />
                  <span className="line-clamp-1">{project.location}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between bg-white">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0284C7] bg-[#F0F7FD] px-2.5 py-0.5 rounded-full border border-[#DCEAF2]">
                      {project.category} Solar EPC
                    </span>
                    {index === 0 && (
                      <span className="text-[10px] font-bold text-[#F5A623] bg-[#FFF9E6] border border-[#F5A623]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" /> Highest Capacity
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-black text-[#0A192F] group-hover:text-[#0284C7] transition-colors tracking-tight line-clamp-1 mb-2">
                    {project.name}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-[#5A6E85] leading-relaxed line-clamp-2 mb-4 font-normal">
                    {project.description}
                  </p>

                  {/* Highlights / Specs */}
                  <div className="space-y-1.5 mb-5 text-[11px] text-[#334E68]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7] shrink-0" />
                      <span>
                        {project.annualSavings
                          ? <>Est. Annual Savings: <strong className="text-[#0284C7]">{project.annualSavings}</strong></>
                          : <>High-Yield Industrial Captive Power Generation</>}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#0284C7] shrink-0" />
                      <span>MSEDCL HT Substation &amp; CEIG Approved</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-3.5 border-t border-[#EAF2F8] flex items-center justify-between">
                  <span className="text-xs font-black text-[#0A192F]">
                    {project.capacity} <span className="font-normal text-[#5A6E85]">System</span>
                  </span>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0284C7] group-hover:text-[#0369A1] transition-colors">
                    <span>View Project</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#F5A623] group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Portfolio Bar with 'View All Projects' */}
        <div className="mt-10 sm:mt-12 p-6 sm:p-8 bg-[#F8FAFC] rounded-3xl border border-[#DCEAF2] flex flex-col md:flex-row items-center justify-between gap-5 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#F0F7FD] border border-[#DCEAF2] flex items-center justify-center text-[#0284C7] shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-extrabold text-[#0A192F]">
                Complete Verified Project Directory
              </h4>
              <p className="text-xs text-[#5A6E85] mt-0.5">
                Explore {COMPANY_INFO.completedInstallations} solar EPC projects across textile clusters, heavy engineering MIDCs &amp; commercial hubs.
              </p>
            </div>
          </div>

          <button
            onClick={onViewAllProjects}
            className="w-full md:w-auto bg-[#0A192F] hover:bg-[#142A4A] text-white text-xs sm:text-sm font-bold px-7 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer shrink-0"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4 text-[#F5A623] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
