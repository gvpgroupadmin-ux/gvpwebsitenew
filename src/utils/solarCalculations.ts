/**
 * Solar Calculation Utility based on Maharashtra MSEDCL tariff and solar insolation.
 * Shared by LandmarkProjectsSection and SolarSavingsCalculator for consistent metrics.
 */

export interface SolarCalculationResult {
  monthlyBill: number;
  customerType: 'residential' | 'commercial';
  recommendedKw: number;
  monthlySavings: number;
  annualSavings: number;
  formattedAnnualSavings: string;
  paybackYears: number;
  netCost: number;
  cumulativeSavings: { year: number; label: string; savings: number; formattedSavings: string }[];
}

export function calculateSolarSavings(
  rawBill: number | string,
  customerType: 'residential' | 'commercial' = 'commercial'
): SolarCalculationResult {
  // Parse input
  const numericBill = typeof rawBill === 'string'
    ? Math.max(0, parseInt(rawBill.replace(/[^\d]/g, ''), 10) || 0)
    : Math.max(0, rawBill);

  const bill = numericBill > 0 ? numericBill : 25000;

  // Under ₹10,000 is typically residential, above is C&I
  const effectiveType = customerType || (bill <= 10000 ? 'residential' : 'commercial');

  const tariffPerKwh = effectiveType === 'residential' ? 8.2 : 9.8;
  const dailySunHours = 4.8;
  const monthlyUnits = Math.round(bill / tariffPerKwh);

  // 70% average bill reduction
  const targetMonthlyUnits = monthlyUnits * 0.70;
  const dailyUnitsNeeded = targetMonthlyUnits / 30;
  let recommendedKw = Math.max(1, Math.round((dailyUnitsNeeded / dailySunHours) * 10) / 10);

  if (effectiveType === 'residential' && recommendedKw > 15) {
    recommendedKw = 15;
  }

  const monthlySavings = Math.round(bill * 0.70);
  const annualSavings = monthlySavings * 12;

  // Subsidy & Tax Benefits
  let subsidyOrTaxBenefit = 0;
  if (effectiveType === 'residential') {
    if (recommendedKw <= 1.5) subsidyOrTaxBenefit = 30000;
    else if (recommendedKw <= 2.5) subsidyOrTaxBenefit = 60000;
    else subsidyOrTaxBenefit = 78000;
  } else {
    const estimatedCost = recommendedKw * 45000;
    subsidyOrTaxBenefit = Math.round(estimatedCost * 0.40 * 0.25);
  }

  const grossCost = effectiveType === 'residential'
    ? recommendedKw * 58000
    : recommendedKw * 42000;

  const netCost = Math.max(10000, grossCost - subsidyOrTaxBenefit);
  const paybackYears = Math.max(1.8, Math.round((netCost / annualSavings) * 10) / 10);

  // Format currency in Indian standard
  const formatInr = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    }
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  // Cumulative savings across 5 years
  const cumulativeSavings = [1, 2, 3, 4, 5].map((year) => {
    const savings = Math.round(annualSavings * year);
    return {
      year,
      label: `Y${year}`,
      savings,
      formattedSavings: formatInr(savings),
    };
  });

  return {
    monthlyBill: bill,
    customerType: effectiveType,
    recommendedKw,
    monthlySavings,
    annualSavings,
    formattedAnnualSavings: formatInr(annualSavings),
    paybackYears,
    netCost,
    cumulativeSavings,
  };
}
