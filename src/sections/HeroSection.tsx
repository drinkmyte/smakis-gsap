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

    // Speed-ramp scale effect on section entrance
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
