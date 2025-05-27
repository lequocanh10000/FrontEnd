// TRANG CHỦ

import HeroSection from "../components/sections/HeroSection/heroSection";
import Popular from "@/components/sections/Popular/popular";
import Offer from "../components/sections/Offer/Offer";
import About from "@/components/sections/About/about";
import Blog from "@/components/sections/Blog/blog";
import Review from "@/components/sections/Review/review";
import JoinUs from "@/components/sections/JoinUs/joinUs";

export default function Home() {
  return (
    <main>
      {/* Section hero với CTA nổi bật */}
      <HeroSection />
      <Popular />
      <Offer />
      <About/>
      <Blog />
      <Review/>
      <JoinUs />

    </main>
  );
}
