"use client";

import { useState, useRef } from "react";
import { motion } from "motion/react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { NativeSelect } from "@/components/ui/native-select";
import { useTranslations } from "next-intl";

interface HeroSectionProps {
  videoUrl: string;
  onCtaClick: (calendlyUrl: string) => void;
}

export default function HeroSection({
  videoUrl,
  onCtaClick,
}: HeroSectionProps) {
  const [videoError, setVideoError] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState<string>("15");
  const sectionRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("hero");

  const calendlyUrls = {
    "15": process.env.NEXT_PUBLIC_CALENDLY_URL_15 || "",
    "30": process.env.NEXT_PUBLIC_CALENDLY_URL_30 || "",
    "60": process.env.NEXT_PUBLIC_CALENDLY_URL_45 || "",
  };

  const handleBooking = () => {
    const url = calendlyUrls[selectedDuration as keyof typeof calendlyUrls];
    if (url) {
      onCtaClick(url);
    }
  };

  // Extract YouTube video ID from URL
  const getYouTubeEmbedUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      let videoId = "";

      if (urlObj.pathname.includes("/embed/")) {
        videoId = urlObj.pathname.split("/embed/")[1].split("?")[0];
      } else if (urlObj.hostname.includes("youtube.com")) {
        videoId = urlObj.searchParams.get("v") || "";
      } else if (urlObj.hostname.includes("youtu.be")) {
        videoId = urlObj.pathname.slice(1);
      }

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`;
      }
    } catch (error) {
      console.error("Invalid video URL:", error);
    }
    return null;
  };

  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  return (
    <SectionWrapper
      ref={sectionRef}
      className="relative overflow-hidden bg-background"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        {!videoError && embedUrl ? (
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <iframe
              src={embedUrl}
              title="Hero Background Video"
              className="absolute pointer-events-none"
              allow="autoplay; encrypted-media"
              onError={() => setVideoError(true)}
              style={{
                border: "none",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100vw",
                height: "56.25vw",
                minHeight: "100vh",
                minWidth: "177.77vh",
              }}
            />
          </div>
        ) : (
          <div className="absolute inset-0 bg-muted" />
        )}
        {/* Dark overlay for text readability - 75% opacity */}
        <div className="absolute inset-0 bg-black/75" />
      </div>

      {/* Content - Vertically and horizontally centered */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 text-center mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
          style={{
            fontFamily: "var(--font-serif)",
            color: "#FFFFFF",
            textShadow: "0 2px 8px rgba(0, 0, 0, 0.8)",
          }}
        >
          {t("title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="text-lg sm:text-xl md:text-2xl mb-12 max-w-2xl"
          style={{
            color: "rgba(255, 255, 255, 0.85)",
            textShadow: "0 2px 6px rgba(0, 0, 0, 0.7)",
            padding: ".8em 0",
          }}
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col md:flex-row items-stretch gap-4 w-full max-w-3xl"
        >
          <NativeSelect
            value={selectedDuration}
            onChange={(e) => setSelectedDuration(e.target.value)}
            className="w-full md:flex-1 text-base font-medium shadow-lg"
            style={{
              backgroundColor: "#FFFFFF",
              color: "#000000",
              padding: "0.8em",
              height: "auto",
            }}
          >
            <option value="15">{t("duration15")}</option>
            <option value="30">{t("duration30")}</option>
            <option value="60">{t("duration60")}</option>
          </NativeSelect>
          <Button
            variant="default"
            size="lg"
            onClick={handleBooking}
            className="font-semibold text-lg px-8 py-6 h-auto shadow-2xl w-full md:w-auto md:shrink-0"
            style={{
              backgroundColor: "#FFFFFF",
              color: "#000000",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
              padding: ".8em",
            }}
          >
            {t("cta")}
          </Button>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
