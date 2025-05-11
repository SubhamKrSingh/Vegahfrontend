import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const FormContainer = styled(motion.section)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem 2rem;
  background: linear-gradient(135deg, rgba(11, 60, 93, 0.7) 0%, rgba(50, 140, 193, 0.6) 100%), url(${process.env.PUBLIC_URL}/bg1.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
`;

// Add animated particles
const ParticlesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
`;

const Particle = styled(motion.div)`
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
`;
const BackgroundBubble = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(62, 146, 204, 0.1) 0%, rgba(62, 146, 204, 0) 70%);
  z-index: 0;
`;

const FormCard = styled(motion.div)`
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  padding: 3rem;
  position: relative;
  z-index: 1;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #0a2463;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  z-index: 2;
  
  &:hover {
    background-color: rgba(10, 36, 99, 0.1);
  }
`;

const FormTitle = styled.h1`
  font-size: 2.5rem;
  color: #0a2463;
  margin-bottom: 2rem;
  text-align: center;
`;

const FormSubtitle = styled.p`
  font-size: 1.1rem;
  color: #4b5563;
  margin-bottom: 2rem;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #1f2937;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #3e92cc;
    box-shadow: 0 0 0 3px rgba(62, 146, 204, 0.1);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #3e92cc;
    box-shadow: 0 0 0 3px rgba(62, 146, 204, 0.1);
  }
`;

const SubmitButton = styled(motion.button)`
  background-color: #3e92cc;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 1rem;
  
  &:hover {
    background-color: #0a2463;
  }
`;

const ContactFormPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
  });
  
  const [isVisible, setIsVisible] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    alert('Thank you for your interest! We will contact you soon.');
  };
  
  const handleClose = () => {
    setIsVisible(false);
    // You might want to redirect or do something else when closed
    setTimeout(() => {
      window.history.back();
    }, 500);
  };
  
  // Background animation bubbles
  const bubbles = [
    { size: 300, x: '10%', y: '20%', duration: 20 },
    { size: 200, x: '70%', y: '15%', duration: 15 },
    { size: 250, x: '40%', y: '80%', duration: 25 },
    { size: 180, x: '85%', y: '60%', duration: 18 },
  ];
  
  // Add particles configuration
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 10 + 5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10
  }));

  return (
    <AnimatePresence>
      {isVisible && (
        <FormContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ParticlesContainer>
            {particles.map(particle => (
              <Particle
                key={particle.id}
                style={{
                  width: particle.size,
                  height: particle.size,
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, 15, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  repeat: Infinity,
                  duration: particle.duration,
                  ease: "easeInOut",
                }}
              />
            ))}
          </ParticlesContainer>
          
          {bubbles.map((bubble, index) => (
            <BackgroundBubble
              key={index}
              style={{
                width: bubble.size,
                height: bubble.size,
                left: bubble.x,
                top: bubble.y,
              }}
              animate={{
                x: [20, -20, 20],
                y: [20, -20, 20],
                scale: [1, 1.1, 1],
              }}
              transition={{
                repeat: Infinity,
                repeatType: 'reverse',
                duration: bubble.duration,
                ease: 'easeInOut',
              }}
            />
          ))}
          
          <FormCard
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <CloseButton 
              onClick={handleClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ×
            </CloseButton>
            
            <FormTitle>Start Your Transformation</FormTitle>
            <FormSubtitle>Tell us about your project and we'll get back to you shortly</FormSubtitle>
            
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <FormLabel htmlFor="name">Your Name</FormLabel>
                <FormInput 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel htmlFor="email">Your Email</FormLabel>
                <FormInput 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel htmlFor="service">Service You're Interested In</FormLabel>
                <FormSelect 
                  id="service" 
                  name="service" 
                  value={formData.service} 
                  onChange={handleChange} 
                  required
                >
                  <option value="">Select a service</option>
                  <option value="digital-transformation">Digital Transformation</option>
                  <option value="cloud-services">Cloud Managed Services</option>
                  <option value="app-development">Application Development</option>
                  <option value="erp">ERP Implementations</option>
                  <option value="ai-ml">AI/ML & Emerging Tech</option>
                  <option value="strategy">Strategy Consulting</option>
                  <option value="process">Process Optimization</option>
                  <option value="tech-assessment">Technology Assessment</option>
                  <option value="sap-implementation">SAP Implementation</option>
                  <option value="sap-migration">SAP Migration</option>
                  <option value="sap-support">SAP Support</option>
                </FormSelect>
              </FormGroup>
              
              <SubmitButton 
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Let's Talk
              </SubmitButton>
            </form>
          </FormCard>
        </FormContainer>
      )}
    </AnimatePresence>
  );
};

export default ContactFormPage;