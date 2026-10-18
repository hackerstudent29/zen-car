export const EASE_APPLE = [0.32, 0.72, 0, 1] as const;
export const EASE_SPRING = { type: "spring", stiffness: 350, damping: 25, mass: 0.8 } as const;
export const EASE_GENTLE_SPRING = { type: "spring", stiffness: 220, damping: 26 } as const;
export const EASE_BOUNCY_SPRING = { type: "spring", stiffness: 400, damping: 20 } as const;

export interface ShowcaseTab {
  id: string;
  num: string;
  name: string;
  desc: string;
  video: string;
  fallback: string;
  hud: {
    model: string;
    status: string;
    powertrain: string;
    ratio: string;
  };
}

export const SHOWCASE_TABS: ShowcaseTab[] = [
  {
    id: "motion",
    num: "01",
    name: "Pure Motion",
    desc: "Dynamic balance in action",
    video: "/antigravity images/car drift shot.mp4",
    fallback: "/antigravity images/car image1.jpeg",
    hud: {
      model: "ZEN GT-1",
      status: "STANDBY",
      powertrain: "DUAL SILENT FLUID MOTOR",
      ratio: "50:50 ZERO-SHIFT",
    },
  },
  {
    id: "interior",
    num: "02",
    name: "Sanctuary & Power",
    desc: "Premium luxury meets raw nitro exhaust",
    video: "/antigravity images/car transition from seats to nitro.mp4",
    fallback: "/antigravity images/car focused on seats.png",
    hud: {
      model: "ZEN GT-INTERIOR",
      status: "ENGAGED",
      powertrain: "WHISPER CABIN MATRIX",
      ratio: "12 dB ISOLATION",
    },
  },
  {
    id: "engine",
    num: "03",
    name: "The Heart",
    desc: "Whispering acoustic engineering",
    video: "/antigravity images/engine reveal.mp4",
    fallback: "/antigravity images/car engine.png",
    hud: {
      model: "ZEN FLUID-CORE",
      status: "OPTIMAL",
      powertrain: "750 HP EQUIVALENT",
      ratio: "98.4% FLUID EFFICIENCY",
    },
  },
  {
    id: "tyre",
    num: "04",
    name: "Contact Patch",
    desc: "Adhesion meets road feel",
    video: "/antigravity images/car tyre focusing shot.mp4",
    fallback: "/antigravity images/car tyre focused.png",
    hud: {
      model: "ZEN FORGED ALLOY",
      status: "ACTIVE GRIP",
      powertrain: "VECTOR TRACK ADHESION",
      ratio: "1.35 LATERAL G",
    },
  },
  {
    id: "garage",
    num: "05",
    name: "The Sanctuary",
    desc: "The birthplace of detail",
    video: "/antigravity images/car garage transformation.mp4",
    fallback: "/antigravity images/car image in garage with light on.png",
    hud: {
      model: "ZEN WORKSHOP NO. 01",
      status: "BESPOKE QUEUE",
      powertrain: "HAND-CRAFTED COMPOSITE",
      ratio: "SERIES 01-50",
    },
  },
];

export const TECHNICAL_SPECS = [
  { label: "Silent Propulsion", value: "750 hp equivalent", detail: "Dual fluid-cooled synchronous motors" },
  { label: "Acoustics", value: "12 dB Cabin ISO", detail: "Active acoustic phase cancellation" },
  { label: "Range", value: "620 km", detail: "Solid-state thermal architecture" },
  { label: "Acceleration", value: "0-100 km/h in 2.8s", detail: "Instant zero-slip vector torque" },
];

export const PHILOSOPHY_CARDS = [
  {
    kicker: "PHILOSOPHY",
    title: "Rooted in Ancient Tranquility",
    desc: "In a world of noise, distraction, and excess, we choose clarity. The ZEN GT is designed to strip away the superfluous.",
    video: "/antigravity images/car driving on street with zoomout.mp4",
  },
  {
    kicker: "FOCUS",
    title: "Forged in the Fires of Focus",
    desc: "No flashing screens, no aggressive lines, no artificial sounds. Only pure connection between road, machine, and mind.",
    video: "/antigravity images/car transition from steering to hero pose.mp4",
  },
  {
    kicker: "HARMONY",
    title: "Where Engineering Meets the Soul",
    desc: "\"The designer knows he has achieved perfection not when there is nothing left to add, but when there is nothing left to take away.\"",
    video: "/antigravity images/car garage transformation.mp4",
  },
];

export const ZEN_QUOTES = [
  { quote: "Breathe in. Let go of the noise.", author: "Zen Philosophy" },
  { quote: "In stillness, the world becomes clear.", author: "Lao Tzu" },
  { quote: "Perfection is attained when there is nothing left to strip away.", author: "Antoine de Saint-Exupéry" },
  { quote: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { quote: "Silence is the sanctuary of the thoughtful mind.", author: "ZEN Principles" },
];
