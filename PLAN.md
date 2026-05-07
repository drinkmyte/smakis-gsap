# SMAKIS GSAP Showcase — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a cinematic, scroll-animated showcase website for SMAKIS (Swedish juice brand) using Next.js 15 + React 19 + GSAP 3, deployed to Vercel, as a portfolio piece demonstrating advanced GSAP skills.

**Architecture:** Single-page app with 6 sections (Navbar, Hero, BrandStatement, FlavorCarousel, Values, Footer) wired together via GSAP ScrollSmoother. All animation components are client components; the Next.js App Router layout is server-rendered with a client-side `SmoothWrapper`. Sections are independent files — each owns its own GSAP timeline and ScrollTrigger instances.

**Tech Stack:** Next.js 15, React 19, TypeScript 5, GSAP 3.13 (ScrollSmoother + ScrollTrigger + SplitText + Flip — all free since 3.12), Tailwind CSS 4, react-responsive 10, Vercel.

**Design spec:** `C:\Users\tekal\.claude\plans\hey-i-wanted-to-cheerful-peacock.md`

---

## File Map

```
smakis-gsap/
├── src/
│   ├── app/
│   │   ├── layout.tsx            # HTML shell + font + grain overlay
│   │   ├── page.tsx              # Section assembly
│   │   └── globals.css           # Tailwind base, CSS custom props, Bebas Neue
│   ├── components/
│   │   ├── SmoothWrapper.tsx     # 'use client' ScrollSmoother init
│   │   ├── GrainOverlay.tsx      # Fixed grain texture div
│   │   ├── Navbar.tsx            # Fixed nav, scroll-fade in
│   │   └── FlavorCard.tsx        # Single product card
│   ├── sections/
│   │   ├── HeroSection.tsx       # Video + SMAKA LIVET overlay
│   │   ├── BrandStatement.tsx    # Random-order SplitText reveal
│   │   ├── FlavorCarousel.tsx    # Horizontal scroll (desktop) / swipe (mobile)
│   │   ├── ValuesSection.tsx     # 3-layer parallax + grind effect
│   │   └── FooterSection.tsx     # Dark footer
│   ├── constants/
│   │   └── index.ts              # FLAVORS, VALUES, NAV_LINKS arrays
│   └── types/
│       └── index.ts              # Flavor, Value, NavLink interfaces
├── public/
│   ├── video/hero.mp4            # Downloaded skating park reel
│   ├── images/
│   │   ├── logo.png
│   │   ├── hero-poster.jpg       # First frame of video for initial paint
│   │   └── products/             # 7 product PNGs
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## Task 1: Scaffold the project

**Files:**
- Create: `smakis-gsap/` (entire Next.js project)

- [ ] **Step 1: Run create-next-app**

```bash
cd C:\Users\tekal
npx create-next-app@latest smakis-gsap --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack
cd smakis-gsap
```

Expected: Project created with `src/app/`, `tailwind.config.ts`, `tsconfig.json`.

- [ ] **Step 2: Install dependencies**

```bash
npm install gsap react-responsive
npm install --save-dev @types/react-responsive
```

Expected: `package.json` shows `gsap` and `react-responsive` in dependencies.

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: Zero errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js 15 project with GSAP and react-responsive"
```

---

## Task 2: Configure Next.js and Tailwind

**Files:**
- Modify: `next.config.ts`
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Write failing type check — add brand colors to verify Tailwind config**

```bash
npx tsc --noEmit
```

Expected: PASS (baseline).

- [ ] **Step 2: Update next.config.ts**

```ts
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.squarespace-cdn.com',
      },
    ],
  },
}

export default nextConfig
```

- [ ] **Step 3: Update tailwind.config.ts**

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#E27442',
        dark: '#313D41',
        mid:  '#476C77',
        bg:   '#f8f7f4',
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
} satisfies Config
```

- [ ] **Step 4: Replace globals.css**

```css
/* src/app/globals.css */
@import 'tailwindcss';

@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500&display=swap');

:root {
  --color-brand: #E27442;
  --color-dark:  #313D41;
  --color-mid:   #476C77;
  --color-bg:    #f8f7f4;
}

