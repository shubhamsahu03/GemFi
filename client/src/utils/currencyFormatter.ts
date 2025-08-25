// utils/currencyFormatter.ts

type CurrencyOptions = {
  decimalPlaces?: number;
  compact?: boolean;
  showSign?: boolean;
  isExpense?: boolean;
};

const countryToCurrency: Record<string, string> = {
  IN: "INR",
  US: "USD",
  GB: "GBP",
  EU: "EUR",
  JP: "JPY",
  CA: "CAD",
  AU: "AUD",
  SG: "SGD",
  // add more mappings as needed
};

// Detect user’s country via IP using a geolocation API
export async function detectCurrency(): Promise<{ currency: string; locale: string }> {
  try {
    const res = await fetch("https://ipapi.co/json/"); // Free geolocation API
    const data = await res.json();

    const countryCode = data?.country_code || "IN";
    const currency = countryToCurrency[countryCode] || "USD";

    // Example: IN → en-IN, US → en-US, GB → en-GB
    const locale = `${countryCode === "IN" ? "en" : "en"}-${countryCode}`;

    return { currency, locale };
  } catch (error) {
    console.warn("Geolocation failed, falling back to browser locale:", error);

    // fallback to browser locale + default INR
    return {
      currency: "INR",
      locale: navigator.language || "en-IN",
    };
  }
}

// Currency formatter
export const formatCurrency = (
  value: number,
  currency: string,
  locale: string,
  options: CurrencyOptions = {}
): string => {
  const {
    decimalPlaces = 2,
    compact = false,
    showSign = false,
    isExpense = false,
  } = options;

  const displayValue = isExpense ? -Math.abs(value) : value;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
    notation: compact ? "compact" : "standard",
    signDisplay: showSign ? "always" : "auto",
  }).format(displayValue);
};
