"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";

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

  // Parallax effect for background
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 0.8, 0],
  );

  // Extract YouTube video ID from URL
  const getYouTubeEmbedUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      let videoId = "";

      // Handle already-embedded URLs
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
    <SectionWrapper ref={sectionRef} className="relative overflow-hidden">
      {/* Cosmic Background with Parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
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
          <div
            className="absolute inset-0 bg-cosmic-purple-900"
            role="img"
            aria-label="Mystical cosmic background"
          />
        )}
        {/* Gradient overlay for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10, 1, 24, 0) 0%, rgba(10, 1, 24, 0.8) 100%)",
          }}
        />
      </motion.div>

      {/* Content with fade on scroll */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 md:px-8 text-center"
        style={{ opacity: contentOpacity }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-4 sm:mb-6 max-w-5xl leading-tight px-2"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            background: "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "0 0 40px rgba(255, 215, 0, 0.3)",
          }}
        >
          Your future is trying to speak to you
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-pearl-white mb-8 sm:mb-10 md:mb-12 max-w-3xl px-2"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            textShadow: "0 2px 20px rgba(248, 247, 255, 0.2)",
          }}
        >
          Clarity. Guidance. Immediate answers
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.4,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <Button
            variant="primary"
            onClick={onCtaClick}
            className="text-base sm:text-lg md:text-xl font-semibold"
          >
            Book a Reading
          </Button>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
