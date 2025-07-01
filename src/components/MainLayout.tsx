'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import LoadingScreen from './LoadingScreen';
import WhatsAppButton from './WhatsAppButton';
import AppointmentModal from './AppointmentModal';
import MedicalBackground from './MedicalBackground';
import { AppointmentFormData } from '@/types/components';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle loading screen
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Setup scroll tracking
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      setScrollProgress(progress);
      setShowBackToTop(scrollTop > 500);
    };

    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleAppointmentSubmit = async (data: AppointmentFormData) => {
    // Simulate API call
    console.log('Appointment data:', data);
    
    // In a real app, you would send this data to your backend
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Show success message (handled by the modal component)
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Global Medical Animated Background */}
      <MedicalBackground />
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen 
            isLoading={isLoading} 
            onComplete={() => setIsLoading(false)} 
          />
        )}
      </AnimatePresence>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-primary z-50 origin-left"
        style={{ scaleX: scrollProgress / 100 }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        transition={{ duration: 0.1 }}
      />

      {/* Main Content */}
      <div 
        ref={scrollContainerRef}
        className="relative min-h-screen"
        style={{ 
          willChange: 'transform',
          backfaceVisibility: 'hidden'
        }}
      >
        {/* Main content children */}
        <div>
          {children}
        </div>
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-6 z-30 w-12 h-12 bg-gradient-primary text-white rounded-full shadow-soft-lg flex items-center justify-center transition-all duration-300 hover:shadow-soft-xl"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <WhatsAppButton 
        phoneNumber="+15551234567"
        message="Hello! I'm interested in your healthcare services and would like to know more."
        position="bottom-right"
      />

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAppointmentSubmit}
      />

      {/* Performance optimizations */}
      <style jsx global>{`
        /* Optimize animations for performance */
        * {
          will-change: auto;
        }
        
        .animate-element {
          will-change: transform, opacity;
        }
        
        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
        
        /* Optimize fonts */
        @font-face {
          font-family: 'Inter';
          font-display: swap;
        }
        
        /* Optimize images */
        img {
          content-visibility: auto;
        }
        
        /* Scroll optimization */
        html {
          scroll-behavior: smooth;
        }
        
        /* Focus styles for accessibility */
        button:focus-visible,
        a:focus-visible,
        input:focus-visible,
        textarea:focus-visible,
        select:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
      `}</style>
    </>
  );
};

export default MainLayout;
