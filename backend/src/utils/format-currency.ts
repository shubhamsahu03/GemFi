// utils/currencyFormatter.ts

let detectedCurrency: string = "INR"; // default fallback
let detectedLocale: string = "en-IN"; // default fallback

// Run this ONCE at app startup
export async function initCurrencyDetection() {
  try {
    const res = await fetch("https://ipapi.co/json/"); // free geolocation API
    const data = await res.json();

    detectedCurrency = data.currency || "INR";
    detectedLocale = data.languages?.split(",")[0] || "en-IN";
  } catch (err) {
    console.warn("Currency detection failed, using default INR");
  }
}

// Convert rupees to paisa when saving
export function convertToPaisa(amount: number) {
  return Math.round(amount * 100);
}

// Convert paisa back to rupee units when retrieving
export function convertToRuppeeUnit(amount: number) {
  return amount / 100;
}

// Format currency synchronously (uses cached values)
export function formatCurrency(amount: number) {
  return new Intl.NumberFormat(detectedLocale, {
    style: "currency",
    currency: detectedCurrency,
  }).format(amount);
}
