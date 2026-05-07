import Navbar from '@/components/Navbar'
import HeroSection from '@/sections/HeroSection'
import BrandStatement from '@/sections/BrandStatement'
import FlavorCarousel from '@/sections/FlavorCarousel'
import ValuesSection from '@/sections/ValuesSection'

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <BrandStatement />
      <FlavorCarousel />
      <ValuesSection />
    </>
  )
}
