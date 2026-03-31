"use client";

import { useState } from "react";
import { motion } from "motion/react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { NativeSelect } from "@/components/ui/native-select";
import { useTranslations } from "next-intl";

interface FinalCTASectionProps {
  onCtaClick: (calendlyUrl: string) => void;
}

export default function FinalCTASection({ onCtaClick }: FinalCTASectionProps) {
  const [selectedDuration, setSelectedDuration] = useState<string>("15");
  const t = useTranslations("finalCta");

  const calendlyUrls = {
    "15": process.env.NEXT_PUBLIC_CALENDLY_URL_15 || "",
    "30": process.env.NEXT_PUBLIC_CALENDLY_URL_30 || "",
    "60": process.env.NEXT_PUBLIC_CALENDLY_URL_45 || "",
  };

  const handleBooking = () => {
    const url = calendlyUrls[selectedDuration as keyof typeof calendlyUrls];
    if (url) {
      onCtaClick(url);
    }
  };

  return (
    <SectionWrapper className="flex items-center justify-center bg-primary text-primary-foreground">
      <div className="container mx-auto flex justify-center px-4 sm:px-6 md:px-8 text-center py-20">
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
          <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 w-full max-w-3xl mx-auto">
            <NativeSelect
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="w-full md:flex-1 text-base font-medium shadow-lg max-w-full md:max-w-fit text-center"
              style={{
                backgroundColor: "#FFFFFF",
                color: "#000000",
                padding: "0.8em",
                height: "auto",
              }}
            >
              <option value="15">{t("duration15")}</option>
              <option value="30">{t("duration30")}</option>
              <option value="60">{t("duration60")}</option>
            </NativeSelect>
            <Button
              variant="outline"
              size="lg"
              onClick={handleBooking}
              className="font-semibold text-md px-8 py-6 h-auto shadow-2xl w-full md:w-auto md:shrink-0"
              style={{
                backgroundColor: "#FFFFFF",
                color: "#000000",
                padding: ".8em",
              }}
            >
              {t("cta")}
            </Button>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
