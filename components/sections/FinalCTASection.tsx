"use client";

import React from "react";
import { motion } from "motion/react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";

interface FinalCTASectionProps {
  onCtaClick: () => void;
}

export default function FinalCTASection({ onCtaClick }: FinalCTASectionProps) {
  return (
    <SectionWrapper className="flex items-center justify-center bg-linear-to-br from-crimson-dark via-crimson to-crimson-light">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-off-white mb-4 sm:mb-5 md:mb-6 px-2">
            Ready to discover your path?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-off-white/90 mb-8 sm:mb-10 md:mb-12 px-2">
            Book your consultation now and receive immediate guidance
          </p>
          <Button
            variant="primary"
            onClick={onCtaClick}
            className="text-base sm:text-lg md:text-xl bg-off-white text-crimson-light hover:bg-off-white/90"
          >
            Book a Reading
          </Button>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
