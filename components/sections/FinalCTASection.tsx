"use client";

import React from "react";
import * as motion from "motion/react-client";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";

interface FinalCTASectionProps {
  onCtaClick: () => void;
}

export default function FinalCTASection({ onCtaClick }: FinalCTASectionProps) {
  return (
    <SectionWrapper className="flex items-center justify-center bg-gradient-to-br from-[#7b241c] via-[#922b21] to-[#c0392b]">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#f5f0eb] mb-6">
            Ready to discover your path?
          </h2>
          <p className="text-lg md:text-xl text-[#f5f0eb]/90 mb-12">
            Book your consultation now and receive immediate guidance
          </p>
          <Button
            variant="primary"
            onClick={onCtaClick}
            className="text-lg px-8 py-4 bg-[#f5f0eb] text-[#c0392b] hover:bg-[#f5f0eb]/90"
          >
            Book a Reading
          </Button>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
