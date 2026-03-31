"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import Particles from "../ui/Particles";
import { useTranslations } from "next-intl";

interface Category {
  id: string;
  title: string;
  subcategories: string[];
  icon: string;
}

interface ConsultationCategoriesSectionProps {
  onBookingClick: () => void;
}

export default function ConsultationCategoriesSection({
  onBookingClick,
}: ConsultationCategoriesSectionProps) {
  const t = useTranslations("categories");
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const categories: Category[] = [
    {
      id: "love",
      title: t("love.title"),
      icon: "💕",
      subcategories: t.raw("love.items") as string[],
    },
    {
      id: "career",
      title: t("career.title"),
      icon: "✨",
      subcategories: t.raw("career.items") as string[],
    },
    {
      id: "health",
      title: t("health.title"),
      icon: "🌿",
      subcategories: t.raw("health.items") as string[],
    },
    {
      id: "natural",
      title: t("treatments.title"),
      icon: "🔮",
      subcategories: t.raw("treatments.items") as string[],
    },
    {
      id: "destiny",
      title: t("destiny.title"),
      icon: "⭐",
      subcategories: t.raw("destiny.items") as string[],
    },
    {
      id: "specific",
      title: t("questions.title"),
      icon: "💫",
      subcategories: t.raw("questions.items") as string[],
    },
  ];

  return (
    <SectionWrapper
      ref={sectionRef}
      className="relative flex items-center justify-center py-20 px-4 sm:px-6 md:px-8 bg-muted/30"
      style={{ padding: " 0 .8em" }}
    >
      {/* Particles Background */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={["#ffffff"]}
          particleCount={500}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles
          disableRotation={false}
          pixelRatio={1}
        />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full max-w-7xl"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16"
          style={{ fontFamily: "var(--font-serif)", marginBottom: ".8em" }}
        >
          {t("title")}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                style={{ padding: ".8em" }}
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
                  <ul className="space-y-3 mb-6">
                    {category.subcategories.map((sub, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-muted-foreground flex items-start leading-relaxed"
                      >
                        <span className="mr-2 mt-1">{sub}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Book Now Button */}
                  <Button
                    variant="default"
                    size="default"
                    onClick={onBookingClick}
                    className="w-full"
                  >
                    {t("bookNow")}
                  </Button>
                </CardContent>
              </MotionCard>
            );
          })}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
