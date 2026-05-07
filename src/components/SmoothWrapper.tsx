'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger, ScrollSmoother } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

export default function SmoothWrapper({ children }: { children: React.ReactNode }) {
  const smootherRef = useRef<ScrollSmoother | null>(null)

  useEffect(() => {
    const isMobile = window.innerWidth < 1024
    smootherRef.current = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: isMobile ? 1.5 : 2.5,
      effects: true,
    })

    return () => {
      smootherRef.current?.kill()
    }
  }, [])

  return (
    <div id="smooth-wrapper" className="overflow-hidden w-full h-screen fixed top-0 left-0">
      <div id="smooth-content">
        {children}
      </div>
    </div>
  )
}
