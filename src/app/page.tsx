import Navbar from '@/components/Navbar'
import MarqueeBanner from '@/components/MarqueeBanner'
import SkateboardParallax from '@/components/SkateboardParallax'
import HeroSection from '@/sections/HeroSection'
import BrandStatement from '@/sections/BrandStatement'
import StatsSection from '@/sections/StatsSection'
import FlavorCarousel from '@/sections/FlavorCarousel'
import ProcessSection from '@/sections/ProcessSection'
import HistorySection from '@/sections/HistorySection'
import ValuesSection from '@/sections/ValuesSection'
import DrinkmyteSection from '@/sections/DrinkmyteSection'
import FooterSection from '@/sections/FooterSection'

export default function Home() {
  return (
    <>
      <Navbar />
      <SkateboardParallax />
      <HeroSection />
      <MarqueeBanner />
      <BrandStatement />
      <StatsSection />
      <FlavorCarousel />
      <MarqueeBanner dark items={['SMAKA LIVET', 'GSAP', 'NEXT.JS', 'SCROLL ANIMATIONS', '★', 'CINEMATIC WEB', 'TAILWIND V4', '★']} />
      <ProcessSection />
      <HistorySection />
      <ValuesSection />
      <DrinkmyteSection />
      <FooterSection />
    </>
  )
}
