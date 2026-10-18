"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroScrollytelling from "@/components/HeroScrollytelling";
import ShowcaseSection from "@/components/ShowcaseSection";
import PhilosophySection from "@/components/PhilosophySection";
import GallerySection from "@/components/GallerySection";
import FinaleSection from "@/components/FinaleSection";
import ZenSanctuary from "@/components/ZenSanctuary";
import ReservationModal from "@/components/ReservationModal";
import CookieBanner from "@/components/CookieBanner";
import Footer from "@/components/Footer";

export default function HomePage() {
  const [isReserveOpen, setIsReserveOpen] = useState(false);
  const [isZenOpen, setIsZenOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#0d0d0c] text-[#F6F3E9]">
      {/* Floating Glassmorphic Dock Navbar */}
      <Navbar
        onOpenReserve={() => setIsReserveOpen(true)}
        onOpenZen={() => setIsZenOpen(true)}
      />

      {/* Hero 120-Frame Canvas Scrollytelling */}
      <HeroScrollytelling onOpenReserve={() => setIsReserveOpen(true)} />

      {/* Interactive Anatomy Showcase & HUD */}
      <ShowcaseSection onOpenReserve={() => setIsReserveOpen(true)} />

      {/* Philosophy Sticky Video Scrollytelling */}
      <PhilosophySection />

      {/* Performance Masonry Architecture */}
      <GallerySection />

      {/* Finale Cinematic Video */}
      <FinaleSection onOpenReserve={() => setIsReserveOpen(true)} />

      {/* Footer */}
      <Footer onOpenReserve={() => setIsReserveOpen(true)} />

      {/* Interactive Sanctuary Meditation Overlay */}
      <ZenSanctuary
        isOpen={isZenOpen}
        onClose={() => setIsZenOpen(false)}
      />

      {/* Reservation Dialog Modal with Apple Spring Physics */}
      <ReservationModal
        isOpen={isReserveOpen}
        onClose={() => setIsReserveOpen(false)}
      />

      {/* Privacy & Telemetry Cookie Consent */}
      <CookieBanner />
    </main>
  );
}
