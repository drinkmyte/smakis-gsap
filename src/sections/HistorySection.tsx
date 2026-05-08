'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MILESTONES = [
  {
    year: '1970',
    tag: 'Grundandet',
    body: 'En familj med en vision — att göra riktiga drycker av riktiga råvaror. Smakis grundades i Nacka med kärlek och naturliga ingredienser.',
    image: '/images/products/tasty-paron.png',
    side: 'right' as const,
  },
  {
    year: '1985',
    tag: 'Hela Sverige',
    body: 'Sverige lär känna Smakis. Päron och äpple blir omedelbart folkkära favoriter i butiker från Malmö till Luleå.',
    image: '/images/products/tasty-apple.png',
    side: 'left' as const,
  },
  {
    year: '1997',
    tag: 'Ekologiskt certifierat',
    body: 'Smakis tar steget och blir ett av Sveriges första ekologiskt certifierade juicemärken — för en bättre planet och en renare smak.',
    image: '/images/products/tasty-apelsin.png',
    side: 'right' as const,
  },
  {
    year: '2015',
    tag: 'Ice Tea-linjen',
    body: 'En ny generation hittar Smakis. Ice Tea med persika och citron lanseras — utan tillsatt socker, med full naturlig smak.',
    image: '/images/products/ice-tea-persika.png',
    side: 'left' as const,
  },
  {
    year: 'Nu',
    tag: 'Tre generationer',
    body: 'Familjeföretaget lever vidare. Sju smaker, aktivt bieskydd och ett löfte: alltid naturligt, alltid äkta.',
    image: '/images/products/smoothie.png',
    side: 'right' as const,
  },
]

export default function HistorySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const milestoneRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    milestoneRefs.current.forEach((el) => {
      if (!el) return
      gsap.from(el, {
        opacity: 0, y: 70, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 82%', once: true },
      })
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <section ref={sectionRef} id="historia"
      className="relative bg-bg py-28 px-8 overflow-hidden clip-skew-top">

      {/* Graffiti SVG — spray "1970" on wall */}
      <svg aria-hidden="true" preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        style={{ opacity: 0.04 }}>
        <defs>
          <filter id="spray-hist">
            <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5"
              xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        <text x="-3%" y="60%" fontSize="38vw" fill="#E27442" filter="url(#spray-hist)"
          fontFamily="'Bebas Neue', sans-serif" letterSpacing="-0.02em">
          1970
        </text>
      </svg>

      {/* Section header */}
      <div className="relative z-10 max-w-5xl mx-auto mb-20">
        <p className="font-marker text-brand text-xl mb-3">historia</p>
        <h2 className="font-bebas text-6xl md:text-8xl text-dark leading-none">
          Sedan 1970
        </h2>
      </div>

      {/* Timeline */}
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Center spine — desktop only */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-dark/10 hidden md:block" />

        <div className="flex flex-col gap-24">
          {MILESTONES.map((m, i) => (
            <div key={m.year}
              ref={el => { milestoneRefs.current[i] = el }}
              className={`relative flex flex-col ${m.side === 'right' ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-12`}>

              {/* Text side */}
              <div className={`flex-1 ${m.side === 'right' ? 'md:text-right' : 'md:text-left'}`}>
                <p className="font-marker text-brand text-base mb-2">{m.tag}</p>
                {/* Ghost year */}
                <p className="font-bebas leading-none text-dark/8 select-none -mb-6"
                  style={{ fontSize: 'clamp(4rem, 12vw, 9rem)' }}>
                  {m.year}
                </p>
                <p className="font-bebas text-3xl md:text-4xl text-dark relative z-10">{m.year}</p>
                <p className={`text-mid text-sm md:text-base leading-relaxed mt-2 max-w-xs ${m.side === 'right' ? 'ml-auto' : 'mr-auto'}`}>
                  {m.body}
                </p>
              </div>

              {/* Center dot on spine */}
              <div className="hidden md:flex w-4 h-4 rounded-full bg-brand flex-shrink-0 relative z-10"
                style={{ boxShadow: '0 0 0 4px #f8f7f4, 0 0 0 5px #E27442' }} />

              {/* Product image — tilted */}
              <div className="flex-1 flex justify-center">
                <div className="relative w-36 h-52 md:w-48 md:h-64 transition-transform duration-500 hover:scale-105"
                  style={{ transform: `rotate(${i % 2 === 0 ? -5 : 5}deg)` }}>
                  <Image src={m.image} alt={m.tag} fill
                    className="object-contain drop-shadow-2xl"
                    sizes="(max-width: 768px) 144px, 192px" />
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
