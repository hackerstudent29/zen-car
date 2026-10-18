"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Play, Volume2, Maximize, Check } from "lucide-react";
import { EASE_SPRING } from "@/lib/constants";

const VIDEO_PLAYLIST = [
  { id: "drift", name: "City Drift Sequence", src: "/antigravity images/car drift shot in city road.mp4" },
  { id: "highway", name: "Highway Zoomout", src: "/antigravity images/car driving on street with zoomout.mp4" },
  { id: "cockpit", name: "Steering & Hero Pose", src: "/antigravity images/car transition from steering to hero pose.mp4" },
  { id: "interior", name: "Seats & Titanium", src: "/antigravity images/car transition from seats to nitro.mp4" },
  { id: "workshop", name: "Garage Transformation", src: "/antigravity images/car garage transformation.mp4" },
];

export default function FullVideoPage() {
  const [activeVideo, setActiveVideo] = useState(VIDEO_PLAYLIST[0]);
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

  const handleSwitchVideo = (item: (typeof VIDEO_PLAYLIST)[0]) => {
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
      {/* Back Button */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-30 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-xl text-xs uppercase tracking-wider font-['Chillax-Medium',sans-serif] text-[#F6F3E9] transition-all transform hover:-translate-x-1"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Sanctuary</span>
      </Link>

      {/* Main Fullscreen Video */}
      <video
        ref={videoRef}
        src={activeVideo.src}
        autoPlay
        loop
        playsInline
        muted={!hasEntered}
        className="w-full h-full object-cover"
      />

      {/* Initial Entry Overlay (for user interaction to allow unmuted audio) */}
      <AnimatePresence>
        {!hasEntered && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            onClick={handleEnter}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0d0d0c]/90 backdrop-blur-md cursor-pointer p-6"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={EASE_SPRING}
              className="flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.8)]"
            >
              <Play className="w-5 h-5 fill-current text-[#A6865E]" />
              <span className="text-sm font-semibold uppercase tracking-[0.2em] font-['Chillax-Medium',sans-serif]">
                Enter Fullscreen Audio Experience
              </span>
            </motion.div>
            <p className="text-xs text-[#E6E2D8]/60 mt-4 tracking-wider uppercase font-mono">
              Click anywhere to launch high-fidelity audio & motion
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Playlist Switcher (Apple Floating Dock) */}
      <div className="absolute bottom-6 inset-x-6 z-30 flex justify-center">
        <div className="flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl bg-[#0d0d0c]/80 border border-white/15 backdrop-blur-xl max-w-2xl">
          {VIDEO_PLAYLIST.map((item) => {
            const isSelected = item.id === activeVideo.id;
            return (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={EASE_SPRING}
                onClick={() => handleSwitchVideo(item)}
                className={`relative px-4 py-2 rounded-xl text-xs font-['Chillax-Medium',sans-serif] tracking-wider transition-all ${
                  isSelected
                    ? "bg-[#A6865E] text-[#0d0d0c] font-bold shadow-lg"
                    : "bg-white/5 text-[#E6E2D8]/80 hover:text-[#F6F3E9] hover:bg-white/10"
                }`}
              >
                {item.name}
              </motion.button>
            );
          })}
        </div>
      </div>
    </main>
  );
}