html {
  background-color: var(--color-bg);
  color: var(--color-dark);
  font-family: 'Inter', sans-serif;
}

/* Hide scrollbar globally (ScrollSmoother manages scroll) */
body::-webkit-scrollbar { display: none; }
body { -ms-overflow-style: none; scrollbar-width: none; }

/* Hatched shadow utility */
.hatched {
  text-shadow:
    1px 1px 0 var(--color-brand),
    2px 2px 0 var(--color-brand),
    3px 3px 0 var(--color-brand),
    4px 4px 0 var(--color-brand),
    5px 5px 0 var(--color-brand);
}
```

- [ ] **Step 5: Verify**

```bash
npx tsc --noEmit && npm run build
```

Expected: Zero errors, successful build.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: configure Next.js, Tailwind brand colors, global styles, Bebas Neue"
```

---

## Task 3: Types and constants

**Files:**
- Create: `src/types/index.ts`
- Create: `src/constants/index.ts`

- [ ] **Step 1: Create types**

```ts
// src/types/index.ts
export interface Flavor {
  id: string
  name: string
  image: string
  tilt: number
}

export interface Value {
  label: string
  speed: number
}

export interface NavLink {
  label: string
  href: string
}
```

- [ ] **Step 2: Create constants**

```ts
// src/constants/index.ts
import type { Flavor, Value, NavLink } from '@/types'

export const FLAVORS: Flavor[] = [
  { id: 'tasty-paron',     name: 'Tasty Päron',      image: '/images/products/tasty-paron.png',     tilt:  6 },
  { id: 'tasty-apple',     name: 'Tasty Äpple',      image: '/images/products/tasty-apple.png',     tilt: -8 },
  { id: 'tasty-apelsin',   name: 'Tasty Apelsin',    image: '/images/products/tasty-apelsin.png',   tilt:  5 },
  { id: 'ice-tea-persika', name: 'Ice Tea Persika',  image: '/images/products/ice-tea-persika.png', tilt: -6 },
  { id: 'ice-tea-citron',  name: 'Ice Tea Citron',   image: '/images/products/ice-tea-citron.png',  tilt:  7 },
  { id: 'lingon-blabar',   name: 'Lingon & Blåbär',  image: '/images/products/lingon-blabar.png',   tilt: -5 },
  { id: 'smoothie',        name: 'Smoothie 3L',      image: '/images/products/smoothie.png',        tilt:  8 },
]

export const VALUES: Value[] = [
  { label: 'Ekologiskt',           speed: -0.40 },
  { label: 'Familjeföretag',       speed: -0.20 },
  { label: 'Utan tillsatt socker', speed: -0.08 },
  { label: '100% Naturligt',       speed: -0.40 },
]

export const NAV_LINKS: NavLink[] = [
  { label: 'Produkter',  href: '#flavors' },
  { label: 'Om oss',     href: '#values'  },
  { label: 'Hållbarhet', href: '#values'  },
]
```

