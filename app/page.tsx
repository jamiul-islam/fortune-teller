"use client";

import { useState } from "react";
import HeaderSection from "@/components/sections/HeaderSection";
import HeroSection from "@/components/sections/HeroSection";
import ConsultationCategoriesSection from "@/components/sections/ConsultationCategoriesSection";
import SocialProofSection from "@/components/sections/SocialProofSection";
import TrustSection from "@/components/sections/TrustSection";
import FinalCTASection from "@/components/sections/FinalCTASection";
import { CalendlyInlineEmbed } from "@/components/booking/CalendlyInlineEmbed";

export default function Home() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [selectedCalendlyUrl, setSelectedCalendlyUrl] = useState<string>("");

  const handleCtaClick = (calendlyUrl: string) => {
    setSelectedCalendlyUrl(calendlyUrl);
    setIsCalendlyOpen(true);
  };

  const handleCloseCalendly = () => {
    setIsCalendlyOpen(false);
  };

  return (
    <main>
      <HeaderSection onBookingClick={handleCtaClick} />
      <HeroSection
        videoUrl={process.env.NEXT_PUBLIC_HERO_VIDEO_URL || ""}
        onCtaClick={handleCtaClick}
      />
      <ConsultationCategoriesSection onBookingClick={handleCtaClick} />
      <SocialProofSection />
      <TrustSection />
      <FinalCTASection onCtaClick={handleCtaClick} />

      <CalendlyInlineEmbed
        isOpen={isCalendlyOpen}
        onClose={handleCloseCalendly}
        calendlyUrl={selectedCalendlyUrl}
      />
    </main>
  );
}
