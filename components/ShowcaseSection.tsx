"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { SHOWCASE_TABS, TECHNICAL_SPECS, EASE_SPRING, type ShowcaseTab } from "../lib/constants";

interface ShowcaseSectionProps {
  onReserveClick: () => void;
}

export default function ShowcaseSection({ onReserveClick }: ShowcaseSectionProps) {
  const [activeTab, setActiveTab] = useState<ShowcaseTab>(SHOWCASE_TABS[0]);
  const [videoError, setVideoError] = useState(false);

  const handleTabChange = (t: ShowcaseTab) => {
    setActiveTab(t);
    setVideoError(false);
  };

  return (
    <section id="showcase" className="relative py-24 sm:py-36 bg-[#0d0d0c] text-[#F6F3E9] px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#A6865E] font-semibold mb-3 block font-['Chillax-Medium',sans-serif]">
            GT Anatomy
          </span>
          <h2 className="font-['Rosaline-Regular',Georgia,serif] text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Mastery in Every Component
          </h2>
          <p className="text-sm sm:text-base text-[#E6E2D8]/70 leading-relaxed font-['Satoshi-Regular',sans-serif]">
            Engineered from single-piece forged composites and fluid acoustic dampening systems.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-2xl max-w-full overflow-x-auto no-scrollbar">
            {SHOWCASE_TABS.map((tab: ShowcaseTab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab)}
                className={`relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-['Chillax-Medium',sans-serif] transition-all whitespace-nowrap ${
                  activeTab.id === tab.id
                    ? "text-[#F6F3E9] font-semibold"
                    : "text-[#E6E2D8]/60 hover:text-white"
                }`}
              >
                {activeTab.id === tab.id && (
                  <motion.div
                    layoutId="activeTabBadge"
                    transition={EASE_SPRING}
                    className="absolute inset-0 rounded-full bg-white/20 border border-white/30 backdrop-blur-md"
                  />
                )}
                <span className="relative z-10">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Media Frame */}
        <div className="relative aspect-[4/5] sm:aspect-video rounded-3xl overflow-hidden border border-white/15 bg-black/60 shadow-2xl mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              {!videoError ? (
                <video
                  src={activeTab.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  onError={() => setVideoError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={activeTab.fallback}
                  alt={activeTab.name}
                  fill
                  className="object-cover"
                />
              )}
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-x-6 top-6 flex justify-between items-start pointer-events-none z-20">
            <div className="bg-[#0d0d0c]/70 backdrop-blur-xl px-3.5 py-1.5 rounded-xl border border-white/20">
              <span className="block text-[9px] uppercase tracking-widest text-[#A6865E] font-semibold">MODEL</span>
              <span className="text-xs font-mono font-bold text-white">{activeTab.hud.model}</span>
            </div>
            <div className="bg-[#0d0d0c]/70 backdrop-blur-xl px-3.5 py-1.5 rounded-xl border border-white/20 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[10px] font-mono font-semibold text-emerald-400">{activeTab.hud.status}</span>
            </div>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {TECHNICAL_SPECS.map((spec: { label: string; value: string; detail: string }) => (
            <div
              key={spec.label}
              className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl"
            >
              <span className="text-xs text-[#E6E2D8]/60 uppercase tracking-wider block mb-1 font-['Chillax-Regular',sans-serif]">
                {spec.label}
              </span>
              <span className="text-xl font-bold font-['Chillax-Bold',sans-serif] text-white block">
                {spec.value}
              </span>
              <span className="text-[11px] text-[#A6865E] mt-1 block font-mono">
                {spec.detail}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={onReserveClick}
            className="px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#F6F3E9] border border-[#A6865E]/50 bg-[#A6865E]/15 hover:bg-[#A6865E]/25 backdrop-blur-2xl transition-all font-['Chillax-Medium',sans-serif]"
          >
            Reserve This Specification
          </button>
        </div>
      </div>
    </section>
  );
}
