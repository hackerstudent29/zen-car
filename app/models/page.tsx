"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  SlidersHorizontal,
  Heart,
  ChevronDown,
  X,
  Gauge,
  Zap,
  BatteryCharging,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import HeaderDock from "@/components/HeaderDock";
import { VEHICLES, type Vehicle } from "@/lib/vehiclesData";

const SPRING = { type: "spring", stiffness: 300, damping: 30, mass: 0.8 } as const;
const GLASS =
  "bg-white/[0.06] border border-white/[0.12] backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.18)]";
const GLASS_CARD =
  "bg-white/[0.04] border border-white/[0.1] backdrop-blur-xl hover:border-white/25 transition-all duration-300";

const CATEGORIES = ["All", "Pure EV", "Track Edition", "Grand Tourer"] as const;
type Category = (typeof CATEGORIES)[number];

const SORT_OPTIONS = [
  { id: "featured", label: "Featured Lineup" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "accel", label: "Fastest 0–100 km/h" },
  { id: "power", label: "Highest Horsepower" },
] as const;

export default function ModelsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [quickViewVehicle, setQuickViewVehicle] = useState<Vehicle | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  // Sync favorites from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("zen_favs");
      if (raw) setFavorites(JSON.parse(raw));
    } catch {}
  }, []);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem("zen_favs", JSON.stringify(updated));
        window.dispatchEvent(new Event("zen_favs_updated"));
      } catch {}
      return updated;
    });
  };

  const filteredVehicles = useMemo(() => {
    return VEHICLES.filter((car) => {
      const matchesSearch =
        search.trim() === "" ||
        car.name.toLowerCase().includes(search.toLowerCase()) ||
        car.tagline.toLowerCase().includes(search.toLowerCase()) ||
        car.description.toLowerCase().includes(search.toLowerCase()) ||
        car.powertrain.toLowerCase().includes(search.toLowerCase());

      const matchesCat = selectedCategory === "All" || car.category === selectedCategory;
      const matchesFav = !onlyFavorites || favorites.includes(car.id);

      return matchesSearch && matchesCat && matchesFav;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "accel") return a.acceleration - b.acceleration;
      if (sortBy === "power") return b.power - a.power;
      return 0; // featured default
    });
  }, [search, selectedCategory, sortBy, onlyFavorites, favorites]);

  const resetFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setSortBy("featured");
    setOnlyFavorites(false);
  };

  return (
    <main className="min-h-screen bg-[#0d0d0c] text-[#F6F3E9] selection:bg-[#A6865E]/30 selection:text-[#F6F3E9] relative pb-28">
      <HeaderDock />

      {/* Subpage Header Banner */}
      <section className="relative pt-32 sm:pt-40 pb-12 sm:pb-16 px-4 sm:px-6 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs uppercase tracking-[0.25em] text-[#A6865E] font-['Chillax-Medium',sans-serif] block mb-3">
            Atelier Showroom & Inventory
          </span>
          <h1 className="font-['Rosaline-Regular',Georgia,serif] text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            The ZEN Fleet
          </h1>
          <p className="text-sm sm:text-base text-[#E6E2D8]/70 max-w-2xl mx-auto font-['Satoshi-Regular',sans-serif] leading-relaxed">
            Quiet luxury calibrated with motorsport dynamics. Explore our numbered allocations, custom specs, and track homologations.
          </p>
        </motion.div>

        {/* Filter and Search Bar Component */}
        <div className={`mt-10 sm:mt-12 p-3 sm:p-4 rounded-3xl ${GLASS} max-w-5xl mx-auto flex flex-col md:flex-row gap-3 items-stretch justify-between`}>
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#E6E2D8]/45" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by model, powertrain, or spec..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/[0.04] border border-white/10 text-sm text-[#F6F3E9] placeholder-[#E6E2D8]/40 focus:outline-none focus:border-[#A6865E] font-['Satoshi-Regular',sans-serif]"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#E6E2D8]/50 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-['Chillax-Medium',sans-serif] whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-[#A6865E] text-black font-semibold shadow-md"
                    : "text-[#E6E2D8]/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sorting and Wishlist Toggle */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 md:flex-none">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full md:w-auto appearance-none pl-3.5 pr-8 py-2.5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs text-[#F6F3E9] font-['Chillax-Medium',sans-serif] focus:outline-none focus:border-[#A6865E] cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id} className="bg-[#141413] text-[#F6F3E9]">
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#E6E2D8]/50 pointer-events-none" />
            </div>

            <button
              onClick={() => setOnlyFavorites((prev) => !prev)}
              className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl border text-xs font-['Chillax-Medium',sans-serif] transition-all whitespace-nowrap ${
                onlyFavorites
                  ? "bg-[#A6865E]/20 border-[#A6865E] text-[#A6865E]"
                  : "bg-white/[0.04] border-white/10 text-[#E6E2D8]/70 hover:text-white"
              }`}
            >
              <Heart className={`h-3.5 w-3.5 ${onlyFavorites ? "fill-current text-[#A6865E]" : ""}`} />
              <span>Wishlist ({favorites.length})</span>
            </button>
          </div>
        </div>
      </section>

      {/* Grid of Vehicles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6 text-xs text-[#E6E2D8]/60 font-mono">
          <span>SHOWING {filteredVehicles.length} OF {VEHICLES.length} ALLOCATIONS</span>
          {(search || selectedCategory !== "All" || onlyFavorites || sortBy !== "featured") && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-[#A6865E] hover:underline"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((car, idx) => {
              const isFav = favorites.includes(car.id);
              return (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className={`group rounded-3xl overflow-hidden ${GLASS_CARD} flex flex-col justify-between`}
                >
                  {/* Card Media Header */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-black/50">
                    <Image
                      src={car.image}
                      alt={car.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0c] via-transparent to-black/30" />

                    {/* Badge */}
                    {car.badge && (
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] uppercase tracking-wider font-semibold text-[#A6865E] font-['Chillax-Medium',sans-serif]">
                        {car.badge}
                      </span>
                    )}

                    {/* Wishlist Heart */}
                    <button
                      onClick={(e) => toggleFavorite(car.id, e)}
                      aria-label="Save to favorites"
                      className="absolute top-4 right-4 grid h-8 w-8 place-items-center rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white/80 hover:text-[#A6865E] hover:bg-black/90 transition-all"
                    >
                      <Heart className={`h-4 w-4 ${isFav ? "fill-[#A6865E] text-[#A6865E]" : ""}`} />
                    </button>

                    <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                      <div>
                        <span className="text-[11px] uppercase tracking-widest text-[#A6865E] font-['Chillax-Medium',sans-serif] block">
                          {car.category}
                        </span>
                        <h2 className="text-xl font-bold font-['Rosaline-Regular',Georgia,serif] text-white">
                          {car.name}
                        </h2>
                      </div>
                      <span className="font-mono text-base font-bold text-white">
                        {car.priceFormatted}
                      </span>
                    </div>
                  </div>

                  {/* Card Body & Specs */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <p className="text-xs text-[#E6E2D8]/70 line-clamp-2 leading-relaxed font-['Satoshi-Regular',sans-serif] mb-5">
                      {car.description}
                    </p>

                    {/* Telemetry Tri-Bar */}
                    <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-2xl bg-white/[0.03] border border-white/[0.07] mb-5 text-center">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-[#E6E2D8]/50 block">0-100 KM/H</span>
                        <span className="text-sm font-bold font-mono text-white">{car.acceleration}s</span>
                      </div>
                      <div className="border-x border-white/10">
                        <span className="text-[9px] uppercase tracking-wider text-[#E6E2D8]/50 block">OUTPUT</span>
                        <span className="text-sm font-bold font-mono text-white">{car.power} hp</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-[#E6E2D8]/50 block">RANGE</span>
                        <span className="text-sm font-bold font-mono text-[#A6865E]">{car.range} km</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => setQuickViewVehicle(car)}
                        className="flex-1 py-2.5 px-3 rounded-full border border-white/20 text-xs font-['Chillax-Medium',sans-serif] text-white hover:bg-white/10 transition-colors text-center"
                      >
                        Quick Spec
                      </button>
                      <Link
                        href={`/contact?model=${encodeURIComponent(car.name)}`}
                        className="flex-1 py-2.5 px-3 rounded-full bg-[#A6865E] text-black text-xs font-semibold font-['Chillax-Medium',sans-serif] hover:bg-[#b89569] transition-colors flex items-center justify-center gap-1 text-center"
                      >
                        <span>Reserve</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Empty Search State */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`text-center py-16 px-6 rounded-3xl ${GLASS} max-w-lg mx-auto my-8`}
          >
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-white/5 border border-white/10 text-[#A6865E]">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="font-['Rosaline-Regular',Georgia,serif] text-2xl font-bold mb-2">
              No allocations match your criteria
            </h3>
            <p className="text-xs sm:text-sm text-[#E6E2D8]/65 mb-6 max-w-sm mx-auto leading-relaxed">
              We couldn&apos;t find any vehicles with those filters. Try clearing your search keyword or switching categories.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 rounded-full bg-[#A6865E] text-black text-xs font-semibold font-['Chillax-Medium',sans-serif] hover:bg-[#b89569] transition-colors"
            >
              Reset All Filters
            </button>
          </motion.div>
        )}
      </section>

      {/* Quick Spec Modal Dialog */}
      <AnimatePresence>
        {quickViewVehicle && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickViewVehicle(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={SPRING}
              className={`relative z-10 w-full max-w-2xl rounded-3xl p-6 sm:p-8 ${GLASS} bg-[#141413]/95 max-h-[90vh] overflow-y-auto no-scrollbar border border-white/20`}
            >
              <button
                onClick={() => setQuickViewVehicle(null)}
                aria-label="Close dialog"
                className="absolute top-5 right-5 grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 border border-white/10 bg-black">
                <Image
                  src={quickViewVehicle.image}
                  alt={quickViewVehicle.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] uppercase tracking-widest text-[#A6865E] font-['Chillax-Medium',sans-serif]">
                    {quickViewVehicle.category}
                  </span>
                  <h3 className="text-2xl font-bold font-['Rosaline-Regular',Georgia,serif] text-white">
                    {quickViewVehicle.name}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                  <span className="text-[9px] uppercase tracking-wider text-[#E6E2D8]/50 block">0-100 KM/H</span>
                  <span className="text-lg font-bold font-mono text-white">{quickViewVehicle.acceleration}s</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                  <span className="text-[9px] uppercase tracking-wider text-[#E6E2D8]/50 block">TOP SPEED</span>
                  <span className="text-lg font-bold font-mono text-white">{quickViewVehicle.topSpeed} km/h</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                  <span className="text-[9px] uppercase tracking-wider text-[#E6E2D8]/50 block">HORSEPOWER</span>
                  <span className="text-lg font-bold font-mono text-white">{quickViewVehicle.power} hp</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                  <span className="text-[9px] uppercase tracking-wider text-[#E6E2D8]/50 block">EST. RANGE</span>
                  <span className="text-lg font-bold font-mono text-[#A6865E]">{quickViewVehicle.range} km</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <p className="text-sm text-[#E6E2D8]/80 leading-relaxed font-['Satoshi-Regular',sans-serif]">
                  {quickViewVehicle.description}
                </p>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#A6865E] font-['Chillax-Medium',sans-serif] mb-2">
                    Key Engineering Specifications
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {quickViewVehicle.features.map((feat) => (
                      <li
                        key={feat}
                        className="text-xs text-[#E6E2D8]/70 flex items-center gap-2 font-['Satoshi-Regular',sans-serif]"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#A6865E]" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#E6E2D8]/50 block">ALLOCATION BASE</span>
                  <span className="text-xl font-bold font-mono text-white">{quickViewVehicle.priceFormatted}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setQuickViewVehicle(null)}
                    className="px-5 py-2.5 rounded-full border border-white/20 text-xs font-['Chillax-Medium',sans-serif] hover:bg-white/10"
                  >
                    Close
                  </button>
                  <Link
                    href={`/contact?model=${encodeURIComponent(quickViewVehicle.name)}`}
                    className="px-6 py-2.5 rounded-full bg-[#A6865E] text-black text-xs font-semibold font-['Chillax-Medium',sans-serif] hover:bg-[#b89569] transition-colors"
                  >
                    Book Test Drive
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
