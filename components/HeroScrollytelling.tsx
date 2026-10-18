"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { EASE_SPRING } from "@/lib/constants";
import { ChevronDown } from "lucide-react";

interface HeroScrollytellingProps {
  onOpenReserve: () => void;
}

const TOTAL_FRAMES = 120;

export default function HeroScrollytelling({ onOpenReserve }: HeroScrollytellingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activePhase, setActivePhase] = useState(0);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);

  // Format frame number with 4 digits: 0001.webp in webp/ subdirectory
  const getFramePath = useCallback((index: number) => {
    const padded = String(index + 1).padStart(4, "0");
    return `/opening_shot_frames/webp/${padded}.webp`;
  }, []);

  // Preload frames progressively
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const padded = String(i + 1).padStart(4, "0");
      const img = new Image();
      img.src = `/opening_shot_frames/webp/${padded}.webp`;
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (i === 0) {
          drawFrame(0);
        }
        if (loadedCount >= Math.min(15, TOTAL_FRAMES)) {
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        // Fallback to high-res jpg
        const fallback = new Image();
        fallback.src = `/opening_shot_frames/frames/${padded}.jpg`;
        fallback.onload = () => {
          images[i] = fallback;
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
          if (i === 0) drawFrame(0);
          if (loadedCount >= Math.min(15, TOTAL_FRAMES)) setIsLoaded(true);
        };
        fallback.onerror = () => {
          loadedCount++;
        };
      };
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [getFramePath]);

  // Render loop with lerping for Apple-grade smooth momentum
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;

    // Cover fit
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = w / h;

    let dw = w;
    let dh = h;
    let dx = 0;
    let dy = 0;

    if (canvasRatio > imgRatio) {
      dw = w;
      dh = w / imgRatio;
      dy = (h - dh) / 2;
    } else {
      dh = h;
      dw = h * imgRatio;
      dx = (w - dw) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, dx * dpr, dy * dpr, dw * dpr, dh * dpr);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      drawFrame(Math.round(currentFrameRef.current));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  // Scroll tracking loop
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollProgress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));

      targetFrameRef.current = Math.min(TOTAL_FRAMES - 1, scrollProgress * (TOTAL_FRAMES - 1));

      // Phase transitions
      if (scrollProgress < 0.22) {
        setActivePhase(0);
      } else if (scrollProgress < 0.52) {
        setActivePhase(1);
      } else if (scrollProgress < 0.82) {
        setActivePhase(2);
      } else {
        setActivePhase(3);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Smooth Lerp animation loop with cinematic Apple spring inertia
    const animate = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current += diff * 0.085; // Butter-smooth Apple cinematic damper
        drawFrame(Math.round(currentFrameRef.current));
      }
      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [drawFrame]);

  return (
    <div ref={containerRef} className="relative h-[560vh] sm:h-[620vh] w-full bg-[#0d0d0c]">
      {/* Sticky Viewport */}
      <div id="hero" className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Preloader */}
        <AnimatePresence>
          {!isLoaded && (
            <motion.div
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#0d0d0c] text-[#F6F3E9]"
            >
              <span className="font-['Rosaline-Regular',Georgia,serif] text-4xl tracking-widest mb-4">
                ZEN
              </span>
              <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden mb-3">
                <motion.div
                  className="h-full bg-[#A6865E]"
                  style={{ width: `${loadProgress}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              <span className="text-xs uppercase tracking-widest text-[#E6E2D8]/60 font-['Chillax-Regular',sans-serif]">
                Waking sanctuary... {loadProgress}%
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scrollytelling Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
          aria-label="Interactive 120-frame animation of the ZEN GT hypercar"
        />

        {/* Ambient Dark Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0c] via-transparent to-[#0d0d0c]/70 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#0d0d0c]/40 pointer-events-none" />

        {/* Scrolling Narrative Overlay Cards with Apple Physics */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-6">
          <AnimatePresence mode="wait">
            {activePhase === 0 && (
              <motion.div
                key="phase-0"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -25, scale: 0.97 }}
                transition={EASE_SPRING}
                className="max-w-xl text-center pointer-events-auto"
              >
                <span className="inline-block text-xs uppercase tracking-[0.25em] text-[#A6865E] mb-3 font-semibold font-['Chillax-Medium',sans-serif]">
                  Automotive Sanctuary
                </span>
                <h1 className="font-['Rosaline-Regular',Georgia,serif] text-4xl sm:text-6xl md:text-7xl font-bold text-[#F6F3E9] leading-[1.05] tracking-tight mb-4">
                  Pure Form.<br />Pure Mind.
                </h1>
                <p className="text-sm sm:text-base text-[#E6E2D8]/80 font-['Satoshi-Regular',sans-serif] max-w-md mx-auto mb-8 leading-relaxed">
                  A study in automotive minimalism, whisper acoustics, and high-performance tranquility.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/full-video"
                    className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-[#0d0d0c] bg-[#F6F3E9] hover:bg-white shadow-[0_10px_30px_rgba(246,243,233,0.25)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Experience Full Drive
                  </Link>
                  <button
                    onClick={onOpenReserve}
                    className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-[#F6F3E9] bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Reserve the GT
                  </button>
                </div>
              </motion.div>
            )}

            {activePhase === 1 && (
              <motion.div
                key="phase-1"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -25, scale: 0.97 }}
                transition={EASE_SPRING}
                className="max-w-lg text-center"
              >
                <span className="text-xs uppercase tracking-[0.25em] text-[#A6865E] mb-2 font-['Chillax-Medium',sans-serif] block">
                  Act I — The Awakening
                </span>
                <h2 className="font-['Rosaline-Regular',Georgia,serif] text-3xl sm:text-5xl font-bold text-[#F6F3E9] mb-3">
                  Silence Awakens.
                </h2>
                <p className="text-sm sm:text-base text-[#E6E2D8]/80 font-['Satoshi-Regular',sans-serif] leading-relaxed">
                  The garage doors dissolve, revealing a silhouette forged in uninterrupted tranquility.
                </p>
              </motion.div>
            )}

            {activePhase === 2 && (
              <motion.div
                key="phase-2"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -25, scale: 0.97 }}
                transition={EASE_SPRING}
                className="max-w-lg text-center"
              >
                <span className="text-xs uppercase tracking-[0.25em] text-[#A6865E] mb-2 font-['Chillax-Medium',sans-serif] block">
                  Act II — Aerodynamics
                </span>
                <h2 className="font-['Rosaline-Regular',Georgia,serif] text-3xl sm:text-5xl font-bold text-[#F6F3E9] mb-3">
                  Form Follows Mind.
                </h2>
                <p className="text-sm sm:text-base text-[#E6E2D8]/80 font-['Satoshi-Regular',sans-serif] leading-relaxed">
                  A continuous sweep of aerodynamic meditation. No unnecessary vents. No cosmetic aggression.
                </p>
              </motion.div>
            )}

            {activePhase === 3 && (
              <motion.div
                key="phase-3"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -25, scale: 0.97 }}
                transition={EASE_SPRING}
                className="max-w-xl text-center pointer-events-auto"
              >
                <span className="text-xs uppercase tracking-[0.25em] text-[#A6865E] mb-2 font-['Chillax-Medium',sans-serif] block">
                  Act III — Revelation
                </span>
                <h2 className="font-['Rosaline-Regular',Georgia,serif] text-3xl sm:text-5xl font-bold text-[#F6F3E9] mb-3">
                  Behold the ZEN GT.
                </h2>
                <p className="text-sm sm:text-base text-[#E6E2D8]/80 font-['Satoshi-Regular',sans-serif] mb-6 leading-relaxed">
                  An electric sanctuary engineered for the thoughtful traveler. Unmatched composure at any velocity.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href="#showcase"
                    className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-[#0d0d0c] bg-[#F6F3E9] hover:bg-white shadow-[0_10px_30px_rgba(246,243,233,0.25)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Explore the GT Anatomy
                  </a>
                  <button
                    onClick={onOpenReserve}
                    className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-[#A6865E] bg-[#A6865E]/10 hover:bg-[#A6865E]/20 border border-[#A6865E]/40 backdrop-blur-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Claim Allocation
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-60">
          <span className="text-[10px] uppercase tracking-widest text-[#E6E2D8] font-['Chillax-Regular',sans-serif]">
            Scroll to play
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-[#A6865E]" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
