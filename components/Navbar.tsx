"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Home, LayoutGrid, Compass, Play, Volume2, VolumeX, Sparkles, Menu, X } from "lucide-react";
import { audioEngine } from "./AudioEngine";
import { EASE_SPRING } from "@/lib/constants";

interface NavbarProps {
  onOpenReserve: () => void;
  onOpenZen: () => void;
}

export default function Navbar({ onOpenReserve, onOpenZen }: NavbarProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAudioToggle = () => {
    if (audioEngine) {
      const active = audioEngine.toggle();
      setIsPlayingAudio(active);
    }
  };

  return (
    <>
      <header
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-4 py-2.5 rounded-full transition-all duration-500 ${
          scrolled
            ? "bg-[#0d0d0c]/85 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl"
            : "bg-[#0d0d0c]/60 border border-white/10 backdrop-blur-md"
        }`}
        style={{
          width: "calc(100% - 2rem)",
          maxWidth: "680px",
        }}
      >
        {/* Brand Logo */}
        <Link
          href="#hero"
          className="group flex items-center gap-2 pl-2 text-[#F6F3E9] focus:outline-none"
        >
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={EASE_SPRING}
            className="font-['Rosaline-Regular',Georgia,serif] text-xl font-bold tracking-widest text-[#F6F3E9] group-hover:text-[#A6865E] transition-colors"
          >
            ZEN
          </motion.span>
          <span className="text-[10px] tracking-widest uppercase text-[#A6865E] font-medium hidden sm:inline-block px-1.5 py-0.5 rounded border border-[#A6865E]/30 bg-[#A6865E]/10">
            GT-1
          </span>
        </Link>

        {/* Desktop Nav Icons */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5">
          <Link
            href="#hero"
            title="Overview"
            className="p-2 text-[#E6E2D8]/70 hover:text-[#F6F3E9] hover:bg-white/10 rounded-full transition-all duration-200"
          >
            <Home className="w-4 h-4" />
          </Link>
          <Link
            href="#showcase"
            title="GT Anatomy"
            className="p-2 text-[#E6E2D8]/70 hover:text-[#F6F3E9] hover:bg-white/10 rounded-full transition-all duration-200"
          >
            <LayoutGrid className="w-4 h-4" />
          </Link>
          <Link
            href="#philosophy"
            title="Philosophy"
            className="p-2 text-[#E6E2D8]/70 hover:text-[#F6F3E9] hover:bg-white/10 rounded-full transition-all duration-200"
          >
            <Compass className="w-4 h-4" />
          </Link>
          <Link
            href="/full-video"
            title="Cinematic Film"
            className="p-2 text-[#A6865E] hover:text-[#F6F3E9] hover:bg-[#A6865E]/20 rounded-full transition-all duration-200 flex items-center gap-1 text-xs px-2.5"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span className="hidden lg:inline text-[11px] font-medium tracking-wider uppercase">Film</span>
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Ambient Audio Synthesizer */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            transition={EASE_SPRING}
            onClick={handleAudioToggle}
            title={isPlayingAudio ? "Mute Ambient Sound" : "Listen to Sanctuary Audio"}
            className={`p-2 rounded-full border transition-all duration-300 flex items-center justify-center ${
              isPlayingAudio
                ? "bg-[#A6865E]/20 text-[#A6865E] border-[#A6865E]/50 shadow-[0_0_15px_rgba(166,134,94,0.3)]"
                : "bg-white/5 text-[#E6E2D8]/70 border-white/10 hover:text-[#F6F3E9]"
            }`}
          >
            {isPlayingAudio ? (
              <span className="flex items-center gap-0.5">
                <span className="w-1 h-3 bg-[#A6865E] rounded-full animate-pulse" />
                <span className="w-1 h-4 bg-[#A6865E] rounded-full animate-pulse delay-75" />
                <span className="w-1 h-2 bg-[#A6865E] rounded-full animate-pulse delay-150" />
              </span>
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </motion.button>

          {/* Zen Mode Sanctuary Trigger */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={EASE_SPRING}
            onClick={onOpenZen}
            title="Enter Zen Mode Sanctuary"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium tracking-wider text-[#E6E2D8] bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <Sparkles className="w-3 h-3 text-[#A6865E]" />
            <span>Zen Mode</span>
          </motion.button>

          {/* Reserve CTA */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            transition={EASE_SPRING}
            onClick={onOpenReserve}
            className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#0d0d0c] bg-gradient-to-r from-[#F6F3E9] to-[#EBE7DC] hover:from-[#FFFFFF] hover:to-[#F6F3E9] shadow-[0_4px_16px_rgba(246,243,233,0.2)] transition-all"
          >
            Reserve
          </motion.button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#E6E2D8] hover:text-[#A6865E] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu with Apple Sheet Spring Physics */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.96 }}
              transition={EASE_SPRING}
              className="fixed top-24 inset-x-4 z-40 p-6 rounded-3xl bg-[#141413]/95 border border-white/15 backdrop-blur-2xl shadow-2xl md:hidden flex flex-col gap-4 text-center"
            >
              <Link
                href="#hero"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-[#F6F3E9] py-2 border-b border-white/5"
              >
                Overview
              </Link>
              <Link
                href="#showcase"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-[#F6F3E9] py-2 border-b border-white/5"
              >
                GT Anatomy
              </Link>
              <Link
                href="#philosophy"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-[#F6F3E9] py-2 border-b border-white/5"
              >
                Philosophy
              </Link>
              <Link
                href="/full-video"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-[#A6865E] py-2 border-b border-white/5 flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Cinematic Video Experience</span>
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenZen();
                }}
                className="text-lg font-medium text-[#E6E2D8] py-2 border-b border-white/5 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#A6865E]" />
                <span>Enter Zen Sanctuary</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReserve();
                }}
                className="mt-2 w-full py-3.5 rounded-full text-sm font-semibold tracking-wider uppercase text-[#0d0d0c] bg-[#F6F3E9]"
              >
                Reserve ZEN GT
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
