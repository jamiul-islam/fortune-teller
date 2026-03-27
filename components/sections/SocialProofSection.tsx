"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, stagger } from "motion/react";
import SectionWrapper from "@/components/ui/SectionWrapper";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: stagger(0.15, { startDelay: 0.3 }),
    },
  },
};

const testimonialVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
    },
  },
};

export default function SocialProofSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <SectionWrapper
      ref={sectionRef}
      className="bg-[#922B21] text-[#F5F0EB] flex items-center justify-center py-16 px-4"
    >
      <motion.div style={{ opacity }} className="w-full max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 md:mb-16"
        >
          They found their answers
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={testimonialVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                transition: { duration: 0.3 },
              }}
              className="bg-[#1A1A1A] rounded-lg p-6 md:p-8 shadow-xl flex flex-col"
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-[#C0392B]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Testimonial Content */}
              <p className="text-base md:text-lg text-[#F5F0EB]/90 mb-6 flex-grow leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Client Name */}
              <p className="text-sm md:text-base font-semibold text-[#C0392B]">
                — {testimonial.clientName}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
