import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/sections/HeroSection';
import ServicesSection from './components/sections/ServicesSection';
import SapServicesSection from './components/sections/SapServicesSection';
import IndustriesSection from './components/sections/IndustriesSection';
import BlueprintSection from './components/sections/BlueprintSection';
import SuccessStoriesSection from './components/sections/SuccessStoriesSection';
import Footer from './components/layout/Footer';
import ContactFormPage from './components/sections/ContactFormPage';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection />
            <ServicesSection />
            <SapServicesSection />
            <IndustriesSection />
            <BlueprintSection />
            <SuccessStoriesSection />
          </>
        } />
        <Route path="/contact-form" element={<ContactFormPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
