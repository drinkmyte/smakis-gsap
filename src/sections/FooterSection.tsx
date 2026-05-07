import Image from 'next/image'

export default function FooterSection() {
  return (
    <footer
      id="footer"
      className="bg-dark text-bg pt-20 pb-10 px-8 md:px-16 flex flex-col items-center gap-12"
    >
      {/* Top row */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center md:items-start justify-between gap-12">

        {/* Brand column */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <Image src="/images/logo.png" alt="SMAKIS" width={140} height={48} className="opacity-90" />
          <p className="font-bebas text-2xl text-bg/70 tracking-wider max-w-xs text-center md:text-left leading-snug">
            Ekologiska drycker sedan 1970.
          </p>
        </div>

        {/* Values column */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="font-bebas text-brand text-sm tracking-widest mb-2">VÅRA VÄRDEN</p>
          {['Ekologiskt', 'Familjeföretag', 'Utan tillsatt socker', '100% Naturligt'].map(v => (
            <p key={v} className="font-bebas text-xl text-bg/60 tracking-wide">{v}</p>
          ))}
        </div>

        {/* Contact column */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="font-bebas text-brand text-sm tracking-widest mb-2">HITTA OSS</p>
          <p className="text-bg/60 text-sm">Augustendalsvägen 30</p>
          <p className="text-bg/60 text-sm">Nacka Strand, Sverige</p>
          <a
            href="https://www.instagram.com/smakis"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Följ Smakis på Instagram (öppnas i ny flik)"
            className="mt-3 font-bebas text-xl tracking-wider text-bg hover:text-brand transition-colors"
          >
            @smakis
          </a>
          <a
            href="https://www.smakis.se"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bebas text-xl tracking-wider text-bg/60 hover:text-brand transition-colors"
          >
            smakis.se
          </a>
        </div>
      </div>

      {/* Divider + tagline */}
      <div className="w-full max-w-5xl border-t border-bg/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-bebas text-2xl md:text-3xl text-bg/80 text-center md:text-left leading-snug">
          Från vår familj till din – tack för att du väljer Smakis!
        </p>
        <p className="text-bg/30 text-xs tracking-widest">
          © {new Date().getFullYear()} SMAKIS
        </p>
      </div>
    </footer>
  )
}
