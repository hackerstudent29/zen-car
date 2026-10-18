import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        zen: {
          bg: "#0d0d0c",
          primary: "#F6F3E9",
          secondary: "#EBE7DC",
          gold: "#A6865E",
          goldHover: "#8D6F4B",
          dark: "#1C1B19",
          smoke: "#E6E2D8",
          muted: "#6B665B",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Georgia", "serif"],
        subheading: ["var(--font-subheading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      transitionTimingFunction: {
        apple: "cubic-bezier(0.32, 0.72, 0, 1)",
        spring: "cubic-bezier(0.22, 1.3, 0.36, 1)",
        fade: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
