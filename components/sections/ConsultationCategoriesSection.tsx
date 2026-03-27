"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, stagger } from "motion/react";
import SectionWrapper from "@/components/ui/SectionWrapper";

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

  // Parallax effect for decorative elements
  const glowY1 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const glowY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <SectionWrapper
      ref={sectionRef}
      className="relative flex items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #1a0b2e 0%, #2d1b4e 50%, #3d2963 100%)",
      }}
    >
      {/* Decorative glow effects with parallax */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, #7c4dff 0%, transparent 70%)",
          y: glowY1,
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, #ff6ec7 0%, transparent 70%)",
          y: glowY2,
        }}
      />

      <motion.div
        style={{ opacity }}
        className="w-full max-w-7xl relative z-10"
      >
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20 px-2"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            background: "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          What is your urgent concern today?
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                y: -8,
                transition: { duration: 0.3 },
              }}
              className="relative rounded-2xl p-6 sm:p-7 md:p-8 backdrop-blur-xl overflow-hidden group cursor-pointer min-h-[44px]"
              style={{
                background: "rgba(61, 41, 99, 0.6)",
                border: "1px solid rgba(124, 77, 255, 0.3)",
                boxShadow: "0 8px 32px rgba(124, 77, 255, 0.2)",
              }}
            >
              {/* Hover glow effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(124, 77, 255, 0.1) 0%, transparent 70%)",
                }}
              />

              {/* Icon */}
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 relative z-10">
                {category.icon}
              </div>

              {/* Title */}
              <h3
                className="text-xl sm:text-2xl md:text-3xl mb-3 sm:mb-4 relative z-10"
                style={{
                  fontFamily: "var(--font-accent)",
                  fontWeight: 600,
                  color: "#f8f7ff",
                }}
              >
                {category.title}
              </h3>

              {/* Subcategories */}
              <ul className="space-y-1.5 sm:space-y-2 relative z-10">
                {category.subcategories.map((sub, index) => (
                  <li
                    key={index}
                    className="text-xs sm:text-sm md:text-base flex items-start"
                    style={{
                      color: "#b8b5c8",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    <span className="mr-2 text-mystic-gold">•</span>
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
