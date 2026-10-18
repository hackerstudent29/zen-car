import Link from "next/link";
import { ArrowLeft, CheckCircle2, FileCheck, Mail } from "lucide-react";

export const metadata = {
  title: "Terms of Engagement | ZEN Automotive",
  description: "Official reservation guidelines and conditions governing the ZEN GT electric hypercar.",
};

const TERMS_PILLARS = [
  {
    icon: CheckCircle2,
    title: "Priority Allocation",
    desc: "Reservations secure verified production slot sequencing for Series 01–50.",
  },
  {
    icon: FileCheck,
    title: "100% Refundable",
    desc: "Deposits remain unconditionally refundable prior to bespoke chassis freeze.",
  },
];

export default function TermsPage() {
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
              Governance & Allocation
            </span>
            <h1 className="font-['Rosaline-Regular',Georgia,serif] text-4xl sm:text-6xl font-bold tracking-tight text-[#F6F3E9] mb-4">
              Terms of Engagement
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#E6E2D8]/60 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Series 01–50 Homologation
              </span>
              <span>·</span>
              <span>Effective: October 2026</span>
              <span>·</span>
              <span>Version: 2.1</span>
            </div>
          </header>

          {/* Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
            {TERMS_PILLARS.map((p) => {
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
                Welcome to ZEN Automotive Corporation. By exploring this sanctuary portal, experiencing our interactive scrollytelling visualizer, or reserving an allocation for the ZEN GT, you agree to the conditions outlined below.
              </p>
            </section>

            <section className="space-y-3 pt-4 border-t border-white/5">
              <h2 className="font-['Chillax-Bold',sans-serif] text-xl font-bold text-[#F6F3E9]">
                1. Reservation Protocol & Build Slots
              </h2>
              <p>
                Submitting a reservation places your profile into the registered priority queue for ZEN GT chassis allocation:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#E6E2D8]/75">
                <li><strong className="text-white">Expression of Intent:</strong> An allocation request establishes your queue sequence. It does not constitute an immediate binding vehicle sale contract until final purchase agreements are mutually countersigned.</li>
                <li><strong className="text-white">Refundability:</strong> Any associated reservation deposit is held in a protected escrow facility and is 100% refundable upon written notice prior to chassis production lock.</li>
                <li><strong className="text-white">Allocation Transferability:</strong> Production slots are non-transferable to secondary brokers to protect true enthusiast drivers.</li>
              </ul>
            </section>

            <section className="space-y-3 pt-4 border-t border-white/5">
              <h2 className="font-['Chillax-Bold',sans-serif] text-xl font-bold text-[#F6F3E9]">
                2. Engineering Specifications & Homologation Targets
              </h2>
              <p>
                The stated targets—including 750 horsepower equivalent, 2.8s acceleration, 620 km range, and 12 dB active cabin isolation—represent computational validation and track testing targets. Certified road figures will be formally documented upon series delivery.
              </p>
            </section>

            <section className="space-y-3 pt-4 border-t border-white/5">
              <h2 className="font-['Chillax-Bold',sans-serif] text-xl font-bold text-[#F6F3E9]">
                3. Proprietary Media & Scrollytelling
              </h2>
              <p>
                All frame sequences, video compositions, typography layouts, and audio synthesize assets are proprietary intellectual property of ZEN Automotive Corporation. Unlicensed reproduction or extraction is prohibited.
              </p>
            </section>

            {/* Concierge Desk Callout */}
            <div className="mt-10 rounded-2xl border border-[#A6865E]/30 bg-[#A6865E]/10 p-6 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="block text-xs uppercase tracking-widest text-[#A6865E] font-['Chillax-Medium',sans-serif] mb-1">
                  Concierge Support Desk
                </span>
                <p className="text-sm text-[#F6F3E9]">
                  For questions regarding your allocation terms, speak directly with our concierge team.
                </p>
              </div>
              <a
                href="mailto:concierge@zenautomotive.com"
                className="inline-flex items-center gap-2 rounded-full bg-[#F6F3E9] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0d0d0c] hover:bg-white transition-colors shrink-0 font-['Chillax-Medium',sans-serif]"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>concierge@zenautomotive.com</span>
              </a>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