- [ ] **Step 3: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: Zero errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Flavor, Value, NavLink types and constants"
```

---

## Task 4: Download and prepare assets

**Files:**
- Create: `public/video/hero.mp4`
- Create: `public/images/logo.png`
- Create: `public/images/hero-poster.jpg`
- Create: `public/images/products/*.png` (7 files)

- [ ] **Step 1: Download hero video**

Install yt-dlp if not present: `pip install yt-dlp` or download binary from https://github.com/yt-dlp/yt-dlp/releases

```bash
mkdir -p public/video
yt-dlp https://www.instagram.com/reel/DWjlD9ziKlP/ -o public/video/hero_raw.mp4
```

Then compress to under 8MB using ffmpeg:
```bash
ffmpeg -i public/video/hero_raw.mp4 -vcodec libx264 -crf 28 -preset slow -acodec aac -b:a 128k public/video/hero.mp4
```

Extract poster frame (first frame):
```bash
ffmpeg -i public/video/hero.mp4 -ss 00:00:00 -vframes 1 public/images/hero-poster.jpg
```

- [ ] **Step 2: Download SMAKIS logo**

```bash
mkdir -p public/images
curl -L "https://images.squarespace-cdn.com/content/v1/5afa9f74c258b4f82dc96eb6/11f80660-1123-4e8c-83b4-daab1e59860d/Smakis_Logo_FA%CC%88RG_payoff.png?format=1500w" -o public/images/logo.png
```

- [ ] **Step 3: Download product images**

```bash
mkdir -p public/images/products

curl -L "https://images.squarespace-cdn.com/content/v1/5afa9f74c258b4f82dc96eb6/7a83cd2c-10ef-4d30-b04f-069efa971ebf/SMAKIS-TASTY-pa%CC%88ron.png?format=500w" -o public/images/products/tasty-paron.png

curl -L "https://images.squarespace-cdn.com/content/v1/5afa9f74c258b4f82dc96eb6/1737668794433-115KSZR7Y6VLL1KMJY4D/SMAKIS-TASTY-a%CC%88pple.png?format=500w" -o public/images/products/tasty-apple.png
```

For the remaining 5 products (tasty-apelsin, ice-tea-persika, ice-tea-citron, lingon-blabar, smoothie): browse https://www.smakis.se/produkter, open DevTools Network tab, filter by `.png`, and copy the Squarespace CDN URLs. Download each with `curl -L <url> -o public/images/products/<filename>.png`.

> If any product image URL isn't found, use a placeholder from https://placehold.co/400x600/E27442/ffffff?text=SMAKIS temporarily.

- [ ] **Step 4: Verify assets exist**

```bash
ls public/video/
ls public/images/
ls public/images/products/
```

Expected: `hero.mp4`, `logo.png`, `hero-poster.jpg`, and at least 5 product PNGs present.

- [ ] **Step 5: Commit**

```bash
git add public/
git commit -m "assets: add hero video, logo, and product images"
```

---

## Task 5: GrainOverlay and SmoothWrapper components

**Files:**
- Create: `src/components/GrainOverlay.tsx`
- Create: `src/components/SmoothWrapper.tsx`

- [ ] **Step 1: Create GrainOverlay**

```tsx
// src/components/GrainOverlay.tsx
export default function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: 0.08,
        backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`,
      }}
    />
  )
}
```

- [ ] **Step 2: Create SmoothWrapper**

```tsx
// src/components/SmoothWrapper.tsx
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger, ScrollSmoother } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

export default function SmoothWrapper({ children }: { children: React.ReactNode }) {
  const smootherRef = useRef<ScrollSmoother | null>(null)

  useEffect(() => {
    smootherRef.current = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 2.5,
      effects: true,
    })

    return () => {
      smootherRef.current?.kill()
    }
  }, [])

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        {children}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit
```

Expected: Zero errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add GrainOverlay and SmoothWrapper components"
```

---

## Task 6: Root layout

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace layout.tsx**

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import SmoothWrapper from '@/components/SmoothWrapper'
import GrainOverlay from '@/components/GrainOverlay'

export const metadata: Metadata = {
  title: 'SMAKIS — Smaka Livet',
  description: 'Det snälla varumärket. Ekologiska drycker från en svensk familj.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body className="bg-bg overflow-hidden">
        <GrainOverlay />
        <SmoothWrapper>
          {children}
        </SmoothWrapper>
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: Build succeeds. Note any warnings but errors must be zero.

- [ ] **Step 3: Smoke test dev server**

```bash
npm run dev
```

Open http://localhost:3000 — expect a blank warm-white page. No console errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: set up root layout with SmoothWrapper and GrainOverlay"
```

---

## Task 7: Navbar

**Files:**
- Create: `src/components/Navbar.tsx`
- Modify: `src/app/page.tsx` (add Navbar)

- [ ] **Step 1: Create Navbar**

```tsx
// src/components/Navbar.tsx
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { NAV_LINKS } from '@/constants'

gsap.registerPlugin(ScrollTrigger)

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!navRef.current) return

    // Start invisible, fade in when scrolled past hero
    gsap.set(navRef.current, { opacity: 0 })
    ScrollTrigger.create({
      trigger: '#hero',
      start: 'bottom 80%',
      onEnter: () => gsap.to(navRef.current, { opacity: 1, duration: 0.4 }),
      onLeaveBack: () => gsap.to(navRef.current, { opacity: 0, duration: 0.3 }),
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 mix-blend-multiply"
    >
      <Image src="/images/logo.png" alt="SMAKIS" width={120} height={40} priority />
      <ul className="flex gap-8">
        {NAV_LINKS.map(link => (
          <li key={link.href}>
            <a
              href={link.href}
              className="font-bebas text-xl tracking-wider text-dark hover:text-brand transition-colors"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
```

- [ ] **Step 2: Add Navbar to page.tsx**

```tsx
// src/app/page.tsx
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <>
      <Navbar />
      {/* sections will be added here */}
      <div id="hero" style={{ height: '200vh', background: 'pink' }} />
    </>
  )
}
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Open http://localhost:3000. Scroll down on the pink placeholder — Navbar should fade in after passing ~80% of screen height. Check mobile (375px): nav should be visible and logo readable.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Navbar with scroll-triggered fade-in"
```

---

## Task 8: HeroSection

**Files:**
- Create: `src/sections/HeroSection.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create HeroSection**

