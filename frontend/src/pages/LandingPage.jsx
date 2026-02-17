import React from "react";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Features from "../components/Features.jsx";
import Footer from "../components/Footer.jsx";

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <Hero/>
      <Features/>
      <Footer />
    </div>
  );
}
