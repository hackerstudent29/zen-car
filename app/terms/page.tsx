import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | ZEN Automotive",
  description: "Official terms of engagement and reservation conditions for the ZEN GT electric hypercar.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0c] text-[#E6E2D8] py-28 px-4 sm:px-6">
      <div className="fixed top-6 left-6 z-30">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-xl text-xs uppercase tracking-wider font-['Chillax-Medium',sans-serif] text-[#F6F3E9] transition-all transform hover:-translate-x-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Sanctuary</span>
        </Link>
      </div>

      <main className="max-w-3xl mx-auto p-8 sm:p-14 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
        <header className="mb-10 pb-8 border-b border-white/10">
          <span className="text-xs uppercase tracking-[0.25em] text-[#A6865E] font-semibold block mb-2 font-mono">
            Terms of Engagement
          </span>
          <h1 className="font-['Rosaline-Regular',Georgia,serif] text-4xl sm:text-5xl font-bold text-[#FFFFFF] mb-3">
            Terms & Conditions
          </h1>
          <p className="text-xs text-[#A09A8F] font-mono">
            Effective Date: October 13, 2026 | Version 1.9
          </p>
        </header>

        <article className="space-y-6 text-sm sm:text-base leading-relaxed text-[#C8C2B5] font-['Satoshi-Regular',sans-serif]">
          <p>
            Welcome to ZEN Automotive Corporation. By exploring this sanctuary web portal, interacting with our media, or submitting an allocation request for the ZEN GT, you agree to comply with and be bound by the following terms.
          </p>

          <h2 className="font-['Chillax-Bold',sans-serif] text-xl font-bold text-[#FFFFFF] pt-4">
            1. Reservation & Allocation Protocol
          </h2>
          <p>Submitting an allocation interest or reservation through the ZEN digital sanctuary establishes a prospective queue position for the ZEN GT series. Please note:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>A reservation constitutes an expression of intent and priority placement, not an immediate sales contract.</li>
            <li>Final vehicle build slots are subject to production capacity verification and mutual execution of a formal Purchase Agreement.</li>
            <li>Reservation deposits (when collected) are held in an escrow structure and remain 100% refundable prior to production chassis freezing.</li>
          </ul>

          <h2 className="font-['Chillax-Bold',sans-serif] text-xl font-bold text-[#FFFFFF] pt-4">
            2. Specifications & Pre-Production Estimates
          </h2>
          <p>
            All performance metrics quoted—including 0-100 km/h acceleration, 750 hp power equivalent, 620 km range, and acoustic decibel ratings—represent pre-production computational models and track test targets. Final road-certified performance figures will be confirmed in homologation bulletins.
          </p>

          <h2 className="font-['Chillax-Bold',sans-serif] text-xl font-bold text-[#FFFFFF] pt-4">
            3. Intellectual Property Rights
          </h2>
          <p>
            All visual designs, video sequences, 3D assets, sound design, aerodynamic silhouettes, trademarks (&ldquo;ZEN GT&rdquo;, &ldquo;Sanctuary Drive&rdquo;), and proprietary scrollytelling code belong exclusively to ZEN Automotive Corporation. Reproduction or commercial extraction without express written consent is strictly prohibited.
          </p>

          <h2 className="font-['Chillax-Bold',sans-serif] text-xl font-bold text-[#FFFFFF] pt-4">
            4. Limitation of Liability
          </h2>
          <p>
            The interactive experience is provided &ldquo;as is&rdquo; with high-fidelity visual and audio components. While we strive for uncompromising digital stability, ZEN Automotive shall not be liable for system interruptions, local display hardware incompatibility, or latency incurred on high-bitrate video streams.
          </p>

          <h2 className="font-['Chillax-Bold',sans-serif] text-xl font-bold text-[#FFFFFF] pt-4">
            5. Governing Law & Dispute Resolution
          </h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws applicable in Delaware, USA and international commercial arbitration standards, without regard to conflict of law principles.
          </p>

          <h2 className="font-['Chillax-Bold',sans-serif] text-xl font-bold text-[#FFFFFF] pt-4">
            6. Inquiries & Concierge Assistance
          </h2>
          <p>
            For questions regarding these terms or your allocation tier, please contact our Legal Counsel and Concierge Desk at{" "}
            <a href="mailto:concierge@zenautomotive.com" className="text-[#A6865E] underline">
              concierge@zenautomotive.com
            </a>
            .
          </p>
        </article>
      </main>
    </div>
  );
}
