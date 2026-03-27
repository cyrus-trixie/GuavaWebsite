import Image from "next/image";
import HeroSection from "./components/Hero";
import Header from "./components/Header";
import AboutSection from "./components/About";
import Services from "./components/Services";
import PortfolioCarousel from "./components/PortfolioCarousel"; 

export default function Home() {
  return (
    <div className="">
      <Header/>
      <HeroSection/>
      <AboutSection/>
      <Services/>
      <PortfolioCarousel/>
     
    </div>
  );
}
