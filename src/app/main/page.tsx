// src/app/main/page.tsx
import HeroSection from "../components/sections/HeroSection/heroSection";
import PopularFlights from "../components/sections/PopularFlights/popularFlight";
import Offer from "../components/sections/Offer/Offer";

export default function MainPage() {
  return (
    <div className="main-page">
      <HeroSection />
      <PopularFlights />
      <Offer/>
    </div>
  );
}
