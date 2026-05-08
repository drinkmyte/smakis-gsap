'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { start: 1900, end: 1970, suffix: '',  label: 'Grundat år' },
  { start: 0,   end: 50,   suffix: '+', label: 'År av tradition' },
  { start: 0,   end: 7,    suffix: '',  label: 'Smakkombinationer' },
  { start: 0,   end: 100,  suffix: '%', label: 'Naturliga ingredienser' },
]

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const numRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const tweens = STATS.map((stat, i) => {
      const el = numRefs.current[i]
      if (!el) return null
      const obj = { val: stat.start }
      return gsap.to(obj, {
        val: stat.end,
        duration: i === 0 ? 1.0 : 1.8,
        ease: 'power2.out',
        snap: { val: 1 },
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
        onUpdate() { el.textContent = Math.round(obj.val).toString() },
      })
    })

    return () => tweens.forEach(t => { t?.scrollTrigger?.kill(); t?.kill() })
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 px-8 overflow-hidden bg-bg">

      {/* Graffiti SVG background — spray year "1970" */}
      <svg aria-hidden="true" preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        style={{ opacity: 0.05 }}>
        <defs>
          <filter id="spray-stats">
            <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5"
              xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        <text x="50%" y="65%" textAnchor="middle" fontSize="35vw"
          fill="#313D41" filter="url(#spray-stats)"
          fontFamily="'Bebas Neue', sans-serif" letterSpacing="-0.02em">
          1970
        </text>
      </svg>

      {/* Paint blobs */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '0', left: '60%', width: '30vw', height: '30vw',
        background: 'radial-gradient(ellipse, #E27442 0%, transparent 70%)',
        opacity: 0.07, filter: 'blur(40px)', pointerEvents: 'none',
        borderRadius: '45% 55% 40% 60%',
      }} />

      {/* Stats grid */}
      <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
        {STATS.map((stat, i) => (
          <div key={stat.label} className="flex flex-col items-center">
            <p className="font-bebas leading-none text-dark"
              style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}>
              <span ref={el => { numRefs.current[i] = el }}>{stat.start.toString()}</span>
              {stat.suffix}
            </p>
            <div className="w-8 h-px bg-brand my-3" />
            <p className="font-bebas text-xs tracking-[0.2em] text-mid uppercase">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
