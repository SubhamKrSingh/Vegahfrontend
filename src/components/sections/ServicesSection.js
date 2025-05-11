import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom'; // Add this import
// Import SVG icons from react-icons
import { FaExchangeAlt, FaCloud, FaLaptopCode, FaCogs, FaRobot, FaChartBar } from 'react-icons/fa';

// Modal components need to be defined before they're used
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
  overflow: hidden; /* Prevent content from spilling outside */
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
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
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

// Update BackgroundPattern with more vibrant animated elements
const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at top right, rgba(0, 120, 215, 0.08) 0%, rgba(0, 120, 215, 0) 70%);
  z-index: 0;
  overflow: hidden;
  
  &:before, &:after {
    content: '';
    position: absolute;
    border-radius: 50%;
    background: var(--primary-light-blue);
    opacity: 0.05; /* Increased from 0.03 */
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
  
  &:before {
    width: 300px;
    height: 300px;
    bottom: -100px;
    left: -100px;
    animation-name: floatLeft;
    animation-duration: 12s; /* Faster animation */
  }
  
  &:after {
    width: 400px;
    height: 400px;
    top: -150px;
    right: -150px;
    animation-name: floatRight;
    animation-duration: 15s; /* Faster animation */
  }
  
  @keyframes floatLeft {
    0% { transform: translateY(0) scale(1); }
    50% { transform: translateY(40px) scale(1.15); } /* More movement */
    100% { transform: translateY(0) scale(1); }
  }
  
  @keyframes floatRight {
    0% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-50px) scale(1.2); } /* More movement */
    100% { transform: translateY(0) scale(1); }
  }
`;

const ServicesContainer = styled.section`
  padding: 6rem 0;
  background-color: var(--background-light);
  position: relative;
  overflow: hidden;
`;

const ServicesInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
  
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

// Update the ServicesGrid to create a staggered layout
const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(12, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Update ServiceCard to match the image structure with icon partially outside
const ServiceCard = styled(motion.div)`
  background-color: #f0f2f5; /* Darker background color */
  border-radius: 16px;
  overflow: visible; /* Changed from 'hidden' to allow icon to overflow */
  box-shadow: var(--shadow-light);
  cursor: pointer;
  height: 380px; /* Fixed height for all cards */
  width: 100%; /* Ensure full width within grid column */
  display: flex;
  flex-direction: column;
  grid-column: ${props => props.column || 'span 4'};
  border: 1px solid rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  position: relative; /* Added for absolute positioning of icon */
  padding-top: 60px; /* Add space at top for the icon */
  
  @media (max-width: 1024px) {
    grid-column: ${props => props.tabletColumn || 'span 6'};
    height: 350px;
  }
  
  @media (max-width: 768px) {
    grid-column: 1 / -1;
    height: 320px;
  }
`;

// Update ServiceIcon to use blue color instead of yellow
const ServiceIcon = styled.div`
  height: 120px;
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-light-blue); /* Changed back to blue */
  color: white; /* Changed back to white for better contrast */
  font-size: 2.5rem;
  border-radius: 20px;
  position: absolute;
  top: -60px; /* Position halfway outside the card */
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  
  svg {
    font-size: 3rem;
    transition: transform 0.3s ease;
  }
`;

const ServiceContent = styled.div`
  padding: 1.5rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  text-align: center;
  margin-top: 1.5rem; /* Add some space between the icon and content */
`;

// Define styled components for service card content
const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--primary-dark-blue);
  transition: color 0.3s ease;
  
  ${ServiceCard}:hover & {
    color: white;
  }
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-dark);
  margin-bottom: 1.5rem;
  flex-grow: 1;
  transition: color 0.3s ease;
  
  ${ServiceCard}:hover & {
    color: rgba(255, 255, 255, 0.9);
  }
`;

const ServiceLink = styled.a`
  display: inline-block;
  color: var(--primary-light-blue);
  font-weight: 600;
  text-decoration: none;
  position: relative;
  transition: color 0.3s ease;
  
  &:after {
    content: '→';
    margin-left: 0.5rem;
    transition: transform 0.3s ease;
  }
  
  &:hover:after {
    transform: translateX(5px);
  }
  
  ${ServiceCard}:hover & {
    color: white;
  }
`;

