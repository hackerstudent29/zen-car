export interface Vehicle {
  id: string;
  name: string;
  tagline: string;
  category: "Pure EV" | "Track Edition" | "Grand Tourer";
  price: number;
  priceFormatted: string;
  acceleration: number; // 0-100 km/h in seconds
  topSpeed: number; // km/h
  power: number; // hp
  range: number; // km
  powertrain: string;
  weightRatio: string;
  image: string;
  badge?: string;
  description: string;
  features: string[];
}

export const VEHICLES: Vehicle[] = [
  {
    id: "zen-gt-1-aero",
    name: "ZEN GT-1 Aero",
    tagline: "The Flagship Electric Monocoque",
    category: "Pure EV",
    price: 245000,
    priceFormatted: "$245,000",
    acceleration: 2.8,
    topSpeed: 320,
    power: 750,
    range: 620,
    powertrain: "Dual Silent Fluid Motor",
    weightRatio: "50:50 Zero-Shift",
    image: "/antigravity images/car hero pose top side angle 2.png",
    badge: "Founding Run",
    description:
      "A sculptured sanctuary of quiet velocity. Engineered with single-piece autoclave carbon composite and active acoustic wave-cancellation.",
    features: [
      "12 dB Active Cabin Isolation",
      "Torque-Vectoring Dual Inverter",
      "22-Way Articulated Organic Nappa Seats",
      "Solid-State 108 kWh Thermal Pack",
    ],
  },
  {
    id: "zen-gt-track-spec",
    name: "ZEN GT Track Spec",
    tagline: "Vector Adhesion & Dynamic Balance",
    category: "Track Edition",
    price: 285000,
    priceFormatted: "$285,000",
    acceleration: 2.3,
    topSpeed: 345,
    power: 890,
    range: 540,
    powertrain: "Quad Magnetic Vector Core",
    weightRatio: "49:51 Track-Biased",
    image: "/antigravity images/car top side angle hero pose.png",
    badge: "Track Homologation",
    description:
      "Stripped of acoustic excess, calibrated for track telemetry. 1.35 lateral G cornering capability with dynamic vortex aero floor.",
    features: [
      "1.35 Lateral G Vector Grip",
      "Carbon-Ceramic Monoblock Rotors (32m 100-0)",
      "Exposed 3K Twill Matte Carbon Tub",
      "Pit-Lane Live Telemetry Uplink",
    ],
  },
  {
    id: "zen-gt-grand-tourer",
    name: "ZEN GT Grand Tourer",
    tagline: "Cross-Continental Tranquility",
    category: "Grand Tourer",
    price: 260000,
    priceFormatted: "$260,000",
    acceleration: 3.1,
    topSpeed: 310,
    power: 720,
    range: 710,
    powertrain: "Dual Long-Range Perm-Magnet",
    weightRatio: "50:50 Neutral Balance",
    image: "/antigravity images/car image hero shot.jpeg",
    badge: "Extended Range",
    description:
      "Long-distance touring refined into an art form. Over 700km of WLTP range with executive rear lounge ergonomics and ultra-low drag profile.",
    features: [
      "710 km Extended Solid-State Range",
      "Executive Acoustic Matrix with 28 Spatial Drivers",
      "Smart Air Suspension with Predictive Road Cam",
      "Whisper Rapid-Charge (10% to 80% in 14 min)",
    ],
  },
  {
    id: "zen-atelier-01",
    name: "ZEN Atelier Edition 01",
    tagline: "Hand-Crafted Bespoke Commission",
    category: "Pure EV",
    price: 330000,
    priceFormatted: "$330,000",
    acceleration: 2.7,
    topSpeed: 330,
    power: 810,
    range: 600,
    powertrain: "Dual Bespoke Synchronous Drive",
    weightRatio: "50:50 Artisan Balance",
    image: "/antigravity images/car image in garage with light on.png",
    badge: "Limited (1 of 50)",
    description:
      "Individually hand-buffed with 12 layers of piano lacquer in our Swiss Atelier. Every stitch is placed by a single master craftsman over 480 build hours.",
    features: [
      "12-Layer Piano Lacquer Hand Finish",
      "Bespoke Titanium & Wood Dash Trim",
      "Individual Commission Number Plate",
      "Lifetime Concierge & Trackside Telematics",
    ],
  },
  {
    id: "zen-gt-stealth",
    name: "ZEN GT Stealth Edition",
    tagline: "Monochromatic Obsidian Presence",
    category: "Track Edition",
    price: 295000,
    priceFormatted: "$295,000",
    acceleration: 2.4,
    topSpeed: 340,
    power: 860,
    range: 560,
    powertrain: "Tri-Motor Vector Propulsion",
    weightRatio: "50:50 Dynamic Mass",
    image: "/antigravity images/car image1.jpeg",
    badge: "Obsidian Series",
    description:
      "Dark satin exterior with dark chrome exterior badges, tinted anti-reflective glass, and titanium-nitride exhaust diffuser trim.",
    features: [
      "Satin Obsidian Black Self-Healing Wrap",
      "Titanium-Nitride Aero Diffusers",
      "Alcantara & Carbon Lightweight Buckets",
      "Night-Vision Thermal HUD",
    ],
  },
];
