"use client";

import { useState, useEffect, useRef, useCallback, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion, AnimatePresence, animate, useScroll, useSpring, useTransform, useMotionValue,
  useMotionValueEvent, useMotionTemplate, useInView, useReducedMotion, useDragControls,
  type MotionValue,
} from "motion/react";
import { ArrowUp, ChevronDown, ShieldCheck, X, Maximize2 } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Tokens (colors + fonts unchanged from the original)                */
/* ------------------------------------------------------------------ */
const SPRING = { type: "spring", stiffness: 300, damping: 30, mass: 0.8 } as const;
const SOFT = { type: "spring", stiffness: 170, damping: 26, mass: 0.9 } as const;
const EASE = [0.32, 0.72, 0, 1] as const;

const F_HEAD = "font-['Rosaline-Regular',Georgia,serif]";
const F_BOLD = "font-['Chillax-Bold',sans-serif]";
const F_MED = "font-['Chillax-Medium',sans-serif]";
const F_BODY = "font-['Satoshi-Regular',sans-serif]";

const GLASS = "bg-white/[0.07] border border-white/[0.14] backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.18)]";
const GLASS_HI = "bg-white/[0.16] border border-white/40 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.5)]";
const KICKER = `text-xs uppercase tracking-[0.25em] text-[#A6865E] ${F_MED}`;
const H_XL = `${F_HEAD} text-[clamp(1.75rem,4.5vw,3.25rem)] font-bold leading-[1.15] tracking-tight text-[#F6F3E9]`;
const H_LG = `${F_HEAD} text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold leading-[1.18] tracking-tight text-[#F6F3E9]`;
const LEAD = `text-sm sm:text-base leading-relaxed text-[#E6E2D8]/75 ${F_BODY}`;

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const TOTAL = 120;
const A = "/antigravity images/";

const TABS = [
  { id: "motion", num: "01", name: "Motion", desc: "Dynamic balance in action", video: `${A}car drift shot.mp4`, fb: `${A}car image1.jpeg`, model: "ZEN GT-1", status: "Standby", power: "Dual silent motors", ratio: "50:50 balance" },
  { id: "interior", num: "02", name: "Interior", desc: "Luxury meets raw power", video: `${A}car transition from seats to nitro.mp4`, fb: `${A}car focused on seats.png`, model: "ZEN GT Interior", status: "Engaged", power: "Whisper cabin", ratio: "12 dB isolation" },
  { id: "engine", num: "03", name: "Engine", desc: "Whispering engineering", video: `${A}engine reveal.mp4`, fb: `${A}car engine.png`, model: "ZEN Fluid-Core", status: "Optimal", power: "750 hp equivalent", ratio: "98.4% efficiency" },
  { id: "tyre", num: "04", name: "Grip", desc: "Adhesion meets road feel", video: `${A}car tyre focusing shot.mp4`, fb: `${A}car tyre focused.png`, model: "ZEN Forged Alloy", status: "Active grip", power: "Vector adhesion", ratio: "1.35 lateral G" },
  { id: "garage", num: "05", name: "Atelier", desc: "The birthplace of detail", video: `${A}car garage transformation.mp4`, fb: `${A}car image in garage with light on.png`, model: "ZEN Workshop 01", status: "Bespoke queue", power: "Hand-crafted composite", ratio: "Series 01–50" },
];

const TAB_SPECS: Record<string, Array<{ n: number; dec: number; u: string; l: string; d: string }>> = {
  motion: [
    { n: 2.8, dec: 1, u: "s", l: "0–100 km/h", d: "Zero-slip torque vectoring" },
    { n: 320, dec: 0, u: "km/h", l: "Top Velocity", d: "Aero drag-governed ceiling" },
    { n: 50, dec: 0, u: "%", l: "Weight Distribution", d: "50:50 neutral axle balance" },
    { n: 0.19, dec: 2, u: "Cd", l: "Drag Coefficient", d: "Laminar airflow efficiency" },
  ],
  interior: [
    { n: 12, dec: 0, u: "dB", l: "Cabin Isolation", d: "Active acoustic phase cancellation" },
    { n: 28, dec: 0, u: "spk", l: "Spatial Audio", d: "Concert-hall acoustic matrix" },
    { n: 22, dec: 0, u: "ways", l: "Seat Articulation", d: "Pneumatic posture memory" },
    { n: 100, dec: 0, u: "%", l: "Organic Nappa", d: "Vegetable-tanned tactile leather" },
  ],
  engine: [
    { n: 750, dec: 0, u: "hp", l: "Peak Output", d: "Dual permanent magnet motors" },
    { n: 1050, dec: 0, u: "Nm", l: "Instant Torque", d: "Zero mechanical hesitation" },
    { n: 98.4, dec: 1, u: "%", l: "Core Efficiency", d: "Silicon carbide power inverters" },
    { n: 21000, dec: 0, u: "rpm", l: "Rotor Spin", d: "Carbon-fiber rotor sleeve" },
  ],
  tyre: [
    { n: 1.35, dec: 2, u: "G", l: "Lateral Adhesion", d: "Dynamic vector road adhesion" },
    { n: 32, dec: 0, u: "m", l: "100–0 km/h", d: "Carbon-ceramic heat sink" },
    { n: 21, dec: 0, u: "in", l: "Forged Monoblock", d: "Lightweight vortex alloys" },
    { n: 1000, dec: 0, u: "Hz", l: "Damper Telemetry", d: "Millisecond magnetic adaptation" },
  ],
  garage: [
    { n: 50, dec: 0, u: "units", l: "Founding Run", d: "Numbered global allocation" },
    { n: 480, dec: 0, u: "hrs", l: "Hand Build", d: "Master-artisan finish per car" },
    { n: 12, dec: 0, u: "layers", l: "Piano Lacquer", d: "Multi-stage hand-buffed coating" },
    { n: 100, dec: 0, u: "%", l: "Prepreg Carbon", d: "Autoclave aeronautic monocoque" },
  ],
};

const IDEAS = [
  { k: "Philosophy", t: "Clarity over noise.", d: "We strip away everything that doesn't matter.", v: `${A}car driving on street with zoomout.mp4` },
  { k: "Focus", t: "Only the drive.", d: "No flashing screens. No artificial sounds.", v: `${A}car transition from steering to hero pose.mp4` },
  { k: "Harmony", t: "Nothing left to take away.", d: "Perfection is reached when there is nothing left to remove.", v: `${A}car garage transformation.mp4` },
];