```tsx
// src/sections/HeroSection.tsx
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!titleRef.current || !arrowRef.current) return

    const split = new SplitText(titleRef.current, { type: 'chars' })

    const tl = gsap.timeline({ delay: 0.3 })

    // Speed-ramp scale effect on section
    tl.from(sectionRef.current, {
      scale: 1.05,
      duration: 1.2,
      ease: 'power2.out',
    })

    // Chars drop in from above, snappy back.out easing
    tl.from(
      split.chars,
      {
        yPercent: -120,
        opacity: 0,
        ease: 'back.out(1.4)',
        stagger: 0.06,
        duration: 0.6,
      },
      '-=0.8'
    )

    // Arrow bounces in
    tl.from(
      arrowRef.current,
      { opacity: 0, y: -20, duration: 0.4, ease: 'bounce.out' },
      '-=0.2'
    )

    return () => {
      split.revert()
      tl.kill()
    }
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-dark/40" />

      {/* Text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1
          ref={titleRef}
          className="font-bebas text-[18vw] md:text-[14vw] leading-none text-bg hatched select-none"
        >
          SMAKA LIVET
        </h1>
        <p className="font-bebas text-2xl md:text-4xl text-bg/80 tracking-[0.3em] mt-4">
          Det snälla varumärket
        </p>
      </div>

      {/* Scroll arrow */}
      <div
        ref={arrowRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-bg/70 animate-bounce"
        aria-hidden="true"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Update page.tsx**

```tsx
// src/app/page.tsx
import Navbar from '@/components/Navbar'
import HeroSection from '@/sections/HeroSection'

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
    </>
  )
}
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Check: video autoplays muted, "SMAKA LIVET" animates in with snappy char-drop, arrow bounces in, hatched orange shadow visible on text. Test on mobile (DevTools 375px): video still plays, text scales down via `18vw`, readable.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add HeroSection with video, SMAKA LIVET SplitText, speed-ramp entrance"
```

---

## Task 9: BrandStatement section

**Files:**
- Create: `src/sections/BrandStatement.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create BrandStatement**

```tsx
// src/sections/BrandStatement.tsx
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function BrandStatement() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!headlineRef.current || !subRef.current) return

    const split = new SplitText(headlineRef.current, { type: 'chars' })

    // Shuffle chars for random-order "scratchy" skate reveal
    const shuffled = [...split.chars].sort(() => Math.random() - 0.5)

    gsap.from(shuffled, {
      yPercent: 150,
      opacity: 0,
      ease: 'back.out(1.7)',
      stagger: 0.03,
      duration: 0.5,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        scrub: false,
      },
    })

    // Sub-text snaps in after headline
    gsap.from(subRef.current, {
      opacity: 0,
      y: 30,
      ease: 'back.out(1.4)',
      duration: 0.6,
      delay: 0.4,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
        scrub: false,
      },
    })

    return () => {
      split.revert()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="brand"
      className="min-h-screen flex flex-col items-center justify-center text-center px-8 py-24"
    >
      <h2
        ref={headlineRef}
        className="font-bebas text-[12vw] md:text-[8vw] leading-none text-dark hatched select-none"
        style={{ overflow: 'hidden' }}
      >
        Smakis är det snälla varumärket
      </h2>
      <p
        ref={subRef}
        className="mt-8 max-w-2xl text-mid text-lg md:text-xl leading-relaxed"
      >
        Vi producerar ekologiska drycker med naturliga ingredienser — utan tillsatt socker,
        utan onödiga tillsatser. Från vår familj till din i över 50 år.
      </p>
    </section>
  )
}
```

