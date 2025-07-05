export const BANKS = ["HDFC Bank", "ICICI Bank", "SBI Card", "Axis Bank", "Kotak Mahindra", "Yes Bank"] as const;

export const CATEGORIES = [
  "Travel",
  "Cashback",
  "Student",
  "Rewards",
  "No Annual Fee",
  "Luxury",
  "Dining"
] as const;

export const INCOME_RANGES = [
  "All",
  "Under ₹3,00,000",
  "₹3,00,000 - ₹6,00,000",
  "₹6,00,000 - ₹12,00,000",
  "Over ₹12,00,000"
] as const;

export const FEE_RANGE = { min: 0, max: 12000 } as const;
