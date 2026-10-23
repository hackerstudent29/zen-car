"use client";

import { useState, useEffect, Suspense, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  ChevronDown,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Sparkles,
} from "lucide-react";
import HeaderDock from "@/components/HeaderDock";
import { VEHICLES } from "@/lib/vehiclesData";

const SPRING = { type: "spring", stiffness: 300, damping: 30, mass: 0.8 } as const;
const GLASS =
  "bg-white/[0.06] border border-white/[0.12] backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.18)]";
const GLASS_CARD =
  "bg-white/[0.04] border border-white/10 backdrop-blur-xl p-6 rounded-3xl";

const SALONS = [
  {
    city: "Geneva",
    title: "ZEN Swiss Atelier & Global HQ",
    address: "Route de Meyrin 240, 1217 Meyrin, Switzerland",
    phone: "+41 22 767 8000",
    hours: "Tue – Sat: 09:00 – 19:00 CET",
  },
  {
    city: "Tokyo",
    title: "ZEN Ginza Experience Salon",
    address: "6-10-1 Ginza, Chuo-ku, Tokyo 104-0061, Japan",
    phone: "+81 3 5537 2000",
    hours: "Mon – Sun: 10:00 – 20:00 JST",
  },
  {
    city: "London",
    title: "ZEN Mayfair Gallery",
    address: "14 Berkeley Square, London W1J 6BL, United Kingdom",
    phone: "+44 20 7499 1234",
    hours: "Mon – Sat: 09:30 – 18:30 GMT",
  },
  {
    city: "Silicon Valley",
    title: "ZEN California Studio",
    address: "3000 Sand Hill Rd, Menlo Park, CA 94025, USA",
    phone: "+1 650 854 2200",
    hours: "Mon – Fri: 08:30 – 18:00 PST",
  },
];

const FAQS = [
  {
    q: "How are ZEN GT allocations awarded?",
    a: "Allocations are granted on a bespoke, numbered basis. Each vehicle is individually commissioned in our Geneva Atelier with a dedicated build number (1 of 50).",
  },
  {
    q: "What is included with the Test Drive Experience?",
    a: "Your private test drive appointment is a 90-minute closed-circuit or scenic mountain road demonstration accompanied by a ZEN Master Test Driver, covering launch dynamics and acoustic isolation.",
  },
  {
    q: "What is the warranty on the solid-state thermal pack?",
    a: "Every ZEN GT vehicle includes a 10-year / 200,000 km battery integrity guarantee, ensuring over 90% health retention through active fluid thermoregulation.",
  },
  {
    q: "Can I customize materials outside the online configurator?",
    a: "Yes. Our bespoke Atelier commission program enables personalized bespoke paint formulations, client-provided heritage timber veneers, and embroidered family crests.",
  },
];