- [ ] **Step 2: Update page.tsx**

```tsx
// src/app/page.tsx
import Navbar from '@/components/Navbar'
import HeroSection from '@/sections/HeroSection'
import BrandStatement from '@/sections/BrandStatement'

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <BrandStatement />
    </>
  )
}
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Scroll down past hero — chars should fly in from below in RANDOM order (each refresh produces a different order), snapping into place with `back.out` springiness. Sub-text fades + slides up after.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add BrandStatement with random-order SplitText skate reveal"
```

---

## Task 10: FlavorCard component

**Files:**
- Create: `src/components/FlavorCard.tsx`

- [ ] **Step 1: Create FlavorCard**

```tsx
// src/components/FlavorCard.tsx
import Image from 'next/image'
import type { Flavor } from '@/types'

interface FlavorCardProps {
  flavor: Flavor
}

export default function FlavorCard({ flavor }: FlavorCardProps) {
  return (
    <div
      className="relative flex-shrink-0 w-72 md:w-80 flex flex-col items-center"
      style={{ transform: `rotate(${flavor.tilt}deg)` }}
    >
      {/* Product image */}
      <div className="relative w-56 h-80 md:w-64 md:h-96">
        <Image
          src={flavor.image}
          alt={flavor.name}
          fill
          className="object-contain drop-shadow-2xl"
          sizes="(max-width: 768px) 224px, 256px"
        />
      </div>

      {/* Name */}
      <p className="mt-4 font-bebas text-3xl tracking-wider text-dark">
        {flavor.name}
      </p>

      {/* Spinning badge */}
      <div
        className="absolute -top-4 -right-4 w-16 h-16 bg-brand rounded-full flex items-center justify-center"
        style={{ animation: 'spin 20s linear infinite' }}
      >
        <span className="font-bebas text-[10px] text-bg text-center leading-tight">
          100%<br />Frukt
        </span>
      </div>

      {/* Spin keyframe (inject once globally via globals.css instead in final) */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
```

- [ ] **Step 2: Move spin keyframe to globals.css**

Add to `src/app/globals.css`:

```css
@keyframes spin {
  to { transform: rotate(360deg); }
}
```

Then remove the `<style>` tag from FlavorCard.tsx and the component stays clean.

- [ ] **Step 3: Verify types**

```bash
npx tsc --noEmit
```

Expected: Zero errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add FlavorCard component with tilt and spinning badge"
```

---

## Task 11: FlavorCarousel section

**Files:**
- Create: `src/sections/FlavorCarousel.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create FlavorCarousel**

