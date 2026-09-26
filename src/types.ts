export interface Project {
  id: string;
  name: string;
  client: string;
  capacity: string;
  capacityKw: number;
  category: 'Industrial' | 'Commercial' | 'Textile' | 'Rooftop' | 'Manufacturing';
  location: string;
  annualSavings?: string;
  co2Offset?: string;
  modules?: string;
  inverter?: string;
  description: string;
  image: string;
  highlightTag: string;
  region?: 'Maharashtra' | 'Rajasthan';
  featured?: boolean;
}

export interface ClientRecord {
  id: string;
  name: string;
  capacity: string;
  capacityKw: number;
  location: string;
  region: 'Maharashtra' | 'Rajasthan';
  category: 'Textile' | 'Industrial' | 'Commercial' | 'Manufacturing';
  status: 'Completed' | 'Work in Progress';
  featured?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  image: string;
  features: string[];
  idealFor: string;
}

export interface ClientLogo {
  name: string;
  capacity: string;
  location: string;
  industry: string;
  status?: string;
}

export interface CalculatorResult {
  recommendedCapacityKw: number;
  monthlySavingsInr: number;
  annualSavingsInr: number;
  estimatedUnitsMonthly: number;
  subsidyOrTaxBenefitInr: number;
  netInvestmentInr: number;
  paybackYears: number;
  lifetimeSavingsInr: number;
  co2TonsYear: number;
  treesEquivalent: number;
}
