"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { EASE_SPRING } from "@/lib/constants";
import { ShieldCheck } from "lucide-react";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("zen_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChoice = (accepted: boolean) => {
    localStorage.setItem("zen_cookie_consent", accepted ? "accepted" : "declined");
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.aside
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={EASE_SPRING}
          className="fixed bottom-6 right-6 left-6 sm:left-auto sm:max-w-md z-40 p-5 rounded-2xl bg-[#141413]/80 border border-white/30 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.35)] text-[#F6F3E9]"
        >
          <div className="flex items-start gap-3 mb-3">
            <div className="p-2 rounded-lg bg-[#A6865E]/10 text-[#A6865E] shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-wider uppercase text-[#F6F3E9] font-['Chillax-Medium',sans-serif]">
                Mindful Privacy & Telemetry
              </h4>
              <p className="text-xs text-[#E6E2D8]/70 mt-1 leading-relaxed">
                We respect your sanctuary. ZEN uses minimal telemetry to ensure seamless canvas rendering. Read our{" "}
                <Link href="/privacy" className="text-[#A6865E] underline underline-offset-2">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/5">
            <button
              onClick={() => handleChoice(false)}
              className="px-3 py-1.5 rounded-lg text-[11px] font-medium text-[#E6E2D8]/60 hover:text-[#F6F3E9] transition-colors"
            >
              Essential Only
            </button>
            <button
              onClick={() => handleChoice(true)}
              className="px-4 py-1.5 rounded-lg text-[11px] font-semibold text-[#0d0d0c] bg-[#F6F3E9] hover:bg-white transition-colors"
            >
              Accept All
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
