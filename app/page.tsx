"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import HeaderSection from "@/components/sections/HeaderSection";
import HeroSection from "@/components/sections/HeroSection";
import ConsultationCategoriesSection from "@/components/sections/ConsultationCategoriesSection";
import SocialProofSection from "@/components/sections/SocialProofSection";
import TrustSection from "@/components/sections/TrustSection";
import FinalCTASection from "@/components/sections/FinalCTASection";
import { CalendlyInlineEmbed } from "@/components/booking/CalendlyInlineEmbed";
import { YouTubeVideo } from "@/components/ui/YouTubeVideo";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Particles from "@/components/ui/Particles";

export default function Home() {
  const t = useTranslations();
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

      {/* Homepage Video Section */}
      {process.env.NEXT_PUBLIC_HOMEPAGE_VIDEO_URL && (
        <SectionWrapper
          className="relative py-12 md:py-16 bg-muted/30"
          style={{ padding: "4em 0" }}
        >
          {/* Particles Background */}
          <div className="absolute inset-0 z-0">
            <Particles
              particleColors={["#ffffff"]}
              particleCount={500}
              particleSpread={10}
              speed={0.1}
              particleBaseSize={100}
              moveParticlesOnHover
              alphaParticles
              disableRotation={false}
              pixelRatio={1}
            />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <div className="text-center mb-8 flex flex-col items-center justify-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("videoSection.title")}
              </h2>
              <p
                className="text-center text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
                style={{ margin: "0.8em 0" }}
              >
                {t("videoSection.subtitle")}
              </p>
            </div>
            <YouTubeVideo
              videoUrl={process.env.NEXT_PUBLIC_HOMEPAGE_VIDEO_URL}
              title="About Our Services"
            />
          </div>
        </SectionWrapper>
      )}

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
