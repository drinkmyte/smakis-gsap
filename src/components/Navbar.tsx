'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { NAV_LINKS } from '@/constants'

gsap.registerPlugin(ScrollTrigger)

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!navRef.current) return
    gsap.set(navRef.current, { opacity: 0 })
    const st = ScrollTrigger.create({
      trigger: '#hero',
      start: 'bottom 80%',
      onEnter: () => gsap.to(navRef.current, { opacity: 1, duration: 0.4 }),
      onLeaveBack: () => gsap.to(navRef.current, { opacity: 0, duration: 0.3 }),
    })
    return () => st.kill()
  }, [])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 mix-blend-multiply"
    >
      <Image src="/images/logo.png" alt="SMAKIS" width={100} height={34} priority />

      {/* Desktop links */}
      <ul className="hidden lg:flex gap-8">
        {NAV_LINKS.map(link => (
          <li key={link.href}>
            <a
              href={link.href}
              className="font-bebas text-xl tracking-wider text-dark hover:text-brand transition-colors"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile hamburger */}
      <button
        className="lg:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setOpen(!open)}
        aria-label="Öppna meny"
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
      >
        <span className={`w-6 h-0.5 bg-dark transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`w-6 h-0.5 bg-dark transition-all ${open ? 'opacity-0' : ''}`} />
        <span className={`w-6 h-0.5 bg-dark transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Mobile drawer */}
      {open && (
        <div id="mobile-nav-drawer" className="lg:hidden absolute top-full left-0 right-0 bg-bg/95 py-6 flex flex-col items-center gap-6">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-bebas text-3xl tracking-wider text-dark hover:text-brand"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
