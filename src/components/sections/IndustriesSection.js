import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
// Import SVG icons that better match the industries
import { 
  FaChartLine, 
  FaMedkit, 
  FaShoppingBag, 
  FaLandmark, 
  FaGraduationCap, 
  FaIndustry 
} from 'react-icons/fa';

// Styled Components
const IndustriesContainer = styled.section`
  padding: 6rem 0;
  background-color: rgba(0, 119, 182, 0.21); /* Darker blue background */
  position: relative;
  overflow: hidden;
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 40%;
  height: 100%;
  background: radial-gradient(circle, rgba(0, 120, 215, 0.05) 0%, rgba(0, 120, 215, 0) 70%);
  border-radius: 50%;
  z-index: 0;
`;

const IndustriesInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  
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

// Bento Grid Layout
const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(120px, auto);
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(6, 1fr);
    grid-auto-rows: minmax(100px, auto);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

// Bento Card with varying sizes
const BentoCard = styled(motion.div)`
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  background: rgba(0, 60, 140, 0.2); /* Darker, richer blue background */
  box-shadow: 0 8px 32px rgba(0, 60, 140, 0.25); /* Adjusted shadow to match */
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  height: 100%;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba(0, 60, 140, 0.35); /* Darker shadow on hover */
    background: rgba(0, 60, 140, 0.3); /* Darker blue on hover */
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const BentoContent = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  padding: 1.8rem;
  color: var(--primary-dark-blue);
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  .bento-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .bento-details {
    opacity: 0.8;
    transition: opacity 0.3s ease;
  }
  
  &:hover .bento-details {
    opacity: 1;
  }
`;

const BentoTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 0.8rem;
  font-weight: 700;
  position: relative;
  text-align: center;
  color: var(--primary-dark-blue);
  
  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 3px;
    background: var(--primary-light-blue);
    border-radius: 3px;
  }
`;

const BentoDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-dark);
`;

const BentoIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1.2rem;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-dark-blue);
  
  svg {
    filter: drop-shadow(0 2px 4px rgba(0, 120, 215, 0.3));
    width: 50px;
    height: 50px;
  }
  
  ${BentoCard}:hover & {
    transform: translateY(-5px) scale(1.1);
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  background: ${props => props.active ? 'var(--primary-dark-blue)' : 'white'};
  color: ${props => props.active ? 'white' : 'var(--primary-dark-blue)'};
  border: 2px solid var(--primary-dark-blue);
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--primary-dark-blue);
    color: white;
  }
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 8px;
  max-width: 800px;
  width: 100%;
  padding: 2rem;
  position: relative;
  max-height: 80vh;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--primary-dark-blue);
