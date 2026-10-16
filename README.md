# Eazy Dashboard — Marketing Website

> **"Your Excel and register business, as a live dashboard."**
> Award-level marketing website for **Eazy Dashboard**, a Pakistani SaaS that moves traditional businesses off Excel sheets, paper registers (*khatas*), and handwritten copies and onto live, synchronized analytics dashboards accessible on mobile and desktop.

Judged by Awwwards criteria: Design 40%, Usability 30%, Creativity 20%, Content 10%.

---

## 📐 Concept: "The Sheet Becomes The Business"

Rather than adopting generic "AI SaaS" visuals (purple/blue gradient blobs, floating glowing orbs, chat-bubble interfaces, or stock isometric illustrations), Eazy Dashboard draws its authentic aesthetic from the customer's actual operational world:
- **Hairline cell grid** as the underlying layout grid with row numbers and column letters along edges.
- **Micro labels** in monospace typed as spreadsheet cell coordinates (`A1`, `B7`, `F12`).
- **Sheet tabs motif** (`Sheet1_Hero`, `Sheet2_Pains`...) tracking section progression.
- **Formula bar motif** (`fx = LIVEMETRICS(PKR)`) anchoring key statements.
- **Error cells** (`#REF!`, `#DIV/0!`, duplicates, blank customer cells, and total mismatches) represent the customer's daily problem; clean charts, KPI cards, and live numbers represent the solution.
- **Strict Color Scarcity Rule**:
  - **Red (`#E5484D`)**: Appears **ONLY** for errors and urgent alerts. Because color is scarce, warnings carry immense weight.
  - **Teal (`#1BA6A6`)**: Live, healthy, verified data streams.
  - **Navy (`#0B2A5B`)**: Structural foundations and headers.
  - **Gold (`#C9A24B`)**: Exclusively reserved for monetary highlights (PKR totals).

---

## ⚡ Tech Stack & Single-Clock Architecture

- **Core**: Vite + React 19 + TypeScript
- **Animation**: GSAP + ScrollTrigger + Motion
- **Smooth Scroll**: Lenis
- **Styling**: Tailwind CSS + custom easing tokens
- **SVG Filters**: `<feTurbulence>` + `<feDisplacementMap>` organic ink edge mask

### The ONE CLOCK Engine (`src/utils/clock.ts`)
To eliminate jitter, frame drops, and desynchronization between smooth scrolling and gesture animations:
- A single `gsap.ticker` drives **Lenis smooth scroll**, **GSAP ScrollTrigger**, the **canvas precision cursor**, and **inspection lens physics**.
- `gsap.ticker.lagSmoothing(0)` ensures lock-step synchronization between scrolling and motion without drifting on lag spikes.
- Zero components run independent `requestAnimationFrame` loops while scroll is active.

---

## 🎬 12 Viewport-Height Scenes

1. **NAV (Glass)**: Translucent navbar with `backdrop-filter`, bright subtle top edge, logo, 5 navigation links, and "Get a free demo". Desktop features a persistent bottom workbook tab bar that tracks the active section.
2. **HERO (Light)**: Headline: *"Your business deserves better than Sheet1."*
   - **Signature Interaction**: A full-width messy Pakistani sales sheet (`Sales_FINAL_v7_edit.xlsx`) with realistic PKR data. Visitors drag a 1:1 marquee selection box (via Pointer Events + `setPointerCapture`). Inside the selection, hidden errors illuminate in red (`#REF!`, duplicate invoice, blank customer, sum mismatch). On release, the selected area morphs via a 500ms `clip-path` transition (`cubic-bezier(0.23, 1, 0.32, 1)`) into a clean live dashboard panel built from the same numbers.
   - Touch devices get a 1-tap "Fix this sheet" trigger; reduced-motion mode provides a clean before/after toggle.
