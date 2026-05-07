import Image from 'next/image'
import type { Flavor } from '@/types'

interface FlavorCardProps {
  flavor: Flavor
}

export default function FlavorCard({ flavor }: FlavorCardProps) {
  return (
    <div
      className="relative flex-shrink-0 w-72 md:w-80 flex flex-col items-center"
      style={{ transform: `rotate(${flavor.tilt}deg)` }}
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
        className="absolute -top-4 -right-4 w-16 h-16 bg-brand rounded-full flex items-center justify-center"
        style={{ animation: 'spin 20s linear infinite' }}
      >
        <span className="font-bebas text-[10px] text-bg text-center leading-tight">
          100%<br />Frukt
        </span>
      </div>
    </div>
  )
}
