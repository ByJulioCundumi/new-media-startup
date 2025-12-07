import React from "react";
import "./homepage.scss";
import HomePageNavbar from "./home-page-navbar/HomePageNavbar";
import HeroSection from "./hero-section/HeroSection";

const HomePage: React.FC = () => {
  return (
    <section className="home-page">
        <HeroSection/>
    </section>
  );
};

export default HomePage;
