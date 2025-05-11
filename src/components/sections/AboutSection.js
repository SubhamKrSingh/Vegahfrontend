import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AboutContainer = styled.section`
  padding: 6rem 0;
  background-color: var(--background-light);
`;

const AboutInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 0 1.5rem;
  }
`;

const AboutContent = styled.div`
  @media (max-width: 768px) {
    order: 2;
  }
`;

const AboutImageContainer = styled.div`
  position: relative;
  height: 100%;
  
  @media (max-width: 768px) {
    order: 1;
    height: 300px;
  }
`;

const AboutImage = styled.div`
  width: 100%;
  height: 100%;
  min-height: 400px;
  background-color: var(--primary-dark-blue);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow-light);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  color: var(--primary-dark-blue);
  margin-bottom: 1.5rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 80px;
    height: 4px;
    background-color: var(--primary-light-blue);
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionText = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  color: var(--text-dark);
`;

const AboutSection = () => {
  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  const [imageRef, imageInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  return (
    <AboutContainer id="about">
      <AboutInner>
        <AboutContent ref={contentRef}>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            About Vegah
          </SectionTitle>
          
          <SectionText
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Vegah is a premier consulting firm specializing in digital transformation, SAP solutions, cloud services, and AI/ML technologies. We partner with organizations to accelerate their success through innovative technology solutions tailored to their unique business challenges.
          </SectionText>
          
          <SectionText
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Our team of experts brings decades of industry experience to deliver enterprise-grade solutions that drive efficiency, growth, and competitive advantage in today's rapidly evolving digital landscape.
          </SectionText>
        </AboutContent>
        
        <AboutImageContainer ref={imageRef}>
          <AboutImage
            as={motion.div}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={imageInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Replace with actual image */}
            <div style={{ 
              width: '100%', 
              height: '100%', 
              backgroundColor: 'var(--primary-dark-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.2rem'
            }}>
              Company Image
            </div>
          </AboutImage>
        </AboutImageContainer>
      </AboutInner>
    </AboutContainer>
  );
};

export default AboutSection;