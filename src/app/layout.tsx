import type { Metadata } from 'next'
import './globals.css'
import SmoothWrapper from '@/components/SmoothWrapper'
import GrainOverlay from '@/components/GrainOverlay'

export const metadata: Metadata = {
  title: 'SMAKIS — Smaka Livet',
  description: 'Det snälla varumärket. Ekologiska drycker från en svensk familj.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv" style={{ backgroundColor: 'var(--color-bg)' }}>
      <body style={{ overflow: 'hidden' }}>
        <GrainOverlay />
        <SmoothWrapper>
          {children}
        </SmoothWrapper>
      </body>
    </html>
  )
}
