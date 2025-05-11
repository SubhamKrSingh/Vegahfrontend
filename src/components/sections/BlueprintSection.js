import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

const BlueprintContainer = styled.section`
  padding: 6rem 0;
  background-color: var(--background-light);
`;

const BlueprintInner = styled.div`
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
  max-width: 800px;
  margin: 0 auto;
  color: var(--text-dark);
  line-height: 1.6;
`;

const BlueprintDescription = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-dark);
  text-align: center;
  max-width: 900px;
  margin: 0 auto 4rem;
`;

const BlueprintProcess = styled.div`
  position: relative;
  margin: 5rem 0;
`;

const ProcessLine = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 4px;
  background-color: var(--primary-light-blue);
  transform: translateY(-50%);
  z-index: 1;
  
  @media (max-width: 768px) {
    top: 0;
    bottom: 0;
    left: 30px;
    right: auto;
    height: auto;
    width: 4px;
    transform: none;
  }
`;

const StepsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 3rem;
  }
`;

const StepItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 22%;
  
  @media (max-width: 768px) {
    flex-direction: row;
    width: 100%;
    padding-left: 60px;
  }
`;

const StepIconContainer = styled(motion.div)`
  width: 95px; /* Decreased from 112px by 15% */
  height: 95px; /* Decreased from 112px by 15% */
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 3;
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.5s ease;
  
  &:hover {
    transform: translateY(-10px) scale(1.1) rotate(5deg);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    margin-bottom: 0;
    margin-right: 1.5rem;
    flex-shrink: 0;
  }
`;

const StepIcon = styled.div`
  width: 85px; /* Decreased from 100px by 15% */
  height: 85px; /* Decreased from 100px by 15% */
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-dark-blue);
  font-size: 1.8rem;
  
  img {
    width: 57px; /* Decreased from 67px by 15% */
    height: 57px; /* Decreased from 67px by 15% */
    transition: transform 0.5s ease;
  }
  
  &:hover img {
    transform: rotate(10deg);
  }
`;

const StepContent = styled.div`
  text-align: center;
  
  @media (max-width: 768px) {
    text-align: left;
  }
`;

const StepTitle = styled(motion.h3)`
  font-size: 1.2rem;
  color: var(--primary-dark-blue);
  margin-bottom: 0.5rem;
  font-weight: 700;
`;

const StepDescription = styled(motion.p)`
  font-size: 0.9rem;
  color: var(--text-dark);
  line-height: 1.5;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-top: 4rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StatItem = styled(motion.div)`
  background-color: rgba(0, 120, 215, 0.08); /* Changed from white to a light shade of blue */
  padding: 2rem;
  border-radius: 8px;
  box-shadow: var(--shadow-light);
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-dark-blue);
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: var(--text-dark);
  line-height: 1.4;
`;

const ProgressIndicator = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--primary-light-blue);
  transform-origin: 0%;
  z-index: 1000;
`;

const BackgroundShape = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  width: 40%;
  height: 100%;
  background: radial-gradient(circle, rgba(0, 120, 215, 0.05) 0%, rgba(0, 120, 215, 0) 70%);
  border-radius: 50%;
  z-index: 0;
