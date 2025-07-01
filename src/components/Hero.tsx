'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { 
  Calendar, 
  ArrowRight,
  Users,
  Award,
  Clock,
  Heart,
  Shield,
  Stethoscope,
  Eye
} from 'lucide-react';
import { HeroProps } from '@/types/components';

// Animation variants (no changes needed here)
const staggerContainer = {
  initial: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.6
    }
  }
};

const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
  }
};

// Add back slideInLeft variant
const slideInLeft = {
  initial: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" as const }
  }
};

// Typewriter Component (no changes needed here)
const TypewriterText: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }
    }, delay + currentIndex * 30);

    return () => clearTimeout(timer);
  }, [currentIndex, text, delay]);

  return (
    <span className="inline-block">
      {displayText}
      <motion.span
        className="inline-block w-0.5 h-8 bg-gradient-to-r from-blue-500 to-purple-500 ml-1"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </span>
  );
};


// ===================================================================
// FINAL AnimatedMonitor with 5-SECOND AUTOPLAY
// ===================================================================
interface AnimatedMonitorProps {
  isVisible: boolean;
  videoSrc: string;
}

const AnimatedMonitor: React.FC<AnimatedMonitorProps> = ({ isVisible, videoSrc }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // This effect handles the automatic playback
  useEffect(() => {
    // Only proceed if the monitor is visible and the video isn't already playing
    if (isVisible && !isVideoPlaying && videoRef.current) {
      // Set a timer to play the video after 5 seconds
      const timer = setTimeout(() => {
        videoRef.current?.play().then(() => {
          setIsVideoPlaying(true);
        }).catch(error => {
          console.error("Autoplay was prevented:", error);
          // You could show an error message here if needed
        });
      }, 3000); // 5000 milliseconds = 5 seconds

      // Cleanup function to clear the timer if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [isVisible, isVideoPlaying]); // Rerun this effect if visibility changes

  const monitorVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 1.2, ease: "easeOut" as const, delay: 0.5 }
    }
  };

  return (
    <motion.div
      className="relative w-full max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] h-[200px] sm:h-[280px] md:h-[350px] lg:h-[400px] mx-auto perspective-1000"
      variants={monitorVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
    >
      {/* Monitor Frame and Stand with Shiny #009999 */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 md:w-28 lg:w-32 h-5 sm:h-6 md:h-7 lg:h-8 bg-gradient-to-r from-[#009999] to-[#007777] rounded-lg shadow-lg shadow-[#009999]/30"></div>
      <div className="absolute bottom-3 sm:bottom-4 md:bottom-5 lg:bottom-6 left-1/2 transform -translate-x-1/2 w-2 sm:w-3 md:w-3.5 lg:w-4 h-3 sm:h-4 md:h-5 lg:h-6 bg-gradient-to-b from-[#009999] to-[#006666] rounded-sm shadow-md shadow-[#009999]/40"></div>

      {/* Monitor Screen with Shiny #009999 Border */}
      <motion.div
        className="relative w-full h-[180px] sm:h-[250px] md:h-[310px] lg:h-[350px] bg-gradient-to-br from-[#009999] to-[#006666] rounded-xl sm:rounded-2xl shadow-2xl border-4 sm:border-6 md:border-7 lg:border-8 border-[#009999] overflow-hidden"
        style={{
          boxShadow: '0 0 15px rgba(0, 153, 153, 0.4), inset 0 0 10px rgba(0, 153, 153, 0.2)'
        }}
        whileHover={{ 
          scale: 1.02,
          boxShadow: '0 0 25px rgba(0, 153, 153, 0.6), inset 0 0 15px rgba(0, 153, 153, 0.3)'
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative w-full h-full bg-black rounded-lg sm:rounded-xl overflow-hidden">
          {/* The Video Player */}
          <video
            ref={videoRef}
            src={videoSrc}
            loop
            muted // Muted is ESSENTIAL for reliable autoplay
            playsInline
            controls={isVideoPlaying} // Show controls only once playing
            className="w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: isVideoPlaying ? 1 : 0 }}
          />

          {/* Pre-play Overlay with restored animations */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 flex flex-col items-center justify-center space-y-4 overflow-hidden"
            animate={{ opacity: isVideoPlaying ? 0 : 1 }}
            transition={{ duration: 1 }} // Fade out over 1 second
            style={{ pointerEvents: isVideoPlaying ? 'none' : 'auto' }}
          >
            <p className="text-white text-lg opacity-80 z-10">Demo starting soon...</p>

            {/* RESTORED: Floating background blobs */}
            <motion.div
              className="absolute w-32 h-32 bg-white/10 rounded-full blur-xl"
              animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              style={{ top: '20%', left: '10%' }}
            />
            <motion.div
              className="absolute w-24 h-24 bg-white/10 rounded-full blur-xl"
              animate={{ x: [0, -80, 0], y: [0, -30, 0], scale: [1, 0.8, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              style={{ bottom: '30%', right: '15%' }}
            />
          </motion.div>
        </div>

        {/* Monitor Bezel Details with Shiny #009999 */}
        <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 transform -translate-x-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-[#009999] rounded-full animate-pulse shadow-lg shadow-[#009999]/50"></div>
        <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 right-3 sm:right-4 md:right-6 text-xs sm:text-sm text-[#009999] font-mono font-bold">HealthSeva</div>
      </motion.div>
      
      {/* Floating Icons with #009999 theme - Responsive */}
      <motion.div className="absolute -top-4 sm:-top-6 md:-top-8 -left-4 sm:-left-6 md:-left-8 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-[#009999] to-[#00cccc] rounded-full flex items-center justify-center shadow-lg shadow-[#009999]/40" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.6 }} style={{ animation: 'float 4s ease-in-out infinite' }}><Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" /></motion.div>
      <motion.div className="absolute -top-2 sm:-top-3 md:-top-4 -right-6 sm:-right-8 md:-right-12 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-r from-[#00cccc] to-[#009999] rounded-full flex items-center justify-center shadow-lg shadow-[#009999]/40" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.7, duration: 0.6 }} style={{ animation: 'float 3.5s ease-in-out infinite 1s' }}><Heart className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" /></motion.div>
      <motion.div className="absolute -bottom-4 sm:-bottom-6 md:-bottom-8 -right-8 sm:-right-12 md:-right-16 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-r from-[#009999] to-[#006666] rounded-full flex items-center justify-center shadow-lg shadow-[#009999]/40" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.9, duration: 0.6 }} style={{ animation: 'float 4.5s ease-in-out infinite 2s' }}><Shield className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" /></motion.div>
    </motion.div>
  );
};


// Main Hero Component
const Hero: React.FC<HeroProps> = ({
  title = "Your Health, Our Priority",
  subtitle = "Experience world-class healthcare with compassionate care, cutting-edge technology, and personalized treatment plans designed just for you.",
  primaryCta = { text: "Book Appointment", href: "#contact" },
  secondaryCta = { text: "Learn More", href: "#services" },
  videoSrc = "/assets/demo.mp4",
  // socialLinks = [] // Removed unused socialLinks
}) => {
  const [monitorVisible, setMonitorVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
      setTimeout(() => setMonitorVisible(true), 500);
    }
  }, [isInView, controls]);

  const stats = [
    { icon: Users, value: '50,000+', label: 'Happy Patients' },
    { icon: Award, value: '15+', label: 'Years Experience' },
    { icon: Clock, value: '24/7', label: 'Emergency Care' },
  ];

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 via-teal-50 to-blue-50 overflow-hidden"
    >
      {/* Animated Medical Background Elements with #009999 theme */}
      <div className="absolute inset-0 pointer-events-none medical-bg">
        {/* Large Animated Circles with #009999 */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 153, 153, 0.3), rgba(0, 153, 153, 0.1))',
            boxShadow: '0 0 30px rgba(0, 153, 153, 0.4)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute bottom-32 right-32 w-24 h-24 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 204, 204, 0.3), rgba(0, 153, 153, 0.1))',
            boxShadow: '0 0 25px rgba(0, 153, 153, 0.3)'
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        {/* Floating Orbs with #009999 */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${12 + i * 4}px`,
              height: `${12 + i * 4}px`,
              background: `radial-gradient(circle, rgba(0, 153, 153, 0.4), rgba(0, 204, 204, 0.2))`,
              boxShadow: '0 0 15px rgba(0, 153, 153, 0.3)',
              left: `${10 + i * 12}%`,
              top: `${15 + i * 10}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
          />
        ))}

        {/* Animated DNA Helix with #009999 styling */}
        <motion.div
          className="absolute top-20 left-10 w-8 h-32 opacity-40"
          animate={{
            rotate: [0, 360],
            y: [0, -20, 0],
          }}
          transition={{
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <svg viewBox="0 0 32 128" className="w-full h-full" style={{ color: '#009999' }}>
            <path
              d="M16 8 C8 16, 24 32, 16 40 C24 48, 8 64, 16 72 C8 80, 24 96, 16 104 C24 112, 8 128, 16 128"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
            />
            <path
              d="M16 8 C24 16, 8 32, 16 40 C8 48, 24 64, 16 72 C24 80, 8 96, 16 104 C8 112, 24 128, 16 128"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              opacity="0.5"
              strokeDasharray="3,3"
            />
          </svg>
        </motion.div>

        {/* Enhanced Floating Pills with #009999 glow */}
        <motion.div
          className="absolute top-40 right-20 w-6 h-12 rounded-full opacity-40"
          style={{
            background: 'linear-gradient(to bottom, #009999, #006666)',
            boxShadow: '0 0 20px rgba(0, 153, 153, 0.4)'
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-40 left-20 w-8 h-4 rounded-full opacity-40"
          style={{
            background: 'linear-gradient(to right, #00cccc, #009999)',
            boxShadow: '0 0 15px rgba(0, 153, 153, 0.3)'
          }}
          animate={{
            x: [0, 20, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        {/* Enhanced Heartbeat Line with #009999 pulse effect */}
        <motion.div
          className="absolute top-32 right-40 w-32 h-1 opacity-60"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <svg viewBox="0 0 128 8" className="w-full h-full" style={{ color: '#009999' }}>
            <path
              d="M0 4 L20 4 L24 0 L28 8 L32 0 L36 4 L128 4"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeDasharray="2,2"
            />
          </svg>
          <motion.div
            className="absolute top-0 left-0 w-2 h-2 rounded-full"
            style={{
              background: '#009999',
              boxShadow: '0 0 10px rgba(0, 153, 153, 0.6)'
            }}
            animate={{
              x: [0, 120],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>

        {/* Enhanced Medical Cross with #009999 spin animation */}
        <motion.div
          className="absolute bottom-32 right-32 w-12 h-12 opacity-40"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 10, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <svg viewBox="0 0 48 48" className="w-full h-full" style={{ color: '#009999' }}>
            <rect x="18" y="8" width="12" height="32" fill="currentColor" rx="2" />
            <rect x="8" y="18" width="32" height="12" fill="currentColor" rx="2" />
          </svg>
        </motion.div>

        {/* Enhanced Pulse Rings with #009999 colors */}
        <motion.div
          className="absolute top-60 left-40 w-20 h-20 border-2 rounded-full opacity-50"
          style={{
            borderColor: '#009999',
            boxShadow: '0 0 20px rgba(0, 153, 153, 0.3)'
          }}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />

        <motion.div
          className="absolute bottom-60 right-60 w-16 h-16 border-2 rounded-full opacity-50"
          style={{
            borderColor: '#00cccc',
            boxShadow: '0 0 15px rgba(0, 204, 204, 0.3)'
          }}
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeOut",
            delay: 1
          }}
        />

        {/* Enhanced Molecule Structure with #009999 orbit animation */}
        <motion.div
          className="absolute top-96 left-96 w-16 h-16 opacity-40"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <svg viewBox="0 0 64 64" className="w-full h-full" style={{ color: '#009999' }}>
            <circle cx="32" cy="16" r="4" fill="currentColor" />
            <circle cx="16" cy="32" r="4" fill="currentColor" />
            <circle cx="48" cy="32" r="4" fill="currentColor" />
            <circle cx="32" cy="48" r="4" fill="currentColor" />
            <line x1="32" y1="16" x2="16" y2="32" stroke="currentColor" strokeWidth="2" strokeDasharray="2,2" />
            <line x1="32" y1="16" x2="48" y2="32" stroke="currentColor" strokeWidth="2" strokeDasharray="2,2" />
            <line x1="16" y1="32" x2="32" y2="48" stroke="currentColor" strokeWidth="2" strokeDasharray="2,2" />
            <line x1="48" y1="32" x2="32" y2="48" stroke="currentColor" strokeWidth="2" strokeDasharray="2,2" />
          </svg>
        </motion.div>

        {/* Enhanced Floating Particles with #009999 theme - Mobile Optimized */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-60 hidden sm:block"
            style={{
              width: `${3 + (i % 3) * 1.5}px`,
              height: `${3 + (i % 3) * 1.5}px`,
              background: i % 3 === 0 ? '#009999' : i % 3 === 1 ? '#00cccc' : '#006666',
              boxShadow: `0 0 8px rgba(0, 153, 153, 0.4)`,
              left: `${5 + (i * 10)}%`,
              top: `${10 + (i * 7)}%`,
            }}
            animate={{
              y: [0, -80, 0],
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.15
            }}
          />
        ))}
        
        {/* Mobile-only simplified particles */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`mobile-${i}`}
            className="absolute rounded-full opacity-40 sm:hidden"
            style={{
              width: '4px',
              height: '4px',
              background: i % 2 === 0 ? '#009999' : '#00cccc',
              boxShadow: `0 0 6px rgba(0, 153, 153, 0.3)`,
              left: `${20 + (i * 20)}%`,
              top: `${15 + (i * 15)}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
          />
        ))}

        {/* Enhanced Medical Waveform with #009999 shimmer effect */}
        <motion.div
          className="absolute bottom-20 left-10 w-40 h-8 opacity-50"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, delay: 1 }}
        >
          <svg viewBox="0 0 160 32" className="w-full h-full" style={{ color: '#009999' }}>
            <path
              d="M0 16 Q20 8, 40 16 T80 16 Q100 8, 120 16 T160 16"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4,4"
            />
          </svg>
        </motion.div>

        {/* Additional Rotating Circles */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-20 h-20 border-2 rounded-full opacity-30"
          style={{
            borderColor: '#009999',
            borderStyle: 'dashed'
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 15, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        <motion.div
          className="absolute bottom-1/3 left-1/4 w-16 h-16 border-2 rounded-full opacity-40"
          style={{
            borderColor: '#00cccc',
            borderStyle: 'dotted'
          }}
          animate={{
            rotate: [360, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 12, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }
          }}
        />

        {/* Enhanced Stethoscope Icon with #009999 swing animation - Hidden on Mobile */}
        <motion.div
          className="absolute top-80 right-20 w-8 h-8 sm:w-10 sm:h-10 opacity-50 hidden sm:block"
          style={{ color: '#009999' }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Stethoscope className="w-full h-full" />
        </motion.div>

        {/* Enhanced Heart Icon with #009999 enhanced pulse - Hidden on Mobile */}
        <motion.div
          className="absolute bottom-80 left-80 w-6 h-6 sm:w-8 sm:h-8 opacity-60 hidden sm:block"
          style={{ color: '#009999' }}
          animate={{
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Heart className="w-full h-full" />
        </motion.div>

        {/* Enhanced Gradient Orbs with #009999 theme */}
        <motion.div
          className="absolute top-40 left-1/3 w-32 h-32 rounded-full opacity-30 blur-xl"
          style={{
            background: 'radial-gradient(circle, rgba(0, 153, 153, 0.4), rgba(0, 204, 204, 0.2))',
            boxShadow: '0 0 40px rgba(0, 153, 153, 0.3)'
          }}
          animate={{
            scale: [1, 1.5, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute bottom-40 right-1/3 w-24 h-24 rounded-full opacity-30 blur-xl"
          style={{
            background: 'radial-gradient(circle, rgba(0, 204, 204, 0.4), rgba(0, 153, 153, 0.2))',
            boxShadow: '0 0 30px rgba(0, 204, 204, 0.3)'
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -20, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Medical Equipment Silhouettes */}
        <motion.div
          className="absolute top-1/4 right-10 w-6 h-16 opacity-15"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg viewBox="0 0 24 64" className="w-full h-full text-medical-teal">
            <rect x="8" y="0" width="8" height="48" fill="currentColor" rx="4" />
            <circle cx="12" cy="52" r="8" fill="currentColor" />
          </svg>
        </motion.div>

        {/* Floating Medical Symbols */}
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-8 h-8 opacity-20 text-medical-green medical-glow"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <svg viewBox="0 0 32 32" className="w-full h-full">
            <path
              d="M16 2 L18 14 L30 16 L18 18 L16 30 L14 18 L2 16 L14 14 Z"
              fill="currentColor"
            />
          </svg>
        </motion.div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full min-h-screen flex items-center justify-center relative z-10 py-8 sm:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate={controls}
            className="space-y-6 sm:space-y-8 text-center lg:text-left order-2 lg:order-1"
          >
            <motion.div variants={slideInLeft} className="space-y-6 sm:space-y-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                <TypewriterText text={title} delay={200} />
              </h1>
              <motion.p 
                variants={fadeInUp}
                className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed font-light"
              >
                {subtitle}
              </motion.p>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <motion.button 
                onClick={() => window.location.href = primaryCta.href} 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 group hover:shadow-lg transition-all duration-300 text-sm sm:text-base" 
                whileHover={{ scale: 1.05, y: -2 }} 
                whileTap={{ scale: 0.95 }}
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{primaryCta.text}</span>
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.a 
                href={secondaryCta.href} 
                className="bg-white text-gray-700 border border-gray-300 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-gray-50 transition-all duration-300 text-sm sm:text-base" 
                whileHover={{ scale: 1.05, y: -2 }} 
                whileTap={{ scale: 0.95 }}
              >
                <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{secondaryCta.text}</span>
              </motion.a>
            </motion.div>
            <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 sm:pt-8 border-t border-gray-200">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-1 sm:mb-2">
                    <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex justify-center items-center h-full order-1 lg:order-2" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.3 }}
          >
            <AnimatedMonitor 
              isVisible={monitorVisible}
              videoSrc={videoSrc}
            />
          </motion.div>
        </div>
      </div>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
};

export default Hero;