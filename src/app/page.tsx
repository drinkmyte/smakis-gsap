import Navbar from '@/components/Navbar'
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
      <HeroSection />
      <BrandStatement />
      <StatsSection />
      <FlavorCarousel />
      <ProcessSection />
      <HistorySection />
      <ValuesSection />
      <DrinkmyteSection />
      <FooterSection />
    </>
  )
}
