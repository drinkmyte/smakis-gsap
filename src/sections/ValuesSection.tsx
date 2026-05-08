'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { VALUES } from '@/constants'

gsap.registerPlugin(ScrollTrigger)

const VALUE_DESCRIPTIONS = [
  'Certifierat ekologiskt sedan 1970',
  'Tre generationer av samma familj',
  'Aldrig sötad med raffinerat socker',
  'Bara frukt du känner igen',
]

export default function ValuesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const wordsRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !wordsRef.current || !copyRef.current) return

    const isMobile = window.matchMedia('(max-width: 1023px)').matches
    const items = wordsRef.current.querySelectorAll<HTMLElement>('.value-item')

    const parallaxTweens = Array.from(items).map((el, i) => {
      const speed = VALUES[i].speed * (isMobile ? 0.5 : 1)
      return gsap.to(el, {
        y: speed * 80, ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true,
        },
      })
    })

    const grindTween = gsap.from(Array.from(items), {
      x: (i) => (i % 2 === 0 ? -100 : 100), opacity: 0,
      ease: 'back.out(1.5)', duration: 0.7, stagger: 0.12,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
    })

    const copyTween = gsap.from(copyRef.current, {
      y: 20, opacity: 0, ease: 'power2.out', duration: 0.7,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', once: true },
    })

    return () => {
      parallaxTweens.forEach(t => { t.scrollTrigger?.kill(); t.kill() })
      grindTween.scrollTrigger?.kill(); grindTween.kill()
      copyTween.scrollTrigger?.kill(); copyTween.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} id="values"
      className="relative min-h-screen flex flex-col items-center justify-center bg-dark text-bg px-8 py-24 overflow-hidden">

      {/* Graffiti SVG background — EKOLOGISKT sprayed on wall */}
      <svg aria-hidden="true" preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        style={{ opacity: 0.06 }}>
        <defs>
          <filter id="spray-values">
            <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="6"
              xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        <text x="-2%" y="55%" fontSize="22vw" fill="#E27442" filter="url(#spray-values)"
          fontFamily="'Bebas Neue', sans-serif" letterSpacing="0.02em">
          ÄKTA
        </text>
      </svg>

      {/* Spray blob */}
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '10%', right: '-5%',
        width: '40vw', height: '40vw',
        background: 'radial-gradient(ellipse, #E27442 0%, transparent 65%)',
        opacity: 0.08, filter: 'blur(60px)', pointerEvents: 'none',
        borderRadius: '55% 45% 60% 40%',
      }} />

      <p className="font-marker text-brand text-xl mb-4 relative z-10">varför smakis</p>
      <h2 className="font-bebas text-5xl md:text-7xl leading-none tracking-wide mb-20 text-center relative z-10 hatch-section">
        Det vi tror på
      </h2>

      <div ref={wordsRef} className="flex flex-col gap-10 w-full max-w-3xl relative z-10">
        {VALUES.map((value, i) => (
          <div key={value.label}
            className={`value-item flex items-center gap-5 ${i % 2 === 0 ? 'self-start' : 'self-end text-right flex-row-reverse'}`}>
            <span className="font-bebas text-2xl text-brand/40 leading-none flex-shrink-0">0{i + 1}</span>
            <div className={`flex flex-col ${i % 2 === 0 ? 'items-start' : 'items-end'}`}>
              <p className="font-bebas text-[8vw] md:text-[4.5vw] leading-none select-none hatch-section" style={{ filter: 'drop-shadow(3px 3px 0px rgba(226,116,66,0.18))' }}>
                {value.label}
              </p>
              <p className="font-marker text-xs text-brand/60 mt-1">
                {VALUE_DESCRIPTIONS[i]}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p ref={copyRef}
        className="mt-20 max-w-xl text-center text-base text-bg/60 leading-relaxed relative z-10">
        Sedan 1970 har vi gjort drycker som är bra för dig och för planeten.
        Inga onödiga tillsatser — bara naturliga ingredienser, alltid.
      </p>
    </section>
  )
}
