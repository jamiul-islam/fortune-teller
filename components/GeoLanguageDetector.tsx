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
    if (hasDetected) {
      console.log("✅ Geo language detection already ran this session");
      return;
    }

    // Check if user already has a language preference
    const cookieLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("NEXT_LOCALE="))
      ?.split("=")[1];

    if (cookieLocale) {
      console.log("✅ User already has language preference:", cookieLocale);
      sessionStorage.setItem("geo_language_detected", "true");
      return;
    }

    console.log("🌍 Starting geolocation-based language detection...");
    // Detect language based on geolocation
    detectLanguageByGeo();
  }, []);

  const detectLanguageByGeo = async () => {
    try {
      console.log("📡 Fetching location from ip-api.com...");
      // Use ip-api.com which has better CORS support
      const response = await fetch("http://ip-api.com/json/", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("📍 Location detected:", {
        country: data.country,
        code: data.countryCode,
        city: data.city,
      });

      if (data.countryCode) {
        const countryCode = data.countryCode.toUpperCase();
        const shouldUseFrench = FRENCH_SPEAKING_COUNTRIES.includes(countryCode);
        const detectedLocale = shouldUseFrench ? "fr" : "en";

        console.log(
          `🗣️ Language detected: ${detectedLocale} (${shouldUseFrench ? "French-speaking country" : "English-speaking country"})`,
        );

        // Only change if different from current
        if (detectedLocale !== currentLocale) {
          console.log(
            `🔄 Switching language from ${currentLocale} to ${detectedLocale}`,
          );
          // Set cookie
          document.cookie = `NEXT_LOCALE=${detectedLocale}; path=/; max-age=31536000`;
          // Mark as detected
          sessionStorage.setItem("geo_language_detected", "true");
          // Reload to apply new locale
          window.location.reload();
        } else {
          console.log("✅ Language already matches detected locale");
          sessionStorage.setItem("geo_language_detected", "true");
        }
      }
    } catch (error) {
      console.error("❌ Geolocation detection failed:", error);
      console.log("🔄 Falling back to browser language detection...");
      // Fallback: use browser language
      detectLanguageByBrowser();
    }
  };

  const detectLanguageByBrowser = () => {
    const browserLang = navigator.language.toLowerCase();
    const shouldUseFrench = browserLang.startsWith("fr");
    const detectedLocale = shouldUseFrench ? "fr" : "en";

    console.log(`🌐 Browser language: ${browserLang}`);
    console.log(`🗣️ Detected locale: ${detectedLocale}`);

    if (detectedLocale !== currentLocale) {
      console.log(
        `🔄 Switching language from ${currentLocale} to ${detectedLocale}`,
      );
      document.cookie = `NEXT_LOCALE=${detectedLocale}; path=/; max-age=31536000`;
      sessionStorage.setItem("geo_language_detected", "true");
      window.location.reload();
    } else {
      console.log("✅ Language already matches browser locale");
      sessionStorage.setItem("geo_language_detected", "true");
    }
  };

  return null; // This component doesn't render anything
}
