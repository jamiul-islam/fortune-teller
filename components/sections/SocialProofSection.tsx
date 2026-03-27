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
      className="relative flex items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #2d1b4e 0%, #3d2963 50%, #5b3a8f 100%)",
      }}
    >
      {/* Decorative elements */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, #7c4dff 0%, transparent 50%), radial-gradient(circle at 80% 80%, #ff6ec7 0%, transparent 50%)",
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
          They found their answers
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={testimonialVariants}
              whileHover={{
                scale: 1.02,
                y: -4,
                transition: { duration: 0.3 },
              }}
              className="relative rounded-2xl p-6 sm:p-7 md:p-8 backdrop-blur-xl overflow-hidden group"
              style={{
                background:
                  "linear-gradient(135deg, rgba(61, 41, 99, 0.8) 0%, rgba(45, 27, 78, 0.8) 100%)",
                borderLeft: "4px solid #ffd700",
                boxShadow: "0 8px 32px rgba(124, 77, 255, 0.2)",
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow: "0 0 40px rgba(255, 215, 0, 0.2)",
                }}
              />

              {/* Star Rating */}
              <div className="flex gap-1 mb-4 sm:mb-5 md:mb-6 relative z-10">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="url(#gold-gradient)"
                    viewBox="0 0 20 20"
                  >
                    <defs>
                      <linearGradient
                        id="gold-gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#ffd700" />
                        <stop offset="100%" stopColor="#ffed4e" />
                      </linearGradient>
                    </defs>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Testimonial Content */}
              <p
                className="text-base sm:text-lg mb-4 sm:mb-5 md:mb-6 leading-relaxed relative z-10 italic"
                style={{
                  color: "#f8f7ff",
                  fontFamily: "var(--font-body)",
                }}
              >
                "{testimonial.content}"
              </p>

              {/* Client Name */}
              <p
                className="text-sm sm:text-base font-semibold relative z-10"
                style={{
                  fontFamily: "var(--font-accent)",
                  color: "#ffd700",
                }}
              >
                — {testimonial.clientName}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
