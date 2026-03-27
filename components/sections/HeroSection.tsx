"use client";

import React, { useState } from "react";
import * as motion from "motion/react-client";
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
    <SectionWrapper className="relative overflow-hidden">
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
                height: "56.25vw", // 16:9 aspect ratio
                minHeight: "100vh",
                minWidth: "177.77vh", // 16:9 aspect ratio
              }}
            />
          </div>
        ) : (
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#7b241c] via-[#922b21] to-[#c0392b]"
            role="img"
            aria-label="Mystical background"
          />
        )}
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-[#1a1a1a]/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#f5f0eb] mb-6 max-w-4xl"
        >
          Your future is trying to speak to you
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: "easeOut",
          }}
          className="text-xl md:text-2xl lg:text-3xl text-[#f5f0eb] mb-12 max-w-2xl"
        >
          Clarity. Guidance. Immediate answers
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.4,
            ease: "easeOut",
          }}
        >
          <Button
            variant="primary"
            onClick={onCtaClick}
            className="text-lg px-8 py-4"
          >
            Book a Reading
          </Button>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
