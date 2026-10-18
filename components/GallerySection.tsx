"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { EASE_SPRING } from "@/lib/constants";

const GALLERY_ITEMS = [
  {
    src: "/antigravity images/car hero pose top side angle 2.png",
    alt: "ZEN GT high-angle front quarter exterior silhouette",
    title: "Aerodynamic Profile",
    subtitle: "Continuous carbon-composite contouring",
    span: "col-span-1 md:col-span-2 row-span-2 aspect-[16/10]",
  },
  {
    src: "/antigravity images/car nitro focused.png",
    alt: "ZEN GT dual titanium performance exhaust and thermal diffuser",
    title: "Thermal Diffuser",
    subtitle: "Acoustic titanium balance",
    span: "col-span-1 aspect-[4/3]",
  },
  {
    src: "/antigravity images/car tyre focused.png",
    alt: "ZEN GT forged lightweight aerodynamic alloy wheel and track tire",
    title: "Forged Alloy",
    subtitle: "Active rotational vortex evacuation",
    span: "col-span-1 aspect-[4/3]",
  },
  {
    src: "/antigravity images/engine image.png",
    alt: "ZEN GT liquid-cooled silent dual-motor high-efficiency powertrain",
    title: "Liquid Core",
    subtitle: "Whispering dual-motor synchronized drive",
    span: "col-span-1 md:col-span-2 aspect-[21/9]",
  },
];

export default function GallerySection() {
  return (
    <section id="performance" className="py-28 px-6 bg-[#0d0d0c] text-[#F6F3E9]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs uppercase tracking-[0.25em] text-[#A6865E] mb-3 font-semibold font-['Chillax-Medium',sans-serif]">
            GALLERY ARCHITECTURE
          </span>
          <h2 className="font-['Rosaline-Regular',Georgia,serif] text-3xl sm:text-5xl font-bold tracking-tight">
            Form & Function
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GALLERY_ITEMS.map((item, idx) => (
            <motion.div
              key={item.src}
              whileHover={{ scale: 1.015 }}
              transition={EASE_SPRING}
              className={`group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 ${item.span}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute inset-x-6 bottom-6 flex flex-col">
                <span className="text-[11px] uppercase tracking-widest text-[#A6865E] font-semibold font-mono">
                  {item.title}
                </span>
                <span className="text-sm font-medium text-[#F6F3E9] font-['Chillax-Medium',sans-serif] mt-0.5">
                  {item.subtitle}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
