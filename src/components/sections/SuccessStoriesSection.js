import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const StoriesContainer = styled(motion.section)`
  padding: 6rem 0;
  position: relative;
  overflow: hidden;
  background: linear-gradient(to bottom, rgba(0, 120, 215, 0.03) 0%, rgba(0, 120, 215, 0.08) 100%);
`;

// Add animated floating particles
const FloatingParticles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  
  &:before, &:after {
    content: '';
    position: absolute;
    border-radius: 50%;
    background: var(--primary-light-blue);
    opacity: 0.05;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
  
  &:before {
    width: 300px;
    height: 300px;
    bottom: -100px;
    right: 10%;
    animation: floatStories1 15s infinite;
  }
  
  &:after {
    width: 200px;
    height: 200px;
    top: 10%;
    left: 5%;
    animation: floatStories2 18s infinite;
  }
  
  @keyframes floatStories1 {
    0% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-30px) scale(1.1); }
    100% { transform: translateY(0) scale(1); }
  }
  
  @keyframes floatStories2 {
    0% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(20px, 20px) scale(1.15); }
    100% { transform: translate(0, 0) scale(1); }
  }
`;

const BackgroundShape = styled.div`
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background-color: rgba(50, 140, 193, 0.05);
  bottom: -300px;
  left: -200px;
  z-index: 1;
`;

const StoriesInner = styled.div`
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

const CarouselContainer = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 900px;
`;

const CarouselTrack = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  transform: translateX(${props => props.translateValue}%);
  gap: 30px; /* Added gap between cards */
`;

const StoryCard = styled(motion.div)`
  flex: 0 0 100%;
  background-color: white;
  border-radius: 12px; /* Increased from 8px for softer corners */
  padding: 3.5rem; /* Increased from 3rem for more spacious feel */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08); /* Enhanced shadow for better depth */
  display: flex;
  flex-direction: column;
  margin: 10px; /* Added margin around cards */
  border: 1px solid rgba(0, 120, 215, 0.1); /* Added subtle border */
  
  @media (max-width: 768px) {
    padding: 2.5rem; /* Increased from 2rem */
  }
`;

const StoryQuote = styled.blockquote`
  font-size: 1.2rem;
  line-height: 1.8;
  color: var(--text-dark);
  margin-bottom: 2rem;
  font-style: italic;
  position: relative;
  
  &:before {
    content: '"';
    font-size: 4rem;
    color: var(--primary-light-blue);
    opacity: 0.3;
    position: absolute;
    top: -2rem;
    left: -1rem;
  }
`;

const StoryAuthor = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
`;

const AuthorAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--primary-dark-blue);
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.h4`
  font-size: 1.1rem;
  color: var(--primary-dark-blue);
  margin-bottom: 0.3rem;
`;

const AuthorTitle = styled.p`
  font-size: 0.9rem;
  color: var(--text-gray);
`;

const CarouselControls = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 1rem;
`;

const CarouselDot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.active ? 'var(--primary-light-blue)' : 'rgba(0, 0, 0, 0.1)'};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.active ? 'var(--primary-light-blue)' : 'rgba(0, 0, 0, 0.2)'};
  }
