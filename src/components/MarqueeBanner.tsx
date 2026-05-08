interface MarqueeBannerProps {
  items?: string[]
  dark?: boolean
}

const DEFAULT_ITEMS = [
  'SMAKA LIVET',
  'EKOLOGISKT SEDAN 1970',
  'DET SNÄLLA VARUMÄRKET',
  '100% NATURLIGT',
  'UTAN TILLSATT SOCKER',
  'FAMILJEFÖRETAG',
  '★',
]

export default function MarqueeBanner({ items = DEFAULT_ITEMS, dark = false }: MarqueeBannerProps) {
  const repeated = [...items, ...items]

  return (
    <div
      className={`relative overflow-hidden py-3 ${dark ? 'bg-dark' : 'bg-brand'}`}
      style={{ borderTop: `2px solid ${dark ? '#E27442' : '#313D41'}`, borderBottom: `2px solid ${dark ? '#E27442' : '#313D41'}` }}
      aria-hidden="true"
    >
      <div className="marquee-track">
        {repeated.map((item, i) => (
          <span
            key={i}
            className={`font-bebas text-xl tracking-[0.18em] mx-6 ${dark ? 'text-brand' : 'text-dark'}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
