import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
// Import more appropriate SVG icons
// Remove unused icons or add eslint-disable comment
// eslint-disable-next-line no-unused-vars
import { 
  FaRocket, 
  FaLayerGroup, 
  FaUserTie, 
  FaIndustry, 
  FaChevronLeft, 
  FaChevronRight 
} from 'react-icons/fa';

const SapServicesContainer = styled(motion.section)`
  padding: 6rem 0;
  background-color: var(--background-gray);
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(245, 247, 250, 1) 0%, rgba(235, 240, 245, 1) 100%);
`;

// Enhanced background shape
const BackgroundShape = styled(motion.div)`
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background-color: rgba(50, 140, 193, 0.05);
  top: -250px;
  right: -100px;
  z-index: 1;
`;

// Add animated wave background
const WaveBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  overflow: hidden;
  opacity: 0.4;
  
  &:before, &:after {
    content: '';
    position: absolute;
    width: 300%;
    height: 100%;
    top: -50%;
    left: -100%;
    background: radial-gradient(ellipse at center, rgba(0, 120, 215, 0.05) 0%, rgba(0, 120, 215, 0) 70%);
    animation: wave 15s infinite linear;
    border-radius: 40%;
  }
  
  &:after {
    animation: wave 15s infinite -5s linear;
    opacity: 0.5;
  }
  
  @keyframes wave {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
const SapServicesInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  color: var(--primary-dark-blue);
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background-color: var(--primary-light-blue);
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto;
  color: var(--text-dark);
`;

// Carousel container with proper overflow handling
const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  padding: 20px 0;
  overflow: hidden; /* Changed from 'visible' to 'hidden' to prevent scrollbar */
`;

// Carousel track with proper horizontal layout
const CarouselTrack = styled(motion.div)`
  display: flex;
  flex-direction: row;
  gap: 30px;
  width: max-content;
`;

const CarouselWrapper = styled.div`
  width: 100%;
  overflow-x: hidden;
  margin: 0 auto;
  position: relative;
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: var(--primary-dark-blue);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10;
  opacity: 0.8;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 1;
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  
  &.prev {
    left: 10px;
  }
  
  &.next {
    right: 10px;
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
`;

const ProgressIndicator = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 10px;
`;

const ProgressDot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.active ? 'var(--primary-dark-blue)' : '#ccc'};
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? 'var(--primary-dark-blue)' : '#999'};
  }
`;

const SapServiceItem = styled(motion.div)`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow-light);
  display: flex;
  flex-direction: column;
  min-width: 450px;
  width: 450px;
  flex: 0 0 auto;
  height: 520px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.15);
  }
  
  @media (max-width: 768px) {
    min-width: 320px;
    width: 320px;
    height: 500px;
  }
`;

const SapServiceImage = styled.div`
  height: 200px;
  background-color: var(--primary-dark-blue);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(11, 60, 93, 0.9) 0%, rgba(50, 140, 193, 0.8) 100%);
    z-index: 1;
  }
`;

// Enhanced icon container with better visibility
const IconContainer = styled(motion.div)`
  position: relative;
  z-index: 2;
  color: white;
  font-size: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  padding: 20px;
  width: 120px;
  height: 120px;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
  
  svg {
    width: 60px;
    height: 60px;
  }
`;

const SapServiceContent = styled.div`
  padding: 2rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const SapServiceTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--primary-dark-blue);
`;

const SapServiceDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-dark);
  margin-bottom: 1.5rem;
  flex-grow: 1;
`;

const SapServiceFeatures = styled.ul`
  list-style: none;
  margin-bottom: 1.5rem;
`;

const SapServiceFeatureItem = styled.li`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  
  &:before {
    content: '✓';
    color: var(--primary-light-blue);
    font-weight: bold;
    margin-right: 0.5rem;
  }
