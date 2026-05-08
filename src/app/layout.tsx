import type { Metadata } from 'next'
import './globals.css'
import GrainOverlay from '@/components/GrainOverlay'
import DrinkmyteBackButton from '@/components/DrinkmyteBackButton'

export const metadata: Metadata = {
  title: 'SMAKIS — Smaka Livet',
  description: 'Det snälla varumärket. Ekologiska drycker från en svensk familj.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body className="bg-bg">
        <GrainOverlay />
        <DrinkmyteBackButton />
        {children}
      </body>
    </html>
  )
}
