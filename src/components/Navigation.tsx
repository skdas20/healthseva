'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  Phone, 
  Home,
  Activity,
  Award,
  Users,
  MessageCircle,
  X
} from 'lucide-react';
import { FaFacebook, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { NavigationProps } from '@/types/components';

const Navigation: React.FC<NavigationProps> = ({
  links
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isInHeroSection, setIsInHeroSection] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleSectionTracking = () => {
      const sections = links.map(link => link.href.replace('#', ''));
      let currentSection = '';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    const handleHeroSection = () => {
      const heroElement = document.getElementById('home');
      if (heroElement) {
        const rect = heroElement.getBoundingClientRect();
        setIsInHeroSection(rect.bottom > 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleSectionTracking);
    window.addEventListener('scroll', handleHeroSection);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleSectionTracking);
      window.removeEventListener('scroll', handleHeroSection);
    };
  }, [links]);

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const navVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const mobileMenuVariants = {
    initial: { 
      opacity: 0,
      height: 0,
      y: -20
    },
    animate: { 
      opacity: 1,
      height: 'auto' as const,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut' as const,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    exit: { 
      opacity: 0,
      height: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: 'easeIn' as const
      }
    }
  };

  const mobileItemVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      x: -20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="initial"
      animate="animate"
      className={cn(
        'fixed top-0 left-0 right-0 z-[100] transition-all duration-500',
        isInHeroSection
          ? 'bg-gradient-to-br from-emerald-50 via-green-50 via-teal-50 to-blue-50 border-b border-white/10 backdrop-blur-xl'
          : 'bg-white/90 border-b border-white/20 backdrop-blur-xl',
        isScrolled && !isInHeroSection ? 'shadow-soft' : ''
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div 
            className="flex items-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('#home')}
          >
            <div className="w-14 h-14 lg:w-16 lg:h-16">
              <Image src="/assets/logo.svg" alt="HealthSeva" width={64} height={64} className="w-full h-full object-contain" />
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {links.map((link, index) => {
              const getIcon = (name: string) => {
                switch(name.toLowerCase()) {
                  case 'home': return <Home className="w-4 h-4" />;
                  case 'services': return <Activity className="w-4 h-4" />;
                  case 'benefits': return <Award className="w-4 h-4" />;
                  case 'about': return <Users className="w-4 h-4" />;
                  case 'contact': return <MessageCircle className="w-4 h-4" />;
                  default: return null;
                }
              };
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <motion.button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={cn(
                    'relative flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-colors duration-200',
                    isActive
                      ? 'text-teal-600'
                      : 'text-navy-700 hover:text-teal-500'
                  )}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: index * 0.1 + 0.3 }
                  }}
                >
                  {getIcon(link.name)}
                  <span>{link.name}</span>
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                      style={{background: 'linear-gradient(90deg, #009999, #E6E6FA, #CC0000)'}}
                      layoutId="activeSection"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Phone Number & Social Icons & Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            {/* Phone Number */}
            <motion.a
              href="tel:+918521835910"
              className="hidden lg:flex items-center space-x-2 text-teal-600 hover:text-teal-500 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                transition: { delay: 0.5 }
              }}
            >
              <Phone className="w-4 h-4 text-teal-600 group-hover:text-teal-500 transition-colors" />
              <span>+91 85218 35910</span>
            </motion.a>

            {/* Social Icons */}
            <div className="hidden lg:flex items-center space-x-2 ml-2">
              <a href="https://www.facebook.com/healthsevatyourhome" target="_blank" rel="noopener noreferrer" className="transition-colors">
                <FaFacebook className="w-6 h-6" style={{ background: 'linear-gradient(90deg, #009999, #FFDAB9)', borderRadius: '50%', color: 'white', padding: '4px' }} />
              </a>
              <a href="https://www.linkedin.com/company/healthsevaatyourhome" target="_blank" rel="noopener noreferrer" className="transition-colors">
                <FaLinkedin className="w-6 h-6" style={{ background: 'linear-gradient(90deg, #009999, #FFDAB9)', borderRadius: '50%', color: 'white', padding: '4px' }} />
              </a>
              <a href="https://www.instagram.com/healthsevaatyourhome" target="_blank" rel="noopener noreferrer" className="transition-colors">
                <FaInstagram className="w-6 h-6" style={{ background: 'linear-gradient(90deg, #009999, #FFDAB9)', borderRadius: '50%', color: 'white', padding: '4px' }} />
              </a>
              <a href="https://www.youtube.com/HealthSevaAtYourHome" target="_blank" rel="noopener noreferrer" className="transition-colors">
                <FaYoutube className="w-6 h-6" style={{ background: 'linear-gradient(90deg, #009999, #FFDAB9)', borderRadius: '50%', color: 'white', padding: '4px' }} />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-2 text-navy-700 hover:text-teal-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="lg:hidden border-t border-white/20 backdrop-blur-xl bg-white/90"
            >
              <div className="py-4 space-y-2">
                {links.map((link) => (
                  <motion.button
                    key={link.href}
                    variants={mobileItemVariants}
                    onClick={() => scrollToSection(link.href)}
                    className={cn(
                      'w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-colors',
                      activeSection === link.href.replace('#', '')
                        ? 'bg-teal-50 text-teal-600'
                        : 'text-navy-700 hover:bg-gray-50 hover:text-teal-500'
                    )}
                  >
                    {link.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
