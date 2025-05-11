import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

const HeroContainer = styled(motion.section)`
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  position: relative;
  background: linear-gradient(135deg, rgba(11, 60, 93, 0.9) 0%, rgba(50, 140, 193, 0.8) 100%), url(${process.env.PUBLIC_URL}/bg2.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: var(--text-light);
  overflow: hidden;
`;

// Add eslint-disable comments for unused styled components
// eslint-disable-next-line no-unused-vars
const GradientOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg,
    rgba(11, 60, 93, 0.7) 0%,
    rgba(50, 140, 193, 0.6) 25%,
    rgba(11, 60, 93, 0.7) 50%,
    rgba(50, 140, 193, 0.6) 75%,
    rgba(11, 60, 93, 0.7) 100%);
  background-size: 400% 400%;
  animation: gradientAnimation 15s ease infinite;
  z-index: 1;
  mix-blend-mode: multiply;

  @keyframes gradientAnimation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: -13%;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
    margin-left: 1rem;
  }
`;

const HeroLayout = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  line-height: 1.1;
  color: rgba(255, 255, 255, 0.95);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.h2)`
  font-size: 1.5rem;
  font-weight: 400;
  margin-top: 2rem;
  margin-bottom: 2.5rem;
  max-width: 600px;
  color: rgba(255, 255, 255, 0.8);

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-top: 1.5rem;
  }
`;

const HeroButton = styled(motion.button)`
  background-color: #3e92cc;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: #2980b9;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.2);
    transform: translateX(-100%);
  }

  &:hover:after {
    transform: translateX(100%);
    transition: transform 0.6s ease;
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
  }
`;

const BackgroundShape = styled(motion.div)`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
`;

const HighlightText = styled(motion.span)`
  color: rgba(255, 255, 255, 0.9);
  position: relative;
  display: block;
  font-size: 4rem;
  font-weight: 700;
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

// eslint-disable-next-line no-unused-vars
const GraphImage = styled(motion.img)`
  width: 168.897855%;
  max-width: 1688.97855px;
  height: auto;
  margin-right: 90%; /* Moved closer to the text */
  margin-top: 33vh;
  z-index: 2;

  @media (max-width: 1024px) {
    width: 80%;
    margin: 2rem auto 0;
    display: block;
    margin-right: 0;
  }

  @media (max-width: 768px) {
    width: 90%;
  }
`;

// Add this new styled component for the Vegah logo
const VegahLogo = styled(motion.img)`
  position: absolute;
  width: 255.42px; /* Decreased by 1% from 258.0px */
  height: auto;
  top: 37%; /* Moved up by 1% from 38% */
  right: 24.5%; /* Moved left by 2% from 22.5% */
  transform: translateY(-50%);
  z-index: 3;
  
  @media (max-width: 768px) {
    width: 170.33px; /* Decreased by 1% from 172.05px */
    top: 10%; /* Moved up by 1% from 11% */
    right: 24.5%; /* Moved left by 2% from 22.5% */
  }
`;

// Add this new styled component for the Graph image
const GraphSvg = styled(motion.img)`
  position: absolute;
  width: 1000px;
  height: auto;
  top: 1%;
  right: 7.5%;
  transform: translateY(-50%);
  z-index: 3;
  
  @media (max-width: 1440px) {
    width: 800px;
    top: 0%;
    right: 6%;
  }
  
  @media (max-width: 1200px) {
    width: 600px;
    top: -2%;
    right: 5%;
  }
  
  @media (max-width: 992px) {
    width: 450px;
    top: -5%;
    right: 4%;
  }
  
  @media (max-width: 768px) {
    width: 300px;
    top: -26%;
    right: 25%;
  }
  
  @media (max-width: 576px) {
    width: 250px;
    top: -28%;
    right: 20%;
  }
  
  @media (max-width: 480px) {
    width: 200px;
    top: -30%;
    right: 15%;
  }
`;

const HeroSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  const leftEntryVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  // Keep this for other animations
  const rightEntryVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  return (
    <HeroContainer id="hero" ref={ref}>
      {/* Add the Vegah logo to the right side */}
      <VegahLogo 
        src={`${process.env.PUBLIC_URL}/vegah.svg`}
        alt="Vegah Logo"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          delay: 0.5, 
          duration: 0.8,
          type: "spring",
          stiffness: 50
        }}
      />
      
      {/* Add the Graph SVG to the right of Vegah logo */}
      <GraphSvg
        src={`${process.env.PUBLIC_URL}/graph.svg`}
        alt="Graph"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
        }}
        transition={{ 
          delay: 1.3, 
          duration: 0.8,
          type: "spring",
          stiffness: 50
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        whileInView={{
          scale: [1, 1.03, 1],
          transition: {
            repeat: Infinity,
            repeatType: "reverse",
            duration: 2
          }
        }}
        drag
        dragConstraints={{
          top: -50,
          left: -50,
          right: 50,
          bottom: 50,
        }}
        dragElastic={0.1}
      />
      
      <BackgroundShape
        style={{
          width: '400px',
          height: '400px',
          top: '-100px',
          right: '-100px',
        }}
        animate={{
          x: [0, 20, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: 'easeInOut',
        }}
      />
      <BackgroundShape
        style={{
          width: '300px',
          height: '300px',
          bottom: '-50px',
          left: '10%',
        }}
        animate={{
          x: [0, -30, 0],
          y: [0, 20, 0],
          scale: [1, 1.05, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          repeat: Infinity,
          duration: 15,
          ease: 'easeInOut',
        }}
      />
      <BackgroundShape
        style={{
          width: '200px',
          height: '200px',
          top: '30%',
          left: '5%',
        }}
        animate={{
          x: [0, 15, 0],
          y: [0, -15, 0],
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: 'easeInOut',
        }}
      />

      <HeroLayout>
        <motion.div variants={leftEntryVariants} initial="hidden" animate={controls}>
          <HeroContent>
            <motion.div variants={itemVariants}>
              <HeroTitle>Accelerating</HeroTitle>
            </motion.div>
            <motion.div variants={itemVariants}>
              <HighlightText
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                Success
              </HighlightText>
            </motion.div>
            <motion.div variants={itemVariants}>
              <HeroSubtitle>
                Your Strategic Technology Partner for Business Transformation
              </HeroSubtitle>
            </motion.div>
            <motion.div variants={itemVariants}>
              <StyledLink to="/contact-form">
                <HeroButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  Start Your Transformation
                </HeroButton>
              </StyledLink>
            </motion.div>
          </HeroContent>
        </motion.div>
        
        {/* Removed the motion.div that contained the GraphImage component */}
      </HeroLayout>
    </HeroContainer>
  );
};

export default HeroSection;
