import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Utility function to replace @/lib/utils cn function
// Add eslint-disable comment for the cn utility function
// eslint-disable-next-line no-unused-vars
const cn = (...classes) => classes.filter(Boolean).join(' ');

// Styled components for UI elements that were imported from @/components/ui
const StyledButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  cursor: pointer;
  border: none; /* Ensure no default button border */

  &.primary {
    background-color: #3e92cc;
    color: white;
    &:hover {
      background-color: #0a2463;
    }
  }

  &.ghost {
    background-color: transparent;
    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }

  &.icon {
    padding: 0.5rem;
  }
`;

// Add eslint-disable comments for these styled components
// eslint-disable-next-line no-unused-vars
const StyledSheet = styled.div`
  position: relative;
`;

// eslint-disable-next-line no-unused-vars
const StyledSheetTrigger = styled.div`
  display: inline-block;
`;

const StyledSheetContent = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 350px;
  background: white;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
  z-index: 100;
  overflow-y: auto; /* Use overflow-y for scrolling */
  display: flex;
  flex-direction: column;
`;

const SheetOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 99;
`;

// Hook to replace @/hooks/use-mobile
const useMobile = (breakpoint = 1024) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);

  return isMobile;
};

// Icons to replace lucide-react
const ChevronDown = ({ className, style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
  >
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

// Add eslint-disable comment for ChevronRight component
// eslint-disable-next-line no-unused-vars
const ChevronRight = ({ className, style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
  >
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

const Menu = ({ className, style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
  >
    <line x1="4" x2="20" y1="12" y2="12"/>
    <line x1="4" x2="20" y1="6" y2="6"/>
    <line x1="4" x2="20" y1="18" y2="18"/>
  </svg>
);

// Navigation data structure - updated to support nested flyout menus
const navigationItems = [
  {
    title: "Home",
    href: "#home",
  },
  {
    title: "Services",
    href: "#services",
    megaMenu: true,
    categories: [
      {
        name: "Professional Services",
        items: [
          { name: "Digital Transformation", href: "#digital-transformation" },
          { name: "Cloud Managed Services", href: "#cloud-services" },
          { name: "Application Development", href: "#app-development" },
          { name: "ERP Implementations", href: "#erp" },
          { name: "AI/ML & Emerging Tech", href: "#ai-ml" },
        ],
      },
      {
        name: "Consulting",
        items: [
          { name: "Strategy Consulting", href: "#strategy" },
          { name: "Process Optimization", href: "#process" },
          { name: "Technology Assessment", href: "#tech-assessment" },
        ],
      },
    ],
  },
  {
    title: "SAP Solutions",
    href: "#sap",
    megaMenu: true,
    categories: [
      {
        name: "SAP Products",
        items: [
          { name: "SAP S/4HANA", href: "#sap-s4hana" },
          { name: "SAP S/4HANA Cloud", href: "#sap-s4hana-cloud" },
          { name: "SAP Business One", href: "#sap-business-one" },
          { name: "SAP Business ByDesign", href: "#sap-business-bydesign" },
        ],
      },
      {
        name: "SAP Services",
        items: [
          { name: "GROW with SAP", href: "#grow-sap" },
          { name: "SAP SuccessFactors", href: "#successfactors" },
          { name: "SAP Digital Manufacturing", href: "#digital-manufacturing" },
          { name: "SAP Implementation", href: "#sap-implementation" },
          { name: "SAP Migration", href: "#sap-migration" },
          { name: "SAP Support", href: "#sap-support" },
        ],
      },
    ],
  },
  {
    title: "Industries",
    href: "#industries",
    megaMenu: true,
    categories: [
      {
        name: "Industry Sectors",
        items: [
          { name: "Healthcare", href: "#healthcare" },
          { name: "Finance", href: "#finance" },
          { name: "Retail", href: "#retail" },
          { name: "Government", href: "#government" },
          { name: "Education", href: "#education" },
          { name: "Manufacturing", href: "#manufacturing" },
        ],
      },
    ],
  },
  {
    title: "Contact",
    href: "#contact",
  },
];

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null); // For desktop mega-menu
  // eslint-disable-next-line no-unused-vars
  const [activeFlyout, setActiveFlyout] = useState(null); // Will be used in future implementation
  // eslint-disable-next-line no-unused-vars
  const flyoutRefs = useRef({}); // Will be used in future implementation
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Add new state for tracking hovered category in desktop mega-menu
  const [hoveredCategoryName, setHoveredCategoryName] = useState(null);
  // State for tracking active category in mobile menu for expansion
  const [mobileActiveCategory, setMobileActiveCategory] = useState(null);

  const isMobile = useMobile();
  const menuRef = useRef(null);
  // Remove this duplicate declaration
  // const flyoutRefs = useRef({});

  // Handle scroll effect for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mega menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
        setHoveredCategoryName(null); // Reset hovered category when clicking outside the mega menu
      }
    };

    if (activeMenu !== null && !isMobile) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeMenu, isMobile]);

  // Close mobile menu when changing to desktop view
  useEffect(() => {
    if (!isMobile && mobileMenuOpen) {
      setMobileMenuOpen(false);
      document.body.style.overflow = 'unset';
      setMobileActiveCategory(null); // Reset mobile active category when switching to desktop
    }
  }, [isMobile, mobileMenuOpen]);

  // Toggle mobile sheet and manage body overflow
  const toggleMobileSheet = () => {
    setMobileMenuOpen(prev => {
      if (!prev) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
        setMobileActiveCategory(null); // Collapse all categories when closing mobile menu
      }
      return !prev;
    });
  };

  // Cleanup body overflow on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleMegaMenuHover = (title) => {
    if (!isMobile) {
      setActiveMenu(title);
      // Set the first category as hovered by default when entering the mega menu
      const currentItem = navigationItems.find(item => item.title === title);
      if (currentItem && currentItem.categories && currentItem.categories.length > 0) {
        setHoveredCategoryName(currentItem.categories[0].name);
      } else {
        setHoveredCategoryName(null);
      }
    }
  };

  const handleMegaMenuLeave = () => {
    if (!isMobile) {
      setActiveMenu(null);
      setHoveredCategoryName(null); // Reset hovered category when leaving mega menu
    }
  };

  // Handlers for category hover in desktop mega menu (left column)
  const handleCategoryHover = (category) => {
    if (!isMobile) {
      setHoveredCategoryName(category);
    }
  };

  // Mobile menu category toggle
  const handleMobileCategoryToggle = (itemTitle) => {
    setMobileActiveCategory(mobileActiveCategory === itemTitle ? null : itemTitle);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 50,
        transition: 'all 0.3s ease-in-out',
        backgroundColor: isScrolled ? 'white' : 'rgba(255, 255, 255, 0.95)',
        padding: isScrolled ? '0.5rem 0' : '1rem 0',
        boxShadow: isScrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo - Left side */}
        <a href="/" style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          flexShrink: 0,
          marginLeft: '0', // Changed from -17% to 0 to keep logo within screen bounds
        }}>
          <div style={{ fontWeight: 'bold', fontSize: '2.2rem' }}>
            <span style={{ color: '#0a2463' }}>V</span>
            <span style={{ color: '#0a2463' }}>E</span>
            <span style={{ color: '#0a2463' }}>G</span>
            <span style={{ color: '#3e92cc' }}>A</span>
            <span style={{ color: '#0a2463' }}>H</span>
          </div>
          <span style={{
            marginLeft: '1rem',
            fontSize: '1.1rem',
            color: '#4b5563',
            display: isMobile ? 'none' : 'inline-block'
          }}>
            Accelerating Success
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav style={{
          display: isMobile ? 'none' : 'flex',
          alignItems: 'center',
          marginLeft: 'auto', // Changed from 50% to auto to properly align navigation
          justifyContent: 'flex-end', 
          gap: '0.75rem',
          flex: 1, // Allows the nav to take up available space and push items to the right
          flexWrap: 'nowrap',
          whiteSpace: 'nowrap',
          position: 'relative', // Added for correct positioning of mega menu dropdowns
          pointerEvents: 'auto', // Ensure pointer events work
          paddingLeft: '2rem', // Added padding to create gap between "Accelerating Success" and navigation items
        }}>
         
          {navigationItems.map((item) => (
            <div
              key={item.title}
              style={{
                position: 'relative',
              }}
              onMouseEnter={item.megaMenu ? () => handleMegaMenuHover(item.title) : undefined}
              onMouseLeave={item.megaMenu ? handleMegaMenuLeave : undefined}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href={item.href}
                  style={{
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.375rem',
                    fontSize: '1.2rem',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    color: activeMenu === item.title && item.megaMenu && !isMobile ? '#3e92cc' : '#374151',
                    transition: 'background-color 0.2s, color 0.2s',
                    textDecoration: 'none',
                    backgroundColor: activeMenu === item.title && item.megaMenu && !isMobile ? '#f3f4f6' : 'transparent',
                  }}
                  onClick={(e) => {
                    if (item.megaMenu && !isMobile) {
                      // For desktop mega menu, prevent default navigation on click of parent link
                      e.preventDefault();
                    } else if (isMobile && item.megaMenu) {
                      // For mobile megaMenu, prevent default and toggle expansion
                      e.preventDefault();
                      handleMobileCategoryToggle(item.title);
                    } else {
                      // For non-mega menu items, allow default navigation and close mobile menu
                      setMobileMenuOpen(false); 
                      document.body.style.overflow = 'unset';
                    }
                  }}
                  aria-haspopup={item.megaMenu ? 'true' : undefined}
                  aria-expanded={item.megaMenu ? (activeMenu === item.title).toString() : undefined}
                >
                  {item.title}
                  {item.megaMenu && (
                    <motion.div
                      animate={{ rotate: activeMenu === item.title && !isMobile ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown style={{ marginLeft: '0.25rem', height: '1.2rem', width: '1.2rem' }} />
                    </motion.div>
                  )}
                </a>
              </motion.div>

              {/* Desktop Mega Menu - Modified to show on hover */}
              {item.megaMenu && !isMobile && (
                <AnimatePresence>
                  {activeMenu === item.title && (
                    <motion.div
                      ref={menuRef}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        position: 'absolute',
                        left: 0,
                        marginTop: '0.5rem',
                        width: MEGA_MENU_CONFIG.width,
                        backgroundColor: 'white',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        borderRadius: '0.375rem',
                        overflow: 'visible',
                        zIndex: 1000,
                        border: '1px solid #f3f4f6',
                        display: 'flex',
                        pointerEvents: 'all',
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div style={{ display: 'flex', width: '100%' }}>
                        {/* Categories Column - Left side */}
                        <div style={{ 
                          width: MEGA_MENU_CONFIG.leftColumnWidth, 
                          backgroundColor: '#f9fafb', 
                          padding: MEGA_MENU_CONFIG.padding,
                          position: 'relative',
                          zIndex: 1002,
                          pointerEvents: 'all'
                        }}>
                          {item.categories?.map((category) => (
                            <div
                              key={category.name}
                              style={{
                                padding: MEGA_MENU_CONFIG.itemPadding,
                                cursor: 'pointer',
                                backgroundColor: hoveredCategoryName === category.name ? '#f3f4f6' : 'transparent',
                                transition: 'background-color 0.2s',
                                position: 'relative',
                                zIndex: 1,
                              }}
                              onMouseEnter={() => handleCategoryHover(category.name)}
                            >
                              <h3 style={{
                                fontWeight: 600,
                                color: hoveredCategoryName === category.name ? '#3e92cc' : '#1f2937',
                                fontSize: MEGA_MENU_CONFIG.fontSize,
                                margin: '0',
                                transition: 'color 0.2s',
                              }}>
                                {category.name}
                              </h3>
                            </div>
                          ))}
                        </div>

                        {/* Items Column - Right side */}
                        <div style={{ width: MEGA_MENU_CONFIG.rightColumnWidth, padding: MEGA_MENU_CONFIG.padding }}>
                          {hoveredCategoryName ? (
                            <AnimatePresence mode="wait">
                              <motion.div
                                key={hoveredCategoryName}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                  {item.categories.find(cat => cat.name === hoveredCategoryName)?.items.map((subItem) => (
                                    <li key={subItem.name}>
                                      <a
                                        href={subItem.href}
                                        style={{
                                          display: 'block',
                                          padding: '0.375rem 0.5rem',
                                          fontSize: '1rem',
                                          color: '#374151',
                                          borderRadius: '0.375rem',
                                          textDecoration: 'none',
                                          transition: 'background-color 0.2s, color 0.2s',
                                        }}
                                        onMouseOver={(e) => {
                                          e.currentTarget.style.backgroundColor = '#f3f4f6';
                                          e.currentTarget.style.color = '#3e92cc';
                                          const indicator = e.currentTarget.querySelector('.hover-indicator');
                                          const chevron = e.currentTarget.querySelector('.hover-chevron');
                                          if (indicator) indicator.style.opacity = 1;
                                          if (chevron) chevron.style.opacity = 1;
                                        }}
                                        onMouseOut={(e) => {
                                          e.currentTarget.style.backgroundColor = 'transparent';
                                          e.currentTarget.style.color = '#374151';
                                          const indicator = e.currentTarget.querySelector('.hover-indicator');
                                          const chevron = e.currentTarget.querySelector('.hover-chevron');
                                          if (indicator) indicator.style.opacity = 0;
                                          if (chevron) chevron.style.opacity = 0;
                                        }}
                                        onClick={() => setActiveMenu(null)}
                                      >
                                        <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                                          {subItem.name}
                                        </div>
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </motion.div>
                            </AnimatePresence>
                          ) : null}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}

          {/* "Start Your Transformation" button - now part of the nav */}
          <StyledButton
            className="primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              fontSize: '1.1rem',
              backgroundColor: '#3e92cc',
              padding: '0.6rem 1.2rem',
              borderRadius: '0.25rem',
              marginLeft: 'auto', // Pushes button to the right within the nav
            }}
            onClick={() => {
              window.location.href = '/contact-form';
              setMobileMenuOpen(false); // Close mobile menu if opened
              document.body.style.overflow = 'unset';
            }}
          >
            Start Your Transformation
          </StyledButton>
        </nav>

        {/* Mobile Navigation Trigger */}
        <div style={{
          display: isMobile ? 'block' : 'none',
          marginLeft: '1rem' // Keep this as a basic spacing for the trigger
        }}>
          <StyledButton
            className="ghost icon"
            onClick={toggleMobileSheet}
            aria-label="Toggle mobile menu"
          >
            <Menu style={{ height: '1.5rem', width: '1.5rem' }} />
            <span style={{
              position: 'absolute',
              width: '1px',
              height: '1px',
              padding: 0,
              margin: '-1px',
              overflow: 'hidden',
              clip: 'rect(0, 0, 0, 0)',
              whiteSpace: 'nowrap',
              borderWidth: 0
            }}>
              Toggle menu
            </span>
          </StyledButton>
        </div>
      </div>

      {/* Mobile Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <SheetOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={toggleMobileSheet}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileMenuOpen && (
          <StyledSheetContent
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                <span style={{ color: '#0a2463' }}>V</span>
                <span style={{ color: '#0a2463' }}>E</span>
                <span style={{ color: '#0a2463' }}>G</span>
                <span style={{ color: '#3e92cc' }}>A</span>
                <span style={{ color: '#0a2463' }}>H</span>
              </div>
              <StyledButton
                className="ghost icon"
                onClick={toggleMobileSheet}
                aria-label="Close mobile menu"
              >
                {/* Close icon (X) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ height: '1.5rem', width: '1.5rem' }}
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </StyledButton>
            </div>
            <div style={{ padding: '0 1rem 1rem 1rem', borderBottom: '1px solid #e5e7eb' }}>
              <span style={{ fontSize: '1rem', color: '#4b5563' }}>Accelerating Success</span>
            </div>
            <nav style={{ flex: 1, overflowY: 'auto', padding: '1rem 0' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {navigationItems.map((item) => (
                  <li key={item.title} style={{ marginBottom: '0.5rem' }}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        if (item.megaMenu) {
                          e.preventDefault(); // Prevent navigation if it's a megaMenu item
                          handleMobileCategoryToggle(item.title);
                        } else {
                          toggleMobileSheet(); // Close sheet for regular links
                        }
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0.75rem 1rem',
                        fontSize: '1.1rem',
                        fontWeight: 500,
                        color: '#1f2937',
                        textDecoration: 'none',
                        backgroundColor: mobileActiveCategory === item.title ? '#f3f4f6' : 'transparent',
                        borderRadius: '0.375rem',
                        transition: 'background-color 0.2s',
                      }}
                    >
                      {item.title}
                      {item.megaMenu && (
                        <motion.div
                          animate={{ rotate: mobileActiveCategory === item.title ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ marginLeft: 'auto' }}
                        >
                          <ChevronDown style={{ height: '1.2rem', width: '1.2rem', color: '#6b7280' }} />
                        </motion.div>
                      )}
                    </a>
                    {item.megaMenu && mobileActiveCategory === item.title && (
                      <motion.div
                        id={`mobile-submenu-${item.title}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        style={{ overflow: 'hidden' }}
                        role="menu"
                      >
                        <ul style={{ listStyle: 'none', padding: '0.5rem 0', margin: 0 }}>
                          {item.categories?.map((category) => (
                            <li key={category.name} style={{ marginBottom: '0.25rem' }}>
                              <h4 style={{
                                padding: '0.5rem 1.5rem',
                                fontSize: '1rem',
                                fontWeight: 600,
                                color: '#3e92cc',
                                margin: '0',
                              }}>
                                {category.name}
                              </h4>
                              <ul style={{ listStyle: 'none', padding: '0 0 0 2rem', margin: 0 }}>
                                {category.items.map((subItem, index) => (
                                  <motion.li 
                                    key={subItem.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ 
                                      opacity: 1, 
                                      x: 0,
                                      transition: { delay: index * 0.05 } // Staggered animation
                                    }}
                                  >
                                    <a
                                      href={subItem.href}
                                      onClick={toggleMobileSheet}
                                      style={{
                                        display: 'block',
                                        padding: '0.375rem 0.5rem',
                                        fontSize: '0.9rem',
                                        color: '#4b5563',
                                        borderRadius: '0.375rem',
                                        textDecoration: 'none',
                                        transition: 'all 0.2s ease-in-out',
                                      }}
                                      onMouseOver={(e) => {
                                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                                        e.currentTarget.style.paddingLeft = '0.75rem';
                                      }}
                                      onMouseOut={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.paddingLeft = '0.5rem';
                                      }}
                                    >
                                      {subItem.name}
                                    </a>
                                  </motion.li>
                                ))}
                              </ul>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </li>
                ))}
                {/* Add "Start Your Transformation" button for mobile as well */}
                <li style={{ marginTop: '1rem', padding: '0 1rem' }}>
                  <StyledButton
                    className="primary"
                    style={{
                      width: '100%',
                      fontSize: '1.1rem',
                      padding: '0.75rem 1rem',
                    }}
                    onClick={() => {
                      window.location.href = '/contact-form';
                      toggleMobileSheet();
                    }}
                  >
                    Start Your Transformation
                  </StyledButton>
                </li>
              </ul>
            </nav>
          </StyledSheetContent>
        )}
      </AnimatePresence>
    </header>
  );
}

// Add this after the other constants (around line 100, after the Menu component)
const MEGA_MENU_CONFIG = {
  width: '850px',
  leftColumnWidth: '30%',
  rightColumnWidth: '70%',
  padding: '1.5rem 0',
  itemPadding: '0.75rem 1.5rem',
  fontSize: '1.25rem',
};
