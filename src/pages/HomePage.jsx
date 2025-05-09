// src/pages/HomePage.jsx
import React from 'react';
import HeroSection from '../components/HeroSection';
import NewsTicker from '../components/NewsTicker';
import StatsCounter from '../components/StatsCounter';
import WhyChooseUs from '../components/WhyChooseUs';
import BloodCompatibility from '../components/BloodCompatibilityChart';
import FAQ from '../components/FAQ';
import Testimonial from '../components/Testimonial';
import ContactUsPage from '../components/ContactUsPage';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="flex flex-col gap-2">
      <NewsTicker />
      <HeroSection />
      <BloodCompatibility />
      <WhyChooseUs />  
      <Testimonial />                                
      <StatsCounter />
      <FAQ />    
      <ContactUsPage />             
      <Footer />             

    </div>
  );
};

export default HomePage;
