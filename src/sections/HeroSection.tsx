'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
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

    tl.from(sectionRef.current, { scale: 1.05, duration: 1.2, ease: 'power2.out' })
    tl.from(split.chars, {
      yPercent: -120, opacity: 0, ease: 'back.out(1.4)', stagger: 0.06, duration: 0.6,
    }, '-=0.8')
    tl.from(arrowRef.current, { opacity: 0, y: -20, duration: 0.4, ease: 'bounce.out' }, '-=0.2')

    return () => { split.revert(); tl.kill() }
  }, [])

  return (
    <section id="hero" ref={sectionRef} className="relative w-full h-screen overflow-hidden">

      {/* Background video */}
      <video autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover">
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-dark/50" />

      {/* Spray paint blobs — edge atmosphere */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-15%', left: '-10%',
        width: '55vw', height: '55vw',
        background: 'radial-gradient(ellipse, #E27442 0%, transparent 65%)',
        opacity: 0.18, filter: 'blur(60px)', pointerEvents: 'none',
        borderRadius: '60% 40% 55% 45% / 50% 55% 45% 50%',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '-20%', right: '-10%',
        width: '60vw', height: '40vw',
        background: 'radial-gradient(ellipse, #476C77 0%, transparent 65%)',
        opacity: 0.22, filter: 'blur(70px)', pointerEvents: 'none',
        borderRadius: '40% 60% 45% 55% / 55% 40% 60% 45%',
      }} />

      {/* Graffiti tag — top right corner */}
      <div aria-hidden="true"
        className="absolute top-1/3 right-8 md:right-14 text-right pointer-events-none select-none"
        style={{ opacity: 0.35 }}
      >
        <p className="font-marker text-bg leading-tight"
          style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', transform: 'rotate(6deg)' }}>
          Smaka<br />Livet
        </p>
      </div>

      {/* Graffiti tag — bottom left */}
      <div aria-hidden="true"
        className="absolute bottom-24 left-8 md:left-14 pointer-events-none select-none"
        style={{ opacity: 0.25 }}
      >
        <p className="font-marker text-brand leading-tight"
          style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2.2rem)', transform: 'rotate(-4deg)' }}>
          #detsnälla
        </p>
      </div>

      {/* Main content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <Image src="/images/logo.png" alt="SMAKIS" width={160} height={54}
          className="mb-6 drop-shadow-2xl" priority />
        <h1 ref={titleRef}
          className="font-bebas text-[18vw] md:text-[14vw] leading-none text-bg hatched select-none">
          SMAKA LIVET
        </h1>
        <p className="font-bebas text-2xl md:text-4xl text-bg/80 tracking-[0.3em] mt-4">
          Det snälla varumärket
        </p>
      </div>

      {/* Scroll arrow */}
      <div ref={arrowRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-bg/70 animate-bounce"
        aria-hidden="true">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  )
}
