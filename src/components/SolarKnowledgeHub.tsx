import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  Calculator, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  MapPin, 
  Building2,
  Sparkles
} from 'lucide-react';

interface SolarKnowledgeHubProps {
  onOpenConsultation: (details?: { type: string; bill: number; capacity: number }) => void;
  onOpenCalculator: () => void;
}

export const SolarKnowledgeHub: React.FC<SolarKnowledgeHubProps> = ({
  onOpenConsultation,
  onOpenCalculator,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const capacityBenchmarks = [
    {
      capacity: "3 kW",
      category: "Residential (PM Surya Ghar)",
      area: "250 – 300 sq.ft.",
      generation: "360 – 420 Units/mo",
      benefit: "₹78,000 Direct Central Subsidy",
      payback: "2.8 – 3.5 Years",
      targetKw: 3,
      targetBill: 4000,
    },
    {
      capacity: "5 kW",
      category: "Residential (Large/Villa)",
      area: "400 – 500 sq.ft.",
      generation: "600 – 720 Units/mo",
      benefit: "₹78,000 Central Subsidy + Zero Bill",
      payback: "3.2 – 3.8 Years",
      targetKw: 5,
      targetBill: 7000,
    },
    {
      capacity: "25 kW",
      category: "Commercial / Hospitals",
      area: "2,000 – 2,500 sq.ft.",
      generation: "3,000 – 3,500 Units/mo",
      benefit: "40% Accelerated Depreciation",
      payback: "2.5 – 3.0 Years",
      targetKw: 25,
      targetBill: 35000,
    },
    {
      capacity: "100 kW",
      category: "Industrial Shed / Factory",
      area: "8,000 – 10,000 sq.ft.",
      generation: "12,000 – 14,000 Units/mo",
      benefit: "40% Tax Write-off + Peak Tariff Slash",
      payback: "2.4 – 2.8 Years",
      targetKw: 100,
      targetBill: 140000,
    },
    {
      capacity: "500 kW – 1 MW+",
      category: "Textile Mills / Heavy MIDC",
      area: "40,000 – 85,000 sq.ft.",
      generation: "60,000 – 1,25,000 Units/mo",
      benefit: "₹60L – ₹1.5+ Cr Annual Power Savings",
      payback: "~2.5 Years",
      targetKw: 500,
      targetBill: 600000,
    },
  ];

  const aeoFaqs = [
    {
      q: "How much government subsidy is available for rooftop solar in Maharashtra?",
      a: "Under the central PM Surya Ghar: Muft Bijli Yojana, residential households are entitled to ₹30,000 per kW for the first 2 kW (totaling ₹60,000) and ₹18,000 for the 3rd kW, capping at ₹78,000 for systems 3 kW and higher. The subsidy is credited directly to the homeowner’s bank account via Direct Benefit Transfer (DBT) following MSEDCL inspection and net-meter synchronization. GVP Solar manages 100% of the portal liaisoning and Discom approval paperwork.",
      tag: "Subsidy & PM Surya Ghar"
    },
    {
      q: "What is the typical ROI and payback timeline for industrial solar in Maharashtra?",
      a: "Commercial and industrial solar plants in Maharashtra typically achieve full capital payback within 2.5 to 3.5 years. With industrial MSEDCL electricity tariffs exceeding ₹8.50 to ₹11.50 per unit (plus peak Time-of-Day demand surcharges), generating self-consumed captive solar energy drastically reduces monthly operating expenses. Furthermore, companies can claim 40% Accelerated Depreciation under Section 32 of the Income Tax Act in the very first year.",
      tag: "Commercial & Industrial ROI"
    },
    {
      q: "How does the MSEDCL bi-directional net metering process work?",
      a: "An on-grid solar plant syncs directly with the MSEDCL utility grid through an approved bi-directional digital net meter. During daylight hours, your solar modules power active facility loads first; any surplus generated electricity is exported to the grid. At night or during cloudy spells, power is drawn back from the grid. On your monthly MSEDCL statement, exported units are subtracted from imported units, ensuring you only pay for net consumption.",
      tag: "MSEDCL Net Metering"
    },
    {
      q: "Can solar panels be safely installed on industrial PEB or curved metal sheds without roof leakage?",
      a: "Yes. GVP Solar utilizes custom-engineered non-penetrating aluminum standing-seam and trapezoidal profile clamps fitted with high-density EPDM sealing gaskets. This eliminates the need to drill holes into industrial shed sheets, preserving factory structural integrity and manufacturer water-proofing warranties against monsoonal downpours.",
      tag: "Engineering & Shed Mounting"
    },
    {
      q: "Which solar module and inverter technologies provide the longest multi-decade lifecycle?",
      a: "We deploy Bloomberg Tier-1 certified N-Type TOPCon and Mono PERC Bifacial photovoltaic modules engineered with dual-glass encapsulation. Dual-glass modules generate up to 15-20% supplementary power from ground/roof reflected albedo light and resist micro-cracking. Paired with European and Tier-1 multi-MPPT smart string inverters featuring IP66 protection, cloud IoT monitoring, and rapid surge suppression, the systems deliver 25-30 years of sustained power yields.",
      tag: "Hardware & Technology"
    },
    {
      q: "Where does GVP Solar provide verified on-ground solar EPC installations in Maharashtra?",
      a: "Headquartered in Kapad Market, Ichalkaranji, GVP Solar provides complete turnkey engineering across Western and Northern Maharashtra, including Ichalkaranji, Kolhapur, Sangli, Miraj, Kagal MIDC, Hatkanangle, Tardal KATP Park, Barshi, Solapur, Satara, and Pune. We maintain local rapid-response technical teams for site audits, CEIG sanctions, and lifecycle preventive maintenance.",
      tag: "Local Service Footprint"
    }
  ];

  return (
    <section id="knowledge-hub" className="py-20 sm:py-28 bg-[#F8FAFC] relative overflow-hidden border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#F0F7FD] border border-[#DCEAF2] px-3.5 py-1.5 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#0284C7]">
              TECHNICAL KNOWLEDGE & SUBSIDY HUB
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0A192F] leading-tight mb-4">
            Maharashtra Solar Engineering, <br className="hidden sm:inline" />
            <span className="text-[#0284C7]">Pricing, Subsidy & ROI Guide</span>
          </h2>

          <p className="text-sm sm:text-base text-[#5A6E85] leading-relaxed">
            Transparent, engineer-verified benchmarks for industrial factories, commercial establishments, 
            and residential homeowners looking to install rooftop solar with MSEDCL net metering.
          </p>
        </div>

        {/* 1. CAPACITY & PRICING BENCHMARK TABLE (Semantic HTML Table for SEO & AI Crawlers) */}
        <div className="bg-white rounded-2xl border border-[#DCEAF2] shadow-sm overflow-hidden mb-16">
          <div className="p-5 sm:p-6 bg-gradient-to-r from-[#0A192F] to-[#0D2447] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg sm:text-xl font-bold tracking-tight">
                Solar System Capacity & Economic Yield Matrix
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
                Typical system requirements, monthly generation yields, subsidies and payback estimates in Maharashtra.
              </p>
            </div>
            <button
              onClick={onOpenCalculator}
              className="inline-flex items-center gap-2 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-semibold px-4 py-2.5 rounded-full transition-all shrink-0 cursor-pointer shadow-sm"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Launch Live Calculator</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[11px] sm:text-xs font-bold text-[#5A6E85] uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">System Size</th>
                  <th className="py-3.5 px-4">Primary Application</th>
                  <th className="py-3.5 px-4">Roof Area Needed</th>
                  <th className="py-3.5 px-4">Avg. Yield</th>
                  <th className="py-3.5 px-4">Subsidy / Tax Benefit</th>
                  <th className="py-3.5 px-4">Payback</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] text-xs sm:text-sm text-[#0A192F]">
                {capacityBenchmarks.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#F0F7FD]/50 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-[#0284C7]">
                      {row.capacity}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-[#0A192F]">
                      {row.category}
                    </td>
                    <td className="py-3.5 px-4 text-[#5A6E85]">
                      {row.area}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[#0A192F]">
                      {row.generation}
                    </td>
                    <td className="py-3.5 px-4 text-[#0284C7] font-medium">
                      {row.benefit}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[#0A3254]">
                      {row.payback}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      <button
                        onClick={() => onOpenConsultation({ type: row.category, bill: row.targetBill, capacity: row.targetKw })}
                        className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-[#0284C7] hover:text-[#0369A1] hover:underline cursor-pointer"
                      >
                        <span>Audit</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-[#F8FAFC] border-t border-[#E2E8F0] text-[11px] text-[#64748B] flex flex-col sm:flex-row justify-between items-center gap-2">
            <span>* Generation estimates based on average Western Maharashtra solar irradiance of 4.8 – 5.4 kWh/m²/day.</span>
            <span>MNRE Empanelled EPC · MSEDCL Net Metering Compliant</span>
          </div>
        </div>

        {/* 2. THE 4-STEP TURNKEY EPC WORKFLOW */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
          <div className="bg-white p-5 rounded-xl border border-[#DCEAF2] shadow-xs flex flex-col">
            <div className="w-8 h-8 rounded-lg bg-[#F0F7FD] text-[#0284C7] flex items-center justify-center font-bold text-sm mb-3">
              01
            </div>
            <h4 className="text-sm font-bold text-[#0A192F] mb-1.5">3D Shadow & Structural Audit</h4>
            <p className="text-xs text-[#5A6E85] leading-relaxed">
              Precision drone mapping, roof dead-load verification, and seasonal solar irradiance simulation.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#DCEAF2] shadow-xs flex flex-col">
            <div className="w-8 h-8 rounded-lg bg-[#F0F7FD] text-[#0284C7] flex items-center justify-center font-bold text-sm mb-3">
              02
            </div>
            <h4 className="text-sm font-bold text-[#0A192F] mb-1.5">MSEDCL I-SMART Sanctions</h4>
            <p className="text-xs text-[#5A6E85] leading-relaxed">
              Transformer capacity feasibility, grid technical sanction letter, and net-metering approvals.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#DCEAF2] shadow-xs flex flex-col">
            <div className="w-8 h-8 rounded-lg bg-[#F0F7FD] text-[#0284C7] flex items-center justify-center font-bold text-sm mb-3">
              03
            </div>
            <h4 className="text-sm font-bold text-[#0A192F] mb-1.5">Tier-1 EPC Installation</h4>
            <p className="text-xs text-[#5A6E85] leading-relaxed">
              Hot-dip galvanized structural mounting (150 km/h wind rated), dual-glass modules, and CEIG safety signoff.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#DCEAF2] shadow-xs flex flex-col">
            <div className="w-8 h-8 rounded-lg bg-[#F0F7FD] text-[#0284C7] flex items-center justify-center font-bold text-sm mb-3">
              04
            </div>
            <h4 className="text-sm font-bold text-[#0A192F] mb-1.5">Net Metering & Subsidy Credit</h4>
            <p className="text-xs text-[#5A6E85] leading-relaxed">
              Bi-directional meter installation, cloud IoT generation commissioning, and DBT subsidy release.
            </p>
          </div>
        </div>

        {/* 3. AEO QUESTION & ANSWER ACCORDION (Crawlable Semantic Q&A) */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0284C7] mb-2">
              <HelpCircle className="w-4 h-4 text-[#0284C7]" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0A192F]">
              Direct Answers to Key Maharashtra Solar Questions
            </h3>
          </div>

          <div className="space-y-3">
            {aeoFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;

              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-[#DCEAF2] shadow-xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F8FAFC] transition-colors"
                    aria-expanded={isOpen}
                  >
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] font-bold text-[#0284C7] uppercase tracking-wider mb-1">
                        {faq.tag}
                      </span>
                      <span className="text-sm sm:text-base font-semibold text-[#0A192F] leading-snug">
                        {faq.q}
                      </span>
                    </div>
                    <div className={`w-7 h-7 rounded-full bg-[#F0F7FD] flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#0284C7]' : 'text-[#64748B]'}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5A6E85] leading-relaxed border-t border-[#F1F5F9]">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Lead Generation CTA Callout */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0284C7] to-[#0369A1] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
            <div>
              <h4 className="text-lg sm:text-xl font-bold tracking-tight">
                Need a Detailed Technical Feasibility Report for Your Roof?
              </h4>
              <p className="text-xs sm:text-sm text-white/85 mt-1 max-w-xl">
                Our local engineering team in Ichalkaranji provides site load audits, shadow simulations, 
                and official MSEDCL subsidy estimates within 24 hours.
              </p>
            </div>
            <button
              onClick={() => onOpenConsultation()}
              className="bg-white hover:bg-[#F8FAFC] text-[#0284C7] text-xs sm:text-sm font-bold px-6 py-3 rounded-full shrink-0 transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Request Free Site Audit
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
