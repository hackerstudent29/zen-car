import Link from "next/link";
import { ArrowLeft, Shield, Lock, EyeOff, FileText, Mail } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | ZEN Automotive",
  description: "Transparent, privacy-first principles governing how we safeguard your data and digital sanctuary.",
};

const PILLARS = [
  {
    icon: Lock,
    title: "TLS 1.3 Encryption",
    desc: "All transmissions are encrypted end-to-end with high-entropy modern ciphers.",
  },
  {
    icon: EyeOff,
    title: "Zero Behavioral Trackers",
    desc: "We do not sell data or embed third-party advertising tracking syndicates.",
  },
  {
    icon: Shield,
    title: "Sanctuary Data Footprint",
    desc: "We only record essential information necessary for your allocation queue.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen bg-[#0d0d0c] text-[#F6F3E9] selection:bg-[#A6865E]/30 selection:text-[#F6F3E9] px-4 py-16 sm:px-6 sm:py-24">
      {/* Ambient background glow */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(166,134,94,0.12),transparent_70%)]" />

      {/* Floating navigation dock */}
      <div className="fixed top-6 left-6 z-40">
        <Link
          href="/#hero"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 sm:px-5 sm:py-2.5 text-xs font-semibold tracking-wider uppercase font-['Chillax-Medium',sans-serif] text-[#F6F3E9] backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.25)] transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:border-white/35"
        >
          <ArrowLeft className="w-4 h-4 text-[#A6865E]" />
          <span>Return to Sanctuary</span>
        </Link>
      </div>

      <main className="relative z-10 max-w-4xl mx-auto mt-12 sm:mt-8">
        <div className="rounded-[32px] sm:rounded-[40px] border border-white/[0.14] bg-white/[0.04] p-7 sm:p-16 backdrop-blur-3xl shadow-[0_30px_80px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.18)]">
          {/* Header */}
          <header className="mb-12 pb-8 border-b border-white/10">
            <span className="inline-block text-xs uppercase tracking-[0.25em] text-[#A6865E] font-semibold mb-3 font-['Chillax-Medium',sans-serif]">
              Legal Sanctuary & Governance
            </span>
            <h1 className="font-['Rosaline-Regular',Georgia,serif] text-4xl sm:text-6xl font-bold tracking-tight text-[#F6F3E9] mb-4">
              Privacy Policy
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#E6E2D8]/60 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Version 2.4 — Active
              </span>
              <span>·</span>
              <span>Effective: October 2026</span>
              <span>·</span>
              <span>Jurisdiction: Worldwide Priority Standard</span>
            </div>
          </header>

          {/* Privacy Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
            {PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#A6865E]/15 border border-[#A6865E]/30 text-[#A6865E] flex items-center justify-center mb-3">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-['Chillax-Bold',sans-serif] text-sm font-bold text-white mb-1.5">
                    {p.title}
                  </h3>
                  <p className="font-['Satoshi-Regular',sans-serif] text-xs leading-relaxed text-[#E6E2D8]/70">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Narrative Content */}
          <article className="space-y-8 text-sm sm:text-base leading-relaxed text-[#E6E2D8]/80 font-['Satoshi-Regular',sans-serif]">
            <section className="space-y-3">
              <p>
                At ZEN Automotive Corporation (&ldquo;ZEN&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), our commitment to acoustic stillness and digital tranquility is foundational. We treat your personal data with the same uncompromising precision we engineer into the ZEN GT chassis.
              </p>
            </section>

            <section className="space-y-3 pt-4 border-t border-white/5">
              <h2 className="font-['Chillax-Bold',sans-serif] text-xl font-bold text-[#F6F3E9] flex items-center gap-2">
                <span>1. Data We Collect</span>
              </h2>
              <p>We collect only the bare minimum required to service your vehicle interest and reservation tier:</p>
              <ul className="list-disc pl-6 space-y-2 text-[#E6E2D8]/75">
                <li><strong className="text-white">Allocation Data:</strong> Full legal name, verified email address, phone number, and selected delivery edition.</li>
                <li><strong className="text-white">Technical Canvas Telemetry:</strong> High-precision framerate counters, device pixel density, and WebGL/Canvas rendering flags strictly used to adjust smooth 60–120 FPS playback.</li>
                <li><strong className="text-white">Cookie Consent Preferences:</strong> Local storage state recording whether you permitted minimal analytical telemetry.</li>
              </ul>
            </section>

            <section className="space-y-3 pt-4 border-t border-white/5">
              <h2 className="font-['Chillax-Bold',sans-serif] text-xl font-bold text-[#F6F3E9]">
                2. Data Utilization Principles
              </h2>
              <p>
                Your submitted information is never monetized, brokered, or rented to marketing aggregators. It serves three distinct, lawful functions:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#E6E2D8]/75">
                <li>Assigning your unique production reference code (e.g., <span className="font-mono text-[#A6865E]">ZEN-GT-2026-XXXX</span>).</li>
                <li>Delivering private concierge dispatch bulletins and bespoke test track appointments.</li>
                <li>Maintaining integrity against automated bots via algorithmic honeypot verification.</li>
              </ul>
            </section>

            <section className="space-y-3 pt-4 border-t border-white/5">
              <h2 className="font-['Chillax-Bold',sans-serif] text-xl font-bold text-[#F6F3E9]">
                3. Cookies & Local Session Integrity
              </h2>
              <p>
                We do not use invasive third-party cross-site trackers. Our local storage usage is strictly limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#E6E2D8]/75">
                <li><span className="font-mono text-xs text-[#A6865E]">zen_cookie_consent</span>: Remembers your privacy acceptance state.</li>
                <li><span className="font-mono text-xs text-[#A6865E]">zen_reservation_ref</span>: Encrypted local caching of your priority queue position.</li>
              </ul>
            </section>

            <section className="space-y-3 pt-4 border-t border-white/5">
              <h2 className="font-['Chillax-Bold',sans-serif] text-xl font-bold text-[#F6F3E9]">
                4. Your Rights (GDPR, CCPA & Global Standard)
              </h2>
              <p>
                Regardless of your geographic location, ZEN extends universal privacy rights to every patron:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#E6E2D8]/75">
                <li><strong className="text-white">Right of Erasure (&ldquo;Right to be Forgotten&rdquo;):</strong> Complete deletion of your inquiry and reservation credentials within 24 hours of request.</li>
                <li><strong className="text-white">Right of Rectification:</strong> Immediate correction of your registered specifications or contact details.</li>
                <li><strong className="text-white">Right to Portability:</strong> A machine-readable export of all records associated with your profile.</li>
              </ul>
            </section>

            {/* Concierge Desk Callout */}
            <div className="mt-10 rounded-2xl border border-[#A6865E]/30 bg-[#A6865E]/10 p-6 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="block text-xs uppercase tracking-widest text-[#A6865E] font-['Chillax-Medium',sans-serif] mb-1">
                  Direct Privacy Concierge
                </span>
                <p className="text-sm text-[#F6F3E9]">
                  Questions or immediate data deletion requests are handled by our dedicated legal desk.
                </p>
              </div>
              <a
                href="mailto:privacy@zenautomotive.com"
                className="inline-flex items-center gap-2 rounded-full bg-[#F6F3E9] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0d0d0c] hover:bg-white transition-colors shrink-0 font-['Chillax-Medium',sans-serif]"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>privacy@zenautomotive.com</span>
              </a>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