function ContactContent() {
  const searchParams = useSearchParams();
  const preselectedModel = searchParams.get("model") || VEHICLES[0].name;
  const buildRef = searchParams.get("ref") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    model: preselectedModel,
    salon: SALONS[0].city,
    date: "",
    notes: buildRef ? `Config Reference: ${buildRef}` : "",
    consent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successCode, setSuccessCode] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = "Full name is required (minimum 2 characters).";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      errs.email = "Please provide a valid corporate or private email.";
    }
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone.replace(/[\s()-]/g, ""))) {
      errs.phone = "Please provide a valid contact telephone number.";
    }
    if (!formData.date) {
      errs.date = "Please specify your preferred test drive date.";
    }
    if (!formData.consent) {
      errs.consent = "You must acknowledge the concierge reservation policy.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const code = `ZEN-TEST-${Math.floor(1000 + Math.random() * 9000)}`;
      setSuccessCode(code);
      setIsSubmitting(false);

      try {
        const stored = JSON.parse(localStorage.getItem("zen_bookings") || "[]");
        stored.push({ ...formData, code, submittedAt: new Date().toISOString() });
        localStorage.setItem("zen_bookings", JSON.stringify(stored));
      } catch {}
    }, 750);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-28">
      {/* Page Heading */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs uppercase tracking-[0.25em] text-[#A6865E] font-['Chillax-Medium',sans-serif] block mb-2">
          Private Concierge & Test Drive
        </span>
        <h1 className="font-['Rosaline-Regular',Georgia,serif] text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3">
          Experience the Sanctuary
        </h1>
        <p className="text-xs sm:text-sm text-[#E6E2D8]/70 font-['Satoshi-Regular',sans-serif]">
          Schedule a private 90-minute closed demonstration or discuss your bespoke founding allocation with a dedicated automotive curator.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
        {/* Form Column */}
        <div className={`lg:col-span-7 ${GLASS_CARD}`}>
          {successCode ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-10 text-center"
            >
              <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h2 className="font-['Rosaline-Regular',Georgia,serif] text-2xl sm:text-3xl font-bold mb-2 text-white">
                Demonstration Reserved
              </h2>
              <p className="text-xs sm:text-sm text-[#E6E2D8]/70 max-w-md mx-auto mb-6 leading-relaxed">
                Your private session at the <strong className="text-white">{formData.salon} Salon</strong> for the{" "}
                <strong className="text-[#A6865E]">{formData.model}</strong> has been logged.
              </p>

              <div className="mx-auto mb-8 max-w-xs rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                <span className="block text-[10px] uppercase tracking-widest text-[#E6E2D8]/50">
                  Concierge Reference
                </span>
                <span className="font-mono text-lg font-bold text-[#A6865E]">{successCode}</span>
              </div>

              <button
                onClick={() => {
                  setSuccessCode(null);
                  setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    model: VEHICLES[0].name,
                    salon: SALONS[0].city,
                    date: "",
                    notes: "",
                    consent: false,
                  });
                }}
                className="px-6 py-2.5 rounded-full border border-white/20 text-xs font-['Chillax-Medium',sans-serif] text-white hover:bg-white/10"
              >
                Book Another Session
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-sm uppercase tracking-wider text-[#A6865E] font-['Chillax-Medium',sans-serif] mb-4">
                Private Demonstration Request
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#E6E2D8]/70 mb-1.5 font-['Chillax-Medium',sans-serif]">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Lord / Lady / Dr. / Mr."
                    className={`w-full px-4 py-3 rounded-2xl bg-white/[0.04] border text-xs text-[#F6F3E9] placeholder-[#E6E2D8]/30 focus:outline-none ${
                      errors.name ? "border-rose-400" : "border-white/10 focus:border-[#A6865E]"
                    }`}
                  />
                  {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#E6E2D8]/70 mb-1.5 font-['Chillax-Medium',sans-serif]">
                    Private Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="client@sanctuary.com"
                    className={`w-full px-4 py-3 rounded-2xl bg-white/[0.04] border text-xs text-[#F6F3E9] placeholder-[#E6E2D8]/30 focus:outline-none ${
                      errors.email ? "border-rose-400" : "border-white/10 focus:border-[#A6865E]"
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#E6E2D8]/70 mb-1.5 font-['Chillax-Medium',sans-serif]">
                    Telephone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+41 22 000 0000"
                    className={`w-full px-4 py-3 rounded-2xl bg-white/[0.04] border text-xs text-[#F6F3E9] placeholder-[#E6E2D8]/30 focus:outline-none ${
                      errors.phone ? "border-rose-400" : "border-white/10 focus:border-[#A6865E]"
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#E6E2D8]/70 mb-1.5 font-['Chillax-Medium',sans-serif]">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className={`w-full px-4 py-3 rounded-2xl bg-white/[0.04] border text-xs text-[#F6F3E9] focus:outline-none cursor-pointer ${
                      errors.date ? "border-rose-400" : "border-white/10 focus:border-[#A6865E]"
                    }`}
                  />
                  {errors.date && <p className="text-[11px] text-rose-400 mt-1">{errors.date}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#E6E2D8]/70 mb-1.5 font-['Chillax-Medium',sans-serif]">
                    Vehicle of Interest
                  </label>
                  <select
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#141413] border border-white/10 text-xs text-[#F6F3E9] focus:outline-none focus:border-[#A6865E] cursor-pointer"
                  >
                    {VEHICLES.map((v) => (
                      <option key={v.id} value={v.name}>
                        {v.name} ({v.priceFormatted})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#E6E2D8]/70 mb-1.5 font-['Chillax-Medium',sans-serif]">
                    Experience Salon Location
                  </label>
                  <select
                    value={formData.salon}
                    onChange={(e) => setFormData({ ...formData, salon: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#141413] border border-white/10 text-xs text-[#F6F3E9] focus:outline-none focus:border-[#A6865E] cursor-pointer"
                  >
                    {SALONS.map((s) => (
                      <option key={s.city} value={s.city}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#E6E2D8]/70 mb-1.5 font-['Chillax-Medium',sans-serif]">
                  Bespoke Notes or Inquiries
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Include any specific track requirements or configuration codes..."
                  className="w-full px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-xs text-[#F6F3E9] placeholder-[#E6E2D8]/30 focus:outline-none focus:border-[#A6865E]"
                />
              </div>

              <div>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-0.5 h-4 w-4 rounded accent-[#A6865E]"
                  />
                  <span className="text-[11px] text-[#E6E2D8]/70 leading-relaxed font-['Satoshi-Regular',sans-serif]">
                    I confirm that I hold a valid unrestricted driver&apos;s license and agree to the private concierge demonstration terms.
                  </span>
                </label>
                {errors.consent && <p className="text-[11px] text-rose-400 mt-1">{errors.consent}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-full bg-[#A6865E] hover:bg-[#b89569] text-black text-xs font-semibold font-['Chillax-Medium',sans-serif] uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                {isSubmitting ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                ) : (
                  "Confirm Private Session"
                )}
              </button>
            </form>
          )}
        </div>

        {/* Salons List Column */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-xs uppercase tracking-wider text-[#A6865E] font-['Chillax-Medium',sans-serif] mb-2">
            Global Experience Salons
          </h2>
          {SALONS.map((salon) => (
            <div
              key={salon.city}
              onClick={() => setFormData((f) => ({ ...f, salon: salon.city }))}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                formData.salon === salon.city
                  ? "bg-white/10 border-white/40 shadow-lg"
                  : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06]"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-bold font-['Chillax-Medium',sans-serif] text-white">
                  {salon.title}
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/10 text-[#A6865E]">
                  {salon.city}
                </span>
              </div>
              <div className="space-y-1 text-[11px] text-[#E6E2D8]/65 font-['Satoshi-Regular',sans-serif]">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3 text-[#A6865E] shrink-0" />
                  <span>{salon.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3 text-[#A6865E] shrink-0" />
                  <span>{salon.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3 text-[#A6865E] shrink-0" />
                  <span>{salon.hours}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="max-w-3xl mx-auto pt-10 border-t border-white/10">
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-[0.25em] text-[#A6865E] font-['Chillax-Medium',sans-serif] block mb-1">
            Inquiries & Information
          </span>
          <h2 className="font-['Rosaline-Regular',Georgia,serif] text-2xl sm:text-3xl font-bold text-white">
            Frequently Addressed Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4"
                >
                  <span className="text-xs sm:text-sm font-semibold font-['Chillax-Medium',sans-serif] text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-[#A6865E] shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 sm:px-5 pb-5 text-xs text-[#E6E2D8]/70 leading-relaxed font-['Satoshi-Regular',sans-serif]">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0d0d0c] text-[#F6F3E9] selection:bg-[#A6865E]/30 selection:text-[#F6F3E9] relative">
      <HeaderDock />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center text-xs text-[#A6865E] font-mono">
          LOADING CONCIERGE...
        </div>
      }>
        <ContactContent />
      </Suspense>
    </main>
  );
}
