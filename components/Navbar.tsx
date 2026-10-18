"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { EASE_SPRING } from "@/lib/constants";

export default function Navbar() {
  return (
    <header
      className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-2xl bg-white/[0.16] select-none transition-all duration-300"
      style={{
        width: "auto",
        maxWidth: "92vw",
      }}
    >
      {/* Signature ZEN Brand Logo */}
      <Link
        href="#hero"
        className="inline-flex items-center pl-2 pr-3 text-white focus:outline-none group"
        aria-label="ZEN Automotive Home"
        title="ZEN Sanctuary"
      >
        <motion.span
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          transition={EASE_SPRING}
          className="font-['Chillax-Bold',sans-serif] text-lg sm:text-xl font-bold tracking-[0.22em] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] group-hover:text-[#A6865E] transition-colors"
        >
          ZEN
        </motion.span>
      </Link>

      {/* Translucent Glass Divider */}
      <span className="w-px h-4 sm:h-5 bg-white/35 mx-1" aria-hidden="true" />

      {/* Pure Minimalist Icon Dock */}
      <nav className="flex items-center gap-1.5 sm:gap-2.5 pl-1" aria-label="Main Navigation">
        {/* Home */}
        <Link
          href="#hero"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-white/90 hover:text-[#A6865E] hover:bg-white/20 active:scale-95 transition-all duration-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] hover:drop-shadow-[0_2px_8px_rgba(166,134,94,0.7)]"
          aria-label="Home Overview"
          title="Home"
        >
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </Link>

        {/* Showcase Anatomy */}
        <Link
          href="#showcase"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-white/90 hover:text-[#A6865E] hover:bg-white/20 active:scale-95 transition-all duration-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] hover:drop-shadow-[0_2px_8px_rgba(166,134,94,0.7)]"
          aria-label="Showcase Anatomy"
          title="GT Anatomy"
        >
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
        </Link>

        {/* Philosophy */}
        <Link
          href="#philosophy"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-white/90 hover:text-[#A6865E] hover:bg-white/20 active:scale-95 transition-all duration-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] hover:drop-shadow-[0_2px_8px_rgba(166,134,94,0.7)]"
          aria-label="Philosophy"
          title="Philosophy"
        >
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
          </svg>
        </Link>

        {/* Cinematic Film Experience */}
        <Link
          href="/full-video"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-white/90 hover:text-[#A6865E] hover:bg-white/20 active:scale-95 transition-all duration-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] hover:drop-shadow-[0_2px_8px_rgba(166,134,94,0.7)]"
          aria-label="Cinematic Video Drive"
          title="Cinematic Video"
        >
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </Link>
      </nav>
    </header>
  );
}
