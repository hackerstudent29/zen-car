import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "404 - Route Dissolved in Silence | ZEN Automotive",
  description: "The path you sought has dissolved in silence. Return to the ZEN GT sanctuary.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0d0d0c] text-[#F6F3E9] p-6 text-center select-none">
      <span className="text-xs uppercase tracking-[0.3em] text-[#A6865E] font-semibold mb-3 font-mono">
        Error 404 — Waypoint Lost
      </span>
      <h1 className="font-['Rosaline-Regular',Georgia,serif] text-5xl sm:text-7xl font-bold mb-4">
        Dissolved in Silence.
      </h1>
      <p className="text-sm sm:text-base text-[#E6E2D8]/70 max-w-md mx-auto mb-8 leading-relaxed font-['Satoshi-Regular',sans-serif]">
        The path you sought does not exist in this sanctuary. Let us guide you back to clarity.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-[#0d0d0c] bg-[#F6F3E9] hover:bg-white shadow-[0_10px_30px_rgba(246,243,233,0.25)] transition-all transform hover:-translate-y-0.5"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Sanctuary</span>
      </Link>
    </main>
  );
}