const GALLERY = [
  {
    id: "01",
    tag: "Aerodynamics",
    src: `${A}car hero pose top side angle 2.png`,
    alt: "ZEN GT front quarter silhouette",
    t: "Profile & Aerodynamics",
    s: "Single-piece continuous carbon composite curvature",
    spec: "0.19 Cd · Active Flow",
    span: "md:col-span-2",
    ratio: "aspect-[4/3] md:aspect-[21/9]",
  },
  {
    id: "02",
    tag: "Acoustics",
    src: `${A}car nitro focused.png`,
    alt: "ZEN GT titanium exhaust and diffuser",
    t: "Titanium Venturi Diffuser",
    s: "Acoustic venturi balance with tuned thermal escape",
    spec: "Grade-5 Titanium · 12 dB Floor",
    span: "",
    ratio: "aspect-[4/3]",
  },
  {
    id: "03",
    tag: "Chassis",
    src: `${A}car tyre focused.png`,
    alt: "ZEN GT forged alloy wheel",
    t: "Forged Vortex Monoblock",
    s: "Lightweight directional vortex heat evacuation",
    spec: "21\" Forged Alloy · 1.35 G Grip",
    span: "",
    ratio: "aspect-[4/3]",
  },
  {
    id: "04",
    tag: "Powertrain",
    src: `${A}engine image.png`,
    alt: "ZEN GT liquid-cooled dual-motor powertrain",
    t: "Fluid Core Powertrain",
    s: "Dual permanent-magnet silent drive with silicon carbide",
    spec: "750 hp · 1050 Nm Instant",
    span: "md:col-span-2",
    ratio: "aspect-[4/3] md:aspect-[21/9]",
  },
];

const DOCK = [
  { id: "hero", label: "Home", d: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></> },
  { id: "showcase", label: "Anatomy", d: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></> },
  { id: "philosophy", label: "Philosophy", d: <><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></> },
  { id: "/full-video", label: "Film", d: <polygon points="5 3 19 12 5 21 5 3" /> },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
function go(id: string) {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    if (id === "hero") window.scrollTo({ top: 0, behavior: "smooth" });
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
}

function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(max-width: 639px)");
    const f = () => setM(q.matches);
    f();
    q.addEventListener("change", f);
    return () => q.removeEventListener("change", f);
  }, []);
  return m;
}

/** Scroll-in reveal – tween on the iOS curve, no bounce. */
function Reveal({ children, delay = 0, y = 28, blur = false, className }: { children: ReactNode; delay?: number; y?: number; blur?: boolean; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y, ...(blur && { filter: "blur(10px)" }) }}
      whileInView={{ opacity: 1, y: 0, ...(blur && { filter: "blur(0px)" }) }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

function Btn({
  children,
  onClick,
  href,
  variant = "light",
  full,
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "light" | "glass" | "gold" | "goldGlass";
  full?: boolean;
}) {
  const cls = `inline-flex items-center justify-center rounded-full px-6 py-3 text-xs sm:text-sm uppercase tracking-wider font-semibold ${F_MED} transition-all duration-300 ${
    full ? "w-full" : ""
  } ${
    variant === "light"
      ? "bg-[#F6F3E9] text-[#0d0d0c] hover:bg-white shadow-[0_10px_30px_rgba(246,243,233,0.2)]"
      : variant === "goldGlass"
      ? "border border-white/35 bg-white/[0.14] text-white hover:bg-white/[0.24] hover:border-white/60 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.55)]"
      : variant === "gold"
      ? "border border-white/25 bg-white/[0.10] text-white hover:bg-white/[0.20] backdrop-blur-xl"
      : "border border-white/20 bg-white/[0.07] text-white/90 hover:text-white hover:bg-white/[0.16] hover:border-white/45 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.35)]"
  }`;
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={SPRING}
      className={full ? "w-full" : "inline-block"}
    >
      {href ? (
        href.startsWith("#") ? (
          <a href={href} onClick={go(href.slice(1))} className={cls}>
            {children}
          </a>
        ) : (
          <Link href={href} className={cls}>
            {children}
          </Link>
        )
      ) : (
        <button type="button" onClick={onClick} className={cls}>
          {children}
        </button>
      )}
    </motion.div>
  );
}

/** Plays only while on screen – keeps phones cool. */
function LazyVideo({ src, className, play = true, onError }: { src: string; className?: string; play?: boolean; onError?: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { margin: "200px" });
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (inView && play) v.play().catch(() => {});
    else v.pause();
  }, [inView, play]);
  return <video ref={ref} src={src} muted loop playsInline preload="metadata" onError={onError} className={className} />;
}

function CountUp({ to, dec }: { to: number; dec: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => v.toFixed(dec));
  useEffect(() => {
    if (!inView) return;
    const c = animate(mv, to, { duration: 1.8, ease: EASE });
    return () => c.stop();
  }, [inView, mv, to]);
  return <motion.span ref={ref}>{text}</motion.span>;
}

