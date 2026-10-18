"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUp, ChevronRight } from "lucide-react";
import { EASE_SPRING } from "@/lib/constants";

interface FooterProps {
  onOpenReserve: () => void;
}

export default function Footer({ onOpenReserve }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#080808] border-t border-white/10 text-[#F6F3E9] pt-20 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Info */}
          <div className="md:col-span-5">
            <Link href="#hero" className="inline-block focus:outline-none">
              <span className="font-['Rosaline-Regular',Georgia,serif] text-3xl font-bold tracking-widest text-[#F6F3E9]">
                ZEN
              </span>
            </Link>
            <span className="block text-xs uppercase tracking-[0.2em] text-[#A6865E] font-['Chillax-Medium',sans-serif] mt-1 mb-4">
              Bespoke Automotive Sanctuary
            </span>
            <p className="text-sm text-[#E6E2D8]/70 max-w-sm mb-6 leading-relaxed font-['Satoshi-Regular',sans-serif]">
              A study in automotive minimalism and high-performance tranquility. Crafted for the mindful driver.
            </p>
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={EASE_SPRING}
                onClick={onOpenReserve}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#0d0d0c] bg-[#F6F3E9] hover:bg-white transition-colors"
              >
                <span>Reserve GT</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={EASE_SPRING}
                onClick={scrollToTop}
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-[#E6E2D8] border border-white/10 transition-colors"
                aria-label="Scroll back to top"
              >
                <ArrowUp className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <span className="block text-xs uppercase tracking-[0.2em] text-[#A6865E] font-semibold mb-4 font-mono">
                Navigation
              </span>
              <ul className="space-y-2.5 text-xs text-[#E6E2D8]/70">
                <li><a href="#hero" className="hover:text-[#F6F3E9] transition-colors">Overview</a></li>
                <li><a href="#showcase" className="hover:text-[#F6F3E9] transition-colors">GT Anatomy</a></li>
                <li><a href="#philosophy" className="hover:text-[#F6F3E9] transition-colors">Philosophy</a></li>
                <li><a href="#performance" className="hover:text-[#F6F3E9] transition-colors">Form & Function</a></li>
                <li><Link href="/full-video" className="text-[#A6865E] hover:text-[#F6F3E9] transition-colors">Cinematic Film</Link></li>
              </ul>
            </div>

            <div>
              <span className="block text-xs uppercase tracking-[0.2em] text-[#A6865E] font-semibold mb-4 font-mono">
                Allocation
              </span>
              <ul className="space-y-2.5 text-xs text-[#E6E2D8]/70">
                <li>
                  <button onClick={onOpenReserve} className="text-left text-[#A6865E] hover:text-[#F6F3E9] transition-colors">
                    Reserve ZEN GT
                  </button>
                </li>
                <li><a href="mailto:concierge@zenautomotive.com" className="hover:text-[#F6F3E9] transition-colors">Concierge Support</a></li>
                <li><a href="/sitemap.xml" className="hover:text-[#F6F3E9] transition-colors">Sitemap.xml</a></li>
                <li><a href="/robots.txt" className="hover:text-[#F6F3E9] transition-colors">Robots.txt</a></li>
              </ul>
            </div>

            <div>
              <span className="block text-xs uppercase tracking-[0.2em] text-[#A6865E] font-semibold mb-4 font-mono">
                Governance
              </span>
              <ul className="space-y-2.5 text-xs text-[#E6E2D8]/70">
                <li><Link href="/privacy" className="hover:text-[#F6F3E9] transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-[#F6F3E9] transition-colors">Terms & Conditions</Link></li>
                <li><a href="mailto:legal@zenautomotive.com" className="hover:text-[#F6F3E9] transition-colors">Legal Counsel</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom with Badges */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E6E2D8]/50">
          <p>&copy; 2026 ZEN Automotive Corporation. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-mono tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              TLS 1.3 ENCRYPTED
            </span>
            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-mono tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A6865E]" />
              SERIES NO. 01–50
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
