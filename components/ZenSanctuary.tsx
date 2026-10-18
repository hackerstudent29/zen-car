"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ZEN_QUOTES, EASE_SPRING } from "@/lib/constants";
import { audioEngine } from "./AudioEngine";
import { X, Sparkles } from "lucide-react";

interface ZenSanctuaryProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ZenSanctuary({ isOpen, onClose }: ZenSanctuaryProps) {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    // Start serene audio if not already playing
    if (audioEngine && !audioEngine.active) {
      audioEngine.play();
    }

    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % ZEN_QUOTES.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between p-8 sm:p-12 bg-[#080808]/95 backdrop-blur-2xl text-[#F6F3E9]"
        >
          {/* Header */}
          <div className="w-full flex items-center justify-between max-w-4xl">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#A6865E]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#A6865E] font-['Chillax-Medium',sans-serif]">
                Sanctuary Mode
              </span>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={EASE_SPRING}
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#E6E2D8] transition-colors"
              aria-label="Exit Zen Mode"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Central Breathing Silhouette */}
          <div className="flex flex-col items-center justify-center my-auto text-center max-w-xl">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.85, 1, 0.85],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-72 sm:w-96 aspect-[16/9] mb-8"
            >
              <Image
                src="/antigravity images/car top side angle hero pose.png"
                alt="ZEN GT sanctuary ambient visualization in stillness"
                fill
                className="object-contain drop-shadow-[0_0_50px_rgba(166,134,94,0.3)]"
              />
            </motion.div>

            {/* Cycling Zen Quotes */}
            <AnimatePresence mode="wait">
              <motion.div
                key={quoteIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.8 }}
                className="min-h-[100px] flex flex-col items-center justify-center"
              >
                <p className="font-['Rosaline-Regular',Georgia,serif] text-2xl sm:text-3xl text-[#F6F3E9] mb-3 italic">
                  &ldquo;{ZEN_QUOTES[quoteIndex].quote}&rdquo;
                </p>
                <span className="text-xs uppercase tracking-widest text-[#A6865E] font-mono">
                  — {ZEN_QUOTES[quoteIndex].author}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Exit Action */}
          <div className="pb-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={EASE_SPRING}
              onClick={onClose}
              className="px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold text-[#E6E2D8] bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all"
            >
              Return to Reality
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