`;

const BlueprintSection = () => {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  const [processRef, processInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [activeStep, setActiveStep] = useState(null);
  
  // Updated blueprintSteps to remove inline width/height as they are now handled by CSS
  const blueprintSteps = [
    {
      title: 'ASSESS',
      description: 'Strategic Discovery & Planning',
      icon: <img src="/asses.svg" alt="Assess" />
    },
    {
      title: 'ARCHITECT',
      description: 'Solution Design & Preparation',
      icon: <img src="/architect.svg" alt="Architect" />
    },
    {
      title: 'TRANSFORM',
      description: 'Implementation Excellence',
      icon: <img src="/transform.svg" alt="Transform" />
    },
    {
      title: 'MAXIMIZE',
      description: 'Continuous Optimization & Innovation',
      icon: <img src="/maximize.svg" alt="Maximize" />
    }
  ];
  
  const stats = [
    {
      value: '25%',
      label: 'faster time-to-value through comprehensive initial assessment'
    },
    {
      value: '40%',
      label: 'reduction in implementation challenges through proper preparation'
    },
    {
      value: '99.9%',
      label: 'implementation success rate with 30-35% faster deployment'
    },
    {
      value: '30-40%',
      label: 'TCO reduction, accelerated innovation cycles, and significant competitive advantages'
    }
  ];
  
  // Updated line animation to go from left to right
  const lineVariants = {
    hidden: { width: 0, left: 0, right: 'auto' },
    visible: { 
      width: '100%',
      left: 0,
      right: 'auto',
      transition: { 
        duration: 1.8,
        ease: 'easeInOut'
      }
    }
  };
  
  // Updated mobile line animation to also go from top to bottom
  const mobileLineVariants = {
    hidden: { height: 0, top: 0, bottom: 'auto' },
    visible: { 
      height: '100%',
      top: 0,
      bottom: 'auto',
      transition: { 
        duration: 1.8,
        ease: 'easeInOut'
      }
    }
  };
  
  const stepVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + (0.2 * i),
        duration: 0.6,
        ease: 'easeOut'
      }
    })
  };
  
  // Update the iconVariants for more pronounced animation
  const iconVariants = {
    hidden: { scale: 0, rotate: -20 },
    visible: (i) => ({
      scale: 1,
      rotate: 0,
      transition: {
        delay: 0.5 + (0.2 * i),
        duration: 0.7,
        type: 'spring',
        stiffness: 150,
        damping: 10
      }
    }),
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.3,
        type: 'spring',
        stiffness: 300
      }
    }
  };
  
  const statVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 * i,
        duration: 0.6
      }
    })
  };
  
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  
  const titleVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, type: "spring", stiffness: 100 }
    }
  };
  
  const descriptionVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }
    }
  };
  
  return (
    <>
      <ProgressIndicator style={{ scaleX: scrollYProgress }} />
      <BlueprintContainer id="blueprint">
        <BackgroundShape style={{ y: backgroundY }} />
        <BlueprintInner>
          <SectionHeader ref={headerRef}>
            <SectionTitle
              variants={titleVariants}
              initial="hidden"
              animate={headerInView ? "visible" : "hidden"}
            >
              Vegah Transformation Blueprint
            </SectionTitle>
            
            <SectionSubtitle
              variants={descriptionVariants}
              initial="hidden"
              animate={headerInView ? "visible" : "hidden"}
            >
              Our proven methodology for successful digital transformation
            </SectionSubtitle>
          </SectionHeader>
          
          <BlueprintDescription
            variants={descriptionVariants}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Vegah's proven transformation methodology accelerates business outcomes while minimizing risk. Our structured approach combines strategic vision with technical excellence to create sustainable competitive advantages across all technology initiatives. This blueprint is designed to deliver speed, momentum, and velocity at every stage of your transformation journey.
          </BlueprintDescription>
          
          <BlueprintProcess ref={processRef}>
            <ProcessLine 
              variants={window.innerWidth > 768 ? lineVariants : mobileLineVariants}
              initial="hidden"
              animate={processInView ? "visible" : "hidden"}
            />
            
            <StepsContainer>
              {blueprintSteps.map((step, index) => (
                <StepItem
                  key={index}
                  custom={index}
                  variants={stepVariants}
                  initial="hidden"
                  animate={processInView ? "visible" : "hidden"}
                >
                  <StepIconContainer
                    key={index}
                    custom={index}
                    variants={iconVariants}
                    initial="hidden"
                    animate={processInView ? "visible" : "hidden"}
                    whileHover="hover"
                >
                  <StepIcon>{step.icon}</StepIcon>
                </StepIconContainer>
                  
                  <StepContent>
                    <StepTitle
                      initial={{ opacity: 0 }}
                      animate={processInView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.6 + (0.2 * index), duration: 0.4 }}
                    >
                      {step.title}
                    </StepTitle>
                    <StepDescription
                      initial={{ opacity: 0 }}
                      animate={processInView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.7 + (0.2 * index), duration: 0.4 }}
                    >
                      {step.description}
                    </StepDescription>
                  </StepContent>
                </StepItem>
              ))}
            </StepsContainer>
          </BlueprintProcess>
          
          <StatsContainer ref={statsRef}>
            {stats.map((stat, index) => (
              <StatItem
                key={index}
                custom={index}
                variants={statVariants}
                initial="hidden"
                animate={statsInView ? "visible" : "hidden"}
              >
                <StatValue>
                  {statsInView ? <AnimatedCounter value={stat.value} /> : stat.value}
                </StatValue>
                <StatLabel>{stat.label}</StatLabel>
              </StatItem>
            ))}
          </StatsContainer>
        </BlueprintInner>
      </BlueprintContainer>
    </>
  );
};

const AnimatedCounter = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const isPercentage = value.includes('%');
  const numericValue = parseInt(value);
  
  useEffect(() => {
    let start = 0;
    const end = numericValue;
    
    if (start === end) return;
    
    const totalMilSecDur = duration * 1000;
    const incrementTime = totalMilSecDur / end;
    
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);
    
    return () => clearInterval(timer);
  }, [numericValue, duration]);
  
  return <>{count}{isPercentage ? '%' : ''}</>;
};

export default BlueprintSection;