# ORIGINS — Premium Online Footwear Brand

> Designed for movement. Crafted for everyday expression. A radical synthesis of anatomical sculpture, minimalist couture, and real-time WebGL 3D engineering.

![ORIGINS Cover](https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1400&q=85)

---

## 🌟 Overview

**ORIGINS** is a luxury 3D footwear e-commerce storefront combining the product storytelling of Apple, the dynamic identity of Nike, and real-time WebGL/Three.js presentation. Built with React 18, React Three Fiber, GSAP ScrollTrigger, and Tailwind CSS.

### ✨ Key Features

- **Cinematic 3D Hero Experience**:
  - Full-screen showroom featuring the interactive GLB sneaker model.
  - Smooth 3D rotation, floating animations, and interactive mouse parallax tilt.
  - Studio multi-point lighting, ground contact shadows, and environment reflections.
  - Interactive anatomical hotspots (Achilles Collar, AetherFoam™ Core, Apex Shell, Radial Outsole).
  - Live colorway switcher (*Pure Obsidian*, *Origins Mocha*, *Off-White Bone*, *Basalt Slate*).

- **Scroll-Controlled Storytelling (GSAP & ScrollTrigger)**:
  - Pinned viewport with smooth multi-phase scroll sequence:
    - **01 — THE DESIGN**: "Every detail has a purpose."
    - **02 — THE COMFORT**: "Made to move with you."
    - **03 — THE IDENTITY**: "Find your own direction."
  - 3D sneaker orientation and camera angles seamlessly synchronized with scroll progress.

- **Curated Silhouette Grid**:
  - Editorial layout with category filters (*All, Performance, Lifestyle, Limited Edition, Atelier Reserve*).
  - Quick-add to bag, wishlisting, and direct 3D inspector launch.

- **Split-Screen 3D Product Detail View**:
  - Dedicated 3D inspector with camera presets (*3/4 View, Lateral Profile, Top-Down, Outsole, Heel*).
  - Dynamic size selector (US 7–13) with fit guide.
  - Specifications accordion (Upper Material, Midsole Technology, Weight, Offset, Provenance).
  - Deep-link URL hash synchronization (`#product-{id}`).

- **Shopping Bag & Checkout Experience**:
  - Real-time cart calculation with free global shipping milestone progress.
  - Promo code discounts (e.g. `ORIGINS10` or `ORIGINS20`).
  - Multi-step address input and instant order tracking generation (`ORG-TRK-xxxxxxx`).

- **Admin Catalogue & Inventory Management**:
  - Full catalogue management: Add new sneaker silhouettes with custom `.glb` model paths.
  - Real-time stock counts and inventory updates.
  - Instant product activation / deactivation (hidden from storefront when deactivated).
  - Order fulfillment status management.

---

## 🛠️ Tech Stack

- **Framework**: React 18 & TypeScript
- **Build Tool**: Vite 5
- **3D Engine**: Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`)
- **Animation**: GSAP, ScrollTrigger, Framer Motion, Canvas Confetti
- **Styling**: Tailwind CSS & PostCSS
- **Icons**: Lucide React

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or v20+)
- npm (v9+)

### Installation

```bash
# Clone the repository
git clone https://github.com/SumedhST-05/origins.git
cd origins

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Production Build

```bash
# Typecheck and bundle for production
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Structure

```
origins/
├── public/
│   └── black_sneakers.glb     # 3D sneaker model
├── src/
│   ├── components/
│   │   ├── 3d/                # Three.js canvases, models, lighting & loaders
│   │   ├── admin/             # Admin product & inventory management modal
│   │   ├── home/              # Hero scroll experience, collection, brand story, specs
│   │   ├── layout/            # Navbar, footer, announcement bar
│   │   ├── product/           # Split-screen 3D product detail modal
│   │   └── shopping/          # Cart drawer, checkout, auth portal, search modal
│   ├── context/
│   │   └── StoreContext.tsx   # Centralized store state, auth, cart & products
│   ├── data/
│   │   └── products.ts        # Dynamic product catalogue & brand content
│   ├── types/
│   │   └── index.ts           # TypeScript interfaces & types
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## 👥 Credits & Brand Specification

- **Brand**: ORIGINS — Premium Online Footwear Brand
- **Contributors**: Hanshal S., Aditya T., Sumedh T.
- **License**: MIT
