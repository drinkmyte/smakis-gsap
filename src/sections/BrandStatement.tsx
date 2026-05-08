'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function BrandStatement() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLQuoteElement>(null)

  useEffect(() => {
    if (!headlineRef.current || !sectionRef.current) return

    const split = new SplitText(headlineRef.current, { type: 'chars' })
    const shuffled = [...split.chars].sort(() => Math.random() - 0.5)

    const tweenA = gsap.from(shuffled, {
      yPercent: 150, opacity: 0, ease: 'back.out(1.7)', stagger: 0.03, duration: 0.5,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
    })

    const tweenB = gsap.from(
      [eyebrowRef.current, bodyRef.current, quoteRef.current].filter(Boolean),
      {
        opacity: 0, y: 30, ease: 'power3.out', duration: 0.7, stagger: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', once: true },
      }
    )

    return () => {
      split.revert()
      tweenA.scrollTrigger?.kill(); tweenB.scrollTrigger?.kill()
      tweenA.kill(); tweenB.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} id="brand"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-8 py-24 overflow-hidden worn-paper">

      {/* Graffiti SVG background — spray-painted "SMAKIS" */}
      <svg aria-hidden="true" preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        style={{ opacity: 0.055 }}>
        <defs>
          <filter id="spray-brand">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5"
              xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        <text x="50%" y="58%" textAnchor="middle" fontSize="28vw"
          fill="#E27442" filter="url(#spray-brand)"
          fontFamily="'Bebas Neue', sans-serif" letterSpacing="0.02em">
          SMAKIS
        </text>
      </svg>

      {/* Spray blob top-right */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-5%', right: '-8%',
        width: '35vw', height: '35vw',
        background: 'radial-gradient(ellipse, #E27442 0%, transparent 70%)',
        opacity: 0.07, filter: 'blur(50px)', pointerEvents: 'none',
        borderRadius: '55% 45% 60% 40%',
      }} />

      {/* Content */}
      <p ref={eyebrowRef} className="font-marker text-brand text-xl mb-5 relative z-10">
        om oss
      </p>

      <h2 ref={headlineRef}
        className="font-bebas text-[12vw] md:text-[8vw] leading-none hatch-section select-none overflow-hidden relative z-10">
        Smakis är det snälla varumärket
      </h2>

      <div className="flex items-center gap-4 my-8 relative z-10">
        <div className="w-12 h-px bg-brand" />
        <div className="w-2 h-2 rounded-full bg-brand" />
        <div className="w-12 h-px bg-brand" />
      </div>

      <div ref={bodyRef} className="max-w-2xl space-y-4 relative z-10">
        <p className="text-mid text-lg md:text-xl leading-relaxed">
          Vi producerar ekologiska drycker med naturliga ingredienser — utan tillsatt socker,
          utan onödiga tillsatser. Från vår familj till din i över 50 år.
        </p>
        <p className="text-mid/70 text-base md:text-lg leading-relaxed">
          Varje flaska är ett löfte om äkthet, om omsorg och om smak som faktiskt
          kommer från naturen — inte ett laboratorium.
        </p>
      </div>

      <blockquote ref={quoteRef}
        className="mt-10 font-marker text-2xl md:text-3xl text-brand leading-snug relative z-10">
        "Smaka livet — på riktigt."
      </blockquote>
    </section>
  )
}
