"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  SlidersHorizontal,
  Check,
  ShieldCheck,
  ArrowRight,
  Bookmark,
  Share2,
  RefreshCw,
  Sparkles,
  Info,
} from "lucide-react";
import HeaderDock from "@/components/HeaderDock";
import { VEHICLES, type Vehicle } from "@/lib/vehiclesData";

const SPRING = { type: "spring", stiffness: 300, damping: 30, mass: 0.8 } as const;
const GLASS =
  "bg-white/[0.06] border border-white/[0.12] backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.18)]";
const GLASS_PANEL =
  "bg-white/[0.04] border border-white/10 backdrop-blur-xl p-5 sm:p-6 rounded-3xl";

// Customization options
const PAINTS = [
  { id: "obsidian", name: "Obsidian Satin", color: "#171717", price: 0, desc: "Ultra-matte stealth light absorption" },
  { id: "bronze", name: "Liquid Bronze", color: "#A6865E", price: 4500, desc: "Hand-buffed warm metallic luster" },
  { id: "silver", name: "Titanium Silver", color: "#8E9399", price: 3500, desc: "Aeronautic anodized sheen" },
  { id: "pearl", name: "Silica Pearl", color: "#E8E6E1", price: 5000, desc: "Multi-coat iridescent mica pearl" },
];

const WHEELS = [
  { id: "vortex-21", name: "21\" Forged Vortex Monoblock", price: 0, desc: "Lighter unsprung mass, aerodynamic vanes" },
  { id: "carbon-20", name: "20\" Carbon Aero-Shield", price: 3800, desc: "Autoclave carbon fiber disc with active cooling" },
  { id: "track-21", name: "21\" Ultra-Light Magnesium", price: 5400, desc: "Competition grade, 4.2kg reduction per corner" },
];

const INTERIORS = [
  { id: "nappa-white", name: "Whisper White Nappa", color: "#EBEBE8", price: 0, desc: "Vegetable-tanned organic Bavarian leather" },
  { id: "alcantara-dark", name: "Midnight Charcoal Alcantara", color: "#222225", price: 2900, desc: "High-friction tactile racing fabric" },
  { id: "cognac-saddle", name: "Bespoke Cognac Saddle", color: "#8C5832", price: 3600, desc: "Heritage aniline grain with contrast stitch" },
];

const PACKAGES = [
  {
    id: "acoustic-pack",
    name: "12 dB Active Phase Cancellation",
    price: 4200,
    desc: "Triple-microphone active noise cancellation eliminating road and tire drone.",
  },
  {
    id: "telemetry-pack",
    name: "Pit-Lane Track Telemetry & HUD",
    price: 6800,
    desc: "Real-time tire thermal mapping, lap sector delta, and augmented reality apex cues.",
  },
  {
    id: "supercharge-pack",
    name: "Rapid Thermal Boost Architecture",
    price: 3500,
    desc: "Pre-conditioned solid-state cell architecture enabling 10% to 80% charge in 14 minutes.",
  },
];

