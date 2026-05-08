'use client'

import Image from 'next/image'
import type { Flavor } from '@/types'

interface FlavorCardProps {
  flavor: Flavor
}

export default function FlavorCard({ flavor }: FlavorCardProps) {
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'rotate(0deg) scale(1.06)'
  }
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
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
        <span className="font-bebas text-sm text-bg text-center leading-tight tracking-wide">
          100%<br />Frukt
        </span>
      </div>
    </div>
  )
}
