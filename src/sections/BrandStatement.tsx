'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function BrandStatement() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!headlineRef.current || !subRef.current || !sectionRef.current) return

    const split = new SplitText(headlineRef.current, { type: 'chars' })

    // Shuffle chars for random-order "scratchy" skate reveal
    const shuffled = [...split.chars].sort(() => Math.random() - 0.5)

    const tweenA = gsap.from(shuffled, {
      yPercent: 150,
      opacity: 0,
      ease: 'back.out(1.7)',
      stagger: 0.03,
      duration: 0.5,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        scrub: false,
        once: true,
      },
    })

    const tweenB = gsap.from(subRef.current, {
      opacity: 0,
      y: 30,
      ease: 'back.out(1.4)',
      duration: 0.6,
      delay: 0.4,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
        scrub: false,
        once: true,
      },
    })

    return () => {
      split.revert()
      tweenA.scrollTrigger?.kill()
      tweenB.scrollTrigger?.kill()
      tweenA.kill()
      tweenB.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="brand"
      className="min-h-screen flex flex-col items-center justify-center text-center px-8 py-24"
    >
      <h2
        ref={headlineRef}
        className="font-bebas text-[12vw] md:text-[8vw] leading-none text-dark hatched select-none overflow-hidden"
      >
        Smakis är det snälla varumärket
      </h2>
      <p
        ref={subRef}
        className="mt-8 max-w-2xl text-mid text-lg md:text-xl leading-relaxed"
      >
        Vi producerar ekologiska drycker med naturliga ingredienser — utan tillsatt socker,
        utan onödiga tillsatser. Från vår familj till din i över 50 år.
      </p>
    </section>
  )
}
