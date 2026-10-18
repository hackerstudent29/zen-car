"use client";

import { motion } from "motion/react";
import { EASE_SPRING } from "@/lib/constants";

interface FinaleSectionProps {
  onOpenReserve: () => void;
}

export default function FinaleSection({ onOpenReserve }: FinaleSectionProps) {
  return (
    <section id="finale" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0d0d0c] text-[#F6F3E9]">
      <video
        src="/antigravity images/car drift shot in city road.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0c] via-black/30 to-[#0d0d0c]" />

      <div className="relative z-10 text-center px-6 max-w-xl">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={EASE_SPRING}
          className="inline-block text-xs uppercase tracking-[0.25em] text-[#A6865E] font-semibold mb-4 font-['Chillax-Medium',sans-serif]"
        >
          ALLOCATION QUEUE NOW OPEN
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...EASE_SPRING, delay: 0.1 }}
          className="font-['Rosaline-Regular',Georgia,serif] text-4xl sm:text-6xl font-bold mb-8 leading-tight tracking-tight"
        >
          Command the Silence.
        </motion.h2>
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          transition={EASE_SPRING}
          onClick={onOpenReserve}
          className="px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider text-[#0d0d0c] bg-[#F6F3E9] hover:bg-white shadow-[0_15px_40px_rgba(246,243,233,0.3)] transition-all"
        >
          Reserve the GT
        </motion.button>
      </div>
    </section>
  );
}
