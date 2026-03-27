"use client";

import { useState, useRef } from "react";
import { motion } from "motion/react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";

interface HeroSectionProps {
  videoUrl: string;
  onCtaClick: () => void;
}

export default function HeroSection({
  videoUrl,
  onCtaClick,
}: HeroSectionProps) {
  const [videoError, setVideoError] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
        {/* Dark overlay for text readability - 70% opacity */}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content - Vertically and horizontally centered */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 md:px-8 text-center max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight text-white"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Your future is trying to speak to you
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="text-lg sm:text-xl md:text-2xl text-white/90 mb-12 max-w-2xl"
        >
          Clarity. Guidance. Immediate answers
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <Button
            variant="default"
            size="lg"
            onClick={onCtaClick}
            className="bg-white text-black hover:bg-white/90 font-semibold text-lg px-8 py-6 h-auto"
          >
            Book a Reading
          </Button>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