// Define ServiceCardMemo outside the component's return statement
const ServiceCardMemo = React.memo(({ service, index, gridInView, cardVariants, onSelect, column, tabletColumn, isRightSide }) => (
  <ServiceCard
    key={index}
    custom={index}
    variants={{
      ...cardVariants,
      hidden: { 
        opacity: 0, 
        x: isRightSide ? -300 : 300, // Increased value to start from much further outside the screen
        scale: 0.9 // Add slight scaling for more depth
      },
      visible: (i) => ({
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
          delay: 0.1 * i,
          duration: 1.0, // Longer duration for the increased distance
          type: "spring",
          stiffness: 70, // Lower stiffness for smoother motion over longer distance
          damping: 12
        },
      }),
      hover: {
        backgroundColor: 'var(--primary-dark-blue)',
        y: -10,
        boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)", /* Enhanced shadow */
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 15
        }
      }
    }}
    initial="hidden"
    animate={gridInView ? "visible" : "hidden"}
    whileHover="hover"
    onClick={() => onSelect(service)}
    column={column}
    tabletColumn={tabletColumn}
  >
    <ServiceIcon>{service.icon}</ServiceIcon>
    <ServiceContent>
      <ServiceTitle>{service.title}</ServiceTitle>
      <ServiceDescription>{service.description}</ServiceDescription>
      <ServiceLink href="#" onClick={(e) => {
        e.preventDefault(); // Prevent default link behavior
        onSelect(service);
      }}>Learn more</ServiceLink>
    </ServiceContent>
  </ServiceCard>
));

