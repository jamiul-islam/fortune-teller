"use client";

import HeroSection from "@/components/sections/HeroSection";

export default function Home() {
  const handleCtaClick = () => {
    // Scroll to booking section or handle CTA action
    console.log("CTA clicked");
  };

  return (
    <main>
      <HeroSection
        videoUrl={process.env.NEXT_PUBLIC_HERO_VIDEO_URL || ""}
        onCtaClick={handleCtaClick}
      />
    </main>
  );
}
