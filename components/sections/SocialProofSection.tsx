"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Card, CardContent } from "@/components/ui/card";

interface Testimonial {
  id: string;
  clientName: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    clientName: "Sarah M.",
    content:
      "I was lost and confused about my relationship. After the consultation, everything became clear. The guidance I received was exactly what I needed to move forward with confidence.",
    rating: 5,
  },
  {
    id: "2",
    clientName: "James T.",
    content:
      "The career advice I received was spot on. Within weeks of following the guidance, I received the promotion I'd been hoping for. Truly life-changing.",
    rating: 5,
  },
  {
    id: "3",
    clientName: "Emma L.",
    content:
      "I was skeptical at first, but the reading was incredibly accurate. The fortune note I received resonated deeply with my situation. I finally have the clarity I was searching for.",
    rating: 5,
  },
];

export default function SocialProofSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <SectionWrapper
      ref={sectionRef}
      className="relative flex items-center justify-center py-20 px-4 sm:px-6 md:px-8 bg-background"
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
          They found their answers
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            const MotionCard = motion(Card);
            return (
              <MotionCard
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="hover:shadow-md transition-shadow duration-200"
              >
                <CardContent className="space-y-4">
                  {/* Star Rating */}
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 fill-accent-gold"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Testimonial Content */}
                  <p className="text-base text-foreground leading-relaxed italic">
                    "{testimonial.content}"
                  </p>

                  {/* Client Name */}
                  <p className="text-sm font-medium text-muted-foreground pt-2">
                    — {testimonial.clientName}
                  </p>
                </CardContent>
              </MotionCard>
            );
          })}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
