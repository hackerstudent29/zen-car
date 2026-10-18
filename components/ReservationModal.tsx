"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, ChevronDown } from "lucide-react";
import { EASE_SPRING } from "../lib/constants";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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

export default function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    model: EDITIONS[0],
    timeline: TIMELINES[0],
    consent: false,
    _hp_trap: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmedCode, setConfirmedCode] = useState("");
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const [timelineDropdownOpen, setTimelineDropdownOpen] = useState(false);
  const modelRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (modelRef.current && !modelRef.current.contains(e.target as Node)) {
        setModelDropdownOpen(false);
      }
      if (timelineRef.current && !timelineRef.current.contains(e.target as Node)) {
        setTimelineDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Please enter your full name (minimum 2 characters).";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Please provide a valid email address.";
    }
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone.replace(/[\s()-]/g, ""))) {
      newErrors.phone = "Please provide a valid contact phone number.";
    }
    if (!formData.consent) {
      newErrors.consent = "You must acknowledge the reservation terms.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData._hp_trap) return;
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      const randomCode = `ZEN-GT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setConfirmedCode(randomCode);
    }, 700);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={EASE_SPRING}
            className="relative w-full max-w-lg bg-[#141413]/90 border border-white/20 backdrop-blur-3xl p-6 sm:p-8 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.3)] text-[#F6F3E9] max-h-[90vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/15 text-[#E6E2D8] hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {!isSuccess ? (
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#A6865E] font-semibold mb-1 block font-['Chillax-Medium',sans-serif]">
                  2026 Production Queue
                </span>
                <h2 className="font-['Rosaline-Regular',Georgia,serif] text-2xl sm:text-3xl font-bold mb-1">
                  Reserve Your ZEN GT
                </h2>
                <p className="text-xs sm:text-sm text-[#E6E2D8]/70 mb-6 leading-relaxed font-['Satoshi-Regular',sans-serif]">
                  Limited allocation slots. Escrow-secured with a 100% refundable reservation deposit.
                </p>

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div>
                    <label className="block text-xs font-['Chillax-Medium',sans-serif] text-[#E6E2D8]/80 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Kenzo Murakami"
                      className="w-full px-4 py-2.5 rounded-2xl bg-white/[0.06] border border-white/10 text-sm text-[#F6F3E9] placeholder:text-white/20 focus:outline-none focus:border-[#A6865E] transition-colors"
                    />
                    {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-['Chillax-Medium',sans-serif] text-[#E6E2D8]/80 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sanctuary@domain.com"
                        className="w-full px-4 py-2.5 rounded-2xl bg-white/[0.06] border border-white/10 text-sm text-[#F6F3E9] placeholder:text-white/20 focus:outline-none focus:border-[#A6865E] transition-colors"
                      />
                      {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-['Chillax-Medium',sans-serif] text-[#E6E2D8]/80 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 555 019 2834"
                        className="w-full px-4 py-2.5 rounded-2xl bg-white/[0.06] border border-white/10 text-sm text-[#F6F3E9] placeholder:text-white/20 focus:outline-none focus:border-[#A6865E] transition-colors"
                      />
                      {errors.phone && <p className="text-xs text-rose-400 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div ref={modelRef} className="relative z-30">
                      <label className="block text-xs font-['Chillax-Medium',sans-serif] text-[#E6E2D8]/80 mb-1">
                        Chassis Specification
                      </label>
                      <button
                        type="button"
                        onClick={() => setModelDropdownOpen((v) => !v)}
                        className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl bg-white/[0.06] border border-white/10 text-xs sm:text-sm text-[#F6F3E9] hover:border-white/25 transition-colors"
                      >
                        <span className="truncate">{formData.model}</span>
                        <ChevronDown className={`w-4 h-4 text-[#A6865E] shrink-0 transition-transform ${modelDropdownOpen ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {modelDropdownOpen && (
                          <motion.ul
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            className="absolute left-0 right-0 bottom-full mb-2 rounded-2xl border border-white/20 bg-[#161615]/98 p-1.5 backdrop-blur-3xl shadow-2xl z-50 space-y-0.5"
                          >
                            {EDITIONS.map((m) => (
                              <li key={m}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setFormData({ ...formData, model: m });
                                    setModelDropdownOpen(false);
                                  }}
                                  className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors ${
                                    formData.model === m ? "bg-[#A6865E]/15 text-[#F6F3E9] font-semibold" : "text-[#E6E2D8]/70 hover:bg-white/10 hover:text-white"
                                  }`}
                                >
                                  {m}
                                </button>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>

                    <div ref={timelineRef} className="relative z-20">
                      <label className="block text-xs font-['Chillax-Medium',sans-serif] text-[#E6E2D8]/80 mb-1">
                        Target Delivery
                      </label>
                      <button
                        type="button"
                        onClick={() => setTimelineDropdownOpen((v) => !v)}
                        className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl bg-white/[0.06] border border-white/10 text-xs sm:text-sm text-[#F6F3E9] hover:border-white/25 transition-colors"
                      >
                        <span className="truncate">{formData.timeline}</span>
                        <ChevronDown className={`w-4 h-4 text-[#A6865E] shrink-0 transition-transform ${timelineDropdownOpen ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {timelineDropdownOpen && (
                          <motion.ul
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            className="absolute left-0 right-0 bottom-full mb-2 rounded-2xl border border-white/20 bg-[#161615]/98 p-1.5 backdrop-blur-3xl shadow-2xl z-50 space-y-0.5"
                          >
                            {TIMELINES.map((t) => (
                              <li key={t}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setFormData({ ...formData, timeline: t });
                                    setTimelineDropdownOpen(false);
                                  }}
                                  className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors ${
                                    formData.timeline === t ? "bg-[#A6865E]/15 text-[#F6F3E9] font-semibold" : "text-[#E6E2D8]/70 hover:bg-white/10 hover:text-white"
                                  }`}
                                >
                                  {t}
                                </button>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="pt-1">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.consent}
                        onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                        className="mt-0.5 rounded accent-[#A6865E]"
                      />
                      <span className="text-[11px] text-[#E6E2D8]/70 leading-relaxed font-['Satoshi-Regular',sans-serif]">
                        I agree to the <Link href="/terms" className="text-[#A6865E] underline underline-offset-2">Terms</Link> and <Link href="/privacy" className="text-[#A6865E] underline underline-offset-2">Privacy Policy</Link>.
                      </span>
                    </label>
                    {errors.consent && <p className="text-xs text-rose-400 mt-1">{errors.consent}</p>}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={EASE_SPRING}
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#0d0d0c] bg-[#F6F3E9] hover:bg-white shadow-[0_10px_25px_rgba(246,243,233,0.2)] transition-all flex items-center justify-center gap-2 mt-4 font-['Chillax-Medium',sans-serif]"
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
                <p className="text-xs sm:text-sm text-[#E6E2D8]/70 mb-6 leading-relaxed font-['Satoshi-Regular',sans-serif]">
                  An executive concierge dispatch has been registered. Your encrypted allocation credentials have been dispatched.
                </p>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6 max-w-xs mx-auto">
                  <span className="text-[10px] uppercase tracking-widest text-[#E6E2D8]/60 block mb-1">
                    Allocation Reference ID
                  </span>
                  <span className="text-base font-mono font-bold text-[#A6865E]">
                    {confirmedCode}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold text-[#E6E2D8] bg-white/10 hover:bg-white/20 transition-all font-['Chillax-Medium',sans-serif]"
                >
                  Return to Sanctuary
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
