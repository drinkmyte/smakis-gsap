'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PILLARS = [
  {
    number: '01',
    title: 'Sedan 1970',
    body: 'Vi grundades av en svensk familj med en enkel vision — att göra drycker som är bra för alla, utan att kompromissa med smak eller naturlighet.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Bara det bästa',
    body: 'Inga tillsatser, inga konstgjorda smaker. Bara frukt, vatten och kärlek. Varje flaska är ett löfte om äkthet — från oss till dig och din familj.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'För framtiden',
    body: 'Vi skyddar aktivt bin och arbetar med hållbara förpackningar. Varje beslut vi tar siktar mot en grönare, bättre framtid — för Sverige och för planeten.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8c-2.5 0-4 2-4 4s1.5 4 4 4 4-2 4-4" />
        <path d="M12 8V5M16 12h3" />
      </svg>
    ),
  },
]

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const pillarsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const tweens = pillarsRef.current.map((el, i) => {
      if (!el) return null
      return gsap.from(el, {
        y: 50,
        opacity: 0,
        duration: 0.7,
        delay: i * 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      })
    })

    return () => tweens.forEach(t => { t?.scrollTrigger?.kill(); t?.kill() })
  }, [])

  return (
    <section ref={sectionRef} id="om-oss" className="bg-brand py-24 px-8 overflow-hidden worn-paper clip-skew-top">
      <div className="max-w-5xl mx-auto">
        {/* Heading row */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2 className="font-bebas text-5xl md:text-7xl leading-none tracking-wide hatch-section">
            Vår Historia
          </h2>
          <p className="text-dark/60 text-sm max-w-xs leading-relaxed">
            Mer än 50 år av äkta smak, familjevärden och kärlek till naturen.
          </p>
        </div>

        {/* 3 pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 border-t border-dark/20 pt-12">
          {PILLARS.map((pillar, i) => (
            <div
              key={pillar.number}
              ref={el => { pillarsRef.current[i] = el }}
              className="flex flex-col gap-5"
            >
              <div className="flex items-start justify-between">
                <div className="text-dark/80">{pillar.icon}</div>
                <span className="font-bebas text-6xl text-dark/10 leading-none select-none">
                  {pillar.number}
                </span>
              </div>
              <h3 className="font-bebas text-2xl md:text-3xl text-dark tracking-wide">
                {pillar.title}
              </h3>
              <p className="text-dark/70 text-sm leading-relaxed">{pillar.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
