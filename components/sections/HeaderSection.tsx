"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Phone } from "lucide-react";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface HeaderSectionProps {
  onBookingClick: (calendlyUrl: string) => void;
}

export default function HeaderSection({ onBookingClick }: HeaderSectionProps) {
  const t = useTranslations("header");
  const [isScrolled, setIsScrolled] = useState(false);

  const handleBookingClick = () => {
    const defaultUrl = process.env.NEXT_PUBLIC_CALENDLY_URL_15 || "";
    onBookingClick(defaultUrl);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl"
    >
      <div
        className="flex items-center justify-between px-6 py-3 rounded-full backdrop-blur-md border shadow-lg transition-all duration-300"
        style={{
          background: isScrolled
            ? "rgba(255, 255, 255, 0.45)"
            : "rgba(255, 255, 255, 0.1)",
          borderColor: isScrolled
            ? "rgba(0, 0, 0, 0.1)"
            : "rgba(255, 255, 255, 0.2)",
          padding: "0.4rem 0.8rem",
        }}
      >
        {/* App Name */}
        <div
          className="font-semibold text-lg tracking-wide transition-colors duration-300"
          style={{
            color: isScrolled ? "#000000" : "#FFFFFF",
          }}
        >
          <Link href={"/"}>{t("title")}</Link>
        </div>

        {/* Right side: Language Toggle + Booking Button */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <div
            className="transition-colors duration-300"
            style={{
              color: isScrolled ? "#000000" : "#FFFFFF",
            }}
          >
            <LanguageToggle />
          </div>

          {/* Booking Button */}
          <button
            onClick={handleBookingClick}
            className="flex items-center justify-center w-10 h-10 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105"
            aria-label={t("phone")}
            style={{
              background: isScrolled
                ? "rgba(0, 0, 0, 0.1)"
                : "rgba(255, 255, 255, 0.2)",
            }}
          >
            <Phone
              className="w-5 h-5 transition-colors duration-300"
              style={{
                color: isScrolled ? "#000000" : "#FFFFFF",
              }}
            />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
