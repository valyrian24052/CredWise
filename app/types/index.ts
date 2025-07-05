export interface CreditCard {
  id: number;
  bank: string;
  name: string;
  category: string[];
  annualFee: number;
  incomeRequirement: number;
  benefits: string[];
  imagePrompt: string;
  selected: boolean;
}

export type IncomeRangeKey = 
  | "Under ₹3,00,000" 
  | "₹3,00,000 - ₹6,00,000" 
  | "₹6,00,000 - ₹12,00,000" 
  | "Over ₹12,00,000";
