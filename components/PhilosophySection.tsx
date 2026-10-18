"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PHILOSOPHY_CARDS, EASE_SPRING } from "@/lib/constants";

export default function PhilosophySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));

      if (progress < 0.33) {
        setActiveCard(0);
      } else if (progress < 0.66) {
        setActiveCard(1);
      } else {
        setActiveCard(2);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={containerRef} id="philosophy" className="relative h-[300vh] w-full bg-[#0d0d0c] text-[#F6F3E9]">
      {/* Sticky Background Video Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {PHILOSOPHY_CARDS.map((card, idx) => (
          <video
            key={card.video}
            src={card.video}
            autoPlay
            loop
            muted
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              activeCard === idx ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
            }`}
            style={{ transition: "opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1.5s cubic-bezier(0.16, 1, 0.3, 1)" }}
          />
        ))}

        {/* Ambient Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0c] via-black/40 to-[#0d0d0c]/80" />

        {/* Interactive Floating Card */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCard}
              initial={{ opacity: 0, y: 30, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -25, scale: 0.97 }}
              transition={EASE_SPRING}
              className="max-w-lg w-full p-8 sm:p-12 rounded-3xl bg-white/[0.08] border border-white/25 backdrop-blur-3xl shadow-[0_25px_60px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.35)] text-center"
            >
              <span className="inline-block text-xs uppercase tracking-[0.25em] text-[#A6865E] font-semibold mb-3 font-['Chillax-Medium',sans-serif]">
                {PHILOSOPHY_CARDS[activeCard].kicker}
              </span>
              <h2 className="font-['Rosaline-Regular',Georgia,serif] text-2xl sm:text-4xl font-bold mb-4 leading-snug">
                {PHILOSOPHY_CARDS[activeCard].title}
              </h2>
              <p className="text-sm sm:text-base text-[#E6E2D8]/80 leading-relaxed font-['Satoshi-Regular',sans-serif]">
                {PHILOSOPHY_CARDS[activeCard].desc}
              </p>

              {/* Progress dots */}
              <div className="flex justify-center items-center gap-2 mt-8">
                {PHILOSOPHY_CARDS.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      activeCard === i ? "w-6 bg-[#A6865E]" : "w-1.5 bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