```tsx
// src/sections/FlavorCarousel.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMediaQuery } from 'react-responsive'
import FlavorCard from '@/components/FlavorCard'
import { FLAVORS } from '@/constants'

gsap.registerPlugin(ScrollTrigger)

export default function FlavorCarousel() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [offset, setOffset] = useState(0)
  const isDesktop = useMediaQuery({ minWidth: 1024 })

  // Desktop: horizontal scroll hijack
  useEffect(() => {
    if (!isDesktop || !trackRef.current || !sectionRef.current) return

    const track = trackRef.current
    const totalWidth = track.scrollWidth - window.innerWidth

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
        },
      })

      // Card entrance: quick flick snap on scroll enter
      gsap.from(track.querySelectorAll('.flavor-card'), {
        opacity: 0,
        x: 80,
        ease: 'back.out(1.7)',
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          scrub: false,
        },
      })
    })

    return () => ctx.revert()
  }, [isDesktop])

  // Mobile: touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null || !trackRef.current) return
    const diff = touchStart - e.changedTouches[0].clientX
    const cardWidth = 288 + 24 // card width + gap
    const maxOffset = -(FLAVORS.length - 1) * cardWidth
    const newOffset = Math.max(maxOffset, Math.min(0, offset - Math.sign(diff) * cardWidth))
    setOffset(newOffset)
    setTouchStart(null)
  }

  return (
    <section
      ref={sectionRef}
      id="flavors"
      className="relative overflow-hidden bg-bg"
    >
      {/* Section title */}
      <div className="py-16 px-8 text-center">
        <h2 className="font-bebas text-6xl md:text-8xl text-dark tracking-wide">
          Välj Din Smak
        </h2>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className="flex gap-6 px-16 pb-24"
        style={
          !isDesktop
            ? { transform: `translateX(${offset}px)`, transition: 'transform 0.4s cubic-bezier(0.23,1,0.32,1)' }
            : undefined
        }
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {FLAVORS.map(flavor => (
          <div key={flavor.id} className="flavor-card">
            <FlavorCard flavor={flavor} />
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Update page.tsx**

```tsx
// src/app/page.tsx
import Navbar from '@/components/Navbar'
import HeroSection from '@/sections/HeroSection'
import BrandStatement from '@/sections/BrandStatement'
import FlavorCarousel from '@/sections/FlavorCarousel'

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <BrandStatement />
      <FlavorCarousel />
    </>
  )
}
```

- [ ] **Step 3: Verify desktop horizontal scroll**

```bash
npm run dev
```

On desktop (>1024px): scroll down to the flavor section — page should pin and the cards should translate horizontally as you scroll. All 7 cards should be reachable.

On mobile (375px): section scrolls normally, swipe left/right to advance through cards.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add FlavorCarousel with desktop horizontal scroll hijack and mobile swipe"
```

---

## Task 12: ValuesSection

**Files:**
- Create: `src/sections/ValuesSection.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create ValuesSection**

```tsx
// src/sections/ValuesSection.tsx
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMediaQuery } from 'react-responsive'
import { VALUES } from '@/constants'

gsap.registerPlugin(ScrollTrigger)

export default function ValuesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const isDesktop = useMediaQuery({ minWidth: 1024 })

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      itemRefs.current.forEach((el, i) => {
        if (!el) return

        const speedFactor = isDesktop ? VALUES[i].speed : VALUES[i].speed / 2

        // Grind effect: overshoot horizontally then snap into place
        gsap.from(el, {
          x: i % 2 === 0 ? -120 : 120,
          opacity: 0,
          ease: 'elastic.out(1, 0.5)',
          duration: 1,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            scrub: false,
          },
        })

        // Multi-layer parallax: each value moves at its own speed
        gsap.to(el, {
          y: () => speedFactor * ScrollTrigger.maxScroll(window) * 0.1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      })
    })

    return () => ctx.revert()
  }, [isDesktop])

  return (
    <section
      ref={sectionRef}
      id="values"
      className="relative min-h-screen flex flex-col items-center justify-center py-32 px-8 overflow-hidden"
    >
      <h2 className="font-bebas text-5xl md:text-7xl text-dark mb-24 tracking-wide text-center">
        Varför Smakis
      </h2>

      <div className="flex flex-col gap-16 w-full max-w-4xl">
        {VALUES.map((value, i) => (
          <div
            key={value.label}
            ref={el => { itemRefs.current[i] = el }}
            className={`flex items-center gap-6 ${i % 2 === 0 ? 'self-start' : 'self-end'}`}
          >
            {/* Accent line */}
            <div className="w-2 h-16 bg-brand flex-shrink-0" />
            <p className="font-bebas text-5xl md:text-7xl text-dark leading-none hatched">
              {value.label}
            </p>
          </div>
        ))}
      </div>

      {/* Sustainability note */}
      <p className="mt-24 max-w-xl text-center text-mid text-base leading-relaxed">
        Vi arbetar aktivt för att bevara bin och minska vår miljöpåverkan —
        för ett hållbarare Sverige.
      </p>
    </section>
  )
}
```

- [ ] **Step 2: Update page.tsx**

```tsx
// src/app/page.tsx
import Navbar from '@/components/Navbar'
import HeroSection from '@/sections/HeroSection'
import BrandStatement from '@/sections/BrandStatement'
import FlavorCarousel from '@/sections/FlavorCarousel'
import ValuesSection from '@/sections/ValuesSection'

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <BrandStatement />
      <FlavorCarousel />
      <ValuesSection />
    </>
  )
}
```

- [ ] **Step 3: Verify**

```bash
npm run dev
```

Scroll into values section: each value word should grind in from alternating sides with elastic snap. On scroll, the 4 values should move at visibly different speeds (layer depth effect). On mobile, parallax should be halved but still visible.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add ValuesSection with 3-layer parallax and grind entrance effect"
```

