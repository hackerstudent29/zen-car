"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useSpring,
  useTransform,
  useMotionValue,
  type MotionValue,
} from "motion/react";
import {
  Home,
  Car,
  SlidersHorizontal,
  Play,
  Mail,
  Heart,
  ChevronDown,
} from "lucide-react";
import ReservationModal from "./ReservationModal";

const SPRING = { type: "spring", stiffness: 300, damping: 30, mass: 0.8 } as const;
const SOFT = { type: "spring", stiffness: 170, damping: 26, mass: 0.9 } as const;
const EASE = [0.32, 0.72, 0, 1] as const;

const GLASS_HI =
  "bg-white/[0.16] border border-white/40 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.5)]";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/models", label: "Showroom", icon: Car },
  { href: "/full-video", label: "Film", icon: Play },
  { href: "/contact", label: "Concierge", icon: Mail },
];

function DockButton({
  item,
  mouseX,
  isActive,
}: {
  item: (typeof NAV_ITEMS)[number];
  mouseX: MotionValue<number>;
  isActive: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  const dist = useTransform(mouseX, (x) => {
    const b = ref.current?.getBoundingClientRect();
    return b ? x - b.x - b.width / 2 : 999;
  });

  const scale = useSpring(useTransform(dist, [-90, 0, 90], [1, 1.35, 1]), {
    mass: 0.1,
    stiffness: 190,
    damping: 14,
  });
  const y = useTransform(scale, [1, 1.35], [0, -3]);

  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      style={{ scale, y }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      className="relative"
    >
      <Link
        href={item.href}
        className={`grid h-9 w-9 place-items-center rounded-full text-white/90 transition-colors duration-200 hover:bg-white/20 hover:text-[#A6865E] sm:h-10 sm:w-10 ${
          isActive ? "text-[#A6865E] bg-white/10" : ""
        }`}
        aria-label={item.label}
      >
        <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
      </Link>
      {isActive && (
        <motion.span
          layoutId="dock-dot-active"
          transition={SPRING}
          className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#A6865E]"
        />
      )}
      <AnimatePresence>
        {hover && (
          <motion.span
            initial={{ opacity: 0, y: -4, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.9 }}
            transition={{ duration: 0.18, ease: EASE }}
            className="pointer-events-none absolute left-1/2 top-[130%] hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#0d0d0c]/85 px-2.5 py-1 text-[11px] font-['Chillax-Medium',sans-serif] text-[#F6F3E9] backdrop-blur-xl border border-white/10 sm:block"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function HeaderDock() {
  const pathname = usePathname();
  const mouseX = useMotionValue(Infinity);
  const [reserveOpen, setReserveOpen] = useState(false);
  const [favCount, setFavCount] = useState(0);

  useEffect(() => {
    const updateFavs = () => {
      try {
        const raw = localStorage.getItem("zen_favs");
        if (raw) {
          const list = JSON.parse(raw);
          setFavCount(Array.isArray(list) ? list.length : 0);
        } else {
          setFavCount(0);
        }
      } catch {
        setFavCount(0);
      }
    };
    updateFavs();
    window.addEventListener("zen_favs_updated", updateFavs);
    window.addEventListener("storage", updateFavs);
    return () => {
      window.removeEventListener("zen_favs_updated", updateFavs);
      window.removeEventListener("storage", updateFavs);
    };
  }, []);

  return (
    <>
      <div
        className="pointer-events-none fixed inset-x-0 z-50 flex justify-center"
        style={{
          top: "max(1.5rem, calc(env(safe-area-inset-top, 0px) + 0.85rem))",
        }}
      >
        <motion.header
          initial={{ y: -64, opacity: 0, scale: 0.94 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ ...SOFT, delay: 0.15 }}
          onMouseMove={(e) => mouseX.set(e.clientX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className={`pointer-events-auto flex max-w-[96vw] items-center gap-1 rounded-full px-2.5 py-1.5 sm:gap-1.5 sm:px-3 sm:py-2 ${GLASS_HI}`}
        >
          <Link
            href="/"
            aria-label="ZEN GT Sanctuary Home"
            className="pl-2 pr-2 text-xl tracking-[0.16em] font-bold text-white sm:text-2xl font-['Rosaline-Regular',Georgia,serif] hover:text-[#A6865E] transition-colors"
          >
            ZEN
          </Link>
          <span className="mx-0.5 h-4 w-px bg-white/35" aria-hidden />

          <nav className="flex items-center gap-0.5 sm:gap-1" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => (
              <DockButton
                key={item.href}
                item={item}
                mouseX={mouseX}
                isActive={pathname === item.href}
              />
            ))}
          </nav>

          {favCount > 0 && (
            <Link
              href="/models"
              className="relative hidden sm:grid h-9 w-9 place-items-center rounded-full text-[#A6865E] bg-white/10 hover:bg-white/20 transition-all"
              title={`${favCount} vehicle${favCount > 1 ? "s" : ""} in wishlist`}
            >
              <Heart className="h-4 w-4 fill-current text-[#A6865E]" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#A6865E] text-[9px] font-bold text-black font-mono">
                {favCount}
              </span>
            </Link>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={SPRING}
            onClick={() => setReserveOpen(true)}
            className="ml-1 rounded-full border border-white/40 bg-gradient-to-b from-white/25 to-white/10 px-3.5 py-1.5 text-xs uppercase tracking-wider font-semibold text-white backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] hover:bg-white/25 transition-colors font-['Chillax-Medium',sans-serif]"
          >
            Reserve
          </motion.button>
        </motion.header>
      </div>

      <ReservationModal
        isOpen={reserveOpen}
        onClose={() => setReserveOpen(false)}
      />
    </>
  );
}
