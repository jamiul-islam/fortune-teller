"use client";

import HeroSection from "@/components/sections/HeroSection";
import ConsultationCategoriesSection from "@/components/sections/ConsultationCategoriesSection";
import SocialProofSection from "@/components/sections/SocialProofSection";

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
      <ConsultationCategoriesSection />
      <SocialProofSection />
    </main>
  );
}