function ConfiguratorContent() {
  const searchParams = useSearchParams();
  const initialModelId = searchParams.get("model") || VEHICLES[0].id;

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(
    VEHICLES.find((v) => v.id === initialModelId) || VEHICLES[0]
  );
  const [paint, setPaint] = useState(PAINTS[0]);
  const [wheel, setWheel] = useState(WHEELS[0]);
  const [interior, setInterior] = useState(INTERIORS[0]);
  const [selectedPackages, setSelectedPackages] = useState<string[]>(["acoustic-pack"]);
  const [activeTab, setActiveTab] = useState<"exterior" | "wheels" | "interior" | "packages">("exterior");
  const [savedToast, setSavedToast] = useState(false);
  const [savedBuildCode, setSavedBuildCode] = useState<string | null>(null);

  // Restore saved build if available
  useEffect(() => {
    try {
      const raw = localStorage.getItem("zen_saved_build");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.buildCode) setSavedBuildCode(parsed.buildCode);
      }
    } catch {}
  }, []);

  const togglePackage = (id: string) => {
    setSelectedPackages((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const totalPrice = useMemo(() => {
    const packagesTotal = selectedPackages.reduce((acc, pId) => {
      const pkg = PACKAGES.find((p) => p.id === pId);
      return acc + (pkg ? pkg.price : 0);
    }, 0);
    return selectedVehicle.price + paint.price + wheel.price + interior.price + packagesTotal;
  }, [selectedVehicle, paint, wheel, interior, selectedPackages]);

  const saveConfiguration = () => {
    const code = `ZEN-BUILD-${Math.floor(10000 + Math.random() * 90000)}`;
    const buildData = {
      buildCode: code,
      vehicleId: selectedVehicle.id,
      vehicleName: selectedVehicle.name,
      paint: paint.name,
      wheel: wheel.name,
      interior: interior.name,
      packages: selectedPackages,
      totalPrice,
      timestamp: new Date().toISOString(),
    };
    try {
      localStorage.setItem("zen_saved_build", JSON.stringify(buildData));
      setSavedBuildCode(code);
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 4000);
    } catch (e) {
      console.warn("Storage error", e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-24">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs uppercase tracking-[0.25em] text-[#A6865E] font-['Chillax-Medium',sans-serif] block mb-2">
          Interactive Atelier Studio
        </span>
        <h1 className="font-['Rosaline-Regular',Georgia,serif] text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3">
          Configure Your Sanctuary
        </h1>
        <p className="text-xs sm:text-sm text-[#E6E2D8]/70 font-['Satoshi-Regular',sans-serif]">
          Tailor acoustic layers, aerodynamic forged wheels, and tactile bespoke surfaces. Live allocation pricing updates instantaneously.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Visualizer Stage */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-white/15 bg-black/70 shadow-2xl">
            <Image
              src={selectedVehicle.image}
              alt={selectedVehicle.name}
              fill
              priority
              className="object-cover object-center transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Live Model Badge */}
            <div className="absolute top-5 left-5 flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-xs font-['Chillax-Medium',sans-serif] font-semibold text-white">
                {selectedVehicle.name}
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-[#A6865E]/20 backdrop-blur-md border border-[#A6865E]/40 text-xs font-mono font-bold text-[#A6865E]">
                {paint.name}
              </span>
            </div>

            {/* Telemetry Footprint */}
            <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
              <div className="text-xs text-[#E6E2D8]/80 font-mono">
                <div>POWERTRAIN: <span className="text-white font-bold">{selectedVehicle.powertrain}</span></div>
                <div>TORQUE BALANCE: <span className="text-[#A6865E] font-bold">{selectedVehicle.weightRatio}</span></div>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider text-[#E6E2D8]/50 block">ESTIMATED RANGE</span>
                <span className="font-mono text-lg font-bold text-white">{selectedVehicle.range} km</span>
              </div>
            </div>
          </div>

          {/* Model Switcher Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <span className="text-[11px] uppercase tracking-wider text-[#E6E2D8]/50 font-['Chillax-Medium',sans-serif] shrink-0 mr-1">
              Base Model:
            </span>
            {VEHICLES.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedVehicle(v)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-['Chillax-Medium',sans-serif] whitespace-nowrap transition-all ${
                  selectedVehicle.id === v.id
                    ? "bg-white/20 border border-white/40 text-white font-semibold"
                    : "bg-white/[0.04] border border-white/10 text-[#E6E2D8]/60 hover:text-white"
                }`}
              >
                {v.name}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Customization HUD */}
        <div className={`lg:col-span-5 ${GLASS_PANEL} flex flex-col justify-between`}>
          {/* Customization Tabs */}
          <div>
            <div className="flex items-center gap-1 p-1 rounded-2xl bg-white/[0.05] border border-white/10 mb-6">
              {(["exterior", "wheels", "interior", "packages"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 text-xs font-['Chillax-Medium',sans-serif] uppercase tracking-wider rounded-xl transition-all ${
                    activeTab === tab
                      ? "bg-[#A6865E] text-black font-semibold shadow"
                      : "text-[#E6E2D8]/60 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab 1: Exterior Paint */}
            {activeTab === "exterior" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                <h3 className="text-xs uppercase tracking-wider text-[#A6865E] font-['Chillax-Medium',sans-serif]">
                  Exterior Paint & Coating
                </h3>
                <div className="grid grid-cols-1 gap-2.5">
                  {PAINTS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setPaint(item)}
                      className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        paint.id === item.id
                          ? "bg-white/15 border-white/50 text-white shadow-lg"
                          : "bg-white/[0.02] border-white/10 text-[#E6E2D8]/70 hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="h-6 w-6 rounded-full border border-white/30 shadow-inner"
                          style={{ backgroundColor: item.color }}
                        />
                        <div>
                          <div className="text-xs font-semibold text-white">{item.name}</div>
                          <div className="text-[11px] text-[#E6E2D8]/50">{item.desc}</div>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-semibold text-[#A6865E]">
                        {item.price === 0 ? "Included" : `+$${item.price.toLocaleString()}`}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Tab 2: Wheels */}
            {activeTab === "wheels" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                <h3 className="text-xs uppercase tracking-wider text-[#A6865E] font-['Chillax-Medium',sans-serif]">
                  Forged Wheels & Aero Vanes
                </h3>
                <div className="grid grid-cols-1 gap-2.5">
                  {WHEELS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setWheel(item)}
                      className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        wheel.id === item.id
                          ? "bg-white/15 border-white/50 text-white shadow-lg"
                          : "bg-white/[0.02] border-white/10 text-[#E6E2D8]/70 hover:bg-white/[0.05]"
                      }`}
                    >
                      <div>
                        <div className="text-xs font-semibold text-white">{item.name}</div>
                        <div className="text-[11px] text-[#E6E2D8]/50">{item.desc}</div>
                      </div>
                      <span className="font-mono text-xs font-semibold text-[#A6865E]">
                        {item.price === 0 ? "Included" : `+$${item.price.toLocaleString()}`}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Tab 3: Interior */}
            {activeTab === "interior" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                <h3 className="text-xs uppercase tracking-wider text-[#A6865E] font-['Chillax-Medium',sans-serif]">
                  Tactile Cabin Upholstery
                </h3>
                <div className="grid grid-cols-1 gap-2.5">
                  {INTERIORS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setInterior(item)}
                      className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        interior.id === item.id
                          ? "bg-white/15 border-white/50 text-white shadow-lg"
                          : "bg-white/[0.02] border-white/10 text-[#E6E2D8]/70 hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="h-6 w-6 rounded-full border border-white/30 shadow-inner"
                          style={{ backgroundColor: item.color }}
                        />
                        <div>
                          <div className="text-xs font-semibold text-white">{item.name}</div>
                          <div className="text-[11px] text-[#E6E2D8]/50">{item.desc}</div>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-semibold text-[#A6865E]">
                        {item.price === 0 ? "Included" : `+$${item.price.toLocaleString()}`}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Tab 4: Performance Packages */}
            {activeTab === "packages" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                <h3 className="text-xs uppercase tracking-wider text-[#A6865E] font-['Chillax-Medium',sans-serif]">
                  Engineering Enhancement Packs
                </h3>
                <div className="grid grid-cols-1 gap-2.5">
                  {PACKAGES.map((item) => {
                    const isChecked = selectedPackages.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        onClick={() => togglePackage(item.id)}
                        className={`w-full p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                          isChecked
                            ? "bg-white/15 border-white/50 text-white"
                            : "bg-white/[0.02] border-white/10 text-[#E6E2D8]/70 hover:bg-white/[0.05]"
                        }`}
                      >
                        <span className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded border transition-colors ${
                          isChecked ? "bg-[#A6865E] border-[#A6865E] text-black" : "border-white/30"
                        }`}>
                          {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                        </span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-white">{item.name}</span>
                            <span className="font-mono text-xs font-semibold text-[#A6865E]">
                              +${item.price.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#E6E2D8]/60 mt-1 leading-relaxed">{item.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>

          {/* Pricing Summary & Actions */}
          <div className="pt-6 mt-6 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#E6E2D8]/50 block">TOTAL BESPOKE ESTIMATE</span>
                <span className="text-2xl font-bold font-mono text-white">
                  ${totalPrice.toLocaleString()}
                </span>
              </div>
              {savedBuildCode && (
                <div className="text-right">
                  <span className="text-[9px] uppercase tracking-wider text-[#A6865E] block">SAVED SPEC REF</span>
                  <span className="font-mono text-xs text-white/80">{savedBuildCode}</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                onClick={saveConfiguration}
                className="py-3 px-4 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 text-xs font-['Chillax-Medium',sans-serif] text-white flex items-center justify-center gap-2 transition-all"
              >
                <Bookmark className="h-4 w-4 text-[#A6865E]" />
                <span>Save Build</span>
              </button>
              <Link
                href={`/contact?model=${encodeURIComponent(selectedVehicle.name)}&ref=${savedBuildCode || "ZEN-CONFIG"}`}
                className="py-3 px-4 rounded-full bg-[#A6865E] hover:bg-[#b89569] text-black text-xs font-semibold font-['Chillax-Medium',sans-serif] flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                <span>Book Test Drive</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {savedToast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-6 right-6 z-50 p-4 rounded-2xl ${GLASS} bg-[#141413]/95 border border-emerald-500/30 flex items-center gap-3 text-white max-w-sm`}
          >
            <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
            <div className="text-xs">
              <div className="font-semibold text-white">Configuration Stored</div>
              <div className="text-[#E6E2D8]/70">Reference #{savedBuildCode} saved to your device.</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ConfiguratorPage() {
  return (
    <main className="min-h-screen bg-[#0d0d0c] text-[#F6F3E9] selection:bg-[#A6865E]/30 selection:text-[#F6F3E9] relative">
      <HeaderDock />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center text-xs text-[#A6865E] font-mono">
          LOADING ATELIER STUDIO...
        </div>
      }>
        <ConfiguratorContent />
      </Suspense>
    </main>
  );
}
