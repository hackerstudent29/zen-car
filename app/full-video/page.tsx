"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Play } from "lucide-react";
import { EASE_SPRING } from "@/lib/constants";

const EXPERIENCE_VIDEOS = [
  {
    id: "cinematic",
    name: "Cinematic",
    src: "/antigravity images/car model video with song.mp4",
  },
  {
    id: "city-drift",
    name: "City Drift",
    src: "/antigravity images/car drift shot in city road.mp4",
  },
];

export default function FullVideoPage() {
  const [activeVideo, setActiveVideo] = useState(EXPERIENCE_VIDEOS[0]);
  const [hasEntered, setHasEntered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnter = () => {
    setHasEntered(true);
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      video.volume = 1.0;
      video.play().catch((err) => console.warn("Autoplay audio blocked", err));
    }

    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  };

  const handleSwitchVideo = (item: (typeof EXPERIENCE_VIDEOS)[0]) => {
    setActiveVideo(item);
    const video = videoRef.current;
    if (video) {
      video.src = item.src;
      video.load();
      video.play().catch(() => {});
    }
  };

  return (
    <main className="relative w-screen h-screen bg-[#0d0d0c] overflow-hidden text-[#F6F3E9] select-none">
      {/* Return Button with Frosted Glassmorphism */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-30 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.4)] text-xs uppercase tracking-wider font-['Chillax-Medium',sans-serif] text-white transition-all transform hover:-translate-x-0.5 active:scale-95"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Sanctuary</span>
      </Link>

      {/* Main Video Stream */}
      <video
        ref={videoRef}
        src={activeVideo.src}
        autoPlay
        loop
        playsInline
        muted={!hasEntered}
        className="w-full h-full object-cover block"
      />

      {/* Initial Entry Overlay (for fullscreen & unmuted audio immersion) */}
      <AnimatePresence>
        {!hasEntered && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={handleEnter}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0d0d0c]/90 backdrop-blur-md cursor-pointer p-6"
          >
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={EASE_SPRING}
              className="flex items-center gap-3 px-8 py-4 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/30 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.5)]"
            >
              <Play className="w-4 h-4 fill-current text-[#A6865E]" />
              <span className="text-sm font-semibold uppercase tracking-[0.2em] font-['Chillax-Medium',sans-serif] text-white">
                Enter Experience
              </span>
            </motion.div>
            <p className="text-xs text-[#E6E2D8]/60 mt-4 tracking-wider uppercase font-mono">
              Click anywhere to activate immersion
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Switcher Dock (2 Videos Only) with Frosted Glassmorphic Capsule */}
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-30">
        <div
          role="group"
          aria-label="Video camera view switcher"
          className="flex items-center gap-1.5 p-1.5 rounded-full bg-white/[0.12] border border-white/30 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.4)]"
        >
          {EXPERIENCE_VIDEOS.map((item) => {
            const isSelected = item.id === activeVideo.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSwitchVideo(item)}
                className={`relative px-5 py-2 rounded-full text-xs font-['Chillax-Medium',sans-serif] tracking-wider uppercase transition-all duration-300 ${
                  isSelected
                    ? "bg-white/25 text-white font-semibold shadow-[0_2px_10px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.6)]"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}
