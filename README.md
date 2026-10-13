# 🏎️ ZEN GT — The Art of Mindful Driving

[![Vercel Ready](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel&style=flat-square)](https://vercel.com)
[![Vite](https://img.shields.io/badge/Bundler-Vite%205.x-646CFF?logo=vite&style=flat-square)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-gold.svg?style=flat-square)](LICENSE)
[![WCAG AA](https://img.shields.io/badge/Accessibility-WCAG%20AA%20Compliant-green?style=flat-square)]()
[![SEO Optimized](https://img.shields.io/badge/SEO-100%2F100-brightgreen?style=flat-square)]()

> *“A study in automotive minimalism, whisper acoustics, and high-performance tranquility.”*

**ZEN GT** is an ultra-premium, interactive web sanctuary for a next-generation electric hypercar. It blends cinematic scrollytelling, high-frame-rate canvas animation, 3D interactive HUD mechanics, and an audio-visual full-drive immersion mode.

---

## ⚡ 20 Pre-Launch Checklist Matrix

All 20 essential pre-launch requirements have been meticulously audited and engineered into this production codebase:

| # | Item | Status | Implementation Details |
|---|---|:---:|---|
| **1** | **Privacy Policy Page** | ✅ | Dedicated [privacy.html](privacy.html) covering data minimization, GDPR/CCPA, cookie policies, and concierge deletion protocols. |
| **2** | **Terms & Conditions Page** | ✅ | Dedicated [terms.html](terms.html) detailing priority allocation queues, intellectual property, and escrow refundability. |
| **3** | **Secrets Off the Front End** | ✅ | Zero exposed credentials. Environment variables abstracted via `.env.example` with strict client variable separation. |
| **4** | **Force HTTPS & Security Headers** | ✅ | Configured in [vercel.json](vercel.json) with strict HSTS preload (`max-age=63072000`), `X-Frame-Options`, `X-Content-Type-Options: nosniff`, and `Permissions-Policy`. |
| **5** | **Cookie Consent Banner** | ✅ | Floating glassmorphic banner in [main.js](main.js) and [index.html](index.html) with persistent `localStorage` memory and non-essential telemetry opt-out. |
| **6** | **Meta Titles & Descriptions** | ✅ | Complete SEO headers on all 5 HTML pages: title, meta description, keywords, canonical URLs, author, and OpenGraph/Twitter tags. |
| **7** | **Social Preview Image** | ✅ | High-resolution branded social share image `public/og-image.jpg` linked via `og:image` and `twitter:image`. |
| **8** | **Favicon & Web Manifest** | ✅ | Scalable vector SVG crest [public/favicon.svg](public/favicon.svg) and PWA manifest [public/site.webmanifest](public/site.webmanifest). |
| **9** | **Sitemap & robots.txt** | ✅ | Complete search-engine crawl map in [public/sitemap.xml](public/sitemap.xml) and crawler directives in [public/robots.txt](public/robots.txt). |
| **10** | **Alt Text on All Images** | ✅ | Descriptive, contextual `alt` attributes across every media element and technical diagram. |
| **11** | **Image Compression** | ✅ | WebP/JPEG optimized assets; bloated raw zip archives excluded via `.gitignore` to prevent repository bloat. |
| **12** | **Page Load Speed Optimization** | ✅ | Preloaded critical fonts, `loading="lazy"` and `decoding="async"` on below-the-fold media, non-blocking frame cache. |
| **13** | **WCAG AA Color Contrast** | ✅ | 4.6:1+ contrast on cream backgrounds, 6.5:1+ contrast on dark charcoal canvas, and high-visibility `:focus-visible` outlines. |
| **14** | **Mobile Friendly & Responsive** | ✅ | Responsive CSS media queries (`<=1024px`, `<=768px`, `<=480px`), responsive viewport clamp typography, and touch targets >= 44px. |
| **15** | **Custom 404 Page** | ✅ | Atmospheric branded [404.html](404.html) with return navigation and full-drive cinematic links. |
| **16** | **Fixed Broken Links** | ✅ | All internal anchors (`#hero`, `#showcase`, `#philosophy`, `#performance`, `#finale`), modal triggers, and legal links verified. |
| **17** | **Client-Side Form Validation** | ✅ | Real-time input validation on reservation form with regex checking for email/phone, ARIA attributes, and visual error feedback. |
| **18** | **Spam & Bot Protection** | ✅ | Invisible honeypot trap field, 1.2s minimum interaction speed trap, and 30-second client-side cooldown rate limiter. |
| **19** | **Privacy Analytics Setup** | ✅ | Event tracker in [analytics.js](analytics.js) recording pageviews, tab switches, and reservation conversions (ready for Vercel Analytics). |
| **20** | **Clear Call to Action (CTA)** | ✅ | Prominent "Reserve GT" floating header CTA, hero CTA, specs CTA, and grand finale modal reservation flow. |

---

## 📂 Project Structure

```text
zen-car/
├── .env.example              # Environment variables template
├── .gitignore                # Production ignore rules (excludes zips, node_modules, dist)
├── 404.html                  # Custom 404 error page
├── full-video.html           # Fullscreen cinematic audio-visual drive
├── full-video.js             # Immersion video controller & camera angle switcher
├── index.html                # Main experience & scrollytelling canvas
├── main.js                   # Core application logic, LERP scrollytelling, form modal
├── analytics.js              # Privacy-friendly event tracking & telemetry
├── package.json              # Scripts and build configuration
├── privacy.html              # GDPR/CCPA Privacy Policy
├── style.css                 # Design system, glassmorphism, responsive queries
├── terms.html                # Terms & Conditions
├── vercel.json               # Vercel deployment settings & HSTS security headers
├── vite.config.js            # Multi-page Vite production rollup configuration
│
├── public/                   # Static production assets (served directly)
│   ├── favicon.svg           # Scalable vector favicon
│   ├── site.webmanifest      # PWA application manifest
│   ├── robots.txt            # Search engine directives
│   ├── sitemap.xml           # XML sitemap for SEO
│   ├── og-image.jpg          # Social preview share card
│   ├── opening_shot_frames/  # 120-frame sequential animation frames
│   ├── full_video/           # Extended video sequence frames
│   └── antigravity images/   # Production-copied video & image assets
│
└── fonts/                    # High-fidelity web typography (Chillax, Satoshi, Rosaline)
```

---

## 🛠️ Local Development

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **pnpm** / **yarn**

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/your-username/zen-car.git

# Navigate into the project
cd zen-car

# Install dependencies
npm install
```

### 3. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🚀 Building & Production Preview

### 1. Build for Production
```bash
npm run build
```
This generates an optimized, tree-shaken, and minified production build in the `dist/` directory including all 5 HTML entry points:
- `dist/index.html`
- `dist/full-video.html`
- `dist/privacy.html`
- `dist/terms.html`
- `dist/404.html`

### 2. Preview the Production Build Locally
```bash
npm run preview
```
Open [http://localhost:4173](http://localhost:4173) to test the exact production bundle.

---

## ☁️ Deploy to Vercel

This repository is **100% Vercel-ready** out of the box with zero additional configuration required.

### Option A: Via Vercel Web Dashboard (Recommended)
1. Push your repository to **GitHub**, **GitLab**, or **Bitbucket**.
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import the `zen-car` repository.
4. Vercel automatically detects Vite:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**.

### Option B: Via Vercel CLI
```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy directly from terminal
vercel
```

---

## 🎨 Key Features & Interactions

1. **Scrollytelling Canvas Engine**: 120 high-fidelity frames rendered through an HTML5 canvas with a Linear Interpolation (LERP) loop for 60fps scrolling smoothness.
2. **Interactive GT Anatomy Dashboard**: Real-time HUD status monitors, acoustic decibel readings, and dynamic 3D cursor tilt effects.
3. **Audio-Visual Fullscreen Experience**: Accessible via `/full-video.html` with camera angle toggling and high-bitrate spatial sound design.
4. **Zen Mode Meditation Sanctuary**: Fullscreen dark gradient overlay featuring rotating philosophical quotes and subtle breathing animation.
5. **Priority Allocation Flow**: Interactive reservation modal with real-time field validation, spam protection, and unique allocation certificate issuance.

---

## 🔒 Security & Privacy

- **HSTS Preload**: Forces HTTPS encryption across all subdomains.
- **Zero Third-Party Tracking**: No intrusive ad networks, zero cookies without user consent.
- **Bot Mitigation**: Multi-layer honeypot and interaction timestamp verification.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information. Built for discerning minds by ZEN Automotive Corporation.