`;

// Main Component
const IndustriesSection = () => {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  const [gridRef, gridInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [filter, setFilter] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  
  // Animation variants
  const cardVariants = {
    hidden: (i) => ({
      opacity: 0,
      x: i % 2 === 0 ? -700 : 700, // Even indices come from left, odd from right
    }),
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.8,
        type: "spring",
        stiffness: 80,
        damping: 12
      },
    }),
  };
  
  const titleVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }
    }
  };
  
  const subtitleVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        delay: 0.2,
        type: "spring",
        stiffness: 100
      }
    }
  };
  
  // Industry data
  const industries = [
    {
      title: 'Finance',
      description: 'Digital banking solutions, regulatory compliance, and financial analytics to drive growth and efficiency.',
      color: '#3e92cc',
      icon: <FaChartLine size={40} />,
      category: 'business',
      fullDescription: 'Comprehensive digital solutions for the financial sector including advanced security, compliance automation, and customer experience optimization.',
      keyFeatures: [
        'Regulatory compliance automation',
        'Fraud detection and prevention',
        'Customer experience optimization',
        'Data analytics and reporting'
      ],
      caseStudies: [
        { title: 'Major Bank Digital Transformation', result: '35% increase in digital engagement' }
      ],
      // Define grid position for bento layout
      gridArea: { gridColumn: '1 / span 6', gridRow: '1 / span 2' } // Large card
    },
    {
      title: 'Healthcare',
      description: 'Patient-centered solutions, operational efficiency, and data-driven insights for better healthcare outcomes.',
      color: '#3e92cc',
      icon: <FaMedkit size={40} />,
      category: 'healthcare',
      fullDescription: 'End-to-end healthcare solutions that improve patient care, streamline operations, and ensure compliance with regulations.',
      keyFeatures: [
        'Electronic health records integration',
        'Telehealth platforms',
        'Healthcare analytics',
        'Patient engagement tools'
      ],
      caseStudies: [
        { title: 'Regional Hospital Network Modernization', result: '40% reduction in administrative costs' }
      ],
      gridArea: { gridColumn: '7 / span 6', gridRow: '1 / span 1' } // Medium card
    },
    {
      title: 'Retail',
      description: 'Omnichannel experiences, supply chain optimization, and customer analytics for the modern retailer.',
      color: '#3e92cc',
      icon: <FaShoppingBag size={40} />,
      category: 'business',
      fullDescription: 'Retail transformation solutions that connect online and offline experiences while optimizing operations and inventory management.',
      keyFeatures: [
        'Omnichannel commerce platforms',
        'Inventory management systems',
        'Customer loyalty programs',
        'Retail analytics'
      ],
      caseStudies: [
        { title: 'Fashion Retailer Digital Expansion', result: '60% growth in online sales' }
      ],
      gridArea: { gridColumn: '7 / span 3', gridRow: '2 / span 1' } // Small card
    },
    {
      title: 'Government',
      description: 'Secure, compliant solutions for digital government services, citizen engagement, and operational efficiency.',
      color: '#3e92cc',
      icon: <FaLandmark size={40} />,
      category: 'public',
      fullDescription: 'Government-focused solutions that modernize public services while maintaining the highest levels of security and compliance.',
      keyFeatures: [
        'Citizen service portals',
        'Secure document management',
        'Regulatory compliance systems',
        'Public sector analytics'
      ],
      caseStudies: [
        { title: 'Municipal Services Digitization', result: '50% improvement in citizen satisfaction' }
      ],
      gridArea: { gridColumn: '10 / span 3', gridRow: '2 / span 1' } // Small card
    },
    {
      title: 'Education',
      description: 'Digital learning platforms, administrative systems, and data analytics to transform educational experiences.',
      color: '#3e92cc',
      icon: <FaGraduationCap size={40} />,
      category: 'public',
      fullDescription: 'Educational technology solutions that enhance learning experiences and streamline administrative processes for schools and universities.',
      keyFeatures: [
        'Learning management systems',
        'Student information systems',
        'Educational analytics',
        'Virtual classroom tools'
      ],
      caseStudies: [
        { title: 'University Digital Transformation', result: '45% increase in student engagement' }
      ],
      gridArea: { gridColumn: '1 / span 4', gridRow: '3 / span 1' } // Medium card
    },
    {
      title: 'Manufacturing',
      description: 'Smart factory solutions, supply chain optimization, and predictive maintenance for Industry 4.0.',
      color: '#3e92cc',
      icon: <FaIndustry size={40} />,
      category: 'business',
      fullDescription: 'Industry 4.0 solutions that bring intelligence and connectivity to manufacturing operations, improving efficiency and reducing downtime.',
      keyFeatures: [
        'IoT-enabled production monitoring',
        'Predictive maintenance systems',
        'Supply chain optimization',
        'Quality control automation'
      ],
      caseStudies: [
        { title: 'Automotive Manufacturer Modernization', result: '30% reduction in maintenance costs' }
      ],
      gridArea: { gridColumn: '5 / span 8', gridRow: '3 / span 1' } // Medium-large card
    },
  ];
  
  const categories = [
    { id: 'all', name: 'All Industries' },
    { id: 'business', name: 'Business' },
    { id: 'healthcare', name: 'Healthcare' },
    { id: 'public', name: 'Public Sector' }
  ];
  
  const filteredIndustries = filter === 'all' 
    ? industries 
    : industries.filter(industry => industry.category === filter);
  
  // Function to handle responsive grid positions
  const getResponsiveGridArea = (industry, isMobile) => {
    if (isMobile) {
      // On mobile, all cards take full width
      return { gridColumn: '1 / -1', gridRow: 'auto' };
    }
    return industry.gridArea;
  };
  
  return (
    <IndustriesContainer id="industries">
      <BackgroundPattern />
      <IndustriesInner>
        <SectionHeader ref={headerRef}>
          <SectionTitle
            variants={titleVariants}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
          >
            Industry Expertise
          </SectionTitle>
          
          <SectionSubtitle
            variants={subtitleVariants}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
          >
            Tailored solutions for the unique challenges of your industry
          </SectionSubtitle>
        </SectionHeader>
        
        <FilterContainer>
          {/* Remove the unused i parameter */}
          {categories.map((category) => (
            <FilterButton 
              key={category.id}
              active={filter === category.id}
              onClick={() => setFilter(category.id)}
            >
              {category.name}
            </FilterButton>
          ))}
        </FilterContainer>
        
        <BentoGrid ref={gridRef}>
          {filteredIndustries.map((industry, index) => {
            // Use window.innerWidth to determine if mobile view
            const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
            const gridStyle = getResponsiveGridArea(industry, isMobile);
            
            return (
              <BentoCard
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate={gridInView ? "visible" : "hidden"}
                onClick={() => setSelectedIndustry(industry)}
                whileHover={{ scale: 1.02 }}
                style={gridStyle}
              >
                <BentoContent>
                  <div className="bento-header">
                    <BentoIcon>{industry.icon}</BentoIcon>
                    <BentoTitle>{industry.title}</BentoTitle>
                  </div>
                  <div className="bento-details">
                    <BentoDescription>{industry.description}</BentoDescription>
                  </div>
                </BentoContent>
              </BentoCard>
            );
          })}
        </BentoGrid>
      </IndustriesInner>
      
      <AnimatePresence>
        {selectedIndustry && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndustry(null)}
          >
            <ModalContent 
              onClick={e => e.stopPropagation()}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              <CloseButton onClick={() => setSelectedIndustry(null)}>×</CloseButton>
              
              <div style={{ borderLeft: `4px solid ${selectedIndustry.color}`, paddingLeft: '1rem' }}>
                <h2>{selectedIndustry.title}</h2>
              </div>
              
              <p>{selectedIndustry.fullDescription}</p>
              
              <h3>Key Features</h3>
              <ul>
                {selectedIndustry.keyFeatures.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              
              <h3>Case Studies</h3>
              {selectedIndustry.caseStudies.map((study, i) => (
                <div key={i}>
                  <h4>{study.title}</h4>
                  <p>Result: {study.result}</p>
                </div>
              ))}
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </IndustriesContainer>
  );
};

export default IndustriesSection;