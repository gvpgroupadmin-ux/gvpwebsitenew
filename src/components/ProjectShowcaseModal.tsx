import React, { useState, useEffect, useMemo } from 'react';
import { X, MapPin, ShieldCheck, ArrowRight, Building2, Zap, CheckCircle2, Search } from 'lucide-react';
import { NOTABLE_PROJECTS, VERIFIED_CLIENT_RECORDS, findOrMapProject } from '../data/solarData';
import { Project } from '../types';

interface ProjectShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProject?: Project | null;
  onOpenConsultation: () => void;
}

export const ProjectShowcaseModal: React.FC<ProjectShowcaseModalProps> = ({
  isOpen,
  onClose,
  initialProject,
  onOpenConsultation,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<'All' | 'Maharashtra' | 'Rajasthan'>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProject, setActiveProject] = useState<Project>(() => {
    return initialProject ? findOrMapProject(initialProject) : NOTABLE_PROJECTS[0];
  });

  // Sync when initialProject changes
  useEffect(() => {
    if (initialProject) {
      setActiveProject(findOrMapProject(initialProject));
    }
  }, [initialProject]);

  const categories = ['All', 'Industrial', 'Textile', 'Manufacturing', 'Commercial'];

  // Combine notable projects and verified clients for complete client coverage
  const allAvailableProjects: Project[] = useMemo(() => {
    return [
      ...NOTABLE_PROJECTS,
      ...VERIFIED_CLIENT_RECORDS
        .filter((rec) => !NOTABLE_PROJECTS.some((p) => p.name.toLowerCase() === rec.name.toLowerCase()))
        .map((rec) => findOrMapProject(rec)),
    ];
  }, []);

  const filteredProjects = useMemo(() => {
    return allAvailableProjects.filter((p) => {
      // Region match
      if (selectedRegion !== 'All' && p.region && p.region !== selectedRegion) {
        return false;
      }
      // Category match
      if (selectedCategory !== 'All' && p.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.capacity.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [allAvailableProjects, selectedRegion, selectedCategory, searchQuery]);

  // Check which metrics exist to avoid displaying static or fake values
  const hasSavings = Boolean(activeProject.annualSavings);
  const hasCO2 = Boolean(activeProject.co2Offset);
  const hasModules = Boolean(activeProject.modules);
  const hasInverter = Boolean(activeProject.inverter);
  const hasAnySpec = hasSavings || hasCO2 || hasModules || hasInverter;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-[#DCEAF2] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 border-b border-[#EAF2F8] bg-[#F8FAFC] shrink-0">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7] animate-pulse" />
            <h3 className="font-extrabold text-[#0A192F] text-sm sm:text-base md:text-lg">
              Project Network &amp; Client Directory
            </h3>
            <span className="text-[11px] bg-[#F0F7FD] border border-[#DCEAF2] text-[#0284C7] font-bold px-2 py-0.5 rounded-full hidden sm:inline-block">
              {allAvailableProjects.length} Verified Installations
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="px-5 sm:px-6 py-2.5 sm:py-3 border-b border-[#EAF2F8] bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shrink-0">
          {/* Region & Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {/* Region Filter */}
            <div className="flex items-center gap-1 bg-[#F0F7FD] p-0.5 rounded-xl border border-[#DCEAF2]">
              {(['All', 'Maharashtra', 'Rajasthan'] as const).map((reg) => (
                <button
                  key={reg}
                  onClick={() => setSelectedRegion(reg)}
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    selectedRegion === reg
                      ? 'bg-[#0A192F] text-white shadow-xs'
                      : 'text-[#5A6E85] hover:text-[#0A192F]'
                  }`}
                >
                  {reg === 'All' ? 'All Regions' : reg}
                </button>
              ))}
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#0284C7] text-white shadow-xs'
                      : 'bg-white text-[#5A6E85] border border-[#DCEAF2] hover:bg-[#F0F7FD]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-56 shrink-0">
            <Search className="w-3.5 h-3.5 text-[#7E92A2] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search client, city, kW..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-full border border-[#DCEAF2] text-xs font-medium text-[#0A192F] bg-[#F8FAFC] focus:bg-white focus:outline-none focus:border-[#0284C7] transition-all"
            />
          </div>
        </div>

        {/* Modal Body: Responsive Layout (Single column on mobile, Two columns on md+) */}
        <div className="flex flex-col md:grid md:grid-cols-12 flex-1 overflow-y-auto md:overflow-hidden">
          
          {/* Projects List: On mobile horizontal or compact scrollable list, on md+ 4 cols */}
          <div className="order-1 md:col-span-4 border-b md:border-b-0 md:border-r border-[#EAF2F8] overflow-y-auto max-h-[190px] md:max-h-[580px] p-2.5 sm:p-3 space-y-2 bg-[#F8FAFC] shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7E92A2] block px-1">
              Select Client ({filteredProjects.length})
            </span>
            {filteredProjects.map((proj) => {
              const isSelected = activeProject.id === proj.id;
              return (
                <div
                  key={proj.id}
                  onClick={() => setActiveProject(proj)}
                  className={`p-2.5 sm:p-3 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-[#F0F7FD] border-[#0284C7] shadow-xs ring-1 ring-[#0284C7]/30'
                      : 'bg-white border-[#DCEAF2] hover:border-[#0284C7]/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#0A192F] line-clamp-1">
                      {proj.name}
                    </span>
                    <span className="text-[11px] font-black text-[#0284C7] bg-[#F0F7FD] border border-[#DCEAF2] px-1.5 py-0.5 rounded shrink-0 ml-1">
                      {proj.capacity}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-[#5A6E85]">
                    <MapPin className="w-3 h-3 text-[#0284C7] shrink-0" />
                    <span className="line-clamp-1">{proj.location}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Project Details: On mobile appears directly below, on md+ 8 cols */}
          <div className="order-2 md:col-span-8 overflow-y-auto p-4 sm:p-6 md:p-8 flex flex-col justify-between bg-white">
            <div>
              {/* Photo & Header */}
              <div className="relative aspect-video sm:h-64 md:h-72 w-full rounded-2xl overflow-hidden mb-5 shadow-sm border border-[#DCEAF2] bg-neutral-100">
                <img
                  src={activeProject.image}
                  alt={activeProject.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/85 via-transparent to-transparent" />
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white flex items-end justify-between gap-2">
                  <div>
                    <span className="bg-[#0284C7] text-white font-extrabold text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1 inline-block">
                      {activeProject.highlightTag || activeProject.category}
                    </span>
                    <h2 className="text-lg sm:text-2xl font-black tracking-tight leading-tight">
                      {activeProject.name}
                    </h2>
                    <p className="text-[11px] sm:text-xs text-white/90 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#F5A623] shrink-0" />
                      <span>{activeProject.location}</span>
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] sm:text-xs text-white/70 block">Capacity</span>
                    <span className="text-lg sm:text-2xl font-black text-white">{activeProject.capacity}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#5A6E85] leading-relaxed mb-5 font-medium">
                {activeProject.description}
              </p>

              {/* Technical Specifications Grid - ONLY show verified metrics */}
              {hasAnySpec && (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 mb-5">
                  {hasSavings && (
                    <div className="p-2.5 sm:p-3 rounded-xl bg-[#F8FAFC] border border-[#DCEAF2]">
                      <span className="text-[10px] uppercase font-bold text-[#5A6E85] block">Est. Savings</span>
                      <span className="text-xs sm:text-sm font-extrabold text-[#0284C7]">{activeProject.annualSavings}</span>
                    </div>
                  )}
                  {hasCO2 && (
                    <div className="p-2.5 sm:p-3 rounded-xl bg-[#F8FAFC] border border-[#DCEAF2]">
                      <span className="text-[10px] uppercase font-bold text-[#5A6E85] block">CO2 Offset</span>
                      <span className="text-xs sm:text-sm font-extrabold text-[#0A192F]">{activeProject.co2Offset}</span>
                    </div>
                  )}
                  {hasModules && (
                    <div className="p-2.5 sm:p-3 rounded-xl bg-[#F8FAFC] border border-[#DCEAF2]">
                      <span className="text-[10px] uppercase font-bold text-[#5A6E85] block">Solar Modules</span>
                      <span className="text-[11px] sm:text-xs font-bold text-[#0A192F] line-clamp-1">{activeProject.modules}</span>
                    </div>
                  )}
                  {hasInverter && (
                    <div className="p-2.5 sm:p-3 rounded-xl bg-[#F8FAFC] border border-[#DCEAF2]">
                      <span className="text-[10px] uppercase font-bold text-[#5A6E85] block">Inverter &amp; IoT</span>
                      <span className="text-[11px] sm:text-xs font-bold text-[#0A192F] line-clamp-1">{activeProject.inverter}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Badges */}
              <div className="flex flex-wrap gap-2 text-[11px] sm:text-xs font-semibold text-[#0284C7] mb-5">
                <span className="bg-[#F0F7FD] border border-[#DCEAF2] px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0284C7]" /> MSEDCL Net Metering Synchronized
                </span>
                <span className="bg-[#F0F7FD] border border-[#DCEAF2] px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7]" /> CEIG Sanctions Approved
                </span>
                <span className="bg-[#F0F7FD] border border-[#DCEAF2] px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#F5A623]" /> 25-Year Warranty
                </span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3.5 border-t border-[#EAF2F8] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <span className="text-xs text-[#5A6E85]">
                Need a similar solar installation for your facility?
              </span>
              <button
                onClick={() => {
                  onClose();
                  onOpenConsultation();
                }}
                className="bg-[#0A192F] hover:bg-[#142A4A] text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all flex items-center justify-center gap-1.5 group cursor-pointer"
              >
                <span>Request Feasibility Survey</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#F5A623] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