const ServicesSection = () => {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  const [gridRef, gridInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const navigate = useNavigate(); // Add this line
  
  const services = [
    {
      title: 'Digital Transformation',
      description: 'Reimagine your business processes and customer experiences with our comprehensive digital transformation solutions.',
      icon: <FaExchangeAlt />,
      benefits: [
        'Streamlined business processes',
        'Enhanced customer experiences',
        'Increased operational efficiency',
        'Improved data-driven decision making'
      ],
      approach: 'Our digital transformation approach focuses on people, processes, and technology to create sustainable change.'
    },
    {
      title: 'Cloud Managed Services',
      description: 'Optimize your cloud infrastructure with our expert managed services for AWS, Azure, and Google Cloud.',
      icon: <FaCloud />,
      benefits: [
        'Reduced operational costs',
        '24/7 monitoring and support',
        'Enhanced security and compliance',
        'Scalable infrastructure'
      ],
      approach: 'We provide end-to-end cloud management, from migration to optimization and ongoing support.'
    },
    {
      title: 'Application Development',
      description: 'Custom software solutions designed to address your unique business challenges and opportunities.',
      icon: <FaLaptopCode />,
    },
    {
      title: 'ERP Implementations',
      description: 'End-to-end implementation services for SAP, Oracle, and other leading ERP platforms.',
      icon: <FaCogs />,
    },
    {
      title: 'AI/ML & Emerging Tech',
      description: 'Harness the power of artificial intelligence and machine learning to drive innovation and efficiency.',
      icon: <FaRobot />,
    },
    {
      title: 'Data Analytics',
      description: 'Transform your data into actionable insights with our advanced analytics solutions.',
      icon: <FaChartBar />,
    },
  ];
  
  // Enhanced card variants with better spring physics
  const cardVariants = {
    hidden: { opacity: 0, y: 50 }, // This will be overridden in the ServiceCardMemo component
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 10
      },
    }),
  };
  
  // Add hover animation variants
  const hoverVariants = {
    hover: {
      y: -10,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };
  
  const [activeService, setActiveService] = useState(null);
  
  // Add this to handle body scroll locking when modal is open
  React.useEffect(() => {
    let scrollPosition = 0;
    
    if (activeService) {
      // Store the current scroll position
      scrollPosition = window.scrollY;
      // Disable scrolling on body when modal is open
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = '100%';
    } else {
      // Get the scroll position from the body's top property
      const scrollY = document.body.style.top;
      
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      
      // Restore scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY.replace('px', ''), 10) * -1);
      }
    }
    
    // Cleanup function to ensure scrolling is re-enabled if component unmounts
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      
      // Restore scroll position on unmount if needed
      const scrollY = document.body.style.top;
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY.replace('px', ''), 10) * -1);
      }
    };
  }, [activeService]);
  
  return (
    <ServicesContainer id="services">
      <BackgroundPattern />
      {/* Add floating elements for additional background animation */}
      <motion.div
        style={{
          position: 'absolute',
          width: '150px',
          height: '150px',
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          background: 'var(--primary-light-blue)',
          opacity: 0.06, /* Increased from 0.03 */
          top: '20%',
          left: '10%',
          zIndex: 0,
          filter: 'blur(2px)' /* Added blur for glow effect */
        }}
        animate={{
          x: [0, 40, 0], /* Increased movement */
          y: [0, 30, 0], /* Increased movement */
          rotate: [0, 8, 0], /* Increased rotation */
          scale: [1, 1.15, 1] /* Increased scale */
        }}
        transition={{
          duration: 15, /* Faster animation */
          repeat: Infinity,
          repeatType: 'reverse'
        }}
      />
      <motion.div
        style={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          background: 'var(--primary-dark-blue)',
          opacity: 0.04, /* Increased from 0.02 */
          bottom: '15%',
          right: '15%',
          zIndex: 0,
          filter: 'blur(3px)' /* Added blur for glow effect */
        }}
        animate={{
          x: [0, -50, 0], /* Increased movement */
          y: [0, 40, 0], /* Increased movement */
          rotate: [0, -12, 0], /* Increased rotation */
          scale: [1, 1.2, 1] /* Increased scale */
        }}
        transition={{
          duration: 18, /* Faster animation */
          repeat: Infinity,
          repeatType: 'reverse'
        }}
      />
      
      <ServicesInner>
        <SectionHeader ref={headerRef}>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Integrated Services
          </SectionTitle>
          
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Comprehensive solutions to drive your business transformation
          </SectionSubtitle>
        </SectionHeader>
        
        <ServicesGrid ref={gridRef}>
          {/* First row */}
          <ServiceCardMemo
            key={0}
            service={services[0]}
            index={0}
            gridInView={gridInView}
            cardVariants={cardVariants}
            onSelect={setActiveService}
            column="2 / span 5"
            tabletColumn="1 / span 7"
            isRightSide={false} // Left side card
          />
          <ServiceCardMemo
            key={1}
            service={services[1]}
            index={1}
            gridInView={gridInView}
            cardVariants={cardVariants}
            onSelect={setActiveService}
            column="8 / span 4"
            tabletColumn="8 / span 5"
            isRightSide={true} // Right side card
          />
          
          {/* Second row */}
          <ServiceCardMemo
            key={2}
            service={services[2]}
            index={2}
            gridInView={gridInView}
            cardVariants={cardVariants}
            onSelect={setActiveService}
            column="1 / span 4"
            tabletColumn="2 / span 5"
            isRightSide={false} // Left side card
          />
          <ServiceCardMemo
            key={3}
            service={services[3]}
            index={3}
            gridInView={gridInView}
            cardVariants={cardVariants}
            onSelect={setActiveService}
            column="6 / span 6"
            tabletColumn="7 / span 5"
            isRightSide={true} // Right side card
          />
          
          {/* Third row */}
          <ServiceCardMemo
            key={4}
            service={services[4]}
            index={4}
            gridInView={gridInView}
            cardVariants={cardVariants}
            onSelect={setActiveService}
            column="3 / span 4"
            tabletColumn="1 / span 6"
            isRightSide={false} // Left side card
          />
          <ServiceCardMemo
            key={5}
            service={services[5]}
            index={5}
            gridInView={gridInView}
            cardVariants={cardVariants}
            onSelect={setActiveService}
            column="8 / span 4"
            tabletColumn="7 / span 6"
            isRightSide={true} // Right side card
          />
        </ServicesGrid>
        
        {/* Modal for service details - Enhanced animations from edges */}
        <AnimatePresence>
          {activeService && (
            <Modal
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              onClick={() => setActiveService(null)}
            >
              <ModalContent 
                onClick={e => e.stopPropagation()}
                initial={{ x: '150%', opacity: 0 }} // Start from further outside the right edge
                animate={{ 
                  x: 0, 
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 250,
                    damping: 30
                  }
                }}
                exit={{ 
                  x: '-150%', // Exit further to the left edge
                  opacity: 0,
                  transition: { 
                    type: "spring",
                    stiffness: 250,
                    damping: 30,
                    duration: 0.4 
                  }
                }}
              >
                const navigate = useNavigate();
                
                <CloseButton onClick={() => setActiveService(null)}>×</CloseButton>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '3rem', marginRight: '1rem', color: 'var(--primary-dark-blue)' }}>
                    {activeService.icon}
                  </div>
                  <h2>{activeService.title}</h2>
                </div>
                <p style={{ marginBottom: '1.5rem' }}>{activeService.description}</p>
                
                <h3>Key Benefits</h3>
                <ul>
                  <li>Increased operational efficiency</li>
                  <li>Reduced costs and improved ROI</li>
                  <li>Enhanced customer experience</li>
                  <li>Scalable and future-proof solutions</li>
                </ul>
                
                <h3>Our Approach</h3>
                <p>We follow a proven methodology to deliver exceptional results for our clients:</p>
                <ol>
                  <li><strong>Discovery:</strong> Understanding your unique business needs</li>
                  <li><strong>Strategy:</strong> Developing a tailored implementation plan</li>
                  <li><strong>Execution:</strong> Implementing solutions with minimal disruption</li>
                  <li><strong>Optimization:</strong> Continuous improvement and support</li>
                </ol>
                
                <div style={{ marginTop: '2rem' }}>
                  <button 
                    onClick={() => {
                      setActiveService(null); // Close the modal
                      navigate('/contact-form'); // Navigate to contact form
                    }}
                    style={{
                      background: 'var(--primary-dark-blue)',
                      color: 'white',
                      border: 'none',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    Request a Consultation
                  </button>
                </div>
              </ModalContent>
            </Modal>
          )}
        </AnimatePresence>
      </ServicesInner>
    </ServicesContainer>
  );
};

export default ServicesSection;