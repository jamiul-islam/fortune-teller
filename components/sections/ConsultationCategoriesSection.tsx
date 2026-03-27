"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, stagger } from "motion/react";
import SectionWrapper from "@/components/ui/SectionWrapper";

interface Category {
  id: string;
  title: string;
  subcategories: string[];
}

const categories: Category[] = [
  {
    id: "love",
    title: "Love & Relationships",
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
    subcategories: [
      "Business success",
      "Career blockage",
      "Financial opportunities",
    ],
  },
  {
    id: "health",
    title: "Health & Energy",
    subcategories: ["Natural healing", "Energy cleansing", "Emotional balance"],
  },
  {
    id: "natural",
    title: "Natural Treatments",
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
    subcategories: ["Luck", "Destiny", "Spiritual messages", "Life path"],
  },
  {
    id: "specific",
    title: "Specific Questions",
    subcategories: ["Any personal question"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: stagger(0.1, { startDelay: 0.2 }),
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function ConsultationCategoriesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <SectionWrapper
      ref={sectionRef}
      className="bg-[#1A1A1A] text-[#F5F0EB] flex items-center justify-center py-16 px-4"
    >
      <motion.div style={{ opacity }} className="w-full max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 md:mb-16"
        >
          What is your urgent concern today?
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={cardVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              className="bg-[#C0392B] rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow"
            >
              <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-[#F5F0EB]">
                {category.title}
              </h3>
              <ul className="space-y-2">
                {category.subcategories.map((sub, index) => (
                  <li
                    key={index}
                    className="text-sm md:text-base text-[#F5F0EB]/90 flex items-start"
                  >
                    <span className="mr-2 text-[#F5F0EB]">•</span>
                    <span>{sub}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
