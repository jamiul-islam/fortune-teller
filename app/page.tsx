"use client";

import HeaderSection from "@/components/sections/HeaderSection";
import HeroSection from "@/components/sections/HeroSection";
import ConsultationCategoriesSection from "@/components/sections/ConsultationCategoriesSection";
import SocialProofSection from "@/components/sections/SocialProofSection";
import TrustSection from "@/components/sections/TrustSection";
import FinalCTASection from "@/components/sections/FinalCTASection";

export default function Home() {
  const handleCtaClick = () => {
    // TODO: Implement Calendly inline embed modal/section
    console.log("CTA clicked - Book a Reading");
  };

  return (
    <main>
      <HeaderSection appName="iTellFortune" onBookingClick={handleCtaClick} />
      <HeroSection
        videoUrl={process.env.NEXT_PUBLIC_HERO_VIDEO_URL || ""}
        onCtaClick={handleCtaClick}
      />
      <ConsultationCategoriesSection />
      <SocialProofSection />
      <TrustSection />
      <FinalCTASection onCtaClick={handleCtaClick} />
    </main>
  );
}
