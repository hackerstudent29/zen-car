import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | ZEN Automotive",
  description: "Transparent, privacy-first principles governing how we safeguard your data and digital sanctuary.",
};

export default function PrivacyPage() {
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
            Legal & Governance
          </span>
          <h1 className="font-['Rosaline-Regular',Georgia,serif] text-4xl sm:text-5xl font-bold text-[#FFFFFF] mb-3">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#A09A8F] font-mono">
            Effective Date: October 13, 2026 | Version 2.4
          </p>
        </header>

        <article className="space-y-6 text-sm sm:text-base leading-relaxed text-[#C8C2B5] font-['Satoshi-Regular',sans-serif]">
          <p>
            At ZEN Automotive Corporation (&ldquo;ZEN&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), our commitment to tranquility extends beyond mechanical engineering into how we safeguard your digital sanctuary. This Privacy Policy details how we handle information collected through our web experience, interactive vehicle visualizer, and reservation portal.
          </p>

          <h2 className="font-['Chillax-Bold',sans-serif] text-xl font-bold text-[#FFFFFF] pt-4">
            1. Information We Collect
          </h2>
          <p>We believe in minimal data footprint. We only collect the minimal information necessary to deliver our mindful automotive experience:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Contact Information:</strong> Full name, verified email address, phone number, and delivery jurisdiction when you request an allocation or reserve a vehicle.</li>
            <li><strong>Vehicle Preferences:</strong> Trim selection (GT-1, GT-P, GT-Zen), exterior/interior finish, and delivery configuration choices.</li>
            <li><strong>Anonymized Telemetry:</strong> Non-personally identifiable metrics on page performance, device viewport classification, and audio-visual playback capabilities to optimize rendering quality.</li>
          </ul>

          <h2 className="font-['Chillax-Bold',sans-serif] text-xl font-bold text-[#FFFFFF] pt-4">
            2. How We Use Your Information
          </h2>
          <p>Your information is utilized solely for legitimate operational purposes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Processing vehicle reservations and coordinating production allocation slots.</li>
            <li>Providing timely dispatch updates, technical bulletins, and private sanctuary viewing invitations.</li>
            <li>Ensuring site security, enforcing terms of reservation, and mitigating fraudulent transactions.</li>
          </ul>

          <h2 className="font-['Chillax-Bold',sans-serif] text-xl font-bold text-[#FFFFFF] pt-4">
            3. Cookies and Local Storage
          </h2>
          <p>
            We respect your privacy preferences. We employ standard essential cookies and local storage tokens strictly to maintain session integrity, preserve your cookie consent selection, and store your audio preference states. We do not sell your personal data or partner with cross-site behavioral tracking syndicates.
          </p>

          <h2 className="font-['Chillax-Bold',sans-serif] text-xl font-bold text-[#FFFFFF] pt-4">
            4. Data Retention & Safeguards
          </h2>
          <p>
            All sensitive information transferred through our reservation portals is encrypted using TLS 1.3 cryptographic protocols with modern cipher suites. Access is limited to authorized production engineers and concierge managers. You may request data deletion or an export of your information at any time by contacting our privacy team.
          </p>

          <h2 className="font-['Chillax-Bold',sans-serif] text-xl font-bold text-[#FFFFFF] pt-4">
            5. Your Rights (GDPR & CCPA)
          </h2>
          <p>Regardless of your geographic jurisdiction, ZEN affords you fundamental data rights:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Right of Access and Portability: Request a structured copy of data associated with your reservation profile.</li>
            <li>Right of Rectification: Modify inaccurate contact coordinates or reservation specifications.</li>
            <li>Right of Erasure: Request complete deletion of your reservation inquiry before formal contract finalization.</li>
          </ul>

          <h2 className="font-['Chillax-Bold',sans-serif] text-xl font-bold text-[#FFFFFF] pt-4">
            6. Contact Concierge
          </h2>
          <p>
            For privacy inquiries or data requests, connect directly with our legal concierge at{" "}
            <a href="mailto:privacy@zenautomotive.com" className="text-[#A6865E] underline">
              privacy@zenautomotive.com
            </a>
            .
          </p>
        </article>
      </main>
    </div>
  );
}
