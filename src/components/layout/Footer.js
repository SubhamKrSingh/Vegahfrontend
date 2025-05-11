import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const FooterContainer = styled.footer`
  background-color: var(--primary-dark-blue);
  color: white;
  padding-top: 5rem;
`;

const FooterInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FooterColumn = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const FooterLogo = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  letter-spacing: 1px;
  
  span.dark-blue {
    color: white;
  }
  
  span.light-blue {
    color: var(--primary-light-blue);
  }
  
  .tagline {
    font-size: 0.8rem;
    display: block;
    font-weight: 400;
    letter-spacing: 0.5px;
    margin-top: 0.5rem;
  }
`;

const FooterDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  opacity: 0.8;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--primary-light-blue);
    transform: translateY(-3px);
  }
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.8rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background-color: var(--primary-light-blue);
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
`;

const FooterLink = styled.li`
  margin-bottom: 0.8rem;
`;

const FooterLinkAnchor = styled.a`
  color: white;
  opacity: 0.8;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
  
  &:hover {
    opacity: 1;
    transform: translateX(5px);
    color: var(--primary-light-blue);
  }
`;

const ContactInfo = styled.div`
  margin-bottom: 1.5rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const ContactIcon = styled.span`
  margin-right: 1rem;
  opacity: 0.8;
`;

const ContactText = styled.span`
  font-size: 0.95rem;
  opacity: 0.8;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormInput = styled.input`
  padding: 0.8rem 1rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  
  &:focus {
    outline: none;
    background-color: rgba(255, 255, 255, 0.15);
  }
`;

const FormTextarea = styled.textarea`
  padding: 0.8rem 1rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  resize: vertical;
  min-height: 100px;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  
  &:focus {
    outline: none;
    background-color: rgba(255, 255, 255, 0.15);
  }
`;

const FormButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: var(--primary-light-blue);
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;
  
  &:hover {
    background-color: white;
    color: var(--primary-dark-blue);
    transform: translateY(-3px);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem 0;
  text-align: center;
  font-size: 0.9rem;
  opacity: 0.7;
`;

const Footer = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const columnVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.6,
      },
    }),
  };
  
  return (
    <FooterContainer id="contact">
      <FooterInner ref={ref}>
        <FooterTop>
          <FooterColumn
            custom={0}
            variants={columnVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <FooterLogo>
              <span className="dark-blue">V</span>
              <span className="light-blue">egah</span>
              <span className="tagline">Digital Transformation & Consulting</span>
            </FooterLogo>
            <FooterDescription>
              Empowering businesses through innovative digital solutions and strategic consulting services to achieve sustainable growth and competitive advantage.
            </FooterDescription>
            <SocialLinks>
              <SocialLink href="https://www.linkedin.com/company/vegah/posts/?feedView=all" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </SocialLink>
              <SocialLink href="https://x.com/vegahllc" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                </svg>
              </SocialLink>
              <SocialLink href="https://www.facebook.com/vegahsolutions/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </SocialLink>
              <SocialLink href="https://www.instagram.com/vegahllc/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </SocialLink>
            </SocialLinks>
          </FooterColumn>
          
          <FooterColumn
            custom={1}
            variants={columnVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <FooterTitle>Quick Links</FooterTitle>
            <FooterLinks>
              <FooterLink>
                <FooterLinkAnchor href="#">Home</FooterLinkAnchor>
              </FooterLink>
              <FooterLink>
                <FooterLinkAnchor href="#">About Us</FooterLinkAnchor>
              </FooterLink>
              <FooterLink>
                <FooterLinkAnchor href="#">Services</FooterLinkAnchor>
              </FooterLink>
              <FooterLink>
                <FooterLinkAnchor href="#">SAP Solutions</FooterLinkAnchor>
              </FooterLink>
              <FooterLink>
                <FooterLinkAnchor href="#">Industries</FooterLinkAnchor>
              </FooterLink>
              <FooterLink>
                <FooterLinkAnchor href="#">Success Stories</FooterLinkAnchor>
              </FooterLink>
              <FooterLink>
                <FooterLinkAnchor href="#">Contact</FooterLinkAnchor>
              </FooterLink>
            </FooterLinks>
          </FooterColumn>
          
          <FooterColumn
            custom={2}
            variants={columnVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <FooterTitle>Contact Us</FooterTitle>
            <ContactInfo>
              <ContactItem>
                <ContactIcon>
                  <i className="fas fa-map-marker-alt"></i>
                </ContactIcon>
                <ContactText>
                Austin, Texas
                </ContactText>
              </ContactItem>
              <ContactItem>
                <ContactIcon>
                  <i className="fas fa-phone-alt"></i>
                </ContactIcon>
                <ContactText>+1 (512) 215-4045</ContactText>
              </ContactItem>
              <ContactItem>
                <ContactIcon>
                  <i className="fas fa-envelope"></i>
                </ContactIcon>
                <ContactText>info@vegah.com</ContactText>
              </ContactItem>
            </ContactInfo>
          </FooterColumn>
          
          <FooterColumn
            custom={3}
            variants={columnVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <FooterTitle>Get In Touch</FooterTitle>
            <ContactForm>
              <FormInput type="text" placeholder="Your Name" />
              <FormInput type="email" placeholder="Your Email" />
              <FormTextarea placeholder="Your Message"></FormTextarea>
              <FormButton type="submit">Send Message</FormButton>
            </ContactForm>
          </FooterColumn>
        </FooterTop>
        
        <FooterBottom>
          <p>&copy; {new Date().getFullYear()} Vegah. All rights reserved.</p>
        </FooterBottom>
      </FooterInner>
    </FooterContainer>
  );
};

export default Footer;