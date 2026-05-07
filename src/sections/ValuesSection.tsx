'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { VALUES } from '@/constants'

gsap.registerPlugin(ScrollTrigger)

export default function ValuesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const wordsRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !wordsRef.current || !copyRef.current) return

    const isMobile = window.innerWidth < 1024
    const words = wordsRef.current.querySelectorAll<HTMLElement>('.value-word')

    // Parallax — each word at different speed
    const parallaxTweens = Array.from(words).map((el, i) => {
      const speed = VALUES[i].speed * (isMobile ? 0.5 : 1)
      return gsap.to(el, {
        y: speed * 300,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    // Grind entrance — overshoot from left, snap into place
    const grindTween = gsap.from(Array.from(words), {
      x: -80,
      opacity: 0,
      ease: 'back.out(1.5)',
      duration: 0.6,
      stagger: 0.12,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
      },
    })

    // Copy fade-in
    const copyTween = gsap.from(copyRef.current, {
      y: 20,
      opacity: 0,
      ease: 'power2.out',
      duration: 0.7,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
        once: true,
      },
    })

    return () => {
      parallaxTweens.forEach(t => {
        t.scrollTrigger?.kill()
        t.kill()
      })
      grindTween.scrollTrigger?.kill()
      grindTween.kill()
      copyTween.scrollTrigger?.kill()
      copyTween.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="values"
      className="min-h-screen flex flex-col items-center justify-center bg-dark text-bg px-8 py-24 overflow-hidden"
    >
      <div ref={wordsRef} className="flex flex-col items-center gap-4 text-center">
        {VALUES.map((value) => (
          <p
            key={value.label}
            className="value-word font-bebas text-[10vw] md:text-[6vw] leading-none select-none"
          >
            {value.label}
          </p>
        ))}
      </div>

      <p
        ref={copyRef}
        className="mt-16 max-w-xl text-center text-lg text-bg/70 leading-relaxed"
      >
        Sedan 1970 har vi gjort drycker som är bra för dig och för planeten.
        Inga onödiga tillsatser, bara naturliga ingredienser.
      </p>
    </section>
  )
}
