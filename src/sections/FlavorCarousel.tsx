'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FlavorCard from '@/components/FlavorCard'
import { FLAVORS } from '@/constants'

gsap.registerPlugin(ScrollTrigger)

export default function FlavorCarousel() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  // SSR-safe: start false (mobile layout), flip after hydration
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    setIsDesktop(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Card entrance snap — runs once, after pin is established (refreshPriority: -1 on pin)
  useEffect(() => {
    if (!trackRef.current) return
    const cards = trackRef.current.querySelectorAll<HTMLElement>('.flavor-card')
    const tween = gsap.from(cards, {
      scale: 0.7,
      y: 60,
      opacity: 0,
      ease: 'back.out(1.7)',
      duration: 0.35,
      stagger: 0.08,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
      },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  // Desktop horizontal scroll pin — only after hydration confirms desktop
  useEffect(() => {
    if (!isDesktop || !sectionRef.current || !trackRef.current) return

    const track = trackRef.current
    gsap.set(track, { willChange: 'transform' })

    const pinTween = gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${track.scrollWidth - window.innerWidth}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        refreshPriority: -1,
        invalidateOnRefresh: true,
      },
    })

    return () => {
      gsap.set(track, { willChange: 'auto' })
      pinTween.scrollTrigger?.kill()
      pinTween.kill()
    }
  }, [isDesktop])

  return (
    <section
      ref={sectionRef}
      id="flavors"
      className="relative bg-bg"
    >
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none">
        <p className="font-bebas text-5xl md:text-6xl text-dark tracking-wide">Våra Smaker</p>
        {!isDesktop ? (
          <div className="flex items-center justify-center gap-2 mt-2 text-mid text-sm">
            <span style={{ animation: 'slideLeft 1.4s ease-in-out infinite alternate' }}>←</span>
            <span>Dra för att utforska</span>
            <span style={{ animation: 'slideLeft 1.4s ease-in-out infinite alternate-reverse' }}>→</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 mt-2 opacity-50">
            <span className="text-mid text-xs tracking-widest uppercase" style={{ letterSpacing: '0.2em' }}>Scrolla för att bläddra</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-mid" style={{ animation: 'bounceDown 1.2s ease-in-out infinite' }}>
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        )}
      </div>

      <div
        ref={trackRef}
        className={
          isDesktop
            ? 'flex items-center gap-16 px-32 h-screen pt-28'
            : 'flex items-center gap-8 px-8 py-32 overflow-x-scroll overflow-y-hidden'
        }
        style={isDesktop ? undefined : { scrollbarWidth: 'none' }}
      >
        {FLAVORS.map((flavor) => (
          <div key={flavor.id} className="flavor-card flex-shrink-0">
            <FlavorCard flavor={flavor} />
          </div>
        ))}
      </div>
    </section>
  )
}
