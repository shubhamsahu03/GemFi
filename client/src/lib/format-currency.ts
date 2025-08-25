export const formatCurrency = (
  value: number,
  options: { 
    currency?: string; 
    decimalPlaces?: number;
    compact?: boolean;
    showSign?: boolean;
    isExpense?: boolean;
  } = {}
): string => {
  const { 
    currency = 'INR', 
    decimalPlaces = 2, 
    compact = false, 
    showSign = false, 
    isExpense = false 
  } = options;

  const displayValue = isExpense ? -Math.abs(value) : value;

  // If INR → force Indian locale, else → let system/user locale decide
  const locale = currency === 'INR' ? 'en-IN' : undefined;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
    notation: compact ? 'compact' : 'standard',
    signDisplay: showSign ? 'always' : 'auto',
  }).format(displayValue);
};
