import React from "react";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Features from "../components/Features.jsx";
import Footer from "../components/Footer.jsx";

export default function LandingPage() {
  return (
    <>
      <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
      <div className="relative overflow-x-hidden">
        <Navbar />
        <Hero />
        <Features />
        <Footer />
      </div>
    </>
  );
}
