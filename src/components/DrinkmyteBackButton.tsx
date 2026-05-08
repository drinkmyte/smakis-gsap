export default function DrinkmyteBackButton() {
  return (
    <a
      href="https://drinkmyte.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Tillbaka till Drinkmyte"
      className="fixed bottom-6 left-6 z-50 group"
    >
      <div
        className="bg-bg border-2 border-dark px-4 py-2 flex items-center gap-2 shadow-md transition-all duration-300 group-hover:-translate-x-1 group-hover:shadow-lg"
        style={{
          transform: 'rotate(-2.5deg)',
          animation: 'sticker-wobble 4s ease-in-out infinite',
        }}
      >
        <span className="text-dark text-base leading-none">←</span>
        <span className="font-marker text-dark text-sm leading-none">drinkmyte.com</span>
      </div>
    </a>
  )
}
