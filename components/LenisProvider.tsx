"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.32,
      touchMultiplier: 0.55,
      infinite: false,
    });

    window.__lenis = lenis;

    let wasInHero = true;

    // Monitor scroll to calibrate speed and halt fast runaway momentum at hero section exit
    lenis.on("scroll", (e: { scroll: number; velocity: number }) => {
      const runwayEl = document.getElementById("hero");
      if (!runwayEl) return;
      const heroEndScroll = runwayEl.offsetTop + runwayEl.offsetHeight - window.innerHeight;

      const inHero = e.scroll < heroEndScroll - 30;

      // Keep hero scrolling slow and controlled even on fast scroll actions
      lenis.options.wheelMultiplier = inHero ? 0.32 : 0.65;
      lenis.options.touchMultiplier = inHero ? 0.55 : 0.85;

      if (inHero) {
        wasInHero = true;
      } else if (wasInHero && e.scroll >= heroEndScroll - 5 && e.velocity > 0.15) {
        // Automatic brake: Halt accumulated hero momentum completely at the end of hero
        wasInHero = false;
        lenis.velocity = 0;
        lenis.scrollTo(heroEndScroll, { immediate: true });
      }
    });

    // Sync Lenis scroll ticker with RAF
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}

