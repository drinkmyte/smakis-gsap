export default function DrinkmyteSection() {
  return (
    <section
      className="relative bg-dark py-24 px-8 overflow-hidden clip-skew-top"
    >
      {/* Graffiti SVG — "DM" sprayed on wall */}
      <svg aria-hidden="true" preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        style={{ opacity: 0.06 }}>
        <defs>
          <filter id="spray-dm">
            <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="6"
              xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        <text x="55%" y="70%" textAnchor="middle" fontSize="35vw"
          fill="#E27442" filter="url(#spray-dm)"
          fontFamily="'Bebas Neue', sans-serif" letterSpacing="-0.03em">
          DM
        </text>
      </svg>

      {/* Paint blob */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-10%', left: '-5%',
        width: '40vw', height: '40vw',
        background: 'radial-gradient(ellipse, #E27442 0%, transparent 65%)',
        opacity: 0.08, filter: 'blur(60px)', pointerEvents: 'none',
        borderRadius: '50% 50% 60% 40%',
      }} />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-12">

        {/* Left: agency info */}
        <div className="flex flex-col gap-4">
          <p className="font-marker text-brand text-lg">konceptsida av</p>
          <h2 className="font-bebas text-6xl md:text-8xl leading-none tracking-wide hatch-section">
            Drinkmyte
          </h2>
          <p className="text-bg/50 text-sm leading-relaxed max-w-sm mt-2">
            Webbyrå med passion för svenska varumärken. Vi bygger moderna,
            snabba och minnesvärda webbplatser — för företag som vågar sticka ut.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-2">
            {['Next.js', 'GSAP', 'Tailwind CSS', 'Vercel'].map(tag => (
              <span key={tag}
                className="font-marker text-xs text-brand border border-brand/40 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right: CTA */}
        <div className="flex flex-col items-start md:items-end gap-5">
          <p className="font-marker text-bg/40 text-sm text-right">
            vill du ha en sån här site?
          </p>
          <a
            href="https://drinkmyte.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-brand text-dark font-bebas text-xl md:text-2xl tracking-wider px-8 py-4 transition-all hover:bg-bg hover:text-dark"
          >
            Besök drinkmyte.com
            <span className="transition-transform group-hover:translate-x-2">→</span>
          </a>
        </div>

      </div>
    </section>
  )
}
