'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMediaQuery } from 'react-responsive'
import FlavorCard from '@/components/FlavorCard'
import { FLAVORS } from '@/constants'

gsap.registerPlugin(ScrollTrigger)

export default function FlavorCarousel() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const isDesktop = useMediaQuery({ minWidth: 1024 })

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

  useEffect(() => {
    if (!isDesktop || !sectionRef.current || !trackRef.current) return

    const totalWidth = trackRef.current.scrollWidth
    const viewportWidth = window.innerWidth

    const pinTween = gsap.to(trackRef.current, {
      x: -(totalWidth - viewportWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${totalWidth - viewportWidth}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    })

    return () => {
      pinTween.scrollTrigger?.kill()
      pinTween.kill()
    }
  }, [isDesktop])

  return (
    <section
      ref={sectionRef}
      id="flavors"
      className="relative overflow-hidden bg-bg"
    >
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 text-center">
        <p className="font-bebas text-5xl md:text-6xl text-dark tracking-wide">Våra Smaker</p>
        <p className="text-mid text-sm mt-1">Dra för att utforska</p>
      </div>

      <div
        ref={trackRef}
        className={
          isDesktop
            ? 'flex items-center gap-16 px-32 h-screen pt-28 will-change-transform'
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