function Heading({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <Reveal><span className={`mb-3 block ${KICKER}`}>{kicker}</span></Reveal>
      <Reveal delay={0.08} blur><h2 className={H_LG}>{title}</h2></Reveal>
      {sub && <Reveal delay={0.16}><p className={`mt-4 ${LEAD}`}>{sub}</p></Reveal>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Dock – glass nav with macOS-style magnification                    */
/* ------------------------------------------------------------------ */
function DockItem({ item, mouseX, active }: { item: (typeof DOCK)[number]; mouseX: MotionValue<number>; active: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const dist = useTransform(mouseX, (x) => {
    const b = ref.current?.getBoundingClientRect();
    return b ? x - b.x - b.width / 2 : 999;
  });
  const scale = useSpring(useTransform(dist, [-90, 0, 90], [1, 1.4, 1]), { mass: 0.1, stiffness: 190, damping: 14 });
  const y = useTransform(scale, [1, 1.4], [0, -3]);
  const isRoute = item.id.startsWith("/");
  const cls = `grid h-9 w-9 place-items-center rounded-full text-white/90 transition-colors duration-200 hover:bg-white/20 hover:text-[#A6865E] sm:h-10 sm:w-10 ${active ? "text-[#A6865E]" : ""}`;
  const icon = (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{item.d}</svg>
  );
  return (
    <motion.div ref={ref} style={{ scale, y }} onHoverStart={() => setHover(true)} onHoverEnd={() => setHover(false)} className="relative">
      {isRoute ? <Link href={item.id} className={cls} aria-label={item.label}>{icon}</Link> : <a href={`#${item.id}`} onClick={go(item.id)} className={cls} aria-label={item.label}>{icon}</a>}
      {active && <motion.span layoutId="dock-dot" transition={SPRING} className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#A6865E]" />}
      <AnimatePresence>
        {hover && (
          <motion.span
            initial={{ opacity: 0, y: -4, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -4, scale: 0.9 }} transition={{ duration: 0.18, ease: EASE }}
            className={`pointer-events-none absolute left-1/2 top-[130%] hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#0d0d0c]/80 px-2.5 py-1 text-[11px] text-[#F6F3E9] backdrop-blur-xl sm:block ${F_MED}`}
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Dock({ onReserve }: { onReserve: () => void }) {
  const mouseX = useMotionValue(Infinity);
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const els = ["hero", "showcase", "philosophy"].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <div className="pointer-events-none fixed inset-x-0 z-50 flex justify-center" style={{ top: "max(1.75rem, calc(env(safe-area-inset-top, 0px) + 0.95rem))" }}>
      <motion.header
        initial={{ y: -64, opacity: 0, scale: 0.94 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ ...SOFT, delay: 0.3 }}
        onMouseMove={(e) => mouseX.set(e.clientX)} onMouseLeave={() => mouseX.set(Infinity)}
        className={`pointer-events-auto flex max-w-[94vw] items-center gap-1 rounded-full px-2.5 py-1.5 sm:gap-1.5 sm:px-3 sm:py-2 ${GLASS_HI}`}
      >
        <a href="#hero" onClick={go("hero")} aria-label="ZEN home" className={`pl-2 pr-2 text-xl tracking-[0.16em] font-bold text-white sm:text-2xl ${F_HEAD}`}>ZEN</a>
        <span className="mx-0.5 h-4 w-px bg-white/35" aria-hidden />
        <nav className="flex items-center gap-0.5" aria-label="Main">
          {DOCK.map((d) => <DockItem key={d.id} item={d} mouseX={mouseX} active={active === d.id} />)}
        </nav>
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={SPRING} onClick={onReserve}
          className={`ml-1 rounded-full border border-white/40 bg-gradient-to-b from-white/25 to-white/10 px-3.5 py-1.5 text-xs uppercase tracking-wider font-semibold text-white backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] hover:bg-white/25 transition-colors ${F_MED}`}
        >
          Reserve
        </motion.button>
      </motion.header>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero – spring-smoothed 120-frame scrub + scroll-linked copy        */
/* ------------------------------------------------------------------ */
function HeroPhase({
  p,
  inR,
  outR,
  baseY = 0,
  liftY = -50,
  children,
}: {
  p: MotionValue<number>;
  inR?: [number, number];
  outR?: [number, number];
  baseY?: number;
  liftY?: number;
  children: ReactNode;
}) {
  const input = [...(inR ?? [0]), ...(outR ?? [1])];
  const o = [...(inR ? [0, 1] : [1]), ...(outR ? [1, 0] : [1])];
  const opacity = useTransform(p, input, o);
  // Physical tracking: text lifts with the garage gate
  const gateTrack = useTransform(
    p,
    [inR ? inR[0] : 0, outR ? outR[1] : 1],
    [baseY, baseY + liftY]
  );
  const scale = useTransform(p, input, [...(inR ? [0.96, 1] : [1]), ...(outR ? [1, 1.03] : [1])]);
  const blur = useTransform(p, input, o.map((v) => (1 - v) * 12));
  const filter = useMotionTemplate`blur(${blur}px)`;
  const pe = useTransform(opacity, (v) => (v > 0.5 ? "auto" : "none"));
  return (
    <motion.div style={{ opacity, y: gateTrack, scale, filter, pointerEvents: pe }} className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
      {children}
    </motion.div>
  );
}

function Hero({ onReserve }: { onReserve: () => void }) {
  const runway = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frames = useRef<HTMLImageElement[]>([]);
  const last = useRef(-1);
  const loaded = useMotionValue(0);
  const pct = useTransform(loaded, (v) => `${Math.round((v / TOTAL) * 100)}%`);
  const bar = useTransform(loaded, [0, TOTAL], [0, 1]);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({ target: runway, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 36, mass: 0.7 });
  const zoom = useTransform(p, [0, 1], [1.08, 1]);
  const cueOpacity = useTransform(p, [0, 0.05], [0.7, 0]);

  const draw = useCallback((i: number) => {
    const c = canvasRef.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    let img: HTMLImageElement | undefined;
    for (let j = i; j >= 0; j--) {
      const f = frames.current[j];
      if (f?.complete && f.naturalWidth) { img = f; break; }
    }
    if (!img) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = c.width / dpr, h = c.height / dpr;
    const r = img.naturalWidth / img.naturalHeight;
    const dw = w / h > r ? w : h * r;
    const dh = w / h > r ? w / r : h;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(img, ((w - dw) / 2) * dpr, ((h - dh) / 2) * dpr, dw * dpr, dh * dpr);
  }, []);

  useMotionValueEvent(p, "change", (v) => {
    const i = Math.min(TOTAL - 1, Math.max(0, Math.round(v * (TOTAL - 1))));
    if (i !== last.current) { last.current = i; draw(i); }
  });

  useEffect(() => {
    let done = 0, alive = true;
    const imgs: HTMLImageElement[] = new Array(TOTAL);
    const tick = (i: number) => {
      if (!alive) return;
      loaded.set(++done);
      if (i === 0) draw(0);
      if (done === 12) setReady(true);
    };
    for (let i = 0; i < TOTAL; i++) {
      const id = String(i + 1).padStart(4, "0");
      const img = document.createElement("img");
      img.decoding = "async";
      img.onload = () => tick(i);
      img.onerror = () => {
        const f = document.createElement("img");
        f.onload = () => { imgs[i] = f; tick(i); };
        f.onerror = () => tick(-1);
        f.src = `/opening_shot_frames/frames/${id}.jpg`;
      };
      img.src = `/opening_shot_frames/webp/${id}.webp`;
      imgs[i] = img;
    }
    frames.current = imgs;
    return () => { alive = false; };
  }, [draw, loaded]);

  useEffect(() => {
    let w = 0, h = 0;
    const resize = () => {
      const c = canvasRef.current;
      if (!c) return;
      // ignore mobile toolbar show/hide (small height-only changes)
      if (w === window.innerWidth && Math.abs(h - window.innerHeight) < 140) return;
      w = window.innerWidth; h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = w * dpr; c.height = h * dpr;
      draw(Math.max(0, last.current));
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [draw]);

  return (
    <div ref={runway} id="hero" className="relative h-[850vh] w-full bg-[#0d0d0c] sm:h-[950vh]">
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        <AnimatePresence>
          {!ready && (
            <motion.div exit={{ opacity: 0, scale: 1.04 }} transition={{ duration: 0.8, ease: EASE }} className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#0d0d0c]">
              <span className={`${F_HEAD} mb-5 text-4xl tracking-[0.3em] text-[#F6F3E9]`}>ZEN</span>
              <div className="mb-3 h-0.5 w-44 overflow-hidden rounded-full bg-white/10">
                <motion.div style={{ scaleX: bar }} className="h-full origin-left bg-[#A6865E]" />
              </div>
              <motion.span className={`text-[11px] uppercase tracking-widest text-[#E6E2D8]/60 ${F_BODY}`}>{pct}</motion.span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.canvas ref={canvasRef} style={{ scale: zoom }} className="absolute inset-0 h-full w-full" aria-label="ZEN GT scroll animation" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d0d0c] via-transparent to-[#0d0d0c]/70" />

        <HeroPhase p={p} outR={[0.14, 0.24]} baseY={25} liftY={-40}>
          <span className={`mb-3 ${KICKER}`}><span className={`${F_HEAD} text-sm tracking-[0.2em]`}>ZEN</span> GT</span>
          <h1 className={H_XL}>Pure form.<br />Pure mind.</h1>
          <p className={`mt-3 max-w-xs ${LEAD}`}>Silence, engineered.</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Btn onClick={onReserve} variant="goldGlass">Reserve</Btn>
            <Btn href="/full-video" variant="glass">Watch the film</Btn>
          </div>
        </HeroPhase>
        <HeroPhase p={p} inR={[0.24, 0.32]} outR={[0.42, 0.5]} baseY={-10} liftY={-30}>
          <h2 className={H_XL}>Silence<br />awakens.</h2>
          <p className={`mt-2.5 max-w-xs ${LEAD}`}>A silhouette forged in stillness.</p>
        </HeroPhase>
        <HeroPhase p={p} inR={[0.5, 0.58]} outR={[0.7, 0.78]} baseY={-45} liftY={-25}>
          <h2 className={H_XL}>Form follows<br />mind.</h2>
          <p className={`mt-2.5 max-w-xs ${LEAD}`}>Nothing added. Nothing wasted.</p>
        </HeroPhase>
        <HeroPhase p={p} inR={[0.78, 0.86]} baseY={-70} liftY={-10}>
          <h2 className={H_XL}>Meet the<br /><span className={F_HEAD}>ZEN</span> GT.</h2>
          <p className={`mt-3 max-w-xs ${LEAD}`}>Electric. Effortless. Yours.</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Btn href="#showcase" variant="glass">Explore</Btn>
            <Btn onClick={onReserve} variant="goldGlass">Claim allocation</Btn>
          </div>
        </HeroPhase>

        <motion.div style={{ opacity: cueOpacity }} className="pointer-events-none absolute inset-x-0 bottom-7 flex flex-col items-center gap-2">
          <span className={`text-[10px] uppercase tracking-widest text-[#E6E2D8] ${F_BODY}`}>Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>
            <ChevronDown className="h-4 w-4 text-[#A6865E]" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Showcase – segmented control + glass HUD + count-up specs          */
/* ------------------------------------------------------------------ */
function Chip({ label, value, className = "" }: { label: string; value: string; className?: string }) {
  return (
    <div className={`rounded-2xl px-3.5 py-2 ${GLASS} ${className}`}>
      <span className="block text-[9px] uppercase tracking-widest text-[#A6865E]">{label}</span>
      <span className="block text-xs font-mono font-bold text-white">{value}</span>
    </div>
  );
}

function Showcase({ onReserve }: { onReserve: () => void }) {
  const [id, setId] = useState(TABS[0].id);
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const tab = TABS.find((t) => t.id === id) ?? TABS[0];
  return (
    <section id="showcase" className="relative bg-[#0d0d0c] px-4 py-24 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <Heading kicker="Anatomy" title="Every detail, considered." sub="Five moments. One feeling." />

        <Reveal className="mt-12 sm:mt-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-white/20 bg-black/60 shadow-[0_30px_80px_rgba(0,0,0,0.7)] sm:aspect-[16/10] sm:rounded-[40px] lg:aspect-video">
            <AnimatePresence initial={false}>
              <motion.div key={tab.id} initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9, ease: EASE }} className="absolute inset-0">
                {failed[tab.id] ? (
                  <Image src={tab.fb} alt={tab.name} fill sizes="(max-width: 1152px) 100vw, 1152px" className="object-cover" />
                ) : (
                  <LazyVideo src={tab.video} onError={() => setFailed((f) => ({ ...f, [tab.id]: true }))} className="h-full w-full object-cover" />
                )}
              </motion.div>
            </AnimatePresence>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

            <div className="absolute inset-x-4 top-4 flex items-start justify-between sm:inset-x-6 sm:top-6">
              <Chip label="Model" value={tab.model} />
              <div className={`flex items-center gap-2 rounded-2xl px-3.5 py-2 ${GLASS}`}>
                <span className="relative flex h-2 w-2"><span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" /><span className="h-2 w-2 rounded-full bg-emerald-400" /></span>
                <span className="text-xs font-mono font-semibold text-emerald-400">{tab.status}</span>
              </div>
            </div>

            <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 sm:inset-x-6 sm:bottom-6">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={tab.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease: EASE }} className={`rounded-2xl px-4 py-3 ${GLASS}`}>
                  <span className={`block text-lg text-white sm:text-2xl ${F_MED}`}>{tab.name}</span>
                  <span className={`block text-xs text-[#E6E2D8]/70 sm:text-sm ${F_BODY}`}>{tab.desc}</span>
                </motion.div>
              </AnimatePresence>
              <div className="hidden gap-2 md:flex">
                <Chip label="Powertrain" value={tab.power} />
                <Chip label="Calibration" value={tab.ratio} className="text-right" />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-6 flex justify-center">
          <div role="tablist" className={`no-scrollbar flex max-w-full snap-x gap-1 overflow-x-auto rounded-full p-1.5 ${GLASS}`} style={{ scrollbarWidth: "none" }}>
            {TABS.map((t) => (
              <button
                key={t.id} role="tab" aria-selected={t.id === id}
                onClick={(e) => { setId(t.id); e.currentTarget.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" }); }}
                className={`relative shrink-0 snap-center rounded-full px-4 py-2 text-sm transition-colors duration-300 sm:px-5 ${F_MED} ${t.id === id ? "text-white" : "text-[#E6E2D8]/60 hover:text-white"}`}
              >
                {t.id === id && <motion.span layoutId="seg" transition={SPRING} className="absolute inset-0 rounded-full border border-white/25 bg-white/20" />}
                <span className="relative">{t.name}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-16 sm:mt-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
            >
              {(TAB_SPECS[tab.id] ?? TAB_SPECS.motion).map((s, i) => (
                <motion.div
                  key={s.l}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  whileHover={{ y: -6, backgroundColor: "rgba(255,255,255,0.11)" }}
                  className={`h-full rounded-[24px] p-5 sm:p-7 ${GLASS} transition-colors`}
                >
                  <span className={`block text-[clamp(2.25rem,6vw,3.5rem)] leading-none tracking-tight text-white ${F_BOLD}`}>
                    <CountUp to={s.n} dec={s.dec} />
                    <span className="ml-1 text-base text-[#A6865E] sm:text-xl">{s.u}</span>
                  </span>
                  <span className={`mt-4 block text-sm text-[#F6F3E9] ${F_MED}`}>{s.l}</span>
                  <span className="mt-1 block text-[11px] font-mono text-[#A6865E]">{s.d}</span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        <Reveal className="mt-10 flex justify-center"><Btn onClick={onReserve}>Reserve this spec</Btn></Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Philosophy – sticky scroll story with crossfading video + glass    */
/* ------------------------------------------------------------------ */
function Philosophy() {
  const ref = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setI(v < 0.34 ? 0 : v < 0.67 ? 1 : 2));
  return (
    <section ref={ref} id="philosophy" className="relative h-[300vh] w-full bg-[#0d0d0c]">
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        {IDEAS.map((c, k) => (
          <motion.div key={c.v} animate={{ opacity: i === k ? 1 : 0, scale: i === k ? 1 : 1.08 }} transition={{ duration: 1.2, ease: EASE }} className="absolute inset-0">
            <LazyVideo src={c.v} play={i === k} className="h-full w-full object-cover" />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0c] via-black/40 to-[#0d0d0c]/80" />

        <div className="absolute inset-0 grid place-items-center p-5">
          <div className="grid w-full max-w-xl">
            {IDEAS.map((c, k) => (
              <motion.div
                key={c.k}
                animate={i === k ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : { opacity: 0, y: k < i ? -32 : 32, scale: 0.97, filter: "blur(10px)" }}
                transition={{ duration: 0.8, ease: EASE }}
                style={{ pointerEvents: "none" }}
                className={`col-start-1 row-start-1 rounded-[28px] p-7 text-center sm:rounded-[36px] sm:p-12 ${GLASS} bg-white/[0.08]`}
              >
                <span className={`mb-3 block ${KICKER}`}>{c.k}</span>
                <h2 className={`${F_HEAD} mb-3 text-[clamp(1.75rem,5vw,3rem)] font-bold leading-tight tracking-[-0.02em] text-[#F6F3E9]`}>{c.t}</h2>
                <p className={LEAD}>{c.d}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-8 flex items-center justify-center gap-2">
          {IDEAS.map((c, k) => (
            <motion.span key={c.k} animate={{ width: i === k ? 28 : 6, backgroundColor: i === k ? "#A6865E" : "rgba(255,255,255,0.25)" }} transition={SPRING} className="h-1.5 rounded-full" />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Gallery – Cinematic Aperture Shutter + 3D Specular Tilt Bento      */
/* ------------------------------------------------------------------ */
function GalleryCard({
  g,
  idx,
  onInspect,
}: {
  g: (typeof GALLERY)[number];
  idx: number;
  onInspect: (item: (typeof GALLERY)[number]) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });

  // Cinematic Aperture Unfold: Card expands outward like a wide camera shutter as you scroll into view
  const clip = useTransform(
    scrollYProgress,
    [0, 0.38],
    ["inset(16% 10% 16% 10% round 36px)", "inset(0% 0% 0% 0% round 32px)"]
  );
  const cardOpacity = useTransform(scrollYProgress, [0, 0.22], [0.3, 1]);
  const imgScale = useTransform(scrollYProgress, [0, 0.45], [1.16, 1.0]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  // 3D Gyroscopic Perspective Tilt & Specular Cursor Tracking
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [4, -4]), { stiffness: 220, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-4, 4]), { stiffness: 220, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ clipPath: clip, opacity: cardOpacity }}
      className={`${g.span} perspective-[1000px] will-change-transform`}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onInspect(g)}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.015 }}
        transition={SPRING}
        className={`group relative cursor-pointer overflow-hidden rounded-[32px] border border-white/15 bg-[#121211] shadow-[0_20px_60px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.25)] sm:rounded-[38px] ${g.ratio}`}
      >
        {/* Parallax Image Stream */}
        <motion.div style={{ scale: imgScale, y: imgY }} className="absolute -inset-[10%]">
          <Image
            src={g.src}
            alt={g.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          />
        </motion.div>

        {/* Ambient Dark Sheen & Corner HUD Brackets */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30 pointer-events-none transition-opacity duration-500 group-hover:opacity-75" />
        <div className="hud-corner top-4 left-4 border-t-2 border-l-2 opacity-50 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="hud-corner top-4 right-4 border-t-2 border-r-2 opacity-50 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="hud-corner bottom-4 left-4 border-b-2 border-l-2 opacity-50 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="hud-corner bottom-4 right-4 border-b-2 border-r-2 opacity-50 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Top Badges */}
        <div className="absolute inset-x-4 top-4 flex items-center justify-between sm:inset-x-6 sm:top-6 pointer-events-none">
          <span className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[10px] uppercase font-mono tracking-wider text-[#A6865E] backdrop-blur-xl">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A6865E]" />
            {g.id} // {g.tag}
          </span>
          <span className="flex items-center gap-1 rounded-full border border-white/15 bg-white/10 p-2 text-white/70 backdrop-blur-xl transition-all duration-300 group-hover:bg-white/25 group-hover:text-white">
            <Maximize2 className="h-3.5 w-3.5" />
          </span>
        </div>

        {/* Bottom Floating Glass Card */}
        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 sm:inset-x-6 sm:bottom-6">
          <div className={`rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 ${GLASS_HI} max-w-sm backdrop-blur-3xl`}>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className={`block text-sm sm:text-base font-semibold text-white ${F_MED}`}>{g.t}</span>
              <span className="text-[10px] font-mono text-[#A6865E] font-semibold">{g.spec}</span>
            </div>
            <span className={`block text-xs text-[#E6E2D8]/75 leading-relaxed ${F_BODY}`}>{g.s}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Gallery() {
  const [activeTag, setActiveTag] = useState("All");
  const [inspectItem, setInspectItem] = useState<(typeof GALLERY)[number] | null>(null);

  const tags = ["All", "Aerodynamics", "Acoustics", "Chassis", "Powertrain"];
  const filtered = activeTag === "All" ? GALLERY : GALLERY.filter((g) => g.tag === activeTag);

  useEffect(() => {
    if (!inspectItem) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setInspectItem(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inspectItem]);

  return (
    <section id="gallery" className="relative bg-[#0d0d0c] px-4 py-24 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 sm:mb-16">
          <Heading kicker="Gallery" title="Form & function." sub="A visual study in aerodynamic silence." />
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-xl overflow-x-auto no-scrollbar">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTag(t)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs transition-colors duration-200 whitespace-nowrap ${F_MED} ${
                  activeTag === t ? "text-white font-semibold" : "text-[#E6E2D8]/60 hover:text-white"
                }`}
              >
                {activeTag === t && (
                  <motion.span
                    layoutId="galleryTag"
                    transition={SPRING}
                    className="absolute inset-0 rounded-full border border-white/30 bg-white/20"
                  />
                )}
                <span className="relative z-10">{t}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
          <AnimatePresence>
            {filtered.map((g, idx) => (
              <GalleryCard key={g.id} g={g} idx={idx} onInspect={setInspectItem} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Luxury Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {inspectItem && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setInspectItem(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={SPRING}
              className="relative max-h-[92vh] max-w-5xl w-full overflow-hidden rounded-[32px] border border-white/25 bg-[#121211]/95 shadow-[0_30px_90px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur-3xl"
            >
              <div className="relative aspect-[16/10] sm:aspect-[21/10] w-full overflow-hidden bg-black">
                <Image
                  src={inspectItem.src}
                  alt={inspectItem.alt}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121211] via-transparent to-black/40" />
              </div>
              <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#A6865E]">
                    {inspectItem.id} // {inspectItem.tag} // {inspectItem.spec}
                  </span>
                  <h3 className={`${F_HEAD} text-2xl sm:text-3xl font-bold text-white mt-1`}>
                    {inspectItem.t}
                  </h3>
                  <p className={`text-xs sm:text-sm text-[#E6E2D8]/75 mt-1.5 max-w-xl ${F_BODY}`}>
                    {inspectItem.s}
                  </p>
                </div>
                <button
                  onClick={() => setInspectItem(null)}
                  className="rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-xs uppercase tracking-wider text-white font-semibold hover:bg-white/20 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Finale + footer                                                    */
/* ------------------------------------------------------------------ */
function Finale({ onReserve }: { onReserve: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  return (
    <section ref={ref} id="finale" className="relative flex h-[100dvh] w-full items-center justify-center overflow-hidden bg-[#0d0d0c]">
      <motion.div style={{ scale }} className="absolute inset-0 opacity-60">
        <LazyVideo src={`${A}car drift shot in city road.mp4`} className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0c] via-black/30 to-[#0d0d0c]" />
      <div className="relative z-10 px-6 text-center">
        <Reveal><span className={`mb-3 block ${KICKER}`}>Allocation open</span></Reveal>
        <Reveal delay={0.1} blur><h2 className={`${H_XL} mb-7`}>Command<br />the silence.</h2></Reveal>
        <Reveal delay={0.2}><Btn onClick={onReserve} variant="goldGlass">Reserve the GT</Btn></Reveal>
      </div>
    </section>
  );
}

function Footer({ onReserve }: { onReserve: () => void }) {
  const link = "transition-colors duration-200 hover:text-white";
  return (
    <footer className="border-t border-white/[0.08] bg-[#090909] px-4 pt-12 pb-10 text-[#E6E2D8]/60 sm:px-8 sm:pt-16 sm:pb-14">
      <div className="mx-auto max-w-6xl">
        {/* Apple-style Footnotes / Disclaimers */}
        <div className="mb-8 space-y-2 text-[11px] leading-relaxed text-[#E6E2D8]/45 border-b border-white/[0.07] pb-8 font-['Satoshi-Regular',sans-serif]">
          <p>
            1. All speed, output, and range figures (including 0–100 km/h in 2.8s, 750 hp peak output, and 620 km solid-state range) represent internal engineering targets evaluated under closed-track test protocols. Actual driving range and metrics may vary based on temperature, driver behavior, payload, and battery age.
          </p>
          <p>
            2. 12 dB cabin noise floor achieved with Active Phase Acoustic Cancellation engaged at standardized 100 km/h highway speeds on smooth bitumen surfaces.
          </p>
          <p>
            3. Series 01 Founding Allocation is strictly capped at 50 numbered vehicles worldwide. Allocation deposits are held in dedicated escrow accounts and remain 100% refundable at any time prior to chassis specification finalization.
          </p>
        </div>

        {/* Apple-style Breadcrumbs Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-white/[0.07] mb-8 text-xs text-[#E6E2D8]/50">
          <div className="flex items-center gap-2">
            <a href="#hero" onClick={go("hero")} aria-label="ZEN Home" className="text-white hover:opacity-80 transition-opacity">
              <span className={`${F_HEAD} text-base tracking-[0.16em] font-bold`}>ZEN</span>
            </a>
            <span className="text-white/30">/</span>
            <span className="text-[#E6E2D8]/80 font-medium">ZEN GT</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-1.5 text-xs text-[#E6E2D8]/70 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5 text-[#A6865E]" />
          </motion.button>
        </div>

        {/* Apple-style 5-Column Navigation Grid */}
        <div className="grid grid-cols-2 gap-8 text-xs sm:grid-cols-3 md:grid-cols-5 pb-10 border-b border-white/[0.07]">
          {/* Col 1: Explore */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#F6F3E9] font-['Chillax-Medium',sans-serif]">
              Explore
            </h4>
            <ul className="space-y-2 font-['Satoshi-Regular',sans-serif]">
              <li><a href="#showcase" onClick={go("showcase")} className={link}>Anatomy & Dynamics</a></li>
              <li><a href="#philosophy" onClick={go("philosophy")} className={link}>Design Philosophy</a></li>
              <li><a href="#gallery" onClick={go("gallery")} className={link}>Visual Gallery</a></li>
              <li><Link href="/full-video" className={link}>Experience Film</Link></li>
            </ul>
          </div>

          {/* Col 2: Specifications */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#F6F3E9] font-['Chillax-Medium',sans-serif]">
              Engineering
            </h4>
            <ul className="space-y-2 font-['Satoshi-Regular',sans-serif]">
              <li><span className="cursor-default">Dual Silent Motors</span></li>
              <li><span className="cursor-default">Silicon Carbide Core</span></li>
              <li><span className="cursor-default">Carbon Monocoque</span></li>
              <li><span className="cursor-default">Whisper Acoustic Tub</span></li>
            </ul>
          </div>

          {/* Col 3: Atelier */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#F6F3E9] font-['Chillax-Medium',sans-serif]">
              Atelier
            </h4>
            <ul className="space-y-2 font-['Satoshi-Regular',sans-serif]">
              <li><span className="cursor-default">Series 01 (50 Units)</span></li>
              <li><span className="cursor-default">Hand-Crafted Finish</span></li>
              <li><span className="cursor-default">12-Layer Lacquer</span></li>
              <li><span className="cursor-default">Private Delivery</span></li>
            </ul>
          </div>

          {/* Col 4: Concierge */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#F6F3E9] font-['Chillax-Medium',sans-serif]">
              Client Services
            </h4>
            <ul className="space-y-2 font-['Satoshi-Regular',sans-serif]">
              <li><button onClick={onReserve} className={`${link} text-left text-[#A6865E] font-medium`}>Reserve Allocation</button></li>
              <li><a href="mailto:concierge@zenautomotive.com" className={link}>Private Concierge</a></li>
              <li><span className="cursor-default">Global Transport</span></li>
              <li><span className="cursor-default">Escrow Verification</span></li>
            </ul>
          </div>

          {/* Col 5: Legal */}
          <div className="space-y-3 col-span-2 sm:col-span-1">
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#F6F3E9] font-['Chillax-Medium',sans-serif]">
              Trust & Legal
            </h4>
            <ul className="space-y-2 font-['Satoshi-Regular',sans-serif]">
              <li><Link href="/privacy" className={link}>Privacy Policy</Link></li>
              <li><Link href="/terms" className={link}>Terms of Reservation</Link></li>
              <li><span className="cursor-default">Regulatory Filings</span></li>
              <li><span className="cursor-default">Security Whitepaper</span></li>
            </ul>
          </div>
        </div>

        {/* Apple-style Bottom Row */}
        <div className="flex flex-col items-start justify-between gap-4 pt-6 text-[11px] sm:flex-row sm:items-center text-[#E6E2D8]/40">
          <p>
            Copyright &copy; 2026 ZEN Automotive Corporation. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
            <span>|</span>
            <span className="hover:text-white cursor-pointer transition-colors">Sales Policy</span>
            <span>|</span>
            <span className="hover:text-white cursor-pointer transition-colors">Legal Notices</span>
            <span>|</span>
            <span className="text-[#A6865E]/80">United States / Global</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Reservation – bottom sheet (drag to dismiss) on phones, dialog on  */
/*  larger screens                                                     */
/* ------------------------------------------------------------------ */
const INPUT = "w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-base text-[#F6F3E9] outline-none transition-[border-color,background-color,box-shadow] duration-300 placeholder:text-white/25 focus:border-[#A6865E] focus:bg-white/[0.09] focus:shadow-[0_0_0_4px_rgba(166,134,94,0.18)] sm:text-sm";

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className={`mb-1.5 block text-xs text-[#E6E2D8]/70 ${F_MED}`}>{label}</span>
      {children}
      <AnimatePresence>
        {error && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25, ease: EASE }} className="overflow-hidden pt-1 text-xs text-rose-400">{error}</motion.p>}
      </AnimatePresence>
    </label>
  );
}

const EMPTY = { name: "", email: "", phone: "", model: "ZEN GT-1 Launch Edition", timeline: "2026 Q4 Founding Allocation", consent: false, _hp: "" };

const EDITIONS = [
  "ZEN GT-1 Launch Edition",
  "ZEN GT-P Track Performance",
  "ZEN GT-Sanctuary Mindful",
];

const TIMELINES = [
  "2026 Q4 Founding Allocation",
  "2027 Q1 Phase II Build",
  "2027 Q2 Global Dispatch",
];

function GlassSelect({
  label,
  value,
  options,
  onChange,
  className,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleOutside);
      return () => document.removeEventListener("mousedown", handleOutside);
    }
  }, [open]);

  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
      <span className={`mb-1.5 block text-xs text-[#E6E2D8]/70 ${F_MED}`}>{label}</span>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-left text-sm text-[#F6F3E9] outline-none transition-[border-color,background-color,box-shadow] duration-300 hover:border-white/20 hover:bg-white/[0.09] focus:border-[#A6865E] focus:shadow-[0_0_0_4px_rgba(166,134,94,0.18)]"
      >
        <span className="truncate">{value}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-4 w-4 text-[#A6865E] shrink-0" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: EASE }}
            className="absolute left-0 right-0 bottom-full mb-2 z-50 space-y-0.5 overflow-hidden rounded-2xl border border-white/20 bg-[#161615]/98 p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.25)] backdrop-blur-3xl [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {options.map((opt) => {
              const selected = opt === value;
              return (
                <li key={opt}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(opt);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-xs sm:text-sm font-medium transition-colors ${
                      selected
                        ? "border border-[#A6865E]/30 bg-[#A6865E]/15 font-semibold text-[#F6F3E9]"
                        : "text-[#E6E2D8]/75 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span>{opt}</span>
                    {selected && (
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#A6865E]" />
                    )}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

function ReserveSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const mobile = useIsMobile();
  const controls = useDragControls();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [code, setCode] = useState<string | null>(null);
  const set = (k: keyof typeof EMPTY) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open, onClose]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (form._hp) return;
    const er: Record<string, string> = {};
    if (form.name.trim().length < 2) er.name = "Please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) er.email = "Please enter a valid email.";
    if (form.phone.trim().length < 7) er.phone = "Please enter a valid phone number.";
    if (!form.consent) er.consent = "Please accept the terms to continue.";
    setErrors(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    setTimeout(() => { setBusy(false); setCode(`ZEN-GT-2026-${Math.floor(1000 + Math.random() * 9000)}`); }, 700);
  };

  return (
    <AnimatePresence onExitComplete={() => { setForm(EMPTY); setErrors({}); setCode(null); }}>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-md" />
          <motion.div
            role="dialog" aria-modal="true" aria-label="Reserve your ZEN GT"
            initial={mobile ? { y: "100%" } : { opacity: 0, scale: 0.94, y: 20 }}
            animate={mobile ? { y: 0 } : { opacity: 1, scale: 1, y: 0 }}
            exit={mobile ? { y: "100%" } : { opacity: 0, scale: 0.96, y: 12 }}
            transition={mobile ? { type: "spring", stiffness: 320, damping: 36 } : SPRING}
            drag={mobile ? "y" : false} dragControls={controls} dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.7 }}
            onDragEnd={(_, i) => (i.offset.y > 120 || i.velocity.y > 600) && onClose()}
            className={`relative max-h-[92dvh] w-full overflow-y-auto overscroll-contain rounded-t-[32px] border border-white/25 bg-[#121211]/85 p-6 pb-[max(2rem,env(safe-area-inset-bottom))] text-[#F6F3E9] backdrop-blur-3xl shadow-[0_30px_70px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.35)] sm:max-w-lg sm:rounded-[32px] sm:p-9 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden`}
          >
            <div onPointerDown={(e) => controls.start(e)} className="-mt-2 mb-4 flex cursor-grab touch-none justify-center pb-2 sm:hidden"><span className="h-1.5 w-10 rounded-full bg-white/25" /></div>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={SPRING} onClick={onClose} aria-label="Close" className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/10 text-[#E6E2D8] hover:bg-white/20 hover:text-white sm:right-6 sm:top-6"><X className="h-4 w-4" /></motion.button>

            <AnimatePresence mode="wait" initial={false}>
              {!code ? (
                <motion.div key="form" exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                  <span className={KICKER}>2026 Queue</span>
                  <h2 className={`${F_HEAD} mb-1.5 mt-1 text-2xl sm:text-3xl font-bold tracking-tight`}>Reserve your GT</h2>
                  <p className={`mb-6 text-sm text-[#E6E2D8]/60 ${F_BODY}`}>Fully refundable deposit. Priority production allocation slot.</p>
                  <form onSubmit={submit} noValidate className="space-y-4">
                    <input value={form._hp} onChange={set("_hp")} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />
                    <Field label="Full name" error={errors.name}><input value={form.name} onChange={set("name")} autoComplete="name" placeholder="Kenzo Murakami" className={INPUT} /></Field>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Email" error={errors.email}><input type="email" value={form.email} onChange={set("email")} autoComplete="email" placeholder="you@domain.com" className={INPUT} /></Field>
                      <Field label="Phone" error={errors.phone}><input type="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" placeholder="+1 555 019 2834" className={INPUT} /></Field>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <GlassSelect
                        label="Edition"
                        value={form.model}
                        options={EDITIONS}
                        onChange={(val) => setForm((f) => ({ ...f, model: val }))}
                        className="z-30"
                      />
                      <GlassSelect
                        label="Delivery"
                        value={form.timeline}
                        options={TIMELINES}
                        onChange={(val) => setForm((f) => ({ ...f, timeline: val }))}
                        className="z-20"
                      />
                    </div>
                    <div>
                      <label className="flex cursor-pointer items-start gap-2.5">
                        <input type="checkbox" checked={form.consent} onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))} className="mt-0.5 h-4 w-4 rounded accent-[#A6865E]" />
                        <span className="text-xs leading-relaxed text-[#E6E2D8]/70">I agree to the <Link href="/terms" className="text-[#A6865E] underline underline-offset-2">Terms</Link> and <Link href="/privacy" className="text-[#A6865E] underline underline-offset-2">Privacy Policy</Link>.</span>
                      </label>
                      <AnimatePresence>{errors.consent && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden pt-1 text-xs text-rose-400">{errors.consent}</motion.p>}</AnimatePresence>
                    </div>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={SPRING} disabled={busy} type="submit" className={`mt-2 flex w-full items-center justify-center rounded-full bg-[#F6F3E9] py-3.5 text-[15px] text-[#0d0d0c] shadow-[0_10px_25px_rgba(246,243,233,0.2)] ${F_MED}`}>
                      {busy ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" /> : "Request allocation"}
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                <motion.div key="done" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} className="py-4 text-center">
                  <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full border border-emerald-500/25 bg-emerald-500/10">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, ease: EASE, delay: 0.15 }} />
                    </svg>
                  </div>
                  <h3 className={`${F_HEAD} mb-2 text-2xl font-bold`}>You&apos;re on the list.</h3>
                  <p className="mb-6 text-sm text-[#E6E2D8]/65">Confirmation sent to your email.</p>
                  <div className="mx-auto mb-7 max-w-xs rounded-2xl border border-white/10 bg-white/5 p-4">
                    <span className="block text-[10px] uppercase tracking-widest text-[#E6E2D8]/50">Reference</span>
                    <span className="font-mono text-base font-bold text-[#A6865E]">{code}</span>
                  </div>
                  <Btn onClick={onClose} variant="glass">Done</Btn>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  Cookie toast                                                       */
/* ------------------------------------------------------------------ */
function CookieToast() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try { if (localStorage.getItem("zen_cookie_consent")) return; } catch { return; }
    const t = setTimeout(() => setShow(true), 1800);
    return () => clearTimeout(t);
  }, []);
  const choose = (v: string) => { try { localStorage.setItem("zen_cookie_consent", v); } catch {} setShow(false); };
  return (
    <AnimatePresence>
      {show && (
        <motion.aside
          initial={{ opacity: 0, y: 40, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.96 }} transition={SOFT}
          className={`fixed inset-x-4 bottom-4 z-40 rounded-[24px] p-4 text-[#F6F3E9] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:max-w-sm ${GLASS} bg-[#141413]/80`}
          style={{ marginBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="mb-3 flex items-start gap-3">
            <span className="mt-0.5 shrink-0 rounded-xl bg-[#A6865E]/10 p-2 text-[#A6865E]"><ShieldCheck className="h-4 w-4" /></span>
            <p className="text-xs leading-relaxed text-[#E6E2D8]/75">Minimal telemetry keeps everything running smoothly. <Link href="/privacy" className="text-[#A6865E] underline underline-offset-2">Learn more</Link></p>
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={() => choose("declined")} className="rounded-full px-3.5 py-1.5 text-xs text-[#E6E2D8]/60 transition-colors hover:text-[#F6F3E9]">Essential only</button>
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => choose("accepted")} className={`rounded-full bg-[#F6F3E9] px-4 py-1.5 text-xs text-[#0d0d0c] ${F_MED}`}>Accept</motion.button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function HomePage() {
  const [reserveOpen, setReserveOpen] = useState(false);
  const open = useCallback(() => setReserveOpen(true), []);
  const close = useCallback(() => setReserveOpen(false), []);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <main className="relative min-h-screen bg-[#0d0d0c] text-[#F6F3E9] selection:bg-[#A6865E]/30 selection:text-[#F6F3E9]">
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-[#A6865E]" />
      <Dock onReserve={open} />
      <Hero onReserve={open} />
      <Showcase onReserve={open} />
      <Philosophy />
      <Gallery />
      <Finale onReserve={open} />
      <Footer onReserve={open} />
      <ReserveSheet open={reserveOpen} onClose={close} />
      <CookieToast />
    </main>
  );
}