"use client";

import { useState, useEffect, useRef, useCallback, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowUp,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Play,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Apple Physics & Animation Tokens                                          */
/* -------------------------------------------------------------------------- */
const EASE_SPRING = { type: "spring", stiffness: 350, damping: 25, mass: 0.8 } as const;
const EASE_APPLE = [0.32, 0.72, 0, 1] as const;

/* -------------------------------------------------------------------------- */
/*  Data Models & Constants                                                   */
/* -------------------------------------------------------------------------- */
const TOTAL_FRAMES = 120;

interface ShowcaseTab {
  id: string;
  num: string;
  name: string;
  desc: string;
  video: string;
  fallback: string;
  hud: {
    model: string;
    status: string;
    powertrain: string;
    ratio: string;
  };
}

const SHOWCASE_TABS: ShowcaseTab[] = [
  {
    id: "motion",
    num: "01",
    name: "Pure Motion",
    desc: "Dynamic balance in action",
    video: "/antigravity images/car drift shot.mp4",
    fallback: "/antigravity images/car image1.jpeg",
    hud: {
      model: "ZEN GT-1",
      status: "STANDBY",
      powertrain: "DUAL SILENT FLUID MOTOR",
      ratio: "50:50 ZERO-SHIFT",
    },
  },
  {
    id: "interior",
    num: "02",
    name: "Sanctuary & Power",
    desc: "Premium luxury meets raw nitro exhaust",
    video: "/antigravity images/car transition from seats to nitro.mp4",
    fallback: "/antigravity images/car focused on seats.png",
    hud: {
      model: "ZEN GT-INTERIOR",
      status: "ENGAGED",
      powertrain: "WHISPER CABIN MATRIX",
      ratio: "12 dB ISOLATION",
    },
  },
  {
    id: "engine",
    num: "03",
    name: "The Heart",
    desc: "Whispering acoustic engineering",
    video: "/antigravity images/engine reveal.mp4",
    fallback: "/antigravity images/car engine.png",
    hud: {
      model: "ZEN FLUID-CORE",
      status: "OPTIMAL",
      powertrain: "750 HP EQUIVALENT",
      ratio: "98.4% FLUID EFFICIENCY",
    },
  },
  {
    id: "tyre",
    num: "04",
    name: "Contact Patch",
    desc: "Adhesion meets road feel",
    video: "/antigravity images/car tyre focusing shot.mp4",
    fallback: "/antigravity images/car tyre focused.png",
    hud: {
      model: "ZEN FORGED ALLOY",
      status: "ACTIVE GRIP",
      powertrain: "VECTOR TRACK ADHESION",
      ratio: "1.35 LATERAL G",
    },
  },
  {
    id: "garage",
    num: "05",
    name: "The Sanctuary",
    desc: "The birthplace of detail",
    video: "/antigravity images/car garage transformation.mp4",
    fallback: "/antigravity images/car image in garage with light on.png",
    hud: {
      model: "ZEN WORKSHOP NO. 01",
      status: "BESPOKE QUEUE",
      powertrain: "HAND-CRAFTED COMPOSITE",
      ratio: "SERIES 01-50",
    },
  },
];

const TECHNICAL_SPECS = [
  { label: "Silent Propulsion", value: "750 hp equivalent", detail: "Dual fluid-cooled synchronous motors" },
  { label: "Acoustics", value: "12 dB Cabin ISO", detail: "Active acoustic phase cancellation" },
  { label: "Range", value: "620 km", detail: "Solid-state thermal architecture" },
  { label: "Acceleration", value: "0-100 km/h in 2.8s", detail: "Instant zero-slip vector torque" },
];

const PHILOSOPHY_CARDS = [
  {
    kicker: "PHILOSOPHY",
    title: "Rooted in Ancient Tranquility",
    desc: "In a world of noise, distraction, and excess, we choose clarity. The ZEN GT is designed to strip away the superfluous.",
    video: "/antigravity images/car driving on street with zoomout.mp4",
  },
  {
    kicker: "FOCUS",
    title: "Forged in the Fires of Focus",
    desc: "No flashing screens, no aggressive lines, no artificial sounds. Only pure connection between road, machine, and mind.",
    video: "/antigravity images/car transition from steering to hero pose.mp4",
  },
  {
    kicker: "HARMONY",
    title: "Where Engineering Meets the Soul",
    desc: "\"The designer knows he has achieved perfection not when there is nothing left to add, but when there is nothing left to take away.\"",
    video: "/antigravity images/car garage transformation.mp4",
  },
];

const GALLERY_ITEMS = [
  {
    src: "/antigravity images/car hero pose top side angle 2.png",
    alt: "ZEN GT high-angle front quarter exterior silhouette",
    title: "Aerodynamic Profile",
    subtitle: "Continuous carbon-composite contouring",
    span: "col-span-1 md:col-span-2 row-span-2 aspect-[16/10]",
  },
  {
    src: "/antigravity images/car nitro focused.png",
    alt: "ZEN GT dual titanium performance exhaust and thermal diffuser",
    title: "Thermal Diffuser",
    subtitle: "Acoustic titanium balance",
    span: "col-span-1 aspect-[4/3]",
  },
  {
    src: "/antigravity images/car tyre focused.png",
    alt: "ZEN GT forged lightweight aerodynamic alloy wheel and track tire",
    title: "Forged Alloy",
    subtitle: "Active rotational vortex evacuation",
    span: "col-span-1 aspect-[4/3]",
  },
  {
    src: "/antigravity images/engine image.png",
    alt: "ZEN GT liquid-cooled silent dual-motor high-efficiency powertrain",
    title: "Liquid Core",
    subtitle: "Whispering dual-motor synchronized drive",
    span: "col-span-1 md:col-span-2 aspect-[21/9]",
  },
];

const ZEN_QUOTES = [
  { quote: "Breathe in. Let go of the noise.", author: "Zen Philosophy" },
  { quote: "In stillness, the world becomes clear.", author: "Lao Tzu" },
  { quote: "Perfection is attained when there is nothing left to strip away.", author: "Antoine de Saint-Exupéry" },
  { quote: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { quote: "Silence is the sanctuary of the thoughtful mind.", author: "ZEN Principles" },
];

/* -------------------------------------------------------------------------- */
/*  Procedural Web Audio API Synthesizer (Harmonic Drone Chords)              */
/* -------------------------------------------------------------------------- */
class ZenAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying = false;
  private oscillators: OscillatorNode[] = [];
  private filter: BiquadFilterNode | null = null;

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);

      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = "lowpass";
      this.filter.frequency.setValueAtTime(280, this.ctx.currentTime);
      this.filter.Q.setValueAtTime(2.5, this.ctx.currentTime);

      this.masterGain.connect(this.filter);
      this.filter.connect(this.ctx.destination);
    } catch (e) {
      console.warn("Web Audio API unavailable", e);
    }
  }

  public play() {
    if (!this.ctx || !this.masterGain) this.init();
    if (!this.ctx || !this.masterGain) return;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    if (this.oscillators.length === 0) {
      const frequencies = [55, 110, 164.81, 220];
      this.oscillators = frequencies.map((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const oscGain = this.ctx!.createGain();
        osc.type = i % 2 === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);
        oscGain.gain.setValueAtTime(0.08 / (i + 1), this.ctx!.currentTime);
        osc.connect(oscGain);
        oscGain.connect(this.masterGain!);
        osc.start();
        return osc;
      });
    }

    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0.25, now + 1.2);
    this.isPlaying = true;
  }

  public stop() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.8);
    this.isPlaying = false;
  }

  public get active(): boolean {
    return this.isPlaying;
  }
}

