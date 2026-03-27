"use client";

import React from "react";
import * as motion from "motion/react-client";
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
    <SectionWrapper className="flex items-center justify-center bg-[#f5f0eb]">
      <div className="container mx-auto px-4 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#1a1a1a] mb-16"
        >
          A reliable and confidential consultation
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
              className="flex flex-col items-center text-center p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-6xl mb-6">{indicator.icon}</div>
              <h3 className="text-xl md:text-2xl font-semibold text-[#c0392b] mb-4">
                {indicator.title}
              </h3>
              <p className="text-base md:text-lg text-[#1a1a1a]/80">
                {indicator.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
