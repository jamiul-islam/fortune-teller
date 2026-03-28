"use client";

import { motion } from "motion/react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { useTranslations } from "next-intl";

interface FinalCTASectionProps {
  onCtaClick: () => void;
}

export default function FinalCTASection({ onCtaClick }: FinalCTASectionProps) {
  const t = useTranslations("finalCta");

  return (
    <SectionWrapper className="flex items-center justify-center bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className=" mx-auto"
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {t("title")}
          </h2>
          <p
            className="text-lg sm:text-xl text-primary-foreground/90 mb-10"
            style={{ padding: "0.8em 0" }}
          >
            {t("subtitle")}
          </p>
          <Button
            variant="outline"
            size="lg"
            onClick={onCtaClick}
            className="font-semibold text-lg px-8 py-6 h-auto shadow-2xl"
            style={{
              backgroundColor: "#FFFFFF",
              color: "#000000",
              padding: ".8em",
            }}
          >
            {t("cta")}
          </Button>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
