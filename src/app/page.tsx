import { Suspense } from 'react';
import Image from "next/image";
import HeroSection from "./components/Hero";
import Header from "./components/Header";
import AboutSection from "./components/About";
import Services from "./components/Services";
import PortfolioCarousel from "./components/PortfolioCarousel";
import Loading from './loading';

export default function Home() {
  return (
    <div className="">
      <Header/>
      <Suspense fallback={<Loading />}>
        <HeroSection/>
        <AboutSection/>
        <Services/>
        <PortfolioCarousel/>
      </Suspense>
    </div>
  );
}