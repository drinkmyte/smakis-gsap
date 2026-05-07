import Image from 'next/image'

export default function FooterSection() {
  return (
    <footer
      id="footer"
      className="bg-dark text-bg py-20 px-8 flex flex-col items-center text-center gap-6"
    >
      <Image
        src="/images/logo.png"
        alt="SMAKIS"
        width={120}
        height={40}
        className="invert"
      />

      <p className="font-bebas text-3xl md:text-4xl max-w-lg leading-snug">
        Från vår familj till din – tack för att du väljer Smakis!
      </p>

      <div className="flex flex-col items-center gap-2 text-bg/60 text-sm">
        <a
          href="https://www.instagram.com/smakis"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Följ Smakis på Instagram (öppnas i ny flik)"
          className="hover:text-brand transition-colors"
        >
          @smakis
        </a>
        <p>Augustendalsvägen 30, Nacka Strand</p>
      </div>
    </footer>
  )
}