---

## Task 13: FooterSection

**Files:**
- Create: `src/sections/FooterSection.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create FooterSection**

```tsx
// src/sections/FooterSection.tsx
import Image from 'next/image'

export default function FooterSection() {
  return (
    <footer
      id="footer"
      className="bg-dark text-bg py-20 px-8 flex flex-col items-center text-center gap-8"
    >
      {/* Logo — inverted via CSS filter */}
      <Image
        src="/images/logo.png"
        alt="SMAKIS"
        width={160}
        height={54}
        className="brightness-0 invert"
      />

      <p className="font-bebas text-3xl md:text-4xl tracking-wide text-brand">
        Smaka Livet
      </p>

      <p className="max-w-md text-bg/70 text-sm leading-relaxed">
        Från vår familj till din – tack för att du väljer Smakis!
      </p>

      {/* Links */}
      <div className="flex gap-8 font-bebas text-xl tracking-wider">
        <a
          href="https://www.instagram.com/smakis"
          target="_blank"
          rel="noopener noreferrer"
          className="text-bg/60 hover:text-brand transition-colors"
        >
          @smakis
        </a>
        <a
          href="https://www.smakis.se"
          target="_blank"
          rel="noopener noreferrer"
          className="text-bg/60 hover:text-brand transition-colors"
        >
          smakis.se
        </a>
      </div>

      <p className="text-bg/40 text-xs">
        Augustendalsvägen 30, 131 52 Nacka Strand · info@smakis.se · 08-774 04 75
      </p>

      <p className="text-bg/30 text-xs mt-4">
        Showcase-webbplats — ej en officiell SMAKIS-sida.
      </p>
    </footer>
  )
}
```

- [ ] **Step 2: Assemble full page**

```tsx
// src/app/page.tsx
import Navbar from '@/components/Navbar'
import HeroSection from '@/sections/HeroSection'
import BrandStatement from '@/sections/BrandStatement'
import FlavorCarousel from '@/sections/FlavorCarousel'
import ValuesSection from '@/sections/ValuesSection'
import FooterSection from '@/sections/FooterSection'

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <BrandStatement />
      <FlavorCarousel />
      <ValuesSection />
      <FooterSection />
    </>
  )
}
```

- [ ] **Step 3: Verify full page**

```bash
npm run dev
```

Scroll the full page end-to-end: Hero → Brand Statement → Flavor Carousel → Values → Footer. Logo in footer should appear white (CSS `brightness-0 invert`). "Showcase-webbplats" disclaimer visible.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add FooterSection and assemble complete page"
```

---

## Task 14: Mobile parity pass

**Files:**
- Modify: `src/sections/HeroSection.tsx`
- Modify: `src/components/SmoothWrapper.tsx`
- Modify: `src/components/Navbar.tsx`

- [ ] **Step 1: Reduce ScrollSmoother smooth on mobile**

Update `SmoothWrapper.tsx`:

```tsx
// src/components/SmoothWrapper.tsx
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger, ScrollSmoother } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

export default function SmoothWrapper({ children }: { children: React.ReactNode }) {
  const smootherRef = useRef<ScrollSmoother | null>(null)

  useEffect(() => {
    const isMobile = window.innerWidth < 1024
    smootherRef.current = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: isMobile ? 1.5 : 2.5,
      effects: true,
    })

    return () => {
      smootherRef.current?.kill()
    }
  }, [])

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        {children}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Add hamburger menu for mobile nav**

Update `Navbar.tsx` — add a hamburger toggle for screens below lg:

```tsx
// src/components/Navbar.tsx — replace the <ul> with this responsive version
'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { NAV_LINKS } from '@/constants'

