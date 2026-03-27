"use client";

import React from "react";
import { motion } from "motion/react";
import SectionWrapper from "@/components/ui/SectionWrapper";

interface TrustIndicator {
  id: string;
  icon: string;
  title: string;
  description: string;
}

const trustIndicators: TrustIndicator[] = [
  {
    id: "confidentiality",
    icon: "🔒",
    title: "Confidentiality",
    description:
      "Your personal information and consultation details remain completely private and secure",
  },
  {
    id: "immediate-response",
    icon: "⚡",
    title: "Immediate Response",
    description:
      "Receive instant confirmation and expect a callback within minutes of booking",
  },
  {
    id: "personalized-guidance",
    icon: "✨",
    title: "Personalized Guidance",
    description:
      "Every reading is tailored specifically to your unique situation and concerns",
  },
];

export default function TrustSection() {
  return (
    <SectionWrapper className="flex items-center justify-center bg-off-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-14 md:py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-near-black mb-10 sm:mb-12 md:mb-16 px-2"
        >
          A reliable and confidential consultation
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 md:gap-8 max-w-6xl mx-auto">
          {trustIndicators.map((indicator, index) => (
            <motion.div
              key={indicator.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
              }}
              className="flex flex-col items-center text-center p-6 sm:p-7 md:p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 min-h-[44px]"
            >
              <div className="text-5xl sm:text-6xl mb-4 sm:mb-5 md:mb-6">
                {indicator.icon}
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-crimson-light mb-3 sm:mb-4">
                {indicator.title}
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-near-black/80">
                {indicator.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
