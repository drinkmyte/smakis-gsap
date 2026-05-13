'use client'

import { useRef } from 'react'
import Image from 'next/image'
import type { Flavor } from '@/types'

interface FlavorCardProps {
  flavor: Flavor
}

/** Synthesise a short carbonated-spray / fizz burst using Web Audio API. */
function playSpraySound() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()

    const durationSec = 0.32
    const sampleRate  = ctx.sampleRate
    const frameCount  = Math.ceil(sampleRate * durationSec)

    // White-noise buffer
    const buffer = ctx.createBuffer(1, frameCount, sampleRate)
    const data   = buffer.getChannelData(0)
    for (let i = 0; i < frameCount; i++) {
      data[i] = Math.random() * 2 - 1
    }

    const src = ctx.createBufferSource()
    src.buffer = buffer

    // Bandpass filter → give the noise a fizzy "hiss" character
    const filter = ctx.createBiquadFilter()
    filter.type            = 'bandpass'
    filter.frequency.value = 800   // centre frequency (Hz)
    filter.Q.value         = 1.5

    // Gain envelope: sharp attack, exponential decay
    const gain = ctx.createGain()
    const now  = ctx.currentTime
    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(0.22, now + 0.015)          // fast attack
    gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec) // decay

    src.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    src.start(now)
    src.stop(now + durationSec)

    // Clean up AudioContext after the burst finishes
    src.onended = () => { ctx.close() }
  } catch {
    // Web Audio API not available — silent fail
  }
}

export default function FlavorCard({ flavor }: FlavorCardProps) {
  const soundPlaying = useRef(false)

  const triggerSound = (el: HTMLElement) => {
    el.style.transform = 'rotate(0deg) scale(1.06)'
    if (!soundPlaying.current) {
      soundPlaying.current = true
      playSpraySound()
      setTimeout(() => { soundPlaying.current = false }, 350)
    }
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => triggerSound(e.currentTarget)
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = `rotate(${flavor.tilt}deg) scale(1)`
  }
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => triggerSound(e.currentTarget)
  const handleTouchEnd   = (e: React.TouchEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = `rotate(${flavor.tilt}deg) scale(1)`
  }

  return (
    <div
      className="relative flex-shrink-0 w-72 md:w-80 flex flex-col items-center cursor-pointer"
      style={{
        transform: `rotate(${flavor.tilt}deg)`,
        transition: 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Product image */}
      <div className="relative w-56 h-80 md:w-64 md:h-96">
        <Image
          src={flavor.image}
          alt={flavor.name}
          fill
          className="object-contain drop-shadow-2xl"
          sizes="(max-width: 768px) 224px, 256px"
        />
      </div>

      {/* Name */}
      <p className="mt-4 font-bebas text-3xl tracking-wider text-dark">
        {flavor.name}
      </p>

      {/* Spinning badge */}
      <div
        className="absolute -top-4 -right-4 w-20 h-20 bg-brand rounded-full flex items-center justify-center"
        style={{ animation: 'spin 20s linear infinite' }}
      >
        <span className="font-bebas text-base text-bg text-center leading-tight tracking-wide">
          {flavor.badge ? flavor.badge : <>100%<br />Frukt</>}
        </span>
      </div>
    </div>
  )
}
