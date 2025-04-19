import HeroSection from "./components/sections/HeroSection/heroSection";
import PopularFlights from "./components/sections/PopularFlights/popularFlight";
import Offer from "./components/sections/Offer/Offer";
export default function Home() {
  return (
    <main>
      {/* Section hero với CTA nổi bật */}
      <HeroSection />
      <PopularFlights />
      <Offer/>
    </main>
  );
}
