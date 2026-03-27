"use client";

import { motion } from "motion/react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";

interface FinalCTASectionProps {
  onCtaClick: () => void;
}

export default function FinalCTASection({ onCtaClick }: FinalCTASectionProps) {
  return (
    <SectionWrapper className="flex items-center justify-center bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Ready to discover your path?
          </h2>
          <p className="text-lg sm:text-xl text-primary-foreground/90 mb-10">
            Book your consultation now and receive immediate guidance
          </p>
          <Button
            variant="outline"
            size="lg"
            onClick={onCtaClick}
            className="bg-background text-foreground hover:bg-background/90 border-background"
          >
            Book a Reading
          </Button>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
