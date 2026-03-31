"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";

// French-speaking countries (ISO 3166-1 alpha-2 codes)
const FRENCH_SPEAKING_COUNTRIES = [
  "FR", // France
  "BE", // Belgium
  "CH", // Switzerland
  "CA", // Canada
  "LU", // Luxembourg
  "MC", // Monaco
  "CI", // Côte d'Ivoire
  "SN", // Senegal
  "ML", // Mali
  "BF", // Burkina Faso
  "NE", // Niger
  "TD", // Chad
  "CM", // Cameroon
  "CG", // Congo
  "CD", // Democratic Republic of Congo
  "GA", // Gabon
  "GN", // Guinea
  "MG", // Madagascar
  "BJ", // Benin
  "TG", // Togo
  "CF", // Central African Republic
  "RW", // Rwanda
  "BI", // Burundi
  "DJ", // Djibouti
  "KM", // Comoros
  "SC", // Seychelles
  "HT", // Haiti
];

export function GeoLanguageDetector() {
  const currentLocale = useLocale();

  useEffect(() => {
    // Only run once on initial load
    const hasDetected = sessionStorage.getItem("geo_language_detected");
    if (hasDetected) return;

    // Check if user already has a language preference
    const cookieLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("NEXT_LOCALE="))
      ?.split("=")[1];

    if (cookieLocale) {
      sessionStorage.setItem("geo_language_detected", "true");
      return;
    }

    // Detect language based on geolocation
    detectLanguageByGeo();
  }, []);

  const detectLanguageByGeo = async () => {
    try {
      // Use ipapi.co for geolocation (free, no API key required)
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();

      if (data.country_code) {
        const countryCode = data.country_code.toUpperCase();
        const shouldUseFrench = FRENCH_SPEAKING_COUNTRIES.includes(countryCode);
        const detectedLocale = shouldUseFrench ? "fr" : "en";

        // Only change if different from current
        if (detectedLocale !== currentLocale) {
          // Set cookie
          document.cookie = `NEXT_LOCALE=${detectedLocale}; path=/; max-age=31536000`;
          // Mark as detected
          sessionStorage.setItem("geo_language_detected", "true");
          // Reload to apply new locale
          window.location.reload();
        } else {
          sessionStorage.setItem("geo_language_detected", "true");
        }
      }
    } catch (error) {
      console.error("Failed to detect language by geolocation:", error);
      // Fallback: use browser language
      detectLanguageByBrowser();
    }
  };

  const detectLanguageByBrowser = () => {
    const browserLang = navigator.language.toLowerCase();
    const shouldUseFrench = browserLang.startsWith("fr");
    const detectedLocale = shouldUseFrench ? "fr" : "en";

    if (detectedLocale !== currentLocale) {
      document.cookie = `NEXT_LOCALE=${detectedLocale}; path=/; max-age=31536000`;
      sessionStorage.setItem("geo_language_detected", "true");
      window.location.reload();
    } else {
      sessionStorage.setItem("geo_language_detected", "true");
    }
  };

  return null; // This component doesn't render anything
}