let globalAudio: ZenAudioEngine | null = null;
function getAudioEngine(): ZenAudioEngine | null {
  if (typeof window === "undefined") return null;
  if (!globalAudio) globalAudio = new ZenAudioEngine();
  return globalAudio;
}

/* -------------------------------------------------------------------------- */
/*  Main Home Page (Consolidated All-In-One Modern File)                      */
/* -------------------------------------------------------------------------- */
export default function HomePage() {
  // Overlays & Interactive States
  const [isReserveOpen, setIsReserveOpen] = useState(false);
  const [isZenOpen, setIsZenOpen] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  // Hero Scrollytelling States
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);
  const [heroPhase, setHeroPhase] = useState(0);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);

  // Showcase Tabs State
  const [activeTabId, setActiveTabId] = useState(SHOWCASE_TABS[0].id);
  const activeTab = SHOWCASE_TABS.find((t) => t.id === activeTabId) || SHOWCASE_TABS[0];
  const [tabVideoError, setTabVideoError] = useState(false);

  // Philosophy Scrollytelling State
  const philContainerRef = useRef<HTMLDivElement>(null);
  const [activePhilCard, setActivePhilCard] = useState(0);

  // Zen Sanctuary Meditation Quote State
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Reservation Form State
  const [reservationForm, setReservationForm] = useState({
    name: "",
    email: "",
    phone: "",
    model: "ZEN GT-1 Launch Edition",
    timeline: "2026 Q4 Founding Allocation",
    consent: false,
    _hp: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedCode, setConfirmedCode] = useState<string | null>(null);

  /* --- Cookie Consent Check --- */
  useEffect(() => {
    const consent = localStorage.getItem("zen_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setShowCookieBanner(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCookieChoice = (accepted: boolean) => {
    localStorage.setItem("zen_cookie_consent", accepted ? "accepted" : "declined");
    setShowCookieBanner(false);
  };

  /* --- Hero Canvas Frame Rendering Loop --- */
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

  /* --- Preload 120 Frames with WebP and High-Res JPG Fallback --- */
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const padded = String(i + 1).padStart(4, "0");
      const img = document.createElement("img");
      img.src = `/opening_shot_frames/webp/${padded}.webp`;
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (i === 0) drawFrame(0);
        if (loadedCount >= Math.min(15, TOTAL_FRAMES)) setIsHeroLoaded(true);
      };
      img.onerror = () => {
        const fallback = document.createElement("img");
        fallback.src = `/opening_shot_frames/frames/${padded}.jpg`;
        fallback.onload = () => {
          images[i] = fallback;
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
          if (i === 0) drawFrame(0);
          if (loadedCount >= Math.min(15, TOTAL_FRAMES)) setIsHeroLoaded(true);
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
  }, [drawFrame]);

  /* --- Canvas Resize --- */
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

  /* --- Scroll Tracking for Hero & Philosophy --- */
  useEffect(() => {
    const handleScroll = () => {
      // 1. Hero Scrollytelling
      const hero = heroContainerRef.current;
      if (hero) {
        const rect = hero.getBoundingClientRect();
        const scrollProgress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
        targetFrameRef.current = Math.min(TOTAL_FRAMES - 1, scrollProgress * (TOTAL_FRAMES - 1));

        if (scrollProgress < 0.22) {
          setHeroPhase(0);
        } else if (scrollProgress < 0.52) {
          setHeroPhase(1);
        } else if (scrollProgress < 0.82) {
          setHeroPhase(2);
        } else {
          setHeroPhase(3);
        }
      }

      // 2. Philosophy Scrollytelling
      const phil = philContainerRef.current;
      if (phil) {
        const rect = phil.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
        if (progress < 0.33) setActivePhilCard(0);
        else if (progress < 0.66) setActivePhilCard(1);
        else setActivePhilCard(2);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Cinematic Apple Damped LERP loop (0.085 for slow, majestic scrubbing)
    const animate = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current += diff * 0.085;
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

  /* --- Zen Sanctuary Quote Interval --- */
  useEffect(() => {
    if (!isZenOpen) return;
    const audio = getAudioEngine();
    if (audio && !audio.active) audio.play();

    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % ZEN_QUOTES.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isZenOpen]);

  /* --- Reservation Form Submission --- */
  const handleReservationSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (reservationForm._hp) return;

    const errors: Record<string, string> = {};
    if (!reservationForm.name.trim() || reservationForm.name.trim().length < 2) {
      errors.name = "Please enter your full name (minimum 2 characters).";
    }
    if (!reservationForm.email.trim() || !/^\S+@\S+\.\S+$/.test(reservationForm.email.trim())) {
      errors.email = "Please provide a valid email address.";
    }
    if (!reservationForm.phone.trim() || reservationForm.phone.trim().length < 7) {
      errors.phone = "Please provide a valid contact phone number.";
    }
    if (!reservationForm.consent) {
      errors.consent = "You must accept the terms to request an allocation.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});

    setTimeout(() => {
      setIsSubmitting(false);
      const code = `ZEN-GT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setConfirmedCode(code);
    }, 700);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="relative min-h-screen bg-[#0d0d0c] text-[#F6F3E9] selection:bg-[#A6865E]/30 selection:text-[#F6F3E9]">
      {/* ==================================================================== */}
      {/*  1. Floating Minimalist Glassmorphism Dock Navbar                    */}
      {/* ==================================================================== */}
      <header
        className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-2xl bg-white/[0.16] select-none transition-all duration-300"
        style={{ width: "auto", maxWidth: "92vw" }}
      >
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

        <span className="w-px h-4 sm:h-5 bg-white/35 mx-1" aria-hidden="true" />

        <nav className="flex items-center gap-1.5 sm:gap-2.5 pl-1" aria-label="Main Navigation">
          <Link
            href="#hero"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-white/90 hover:text-[#A6865E] hover:bg-white/20 active:scale-95 transition-all duration-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] hover:drop-shadow-[0_2px_8px_rgba(166,134,94,0.7)]"
            title="Home"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </Link>

          <Link
            href="#showcase"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-white/90 hover:text-[#A6865E] hover:bg-white/20 active:scale-95 transition-all duration-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] hover:drop-shadow-[0_2px_8px_rgba(166,134,94,0.7)]"
            title="GT Anatomy"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          </Link>

          <Link
            href="#philosophy"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-white/90 hover:text-[#A6865E] hover:bg-white/20 active:scale-95 transition-all duration-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] hover:drop-shadow-[0_2px_8px_rgba(166,134,94,0.7)]"
            title="Philosophy"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
            </svg>
          </Link>

          <Link
            href="/full-video"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-white/90 hover:text-[#A6865E] hover:bg-white/20 active:scale-95 transition-all duration-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] hover:drop-shadow-[0_2px_8px_rgba(166,134,94,0.7)]"
            title="Cinematic Video"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </Link>
        </nav>
      </header>

      {/* ==================================================================== */}
      {/*  2. Hero Section: 120-Frame Canvas Scrollytelling (Elongated Runway) */}
      {/* ==================================================================== */}
      <div ref={heroContainerRef} className="relative h-[560vh] sm:h-[620vh] w-full bg-[#0d0d0c]">
        <div id="hero" className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Preloader */}
          <AnimatePresence>
            {!isHeroLoaded && (
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

          {/* Canvas Viewport */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover"
            aria-label="Interactive 120-frame animation of the ZEN GT hypercar"
          />

          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0c] via-transparent to-[#0d0d0c]/70 pointer-events-none" />

          {/* Scrolling Narrative Cards */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-6">
            <AnimatePresence mode="wait">
              {heroPhase === 0 && (
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
                      onClick={() => setIsReserveOpen(true)}
                      className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-[#F6F3E9] bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                      Reserve the GT
                    </button>
                  </div>
                </motion.div>
              )}

              {heroPhase === 1 && (
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

              {heroPhase === 2 && (
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

              {heroPhase === 3 && (
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
                      onClick={() => setIsReserveOpen(true)}
                      className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-[#A6865E] bg-[#A6865E]/10 hover:bg-[#A6865E]/20 border border-[#A6865E]/40 backdrop-blur-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                      Claim Allocation
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Scroll Down Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-60">
            <span className="text-[10px] uppercase tracking-widest text-[#E6E2D8] font-['Chillax-Regular',sans-serif]">
              Scroll to play sequence
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

      {/* ==================================================================== */}
      {/*  3. Showcase Section: Frosted Glass Tabs & HUD Telemetry             */}
      {/* ==================================================================== */}
      <section id="showcase" className="relative py-28 px-6 bg-[#0d0d0c] text-[#F6F3E9] overflow-hidden">
        <div className="max-w-6xl mx-auto">
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20">
            {/* Tabs List */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              {SHOWCASE_TABS.map((tab) => {
                const isSelected = tab.id === activeTabId;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTabId(tab.id);
                      setTabVideoError(false);
                    }}
                    className={`group relative text-left p-4 rounded-2xl transition-all duration-300 focus:outline-none backdrop-blur-xl ${
                      isSelected
                        ? "bg-white/[0.16] border border-white/40 shadow-[0_12px_36px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.4)]"
                        : "bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 shadow-[0_4px_20px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.15)]"
                    }`}
                  >
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
                        <h3 className={`text-base font-semibold font-['Chillax-Medium',sans-serif] transition-colors ${isSelected ? "text-white" : "text-[#E6E2D8]/80 group-hover:text-white"}`}>
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

            {/* Video Canvas & Technical HUD */}
            <div className="lg:col-span-8">
              <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-black/60 border border-white/25 shadow-[0_25px_60px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.3)] backdrop-blur-2xl">
                <div className="hud-corner hud-tl" />
                <div className="hud-corner hud-tr" />
                <div className="hud-corner hud-bl" />
                <div className="hud-corner hud-br" />
                <div className="canvas-grid" />
                <div className="laser-scanner" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    {!tabVideoError ? (
                      <video
                        key={activeTab.video}
                        src={activeTab.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        onError={() => setTabVideoError(true)}
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

                {/* HUD Overlay Badges */}
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

          {/* Technical Specifications */}
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
                onClick={() => setIsReserveOpen(true)}
                className="px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#0d0d0c] bg-[#F6F3E9] hover:bg-white shadow-[0_10px_30px_rgba(246,243,233,0.3)] transition-all"
              >
                Reserve This Specification
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/*  4. Philosophy Section: Sticky Video Scrollytelling                  */}
      {/* ==================================================================== */}
      <section ref={philContainerRef} id="philosophy" className="relative h-[300vh] w-full bg-[#0d0d0c] text-[#F6F3E9]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {PHILOSOPHY_CARDS.map((card, idx) => (
            <video
              key={card.video}
              src={card.video}
              autoPlay
              loop
              muted
              playsInline
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                activePhilCard === idx ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
              }`}
              style={{ transition: "opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1.5s cubic-bezier(0.16, 1, 0.3, 1)" }}
            />
          ))}

          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0c] via-black/40 to-[#0d0d0c]/80" />

          <div className="absolute inset-0 flex items-center justify-center p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePhilCard}
                initial={{ opacity: 0, y: 30, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -25, scale: 0.97 }}
                transition={EASE_SPRING}
                className="max-w-lg w-full p-8 sm:p-12 rounded-3xl bg-white/[0.08] border border-white/25 backdrop-blur-3xl shadow-[0_25px_60px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.35)] text-center"
              >
                <span className="inline-block text-xs uppercase tracking-[0.25em] text-[#A6865E] font-semibold mb-3 font-['Chillax-Medium',sans-serif]">
                  {PHILOSOPHY_CARDS[activePhilCard].kicker}
                </span>
                <h2 className="font-['Rosaline-Regular',Georgia,serif] text-2xl sm:text-4xl font-bold mb-4 leading-snug">
                  {PHILOSOPHY_CARDS[activePhilCard].title}
                </h2>
                <p className="text-sm sm:text-base text-[#E6E2D8]/80 leading-relaxed font-['Satoshi-Regular',sans-serif]">
                  {PHILOSOPHY_CARDS[activePhilCard].desc}
                </p>

                <div className="flex justify-center items-center gap-2 mt-8">
                  {PHILOSOPHY_CARDS.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        activePhilCard === i ? "w-6 bg-[#A6865E]" : "w-1.5 bg-white/20"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/*  5. Performance Gallery (Masonry Architecture)                       */}
      {/* ==================================================================== */}
      <section id="performance" className="py-28 px-6 bg-[#0d0d0c] text-[#F6F3E9]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-xs uppercase tracking-[0.25em] text-[#A6865E] mb-3 font-semibold font-['Chillax-Medium',sans-serif]">
              GALLERY ARCHITECTURE
            </span>
            <h2 className="font-['Rosaline-Regular',Georgia,serif] text-3xl sm:text-5xl font-bold tracking-tight">
              Form & Function
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GALLERY_ITEMS.map((item) => (
              <motion.div
                key={item.src}
                whileHover={{ scale: 1.015 }}
                transition={EASE_SPRING}
                className={`group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 ${item.span}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute inset-x-6 bottom-6 flex flex-col">
                  <span className="text-[11px] uppercase tracking-widest text-[#A6865E] font-semibold font-mono">
                    {item.title}
                  </span>
                  <span className="text-sm font-medium text-[#F6F3E9] font-['Chillax-Medium',sans-serif] mt-0.5">
                    {item.subtitle}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/*  6. Finale Section                                                   */}
      {/* ==================================================================== */}
      <section id="finale" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0d0d0c] text-[#F6F3E9]">
        <video
          src="/antigravity images/car drift shot in city road.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0c] via-black/30 to-[#0d0d0c]" />

        <div className="relative z-10 text-center px-6 max-w-xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={EASE_SPRING}
            className="inline-block text-xs uppercase tracking-[0.25em] text-[#A6865E] font-semibold mb-4 font-['Chillax-Medium',sans-serif]"
          >
            ALLOCATION QUEUE NOW OPEN
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...EASE_SPRING, delay: 0.1 }}
            className="font-['Rosaline-Regular',Georgia,serif] text-4xl sm:text-6xl font-bold mb-8 leading-tight tracking-tight"
          >
            Command the Silence.
          </motion.h2>
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            transition={EASE_SPRING}
            onClick={() => setIsReserveOpen(true)}
            className="px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider text-[#0d0d0c] bg-[#F6F3E9] hover:bg-white shadow-[0_15px_40px_rgba(246,243,233,0.3)] transition-all"
          >
            Reserve the GT
          </motion.button>
        </div>
      </section>

      {/* ==================================================================== */}
      {/*  7. Footer                                                           */}
      {/* ==================================================================== */}
      <footer className="bg-[#080808] border-t border-white/10 text-[#F6F3E9] pt-20 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
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
                  onClick={() => setIsReserveOpen(true)}
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
                    <button onClick={() => setIsReserveOpen(true)} className="text-left text-[#A6865E] hover:text-[#F6F3E9] transition-colors">
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

      {/* ==================================================================== */}
      {/*  8. Ambient Zen Sanctuary Overlay (Modal Dialog)                     */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {isZenOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-between p-8 sm:p-12 bg-[#080808]/95 backdrop-blur-2xl text-[#F6F3E9]"
          >
            <div className="w-full flex items-center justify-between max-w-4xl">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#A6865E]" />
                <span className="text-xs uppercase tracking-[0.25em] text-[#A6865E] font-['Chillax-Medium',sans-serif]">
                  Sanctuary Mode
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={EASE_SPRING}
                onClick={() => setIsZenOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#E6E2D8] transition-colors"
                aria-label="Exit Zen Mode"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="flex flex-col items-center justify-center my-auto text-center max-w-xl">
              <motion.div
                animate={{ scale: [1, 1.05, 1], opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-72 sm:w-96 aspect-[16/9] mb-8"
              >
                <Image
                  src="/antigravity images/car top side angle hero pose.png"
                  alt="ZEN GT sanctuary ambient visualization in stillness"
                  fill
                  className="object-contain drop-shadow-[0_0_50px_rgba(166,134,94,0.3)]"
                />
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={quoteIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.8 }}
                  className="min-h-[100px] flex flex-col items-center justify-center"
                >
                  <p className="font-['Rosaline-Regular',Georgia,serif] text-2xl sm:text-3xl text-[#F6F3E9] mb-3 italic">
                    &ldquo;{ZEN_QUOTES[quoteIndex].quote}&rdquo;
                  </p>
                  <span className="text-xs uppercase tracking-widest text-[#A6865E] font-mono">
                    — {ZEN_QUOTES[quoteIndex].author}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="pb-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={EASE_SPRING}
                onClick={() => setIsZenOpen(false)}
                className="px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold text-[#E6E2D8] bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all"
              >
                Return to Reality
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================================================================== */}
      {/*  9. Reservation Modal Dialog (Apple Spring Sheet)                    */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {isReserveOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsReserveOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={EASE_SPRING}
              className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-[#121211]/85 border border-white/25 backdrop-blur-3xl shadow-[0_30px_70px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.35)] text-[#F6F3E9] z-10 my-auto"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={EASE_SPRING}
                onClick={() => setIsReserveOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#E6E2D8] transition-colors"
                aria-label="Close Reservation Modal"
              >
                <X className="w-4 h-4" />
              </motion.button>

              {!confirmedCode ? (
                <div>
                  <span className="inline-block text-[11px] uppercase tracking-[0.2em] text-[#A6865E] font-semibold mb-1 font-mono">
                    2026 Production Queue
                  </span>
                  <h2 className="font-['Rosaline-Regular',Georgia,serif] text-2xl sm:text-3xl font-bold mb-2">
                    Reserve Your ZEN GT
                  </h2>
                  <p className="text-xs sm:text-sm text-[#E6E2D8]/70 mb-6 font-['Satoshi-Regular',sans-serif]">
                    Limited allocation slots. Escrow-secured with a 100% refundable reservation deposit.
                  </p>

                  <form onSubmit={handleReservationSubmit} noValidate className="space-y-4">
                    <input
                      type="text"
                      value={reservationForm._hp}
                      onChange={(e) => setReservationForm({ ...reservationForm, _hp: e.target.value })}
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <div>
                      <label className="block text-xs font-medium text-[#E6E2D8]/80 mb-1">
                        Full Name <span className="text-[#A6865E]">*</span>
                      </label>
                      <input
                        type="text"
                        value={reservationForm.name}
                        onChange={(e) => setReservationForm({ ...reservationForm, name: e.target.value })}
                        placeholder="e.g. Kenzo Murakami"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-[#F6F3E9] placeholder:text-white/20 focus:outline-none focus:border-[#A6865E] transition-colors"
                      />
                      {formErrors.name && <p className="text-xs text-rose-400 mt-1">{formErrors.name}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-[#E6E2D8]/80 mb-1">
                          Email Address <span className="text-[#A6865E]">*</span>
                        </label>
                        <input
                          type="email"
                          value={reservationForm.email}
                          onChange={(e) => setReservationForm({ ...reservationForm, email: e.target.value })}
                          placeholder="sanctuary@domain.com"
                          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-[#F6F3E9] placeholder:text-white/20 focus:outline-none focus:border-[#A6865E] transition-colors"
                        />
                        {formErrors.email && <p className="text-xs text-rose-400 mt-1">{formErrors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#E6E2D8]/80 mb-1">
                          Phone Number <span className="text-[#A6865E]">*</span>
                        </label>
                        <input
                          type="tel"
                          value={reservationForm.phone}
                          onChange={(e) => setReservationForm({ ...reservationForm, phone: e.target.value })}
                          placeholder="+1 (555) 019-2834"
                          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-[#F6F3E9] placeholder:text-white/20 focus:outline-none focus:border-[#A6865E] transition-colors"
                        />
                        {formErrors.phone && <p className="text-xs text-rose-400 mt-1">{formErrors.phone}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-[#E6E2D8]/80 mb-1">
                          Chassis Specification
                        </label>
                        <select
                          value={reservationForm.model}
                          onChange={(e) => setReservationForm({ ...reservationForm, model: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#1c1c1b] border border-white/10 text-xs text-[#F6F3E9] focus:outline-none focus:border-[#A6865E] transition-colors"
                        >
                          <option value="ZEN GT-1 Launch Edition">ZEN GT-1 Launch Edition</option>
                          <option value="ZEN GT-P Track Performance">ZEN GT-P Track Performance</option>
                          <option value="ZEN GT-Sanctuary Mindful">ZEN GT-Sanctuary Mindful</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#E6E2D8]/80 mb-1">
                          Target Delivery
                        </label>
                        <select
                          value={reservationForm.timeline}
                          onChange={(e) => setReservationForm({ ...reservationForm, timeline: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#1c1c1b] border border-white/10 text-xs text-[#F6F3E9] focus:outline-none focus:border-[#A6865E] transition-colors"
                        >
                          <option value="2026 Q4 Founding Allocation">2026 Q4 Founding Allocation</option>
                          <option value="2027 Q1 Phase II Build">2027 Q1 Phase II Build</option>
                          <option value="2027 Q2 Global Dispatch">2027 Q2 Global Dispatch</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-1">
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={reservationForm.consent}
                          onChange={(e) => setReservationForm({ ...reservationForm, consent: e.target.checked })}
                          className="mt-0.5 rounded accent-[#A6865E]"
                        />
                        <span className="text-[11px] text-[#E6E2D8]/70 leading-relaxed">
                          I acknowledge this reservation request is processed according to the{" "}
                          <Link href="/terms" className="text-[#A6865E] underline underline-offset-2">
                            Terms
                          </Link>{" "}
                          and protected under the{" "}
                          <Link href="/privacy" className="text-[#A6865E] underline underline-offset-2">
                            Privacy Policy
                          </Link>
                          .
                        </span>
                      </label>
                      {formErrors.consent && <p className="text-xs text-rose-400 mt-1">{formErrors.consent}</p>}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={EASE_SPRING}
                      disabled={isSubmitting}
                      type="submit"
                      className="w-full py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#0d0d0c] bg-[#F6F3E9] hover:bg-white shadow-[0_10px_25px_rgba(246,243,233,0.2)] transition-all flex items-center justify-center gap-2 mt-4"
                    >
                      {isSubmitting ? (
                        <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      ) : (
                        <span>Confirm Allocation Request</span>
                      )}
                    </motion.button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#A6865E] font-semibold mb-1 font-mono block">
                    Sanctuary Allocation Confirmed
                  </span>
                  <h3 className="font-['Rosaline-Regular',Georgia,serif] text-2xl font-bold mb-3">
                    Your Priority Slot is Reserved
                  </h3>
                  <p className="text-xs sm:text-sm text-[#E6E2D8]/70 mb-6 leading-relaxed">
                    An executive concierge dispatch has been registered. Your encrypted allocation credentials and build confirmation have been dispatched to your email.
                  </p>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6 max-w-xs mx-auto">
                    <span className="text-[10px] uppercase tracking-widest text-[#E6E2D8]/60 block mb-1">
                      Allocation Reference ID
                    </span>
                    <span className="text-base font-mono font-bold text-[#A6865E]">
                      {confirmedCode}
                    </span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={EASE_SPRING}
                    onClick={() => {
                      setIsReserveOpen(false);
                      setConfirmedCode(null);
                    }}
                    className="px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold text-[#F6F3E9] bg-white/10 hover:bg-white/20 transition-all"
                  >
                    Return to Sanctuary
                  </motion.button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================================================================== */}
      {/*  10. Cookie & Privacy Consent Banner                                 */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {showCookieBanner && (
          <motion.aside
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={EASE_SPRING}
            className="fixed bottom-6 right-6 left-6 sm:left-auto sm:max-w-md z-40 p-5 rounded-2xl bg-[#141413]/80 border border-white/30 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.35)] text-[#F6F3E9]"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-[#A6865E]/10 text-[#A6865E] shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold tracking-wider uppercase text-[#F6F3E9] font-['Chillax-Medium',sans-serif]">
                  Mindful Privacy & Telemetry
                </h4>
                <p className="text-xs text-[#E6E2D8]/70 mt-1 leading-relaxed">
                  We respect your sanctuary. ZEN uses minimal telemetry to ensure seamless canvas rendering. Read our{" "}
                  <Link href="/privacy" className="text-[#A6865E] underline underline-offset-2">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/5">
              <button
                onClick={() => handleCookieChoice(false)}
                className="px-3 py-1.5 rounded-lg text-[11px] font-medium text-[#E6E2D8]/60 hover:text-[#F6F3E9] transition-colors"
              >
                Essential Only
              </button>
              <button
                onClick={() => handleCookieChoice(true)}
                className="px-4 py-1.5 rounded-lg text-[11px] font-semibold text-[#0d0d0c] bg-[#F6F3E9] hover:bg-white transition-colors"
              >
                Accept All
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </main>
  );
}
