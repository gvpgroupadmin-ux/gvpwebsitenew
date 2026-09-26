import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, CheckCircle, Zap, Shield, Sparkles, Trees, TrendingUp } from 'lucide-react';
import { COMPANY_INFO } from '../data/solarData';

interface SolarSavingsCalculatorProps {
  onOpenConsultation: (details?: { type: string; bill: number; capacity: number }) => void;
}

export const SolarSavingsCalculator: React.FC<SolarSavingsCalculatorProps> = ({ onOpenConsultation }) => {
  const [customerType, setCustomerType] = useState<'residential' | 'commercial'>('commercial');
  const [monthlyBill, setMonthlyBill] = useState<number>(120000); // Default ₹1.2 Lakhs for C&I

  // Handlers for switching type
  const handleTypeChange = (type: 'residential' | 'commercial') => {
    setCustomerType(type);
    if (type === 'residential') {
      setMonthlyBill(6000);
    } else {
      setMonthlyBill(150000);
    }
  };

  // Calculations based on Maharashtra MSEDCL tariff rates
  const metrics = useMemo(() => {
    let tariffPerKwh = customerType === 'residential' ? 8.2 : 9.8; // INR per unit
    let dailySunHours = 4.8; // Average solar peak sun hours in Maharashtra
    let monthlyUnits = Math.round(monthlyBill / tariffPerKwh);
    
    // Target 70% bill reduction as promised by GVP Solar
    let targetMonthlyUnitsFromSolar = monthlyUnits * 0.70;
    let dailyUnitsNeeded = targetMonthlyUnitsFromSolar / 30;
    let recommendedKw = Math.max(1, Math.round((dailyUnitsNeeded / dailySunHours) * 10) / 10);

    // If residential, cap typical consumer at 10kW for PM Surya Ghar
    if (customerType === 'residential' && recommendedKw > 15) {
      recommendedKw = 15;
    }

    // Monthly & Annual savings
    let monthlySavings = Math.round(monthlyBill * 0.70);
    let annualSavings = monthlySavings * 12;

    // Subsidy & Tax Benefits
    let subsidyOrTaxBenefit = 0;
    if (customerType === 'residential') {
      // PM Surya Ghar Muft Bijli Yojana:
      // 1kW = ₹30,000; 2kW = ₹60,000; 3kW and above = ₹78,000
      if (recommendedKw <= 1.5) subsidyOrTaxBenefit = 30000;
      else if (recommendedKw <= 2.5) subsidyOrTaxBenefit = 60000;
      else subsidyOrTaxBenefit = 78000;
    } else {
      // 40% Accelerated Depreciation tax benefit in Year 1 at corporate tax rate (~25%)
      // Approximate capital cost = ₹45,000 per kW
      let estimatedSystemCost = recommendedKw * 45000;
      subsidyOrTaxBenefit = Math.round(estimatedSystemCost * 0.40 * 0.25);
    }

    // Capital cost estimate & Payback
    let grossCost = customerType === 'residential' 
      ? recommendedKw * 58000 
      : recommendedKw * 42000;
    
    let netCost = Math.max(10000, grossCost - subsidyOrTaxBenefit);
    let paybackYears = Math.max(1.8, Math.round((netCost / annualSavings) * 10) / 10);
    
    // 25 Years lifetime savings minus inverter replacement reserve
    let lifetimeSavings = Math.round((annualSavings * 25 - netCost) / 100000); // In Lakhs

    // Environmental metrics
    let annualKwhGenerated = recommendedKw * dailySunHours * 365;
    let co2TonsAnnual = Math.round((annualKwhGenerated * 0.82) / 1000);
    let treesEquivalent = Math.round(co2TonsAnnual * 45);

    return {
      recommendedKw,
      monthlySavings,
      annualSavings,
      subsidyOrTaxBenefit,
      paybackYears,
      lifetimeSavings,
      co2TonsAnnual,
      treesEquivalent,
    };
  }, [customerType, monthlyBill]);

  // Dynamic slider percentage for custom track styling
  const minBill = customerType === 'residential' ? 1500 : 30000;
  const maxBill = customerType === 'residential' ? 40000 : 1500000;
  const sliderPercentage = Math.min(100, Math.max(0, ((monthlyBill - minBill) / (maxBill - minBill)) * 100));

  return (
    <section id="calculator" className="py-20 sm:py-28 bg-[#FFFFFF] border-t border-[#EAF2F8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#F0F7FD] border border-[#DCEAF2] px-3.5 py-1.5 rounded-full mb-4">
            <Calculator className="w-3.5 h-3.5 text-[#0284C7]" />
            <span className="text-[12px] font-bold uppercase tracking-wider text-[#0284C7]">
              INSTANT SOLAR ROI CALCULATOR
            </span>
          </div>

          {/* Section Heading with semantic division */}
          <div className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[#0A192F] mb-4 leading-tight">
            See How Much You Save with GVP Solar.
          </div>
          <p className="text-sm sm:text-base text-[#5A6E85] max-w-2xl mx-auto leading-relaxed">
            Hedge against rising electricity tariffs in Maharashtra. Calculate your recommended system size, 
            subsidy benefits, and 25-year lifetime financial gains.
          </p>

          {/* Clean trust statement */}
          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F8FAFC] border border-[#E2EEF8] text-[12px] font-medium text-[#475569]">
            <span className="w-2 h-2 rounded-full bg-[#F5A623] inline-block animate-pulse"></span>
            <span>Trusted across 500+ solar installations in Maharashtra • Engineered for long-term savings</span>
          </div>
        </div>

        {/* Calculator Main Box */}
        <div className="max-w-6xl mx-auto bg-white rounded-3xl border border-[#DCEAF2] shadow-[0_12px_45px_-15px_rgba(2,132,199,0.08)] p-6 sm:p-10">
          
          {/* Segmented control for Customer Type */}
          <div className="flex justify-center mb-8 sm:mb-10">
            <div className="bg-[#F0F7FD] p-1.5 rounded-2xl flex items-center border border-[#DCEAF2] max-w-md w-full">
              <button
                type="button"
                onClick={() => handleTypeChange('commercial')}
                className={`flex-1 py-2.5 px-4 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                  customerType === 'commercial'
                    ? 'bg-[#0A192F] text-white shadow-xs'
                    : 'text-[#5A6E85] hover:text-[#0A192F]'
                }`}
              >
                Commercial & Industrial (C&I)
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange('residential')}
                className={`flex-1 py-2.5 px-4 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                  customerType === 'residential'
                    ? 'bg-[#0A192F] text-white shadow-xs'
                    : 'text-[#5A6E85] hover:text-[#0A192F]'
                }`}
              >
                Residential Rooftop
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Controls & Educational SEO Column (6 cols) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              
              {/* Top: Bill Input, Slider & Presets */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#5A6E85] uppercase tracking-wider mb-2">
                    Average Monthly Electricity Bill
                  </label>
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#0A192F] tracking-tight">
                      ₹ {monthlyBill.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-[#0284C7] font-semibold bg-[#F0F7FD] border border-[#DCEAF2] px-3 py-1 rounded-full">
                      {customerType === 'commercial' ? 'High-Tension / LT-V' : 'Domestic LT-I'}
                    </span>
                  </div>

                  {/* Slider */}
                  <div className="relative py-2">
                    <input
                      type="range"
                      min={customerType === 'residential' ? 1500 : 30000}
                      max={customerType === 'residential' ? 40000 : 1500000}
                      step={customerType === 'residential' ? 500 : 10000}
                      value={monthlyBill}
                      onChange={(e) => setMonthlyBill(Number(e.target.value))}
                      style={{
                        background: `linear-gradient(to right, #0284C7 0%, #0284C7 ${sliderPercentage}%, #E2EEF8 ${sliderPercentage}%, #E2EEF8 100%)`,
                      }}
                      className="w-full h-2.5 rounded-lg appearance-none cursor-pointer accent-[#0284C7]"
                    />
                  </div>

                  <div className="flex justify-between text-[11px] text-[#7E92A2] mt-1 font-medium">
                    <span>{customerType === 'residential' ? '₹ 1,500' : '₹ 30,000'}</span>
                    <span>{customerType === 'residential' ? '₹ 20,000' : '₹ 7,50,000'}</span>
                    <span>{customerType === 'residential' ? '₹ 40,000+' : '₹ 15,00,000+'}</span>
                  </div>
                </div>

                {/* Quick preset buttons */}
                <div>
                  <span className="text-xs font-semibold text-[#5A6E85] uppercase tracking-wider block mb-2">
                    Common Bill Presets:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {customerType === 'commercial' ? (
                      <>
                        {[50000, 150000, 300000, 600000, 1200000].map((amt) => (
                          <button
                            key={amt}
                            type="button"
                            onClick={() => setMonthlyBill(amt)}
                            className={`text-xs px-3.5 py-1.5 rounded-full border font-semibold transition-all ${
                              monthlyBill === amt
                                ? 'bg-[#0A192F] text-white border-[#0A192F] shadow-xs'
                                : 'bg-[#F0F7FD] text-[#0A192F] border-[#DCEAF2] hover:border-[#0284C7] hover:bg-[#E2EEF8]'
                            }`}
                          >
                            ₹{(amt / 100000).toFixed(amt < 100000 ? 1 : 0)} Lakhs
                          </button>
                        ))}
                      </>
                    ) : (
                      <>
                        {[3000, 6000, 10000, 18000, 25000].map((amt) => (
                          <button
                            key={amt}
                            type="button"
                            onClick={() => setMonthlyBill(amt)}
                            className={`text-xs px-3.5 py-1.5 rounded-full border font-semibold transition-all ${
                              monthlyBill === amt
                                ? 'bg-[#0A192F] text-white border-[#0A192F] shadow-xs'
                                : 'bg-[#F0F7FD] text-[#0A192F] border-[#DCEAF2] hover:border-[#0284C7] hover:bg-[#E2EEF8]'
                            }`}
                          >
                            ₹{amt.toLocaleString('en-IN')}
                          </button>
                        ))}
                      </>
                    )}
                  </div>
                </div>

                {/* Compact Highlights Strip */}
                <div className="p-3 rounded-xl bg-[#F0F7FD] border border-[#DCEAF2] flex flex-wrap items-center justify-between gap-2 text-xs text-[#334E68]">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#0284C7] shrink-0" />
                    <span><strong>70% Bill Cut:</strong> Peak tariff hedge</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#0284C7] shrink-0" />
                    <span>{customerType === 'residential' ? 'PM Surya Ghar DBT Subsidy' : '40% AD Tax Shield'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#0284C7] shrink-0" />
                    <span>MSEDCL Net-Metering</span>
                  </div>
                </div>
              </div>

              {/* Middle: 1. SEO Introduction */}
              <div className="pt-3 border-t border-[#EAF2F8]">
                <h2 className="text-base sm:text-lg font-bold text-[#0A192F] tracking-tight mb-1.5">
                  Solar Panel Cost & Savings Calculator
                </h2>
                <p className="text-xs text-[#5A6E85] leading-relaxed">
                  Evaluate your rooftop solar system price, potential electricity bill reduction, and projected solar ROI across Maharashtra. Whether assessing commercial solar savings for textile mills and manufacturing plants or calculating residential solar panel cost under the PM Surya Ghar scheme, this tool models real-world generation economics and payback based on current MSEDCL tariff structures.
                </p>
              </div>

              {/* Lower: 2. How Much Solar Do You Need? (3-Step Guide) */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0284C7]">
                  How Much Solar Do You Need?
                </h3>
                <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-[#F0F7FD]/70 border border-[#DCEAF2] text-left">
                    <div className="text-[11px] font-black text-[#0284C7] mb-1 flex items-center gap-1.5">
                      <span>01</span>
                      <span className="w-1 h-1 rounded-full bg-[#F5A623]" />
                    </div>
                    <div className="text-[11.5px] font-semibold text-[#0A192F] leading-tight">
                      Enter monthly bill
                    </div>
                    <p className="text-[10.5px] text-[#5A6E85] mt-1 leading-snug">
                      Input your average monthly power expense
                    </p>
                  </div>

                  <div className="p-2.5 sm:p-3 rounded-xl bg-[#F0F7FD]/70 border border-[#DCEAF2] text-left">
                    <div className="text-[11px] font-black text-[#0284C7] mb-1 flex items-center gap-1.5">
                      <span>02</span>
                      <span className="w-1 h-1 rounded-full bg-[#0284C7]" />
                    </div>
                    <div className="text-[11.5px] font-semibold text-[#0A192F] leading-tight">
                      Get solar capacity
                    </div>
                    <p className="text-[10.5px] text-[#5A6E85] mt-1 leading-snug">
                      Recommended system kW & roof space
                    </p>
                  </div>

                  <div className="p-2.5 sm:p-3 rounded-xl bg-[#F0F7FD]/70 border border-[#DCEAF2] text-left">
                    <div className="text-[11px] font-black text-[#0284C7] mb-1 flex items-center gap-1.5">
                      <span>03</span>
                      <span className="w-1 h-1 rounded-full bg-[#0284C7]" />
                    </div>
                    <div className="text-[11.5px] font-semibold text-[#0A192F] leading-tight">
                      See savings & ROI
                    </div>
                    <p className="text-[10.5px] text-[#5A6E85] mt-1 leading-snug">
                      Projected payback and lifetime gains
                    </p>
                  </div>
                </div>
              </div>

              {/* Lower Middle: 4. Commercial & Industrial SEO Content */}
              <div className="space-y-1">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0284C7]">
                  Built for Commercial & Industrial Solar Projects
                </h3>
                <p className="text-xs text-[#5A6E85] leading-relaxed">
                  Tailored for Maharashtra manufacturers, warehousing facilities, and commercial institutions. This calculator helps determine approximate system capacity, annual energy savings, payback period, and rooftop space requirements based on your utility bill and tariff category.
                </p>
              </div>

              {/* Bottom: 3. Local SEO / Trust Block & 5. Secondary CTA */}
              <div className="pt-3 border-t border-[#EAF2F8] space-y-3">
                <div>
                  <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#0A192F] mb-1.5">
                    Solar EPC for Maharashtra Businesses & Homes
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#5A6E85]">
                    <span>Ichalkaranji</span>
                    <span className="text-[#0284C7] font-bold">•</span>
                    <span>Kolhapur</span>
                    <span className="text-[#0284C7] font-bold">•</span>
                    <span>Kagal</span>
                    <span className="text-[#0284C7] font-bold">•</span>
                    <span>Sangli</span>
                    <span className="text-[#0284C7] font-bold">•</span>
                    <span>Barshi</span>
                    <span className="text-[#0284C7] font-bold">•</span>
                    <span>Pune</span>
                    <span className="text-[#0284C7] font-bold">•</span>
                    <span>Nashik</span>
                  </div>
                </div>

                {/* Internal Secondary CTA */}
                <div className="pt-2 flex items-center justify-between border-t border-[#F0F7FD]">
                  <span className="text-[11.5px] text-[#5A6E85]">
                    Need custom industrial load engineering?
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      onOpenConsultation({
                        type: customerType,
                        bill: monthlyBill,
                        capacity: metrics.recommendedKw,
                      })
                    }
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0284C7] hover:text-[#0369A1] transition-colors group cursor-pointer"
                  >
                    <span>Talk to a Solar Expert</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>

            </div>

            {/* Right Output Dashboard Panel (6 cols) */}
            <div className="lg:col-span-6 bg-[#F8FAFC] border border-[#DCEAF2] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs">
              <div>
                
                {/* Recommended Capacity Banner */}
                <div className="flex items-center justify-between pb-3 border-b border-[#DCEAF2]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7]">
                    Recommended Plant Capacity
                  </span>
                  <span className="text-[11px] font-medium text-[#5A6E85] bg-white border border-[#DCEAF2] px-2.5 py-0.5 rounded-full">
                    MSEDCL Sizing Standard
                  </span>
                </div>

                <div className="my-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black tracking-tight text-[#0A192F]">
                      {metrics.recommendedKw}
                    </span>
                    <span className="text-lg font-bold text-[#0284C7]">
                      kW Solar System
                    </span>
                  </div>
                  <p className="text-xs text-[#5A6E85] mt-1">
                    Requires approximately ~{(metrics.recommendedKw * 85).toFixed(0)} sq.ft of shadow-free rooftop area.
                  </p>
                </div>

                {/* 4 Key Financial Metrics as Individual Dashboard Cards */}
                <div className="grid grid-cols-2 gap-3 my-5">
                  
                  <div className="bg-white p-4 rounded-2xl border border-[#DCEAF2] shadow-xs hover:border-[#0284C7]/50 transition-colors">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A6E85] block mb-1">
                      Estimated Monthly Savings
                    </span>
                    <span className="text-lg sm:text-xl font-black text-[#0284C7]">
                      ₹ {metrics.monthlySavings.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-[#DCEAF2] shadow-xs hover:border-[#0284C7]/50 transition-colors">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A6E85] block mb-1">
                      Annual Bill Reduction
                    </span>
                    <span className="text-lg sm:text-xl font-black text-[#0A192F]">
                      ₹ {(metrics.annualSavings / 100000).toFixed(2)} Lakhs
                    </span>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-[#DCEAF2] shadow-xs hover:border-[#0284C7]/50 transition-colors">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A6E85] block mb-1">
                      {customerType === 'residential' ? 'Govt. Subsidy (DBT)' : 'Year-1 Tax Benefit (40% AD)'}
                    </span>
                    <span className="text-lg sm:text-xl font-black text-[#0284C7]">
                      ₹ {metrics.subsidyOrTaxBenefit.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-[#DCEAF2] shadow-xs hover:border-[#0284C7]/50 transition-colors">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A6E85] block mb-1">
                      Expected Payback Period
                    </span>
                    <span className="text-lg sm:text-xl font-black text-[#0A192F]">
                      ~ {metrics.paybackYears} Years
                    </span>
                  </div>

                </div>

                {/* 25-Year Projected Savings Graph */}
                <div className="bg-white p-4 rounded-2xl border border-[#DCEAF2] shadow-xs my-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-[#0284C7]" />
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#5A6E85]">
                        25-Year Cumulative Savings
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[#0284C7] bg-[#F0F7FD] border border-[#DCEAF2] px-2 py-0.5 rounded-full">
                      ₹ {metrics.lifetimeSavings} Lakhs Net Gain
                    </span>
                  </div>

                  {/* Clean SVG Projected Savings Chart */}
                  <div className="w-full pt-2">
                    <svg viewBox="0 0 340 75" className="w-full h-16 overflow-visible" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="calcCurveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#0284C7" stopOpacity="0.22" />
                          <stop offset="100%" stopColor="#0284C7" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      {/* Grid lines */}
                      <line x1="0" y1="15" x2="340" y2="15" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
                      <line x1="0" y1="40" x2="340" y2="40" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
                      <line x1="0" y1="65" x2="340" y2="65" stroke="#E2EEF8" strokeWidth="1" />

                      {/* Area Fill */}
                      <path
                        d="M 10 65 Q 100 58, 170 38 T 330 10 L 330 65 Z"
                        fill="url(#calcCurveGradient)"
                      />

                      {/* Curve Line */}
                      <path
                        d="M 10 65 Q 100 58, 170 38 T 330 10"
                        fill="none"
                        stroke="#0284C7"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />

                      {/* Nodes with small yellow highlight points */}
                      <circle cx="10" cy="65" r="3" fill="#0284C7" />
                      <circle cx="95" cy="56" r="3" fill="#0284C7" />
                      <circle cx="170" cy="38" r="3.5" fill="#F5A623" stroke="#FFFFFF" strokeWidth="1.5" />
                      <circle cx="250" cy="22" r="3" fill="#0284C7" />
                      <circle cx="330" cy="10" r="4.5" fill="#F5A623" stroke="#FFFFFF" strokeWidth="2" />
                    </svg>

                    {/* Timeline labels */}
                    <div className="flex justify-between text-[10px] text-[#7E92A2] font-semibold pt-1 border-t border-[#F1F5F9]">
                      <span>Year 1</span>
                      <span>Year 5</span>
                      <span>Year 10</span>
                      <span>Year 15</span>
                      <span>Year 20</span>
                      <span>Year 25</span>
                    </div>
                  </div>
                </div>

                {/* Environmental Benefit Row */}
                <div className="flex items-center justify-between bg-white p-3.5 rounded-xl border border-[#DCEAF2] text-xs text-[#334E68] shadow-xs">
                  <div className="flex items-center gap-2">
                    <Trees className="w-4 h-4 text-[#0284C7]" />
                    <span>Equiv. to {metrics.treesEquivalent} trees planted/yr</span>
                  </div>
                  <div className="font-bold text-[#0A192F]">
                    {metrics.co2TonsAnnual} Tons CO₂ offset/yr
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-[#DCEAF2]">
                <button
                  onClick={() =>
                    onOpenConsultation({
                      type: customerType,
                      bill: monthlyBill,
                      capacity: metrics.recommendedKw,
                    })
                  }
                  className="w-full bg-[#0A192F] hover:bg-[#142A4A] text-white font-extrabold text-sm py-3.5 px-6 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 group"
                >
                  <span>Request Free Rooftop Site Survey</span>
                  <ArrowRight className="w-4 h-4 text-[#F5A623] group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-[11px] text-center text-[#5A6E85] mt-2">
                  Includes 3D shadow analysis, structural load evaluation & custom quote.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