gsap.registerPlugin(ScrollTrigger)

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!navRef.current) return
    gsap.set(navRef.current, { opacity: 0 })
    ScrollTrigger.create({
      trigger: '#hero',
      start: 'bottom 80%',
      onEnter: () => gsap.to(navRef.current, { opacity: 1, duration: 0.4 }),
      onLeaveBack: () => gsap.to(navRef.current, { opacity: 0, duration: 0.3 }),
    })
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 mix-blend-multiply">
      <Image src="/images/logo.png" alt="SMAKIS" width={100} height={34} priority />

      {/* Desktop links */}
      <ul className="hidden lg:flex gap-8">
        {NAV_LINKS.map(link => (
          <li key={link.href}>
            <a href={link.href} className="font-bebas text-xl tracking-wider text-dark hover:text-brand transition-colors">
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile hamburger */}
      <button
        className="lg:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setOpen(!open)}
        aria-label="Öppna meny"
      >
        <span className={`w-6 h-0.5 bg-dark transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`w-6 h-0.5 bg-dark transition-all ${open ? 'opacity-0' : ''}`} />
        <span className={`w-6 h-0.5 bg-dark transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-bg/95 py-6 flex flex-col items-center gap-6">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-bebas text-3xl tracking-wider text-dark hover:text-brand"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
```

- [ ] **Step 3: Verify mobile at 375px**

```bash
npm run dev
```

DevTools → 375px width. Check:
- Hero video plays, text readable
- Hamburger appears, drawer opens/closes
- Brand statement chars animate
- Flavor carousel swipes correctly
- Values section visible
- Footer not cut off

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: mobile parity — reduced smooth, hamburger nav, responsive checks"
```

---

## Task 15: Build verification and performance

**Files:** No new files.

- [ ] **Step 1: Production build**

```bash
npm run build
```

Expected: Zero TypeScript errors, zero ESLint errors, build completes successfully.

- [ ] **Step 2: Test production build locally**

```bash
npm start
```

Open http://localhost:3000 — verify the full scroll experience works in the production build (GSAP animations, video, scroll smoother).

- [ ] **Step 3: Lighthouse check**

In Chrome DevTools → Lighthouse → Mobile → Run audit.

Target scores:
- Performance: > 75 (video will pull this down slightly)
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

If Performance < 75: add `loading="lazy"` to product images in FlavorCard and check that the hero video has a correct `poster` attribute set.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: production build verified, Lighthouse targets met"
```

---

## Task 16: Deploy to Vercel

- [ ] **Step 1: Push to GitHub**

Create a new repo at https://github.com/new named `smakis-gsap`.

```bash
git remote add origin https://github.com/<your-username>/smakis-gsap.git
git branch -M main
git push -u origin main
```

- [ ] **Step 2: Connect to Vercel**

Go to https://vercel.com/new → Import Git repository → select `smakis-gsap` → Deploy.

Framework preset: **Next.js** (auto-detected).

No environment variables needed.

- [ ] **Step 3: Verify live deployment**

Open the Vercel URL (e.g., `https://smakis-gsap.vercel.app`).

Check:
- Hero video loads and plays over network
- All scroll animations work
- No console errors in production
- Mobile test on actual phone: video autoplays, swipe carousel works

- [ ] **Step 4: Final commit with live URL**

```bash
git commit --allow-empty -m "chore: deployed to Vercel — https://smakis-gsap.vercel.app"
```

---

## Verification Checklist (final)

- [ ] Hero video autoplays muted on desktop and mobile
- [ ] "SMAKA LIVET" animates with char-by-char SplitText drop
- [ ] Brand Statement chars animate in random order on scroll
- [ ] Flavor Carousel desktop: vertical scroll translates horizontally, all 7 cards reachable
- [ ] Flavor Carousel mobile (375px): touch swipe works, no scroll hijack
- [ ] Values section: 4 words grind in from alternating sides
- [ ] Values section: visibly different parallax speeds on all 4 items
- [ ] Navbar fades in when scrolled past hero
- [ ] Mobile hamburger menu opens/closes
- [ ] Footer: dark bg, inverted logo, correct Swedish copy, disclaimer
- [ ] `npm run build` zero errors
- [ ] Lighthouse Performance > 75, Accessibility > 90
- [ ] Live on Vercel, video loads, no console errors