3. **PROBLEM (Dark)**: *"Your numbers are scattered. Your decisions are late."* 5 typographic pain rows with micro cell animations (10 conflicting versions, broken `#REF!` formula, blind mobile management, zero permissions, 36-hour reconciliation sinks). Illustrative numbers labelled `example`.
4. **THE TRANSFORMATION (Scroll-Scrubbed)**: Two documentary photos with identical camera framing and Pakistani setting: stressed owner surrounded by thick paper registers and messy Excel vs relaxed owner with clean desk, laptop, and phone showing live charts. Scroll drives an SVG organic ink displacement mask (`feTurbulence` + `feDisplacementMap`). Mobile gets an efficient `clip-path` wipe.
5. **HOW IT WORKS (Pinned Workflow Spine)**: Four progressive states of the exact same persistent object: `01 Upload` (sheet drops in) → `02 Map` (columns labeled Date, Party, Amount) → `03 Live` (charts draw from same rows) → `04 Alert` (daily 9 PM WhatsApp summary & credit recovery warning).
6. **FEATURES (Dark Bento Grid)**: Asymmetric bento grid with varied card sizes and live micro-visuals (no generic decorative icons). Cards respond on pointer-down immediately (`scale 0.97`, 160ms `ease-out`). Features: Live Cloud Dashboards, Staff Data-Entry Forms, Role-Based Access Control, Daily WhatsApp Reports, Smart Financial Alerts, Two-Way Excel Sync, Mobile-First, and Urdu + English localization.
7. **INDUSTRIES (Light)**: *"Built for businesses that run on numbers."* Drag-able tab strip with momentum and rubber-banding across 7 Pakistani SME verticals (Gyms, Doctors/Clinics, Logistics, Pharmacies, Wholesale Distributors, Schools, Retail Marts). Selecting an industry morphs the live dashboard and KPI metrics. Includes a universal Pakistani Financial Analytics strip (PKR Revenue, Expenses, Net Profit, Cash Runway, Receivables Aging).
8. **WHY NOT EXCEL OR ERP (Dark)**: Honest, unbiased matrix comparing Excel/registers, heavyweight enterprise ERPs (PKR 150k/mo), and Eazy Dashboard across setup time, cost, learning curve, mobile view, permissions, and Pakistani localization.
9. **PROOF**: Explicitly marked `TODO` case study verification slots. Strict anti-fabrication policy (no fake testimonials or stock corporate headshots).
10. **FAQ**: Fast (`<= 200ms`), interruptible accordion with custom cubic-bezier easing. Pricing answer: *"Contact us for a quote."*
11. **CONTACT (Dark)**: *"Send us your Excel file. We'll build your dashboard in 5 minutes."* Inline validated form on blur (Name, Business Name, WhatsApp number, Industry, Current Tool, Message). Integrated with Formspree/Web3Forms endpoint and a direct WhatsApp button with prefilled message.
12. **FOOTER**: Large Eazy Dashboard logo concealed beneath an interactive pointer "inspection lens" (circular SVG mask following pointer with lerp). On touch devices, logo is cleanly and permanently visible.

---

## 🏃 Getting Started

### Prerequisites
- Node.js >= 18
- npm >= 9

### Installation
```bash
# Clone and enter directory
cd EazyDashboard_Website

# Install dependencies
npm install
```

### Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your Formspree/Web3Forms endpoint and WhatsApp number:
```env
VITE_FORM_ENDPOINT=https://formspree.io/f/xbjvkqwo
VITE_WHATSAPP_NUMBER=+923001234567
VITE_CONTACT_EMAIL=hello@eazydashboard.com
```

### Development Server
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
├── docs/
│   └── research.md               # Step 0 research & benchmark study findings
├── public/
│   ├── logo.jpg                  # Original brand asset
│   ├── logo-transparent.png      # Transparent brand asset
│   ├── logo-white.png            # Monochromatic white asset for dark sections
│   ├── before.jpg                # Stressed business owner among registers
│   └── after.jpg                 # Relaxed business owner with live dashboard
├── src/
│   ├── config/
│   │   └── siteConfig.ts         # Single central config for brand, copy, colors & endpoints
│   ├── utils/
│   │   └── clock.ts              # ONE CLOCK engine (Lenis + GSAP ticker synchronization)
│   ├── components/
│   │   ├── CustomCursor.tsx      # Canvas cursor with Excel reticle & velocity trail
│   │   ├── Logo.tsx              # Brand logo component (color / white)
│   │   ├── Navbar.tsx            # Glass navbar & bottom workbook sheet tabs
│   │   ├── HeroScene.tsx         # Messy Excel 1:1 marquee drag & dashboard morph
│   │   ├── ProblemScene.tsx      # Dark 5 typographic pain rows with micro-visuals
│   │   ├── TransformationScene.tsx # Scroll-scrubbed SVG ink displacement mask
│   │   ├── HowItWorksScene.tsx   # Pinned 4-step persistent workflow spine
│   │   ├── FeaturesScene.tsx     # Dark bento grid with live micro-visuals
│   │   ├── IndustriesScene.tsx   # Drag tab strip & 7 Pakistani sector dashboard morphs
│   │   ├── ComparisonAndProofScene.tsx # ERP comparison matrix & TODO proof slots
│   │   ├── FaqScene.tsx          # Sub-200ms interruptible accordion
│   │   └── ContactAndFooterScene.tsx # Inline form & inspection lens footer logo
│   ├── App.tsx                   # Master page assembler
│   ├── main.tsx                  # Application entry
│   └── index.css                 # Brand tokens, hairline grids, motion tokens & a11y
├── .env.example                  # Environment configuration example
└── package.json
```

---

## 🧪 Accessibility & Performance Standards

- **`prefers-reduced-motion`**: Instant transitions, static comparison controls, zero forced scroll pinning or parallax.
- **`prefers-reduced-transparency`**: Solid surface backgrounds without backdrop filters.
- **`prefers-contrast: more`**: Reinforced high-contrast border definition.
- **Fine pointer targeting**: Custom canvas cursor and inspection lens activate strictly on `@media (pointer: fine)`.
- **Lighthouse Performance**: Zero rogue `requestAnimationFrame` loops, GPU-accelerated transforms (`transform`, `opacity`, `clip-path`), and self-contained vector assets.