`;

const SapServiceLink = styled.a`
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background-color: var(--primary-dark-blue);
  color: white;
  font-weight: 600;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s ease;
  align-self: flex-start;
  
  &:hover {
    background-color: var(--primary-light-blue);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const SapServicesSection = () => {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // SAP services with improved icons
  const sapServices = [    
    {
      title: 'GROW with SAP',
      description: 'Accelerate your business transformation with our comprehensive GROW with SAP implementation services.',
      icon: <FaRocket size={80} />, // Increased from size={60}
      features: [
        'Rapid implementation methodology',
        'Pre-configured industry solutions',
        'Cloud-first approach',
        'Continuous innovation support'
      ]
    },
    {
      title: 'SAP Business Technology Platform',
      description: 'Leverage the full potential of SAP BTP to extend and integrate your SAP applications and develop new solutions.',
      icon: <FaLayerGroup size={80} />, // Increased from size={60}
      features: [
        'Application development & integration',
        'Intelligent technologies implementation',
        'Data management & analytics',
        'AI & machine learning capabilities'
      ]
    },
    {
      title: 'SAP SuccessFactors',
      description: 'Transform your HR processes with our SAP SuccessFactors implementation and optimization services.',
      icon: <FaUserTie size={80} />, // Increased from size={60}
      features: [
        'Core HR & payroll',
        'Talent management',
        'Employee experience management',
        'Workforce analytics'
      ]
    },
    {
      title: 'SAP Digital Manufacturing',
      description: 'Optimize your manufacturing operations with our SAP Digital Manufacturing implementation services.',
      icon: <FaIndustry size={80} />, // Increased from size={60}
      features: [
        'Production planning & execution',
        'Quality management',
        'Manufacturing insights',
        'IoT integration'
      ]
    }
  ];
  
  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 0 }, // Changed from y: 100 to y: 0 to prevent scroll bar
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.6,
        type: "spring",
        stiffness: 80,
        damping: 12
      },
    }),
  };
  
  // Icon animation variants
  const iconVariants = {
    initial: { scale: 0.8, opacity: 0, rotateY: 90 },
    animate: { 
      scale: 1, 
      opacity: 1, 
      rotateY: 0,
      transition: { 
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    hover: {
      scale: 1.1,
      rotate: [0, 5, -5, 0],
      transition: {
        rotate: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 1
        }
      }
    }
  };
  
  // Calculate item width and gap for animation
  const itemWidth = 450; // Match the width in SapServiceItem
  const itemGap = 30;   // Match the gap in CarouselTrack
  
  // Calculate visible slides based on container width
  const visibleSlides = 1; // Show only one slide at a time for simplicity
  const maxIndex = sapServices.length - visibleSlides;
  
  // Carousel navigation functions with smooth continuous movement
  const nextSlide = () => {
    // Always allow moving to next slide, with wrap-around
    setCurrentIndex((prevIndex) => 
      prevIndex >= sapServices.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevSlide = () => {
    // Always allow moving to previous slide, with wrap-around
    setCurrentIndex((prevIndex) => 
      prevIndex <= 0 ? sapServices.length - 1 : prevIndex - 1
    );
  };
  
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };
  
  // Auto-advance carousel continuously
  useEffect(() => {
    const interval = setInterval(() => {
      // Continuously move to next slide with wrap-around
      setCurrentIndex((prevIndex) => 
        prevIndex >= sapServices.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [sapServices.length]);
  
  return (
    <SapServicesContainer 
      id="sap-services"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <BackgroundShape 
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.7, 0.5]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 10, 
          ease: 'easeInOut' 
        }}
      />
      <WaveBackground />
      <SapServicesInner>
        <SectionHeader ref={headerRef}>
          <SectionTitle
            initial={{ opacity: 0, x: -100 }} // Changed from y: 30 to x: -100 to animate from left
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
          >
            SAP Solutions
          </SectionTitle>
          
          <SectionSubtitle
            initial={{ opacity: 0, x: -100 }} // Changed from y: 30 to x: -100 to animate from left
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ 
              duration: 0.8, 
              delay: 0.2,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
          >
            Comprehensive SAP services to drive your digital transformation
          </SectionSubtitle>
        </SectionHeader>
        
        <CarouselContainer>
          <NavigationButton 
            className="prev" 
            onClick={prevSlide}
          >
            <FaChevronLeft />
          </NavigationButton>
          
          <CarouselWrapper>
            <CarouselTrack
              ref={contentRef}
              initial={{ opacity: 0, y: 0 }} /* Changed from y: 50 to y: 0 to prevent scroll bar */
              animate={contentInView ? { 
                opacity: 1, 
                y: 0,
                x: -currentIndex * (itemWidth + itemGap)
              } : {}}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
            >
              {sapServices.map((service, index) => (
                <SapServiceItem
                  key={index}
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate={contentInView ? "visible" : "hidden"}
                  whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0,0,0,0.15)" }}
                >
                  <SapServiceImage>
                    <IconContainer
                      variants={iconVariants}
                      initial="initial"
                      animate="animate"
                      whileHover="hover"
                    >
                      {service.icon}
                    </IconContainer>
                  </SapServiceImage>
                  <SapServiceContent>
                    <SapServiceTitle>{service.title}</SapServiceTitle>
                    <SapServiceDescription>{service.description}</SapServiceDescription>
                    <SapServiceFeatures>
                      {service.features.slice(0, 2).map((feature, featureIndex) => (
                        <SapServiceFeatureItem key={featureIndex}>
                          {feature}
                        </SapServiceFeatureItem>
                      ))}
                    </SapServiceFeatures>
                    <SapServiceLink href="#">Learn more</SapServiceLink>
                  </SapServiceContent>
                </SapServiceItem>
              ))}
            </CarouselTrack>
          </CarouselWrapper>
          
          <NavigationButton 
            className="next" 
            onClick={nextSlide}
          >
            <FaChevronRight />
          </NavigationButton>
        </CarouselContainer>
        
        <ProgressIndicator>
          {sapServices.map((_, index) => (
            <ProgressDot 
              key={index} 
              active={currentIndex === index}
              onClick={() => goToSlide(index)}
            />
          ))}
        </ProgressIndicator>
      </SapServicesInner>
    </SapServicesContainer>
  );
};

export default SapServicesSection;