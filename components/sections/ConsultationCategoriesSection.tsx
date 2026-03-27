"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Category {
  id: string;
  title: string;
  subcategories: string[];
  icon: string;
}

const categories: Category[] = [
  {
    id: "love",
    title: "Love & Relationships",
    icon: "💕",
    subcategories: [
      "Love problems",
      "Couple repair",
      "Reconciliation",
      "Soulmate guidance",
      "Breakups",
    ],
  },
  {
    id: "career",
    title: "Career & Success",
    icon: "✨",
    subcategories: [
      "Business success",
      "Career blockage",
      "Financial opportunities",
    ],
  },
  {
    id: "health",
    title: "Health & Energy",
    icon: "🌿",
    subcategories: ["Natural healing", "Energy cleansing", "Emotional balance"],
  },
  {
    id: "natural",
    title: "Natural Treatments",
    icon: "🔮",
    subcategories: [
      "Natural healing for all illnesses",
      "Energy via natural treatment",
      "Feminine fertility",
      "Masculine fertility",
      "Feminine endurance",
      "Masculine endurance",
      "Natural recovery for complex conditions",
    ],
  },
  {
    id: "destiny",
    title: "Destiny & Spirituality",
    icon: "⭐",
    subcategories: ["Luck", "Destiny", "Spiritual messages", "Life path"],
  },
  {
    id: "specific",
    title: "Specific Questions",
    icon: "💫",
    subcategories: ["Any personal question"],
  },
];

export default function ConsultationCategoriesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <SectionWrapper
      ref={sectionRef}
      className="relative flex items-center justify-center py-20 px-4 sm:px-6 md:px-8 bg-muted/30"
    >
      <motion.div style={{ opacity }} className="w-full max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          What is your urgent concern today?
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const MotionCard = motion(Card);
            return (
              <MotionCard
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="hover:shadow-md transition-shadow duration-200 min-h-[44px]"
              >
                <CardHeader className="pb-4">
                  {/* Icon */}
                  <div className="text-5xl mb-4">{category.icon}</div>
                  <CardTitle className="text-xl font-bold">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  {/* Subcategories */}
                  <ul className="space-y-3">
                    {category.subcategories.map((sub, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-muted-foreground flex items-start leading-relaxed"
                      >
                        <span className="mr-2 mt-1">•</span>
                        <span>{sub}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </MotionCard>
            );
          })}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
