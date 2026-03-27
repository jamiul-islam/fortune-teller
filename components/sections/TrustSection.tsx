"use client";

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
    <SectionWrapper className="flex items-center justify-center bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          A reliable and confidential consultation
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {trustIndicators.map((indicator, index) => (
            <motion.div
              key={indicator.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-8 bg-card border border-border rounded-lg hover:shadow-md transition-shadow duration-200 min-h-[44px]"
            >
              <div className="text-6xl mb-6">{indicator.icon}</div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                {indicator.title}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                {indicator.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
