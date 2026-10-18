"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { EASE_SPRING } from "@/lib/constants";
import { X, CheckCircle2, ShieldCheck } from "lucide-react";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    model: "ZEN GT-1 Launch Edition",
    timeline: "2026 Q4 Founding Allocation",
    consent: false,
    _hp: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedCode, setConfirmedCode] = useState<string | null>(null);

  // Lock scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setConfirmedCode(null);
      setErrors({});
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Honeypot check
    if (formData._hp) return;

    const newErrors: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Please enter your full name (minimum 2 characters).";
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      newErrors.email = "Please provide a valid email address.";
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 7) {
      newErrors.phone = "Please provide a valid contact phone number.";
    }
    if (!formData.consent) {
      newErrors.consent = "You must accept the terms to request an allocation.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    setTimeout(() => {
      setIsSubmitting(false);
      const code = `ZEN-GT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setConfirmedCode(code);
    }, 700);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Card with Apple Spring Physics */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={EASE_SPRING}
            className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-[#141413]/95 border border-white/15 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] text-[#F6F3E9] z-10 my-auto"
          >
            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={EASE_SPRING}
              onClick={onClose}
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

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Honeypot */}
                  <input
                    type="text"
                    value={formData._hp}
                    onChange={(e) => setFormData({ ...formData, _hp: e.target.value })}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Name */}
                  <div>
                    <label className="block text-xs font-medium text-[#E6E2D8]/80 mb-1">
                      Full Name <span className="text-[#A6865E]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Kenzo Murakami"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-[#F6F3E9] placeholder:text-white/20 focus:outline-none focus:border-[#A6865E] transition-colors"
                    />
                    {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#E6E2D8]/80 mb-1">
                        Email Address <span className="text-[#A6865E]">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sanctuary@domain.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-[#F6F3E9] placeholder:text-white/20 focus:outline-none focus:border-[#A6865E] transition-colors"
                      />
                      {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#E6E2D8]/80 mb-1">
                        Phone Number <span className="text-[#A6865E]">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 019-2834"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-[#F6F3E9] placeholder:text-white/20 focus:outline-none focus:border-[#A6865E] transition-colors"
                      />
                      {errors.phone && <p className="text-xs text-rose-400 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Chassis Specification */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#E6E2D8]/80 mb-1">
                        Chassis Specification
                      </label>
                      <select
                        value={formData.model}
                        onChange={(e) => setFormData({ ...formData, model: e.target.value })}
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
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#1c1c1b] border border-white/10 text-xs text-[#F6F3E9] focus:outline-none focus:border-[#A6865E] transition-colors"
                      >
                        <option value="2026 Q4 Founding Allocation">2026 Q4 Founding Allocation</option>
                        <option value="2027 Q1 Phase II Build">2027 Q1 Phase II Build</option>
                        <option value="2027 Q2 Global Dispatch">2027 Q2 Global Dispatch</option>
                      </select>
                    </div>
                  </div>

                  {/* Legal Consent */}
                  <div className="pt-1">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.consent}
                        onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
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
                    {errors.consent && <p className="text-xs text-rose-400 mt-1">{errors.consent}</p>}
                  </div>

                  {/* Submit Button */}
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
              /* Success Confirmation */
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
                  onClick={onClose}
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
  );
}
