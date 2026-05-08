'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SkateboardParallax() {
  const boardRef = useRef<HTMLDivElement>(null)
  const scratchRef = useRef<SVGLineElement>(null)

  useEffect(() => {
    if (!boardRef.current || !scratchRef.current) return

    const vw = window.innerWidth

    gsap.set(boardRef.current, { x: -160 })
    gsap.set(scratchRef.current, { attr: { x2: 0 } })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      },
    })

    tl.to(boardRef.current, { x: vw + 160, ease: 'none' }, 0)
    tl.to(scratchRef.current, { attr: { x2: vw + 160 }, ease: 'none' }, 0)

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  return (
    <div
      className="fixed pointer-events-none select-none"
      style={{ top: '52vh', left: 0, right: 0, zIndex: 40, overflow: 'visible' }}
      aria-hidden="true"
    >
      {/* Scratch trail line */}
      <svg
        style={{ position: 'absolute', top: '50%', left: 0, width: '100vw', height: '8px', overflow: 'visible', opacity: 0.18 }}
        viewBox={`0 0 ${typeof window !== 'undefined' ? window.innerWidth : 1440} 8`}
        preserveAspectRatio="none"
      >
        <line
          ref={scratchRef}
          x1="-160"
          y1="4"
          x2="0"
          y2="4"
          stroke="#313D41"
          strokeWidth="1.5"
          strokeDasharray="6 3"
        />
        {/* Second thinner scratch */}
        <line
          x1="-160"
          y1="7"
          x2="0"
          y2="7"
          stroke="#313D41"
          strokeWidth="0.6"
          strokeDasharray="3 8"
          opacity="0.5"
        />
      </svg>

      {/* Skateboard SVG */}
      <div ref={boardRef} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)' }}>
        <svg width="120" height="36" viewBox="0 0 120 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Deck */}
          <rect x="8" y="10" width="104" height="16" rx="5" fill="#313D41" />
          {/* Deck graphic — brand stripe */}
          <rect x="20" y="14" width="80" height="8" rx="2" fill="#E27442" opacity="0.9" />
          <text x="60" y="21" textAnchor="middle" fontFamily="'Bebas Neue',sans-serif" fontSize="7" fill="#f8f7f4" letterSpacing="0.1em">SMAKIS</text>
          {/* Nose kick */}
          <path d="M8 15 Q2 18 4 24 L8 26 Z" fill="#313D41" />
          {/* Tail kick */}
          <path d="M112 15 Q118 18 116 24 L112 26 Z" fill="#313D41" />
          {/* Trucks */}
          <rect x="22" y="25" width="18" height="4" rx="1" fill="#476C77" />
          <rect x="80" y="25" width="18" height="4" rx="1" fill="#476C77" />
          {/* Wheels */}
          <circle cx="26" cy="31" r="5" fill="#f8f7f4" stroke="#313D41" strokeWidth="1.2" />
          <circle cx="36" cy="31" r="5" fill="#f8f7f4" stroke="#313D41" strokeWidth="1.2" />
          <circle cx="84" cy="31" r="5" fill="#f8f7f4" stroke="#313D41" strokeWidth="1.2" />
          <circle cx="94" cy="31" r="5" fill="#f8f7f4" stroke="#313D41" strokeWidth="1.2" />
          {/* Wheel cores */}
          <circle cx="26" cy="31" r="2" fill="#E27442" />
          <circle cx="36" cy="31" r="2" fill="#E27442" />
          <circle cx="84" cy="31" r="2" fill="#E27442" />
          <circle cx="94" cy="31" r="2" fill="#E27442" />
        </svg>
      </div>
    </div>
  )
}