`;

const CarouselArrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(0, 120, 215, 0.15); /* Changed from white to light blue */
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 3;
  transition: all 0.3s ease;
  font-size: 1.2rem;
  color: var(--primary-dark-blue); /* Added darker blue text color for contrast */
  
  ${props => props.direction === 'prev' ? 'left: -30px;' : 'right: -30px;'}
  
  &:hover {
    background-color: var(--primary-light-blue);
    color: white;
    transform: translateY(-50%) scale(1.1);
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const SuccessStoriesSection = () => {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [translateValue, setTranslateValue] = useState(0);
  
  const successStories = [
    {
      quote: "‎ ‎ Vegah LLC has been a game-changer for our organization. Their expertise in digital transformation and ERP implementation has streamlined our operations and increased efficiency by 30%.",
      name: "CEO",
      title: "FinTech",
      initials: "FT"
    },
    {
      quote: "‎ ‎ We were struggling to find the right talent for our IT projects, but Vegah's staffing solutions delivered top-notch professionals who exceeded our expectations. Their service is unparalleled.",
      name: "CTO",
      title: "Healthcare Provider",
      initials: "HC"
    },
    {
      quote: "‎ ‎ Vegah's cloud managed services have ensured our infrastructure is secure, scalable, and always available. Their proactive approach has prevented downtime and saved us thousands.",
      name: "IT Manager",
      title: "E-commerce Firm",
      initials: "EC"
    },
    {
      quote: "‎ ‎ We needed a custom software solution to automate our business processes. Vegah delivered a high-quality product tailored to our needs. Their AI/ML and DevOps expertise is impressive.",
      name: "COO",
      title: "Industrial Automation Company",
      initials: "IA"
    },
    {
      quote: "‎ ‎ Vegah's social media management transformed our online presence — followers increased by 500% and engagement grew by 200% in just a few months. Creative, responsive, and results-driven.",
      name: "Marketing Manager",
      title: "EdTech Platform",
      initials: "ET"
    },
    {
      quote: "‎ ‎ Vegah's SAP resident engineer ensured our mission-critical SAP applications ran smoothly, minimizing downtime and maximizing efficiency. Their expertise is invaluable.",
      name: "Operations Director",
      title: "Paints Manufacturing Company",
      initials: "PM"
    },
    {
      quote: "‎ ‎ Thanks to Vegah, we optimized our IT infrastructure, reduced costs by 25%, and improved performance by 40%. Their team is knowledgeable, flexible, and customer-focused.",
      name: "IT Director",
      title: "Financial Services",
      initials: "FS"
    },
    {
      quote: "‎ ‎ We needed a trusted partner to guide our digital transformation. Vegah exceeded expectations with their expertise, service, and dedication to our success.",
      name: "CEO",
      title: "Technology Startup",
      initials: "TS"
    }
  ];
  
  const nextSlide = () => {
    if (activeIndex === successStories.length - 1) {
      setActiveIndex(0);
      setTranslateValue(0);
    } else {
      setActiveIndex(activeIndex + 1);
      setTranslateValue(-(activeIndex + 1) * 100);
    }
  };
  
  const prevSlide = () => {
    if (activeIndex === 0) {
      setActiveIndex(successStories.length - 1);
      setTranslateValue(-(successStories.length - 1) * 100);
    } else {
      setActiveIndex(activeIndex - 1);
      setTranslateValue(-(activeIndex - 1) * 100);
    }
  };
  
  const goToSlide = (index) => {
    setActiveIndex(index);
    setTranslateValue(-index * 100);
  };
  
  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 8000);
    
    return () => clearInterval(interval);
  }, [activeIndex]);
  
  return (
    <StoriesContainer 
      id="success-stories"
      initial={{ backgroundPosition: "0 -100%" }}
      animate={{ backgroundPosition: "0 0%" }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <BackgroundShape />
      <FloatingParticles />
      <StoriesInner>
        <SectionHeader ref={headerRef}>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Success Stories
          </SectionTitle>
          
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            See how we've helped organizations achieve their digital transformation goals
          </SectionSubtitle>
        </SectionHeader>
        
        <CarouselContainer ref={contentRef}>
          <CarouselArrow 
            direction="prev" 
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            ←
          </CarouselArrow>
          
          <CarouselTrack translateValue={translateValue}>
            {successStories.map((story, index) => (
              <StoryCard
                key={index}
                initial={{ opacity: 0 }}
                animate={contentInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <StoryQuote>
                  {story.quote}
                </StoryQuote>
                
                <StoryAuthor>
                  <AuthorAvatar>{story.initials}</AuthorAvatar>
                  <AuthorInfo>
                    <AuthorName>{story.name}</AuthorName>
                    <AuthorTitle>{story.title}</AuthorTitle>
                  </AuthorInfo>
                </StoryAuthor>
              </StoryCard>
            ))}
          </CarouselTrack>
          
          <CarouselArrow 
            direction="next" 
            onClick={nextSlide}
            aria-label="Next slide"
          >
            →
          </CarouselArrow>
          
          <CarouselControls>
            {successStories.map((_, index) => (
              <CarouselDot 
                key={index} 
                active={activeIndex === index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </CarouselControls>
        </CarouselContainer>
      </StoriesInner>
    </StoriesContainer>
  );
};

export default SuccessStoriesSection;