"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { SHOWCASE_TABS, TECHNICAL_SPECS, EASE_SPRING } from "@/lib/constants";

interface ShowcaseSectionProps {
  onOpenReserve: () => void;
}

export default function ShowcaseSection({ onOpenReserve }: ShowcaseSectionProps) {
  const [activeTabId, setActiveTabId] = useState(SHOWCASE_TABS[0].id);
  const activeTab = SHOWCASE_TABS.find((t) => t.id === activeTabId) || SHOWCASE_TABS[0];
  const [videoError, setVideoError] = useState(false);

  return (
    <section id="showcase" className="relative py-28 px-6 bg-[#0d0d0c] text-[#F6F3E9] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs uppercase tracking-[0.25em] text-[#A6865E] mb-3 font-semibold font-['Chillax-Medium',sans-serif]">
            ENGINEERING HARMONY
          </span>
          <h2 className="font-['Rosaline-Regular',Georgia,serif] text-3xl sm:text-5xl font-bold mb-4 tracking-tight">
            The ZEN GT Anatomy
          </h2>
          <p className="text-sm sm:text-base text-[#E6E2D8]/70 font-['Satoshi-Regular',sans-serif]">
            Interact with the core components of the ZEN GT. Observe the perfect balance of raw power and silent precision.
          </p>
        </div>

        {/* Dashboard Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20">
          {/* Tabs Selector Column (Apple-style frosted glass list) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {SHOWCASE_TABS.map((tab) => {
              const isSelected = tab.id === activeTabId;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTabId(tab.id);
                    setVideoError(false);
                  }}
                  className={`group relative text-left p-4 rounded-2xl transition-all duration-300 focus:outline-none backdrop-blur-xl ${
                    isSelected
                      ? "bg-white/[0.16] border border-white/40 shadow-[0_12px_36px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.4)]"
                      : "bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 shadow-[0_4px_20px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.15)]"
                  }`}
                >
                  {/* Apple sliding active indicator */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      transition={EASE_SPRING}
                      className="absolute inset-0 rounded-2xl border-2 border-[#A6865E]/50 pointer-events-none"
                    />
                  )}
                  <div className="flex items-start gap-4">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                        isSelected
                          ? "bg-[#A6865E] text-[#0d0d0c]"
                          : "bg-white/10 text-[#E6E2D8]/60 group-hover:text-[#F6F3E9]"
                      }`}
                    >
                      {tab.num}
                    </span>
                    <div>
                      <h3
                        className={`text-base font-semibold font-['Chillax-Medium',sans-serif] transition-colors ${
                          isSelected ? "text-white" : "text-[#E6E2D8]/80 group-hover:text-white"
                        }`}
                      >
                        {tab.name}
                      </h3>
                      <p className="text-xs text-[#E6E2D8]/60 mt-0.5 line-clamp-1">
                        {tab.desc}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Screen & Technical HUD */}
          <div className="lg:col-span-8">
            <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-black/60 border border-white/25 shadow-[0_25px_60px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.3)] backdrop-blur-2xl">
              {/* Futuristic Targeting Brackets */}
              <div className="hud-corner hud-tl" />
              <div className="hud-corner hud-tr" />
              <div className="hud-corner hud-bl" />
              <div className="hud-corner hud-br" />

              {/* Grid & Laser Scanner */}
              <div className="canvas-grid" />
              <div className="laser-scanner" />

              {/* Media Display */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 w-full h-full"
                >
                  {!videoError ? (
                    <video
                      key={activeTab.video}
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

              {/* Technical Overlay HUD with Frosted Glass Badges */}
              <div className="absolute inset-x-6 top-6 flex justify-between items-start pointer-events-none z-20">
                <div className="bg-[#0d0d0c]/70 backdrop-blur-xl px-3.5 py-1.5 rounded-lg border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                  <span className="block text-[9px] uppercase tracking-widest text-[#A6865E] font-semibold">
                    MODEL
                  </span>
                  <span className="text-xs font-mono font-bold text-white">
                    {activeTab.hud.model}
                  </span>
                </div>
                <div className="bg-[#0d0d0c]/70 backdrop-blur-xl px-3.5 py-1.5 rounded-lg border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[10px] font-mono font-semibold text-emerald-400">
                    {activeTab.hud.status}
                  </span>
                </div>
              </div>

              <div className="absolute inset-x-6 bottom-6 flex justify-between items-end pointer-events-none z-20">
                <div className="bg-[#0d0d0c]/70 backdrop-blur-xl px-3.5 py-1.5 rounded-lg border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] max-w-[50%]">
                  <span className="block text-[9px] uppercase tracking-widest text-[#A6865E] font-semibold">
                    POWERTRAIN
                  </span>
                  <span className="text-[11px] font-mono font-bold text-white truncate block">
                    {activeTab.hud.powertrain}
                  </span>
                </div>
                <div className="bg-[#0d0d0c]/70 backdrop-blur-xl px-3.5 py-1.5 rounded-lg border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] text-right">
                  <span className="block text-[9px] uppercase tracking-widest text-[#A6865E] font-semibold">
                    CALIBRATION
                  </span>
                  <span className="text-xs font-mono font-bold text-white">
                    {activeTab.hud.ratio}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specifications Grid with Frosted Glassmorphism */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white/[0.05] border border-white/20 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.3)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h3 className="font-['Rosaline-Regular',Georgia,serif] text-2xl font-bold text-white">
              Technical Specifications
            </h3>
            <span className="text-xs font-mono text-[#A6865E] tracking-wider uppercase">
              ISO Certified Sanctuary Dynamics
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {TECHNICAL_SPECS.map((spec) => (
              <motion.div
                key={spec.label}
                whileHover={{ y: -4, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                transition={EASE_SPRING}
                className="p-5 rounded-2xl bg-white/[0.05] border border-white/15 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-all"
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
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={EASE_SPRING}
              onClick={onOpenReserve}
              className="px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#0d0d0c] bg-[#F6F3E9] hover:bg-white shadow-[0_10px_30px_rgba(246,243,233,0.3)] transition-all"
            >
              Reserve This Specification
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
