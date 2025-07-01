'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { 
  Play, 
  Calendar, 
  Eye, 
  ArrowRight,
  Users,
  Award,
  Clock,
  Heart,
  Shield,
  Stethoscope
} from 'lucide-react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
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

const slideInLeft = {
  initial: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" as const }
  }
};

const slideInRight = {
  initial: { opacity: 0, x: 100 },
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
      className="relative w-full max-w-[600px] h-[400px] mx-auto perspective-1000"
      variants={monitorVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
    >
      {/* Monitor Frame and Stand */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg shadow-lg"></div>
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-4 h-6 bg-gradient-to-b from-gray-700 to-gray-900 rounded-sm"></div>

      {/* Monitor Screen */}
      <motion.div
        className="relative w-full h-[350px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border-8 border-gray-700 overflow-hidden"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative w-full h-full bg-black rounded-xl overflow-hidden">
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

        {/* Monitor Bezel Details */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-4 right-6 text-xs text-gray-400 font-mono">HealthSeva</div>
      </motion.div>
      
      {/* Floating Icons */}
      <motion.div className="absolute -top-8 -left-8 w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center shadow-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.6 }} style={{ animation: 'float 4s ease-in-out infinite' }}><Stethoscope className="w-6 h-6 text-blue-600" /></motion.div>
      <motion.div className="absolute -top-4 -right-12 w-10 h-10 bg-gradient-to-r from-green-100 to-green-200 rounded-full flex items-center justify-center shadow-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.7, duration: 0.6 }} style={{ animation: 'float 3.5s ease-in-out infinite 1s' }}><Heart className="w-5 h-5 text-green-600" /></motion.div>
      <motion.div className="absolute -bottom-8 -right-16 w-14 h-14 bg-gradient-to-r from-purple-100 to-purple-200 rounded-full flex items-center justify-center shadow-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.9, duration: 0.6 }} style={{ animation: 'float 4.5s ease-in-out infinite 2s' }}><Shield className="w-7 h-7 text-purple-600" /></motion.div>
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
  socialLinks = []
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
      {/* Animated Medical Background Elements */}
      <div className="absolute inset-0 pointer-events-none medical-bg">
        {/* Animated DNA Helix with enhanced styling */}
        <motion.div
          className="absolute top-20 left-10 w-8 h-32 opacity-20 animate-dna medical-glow"
          animate={{
            rotate: [0, 360],
            y: [0, -20, 0],
          }}
          transition={{
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <svg viewBox="0 0 32 128" className="w-full h-full text-medical-emerald">
            <path
              d="M16 8 C8 16, 24 32, 16 40 C24 48, 8 64, 16 72 C8 80, 24 96, 16 104 C24 112, 8 128, 16 128"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="animate-wave"
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

        {/* Enhanced Floating Pills with glow */}
        <motion.div
          className="absolute top-40 right-20 w-6 h-12 bg-gradient-to-b from-green-300 to-green-500 rounded-full opacity-30 animate-pill-float medical-glow"
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
          className="absolute bottom-40 left-20 w-8 h-4 bg-gradient-to-r from-teal-300 to-teal-500 rounded-full opacity-30 animate-pill-float medical-glow"
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

        {/* Enhanced Heartbeat Line with pulse effect */}
        <motion.div
          className="absolute top-32 right-40 w-32 h-1 opacity-40"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <svg viewBox="0 0 128 8" className="w-full h-full text-medical-green medical-glow">
            <path
              d="M0 4 L20 4 L24 0 L28 8 L32 0 L36 4 L128 4"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeDasharray="2,2"
              className="animate-wave"
            />
          </svg>
          <motion.div
            className="absolute top-0 left-0 w-2 h-2 bg-medical-green rounded-full medical-glow animate-heartbeat"
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

        {/* Enhanced Medical Cross with spin animation */}
        <motion.div
          className="absolute bottom-32 right-32 w-12 h-12 opacity-20 animate-cross medical-glow"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 10, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <svg viewBox="0 0 48 48" className="w-full h-full text-medical-teal">
            <rect x="18" y="8" width="12" height="32" fill="currentColor" rx="2" />
            <rect x="8" y="18" width="32" height="12" fill="currentColor" rx="2" />
          </svg>
        </motion.div>

        {/* Enhanced Pulse Rings with medical colors */}
        <motion.div
          className="absolute top-60 left-40 w-20 h-20 border-2 border-medical-green rounded-full opacity-30 animate-pulse-ring"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />

        <motion.div
          className="absolute bottom-60 right-60 w-16 h-16 border-2 border-medical-teal rounded-full opacity-30 animate-pulse-ring"
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeOut",
            delay: 1
          }}
        />

        {/* Enhanced Molecule Structure with orbit animation */}
        <motion.div
          className="absolute top-96 left-96 w-16 h-16 opacity-25 animate-molecule medical-glow"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <svg viewBox="0 0 64 64" className="w-full h-full text-medical-emerald">
            <circle cx="32" cy="16" r="4" fill="currentColor" className="animate-heartbeat" />
            <circle cx="16" cy="32" r="4" fill="currentColor" />
            <circle cx="48" cy="32" r="4" fill="currentColor" className="animate-heartbeat" />
            <circle cx="32" cy="48" r="4" fill="currentColor" />
            <line x1="32" y1="16" x2="16" y2="32" stroke="currentColor" strokeWidth="2" strokeDasharray="2,2" />
            <line x1="32" y1="16" x2="48" y2="32" stroke="currentColor" strokeWidth="2" strokeDasharray="2,2" />
            <line x1="16" y1="32" x2="32" y2="48" stroke="currentColor" strokeWidth="2" strokeDasharray="2,2" />
            <line x1="48" y1="32" x2="32" y2="48" stroke="currentColor" strokeWidth="2" strokeDasharray="2,2" />
          </svg>
        </motion.div>

        {/* Enhanced Floating Particles with medical theme */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full opacity-40 animate-particle medical-glow ${
              i % 3 === 0 ? 'bg-medical-green' : 
              i % 3 === 1 ? 'bg-medical-teal' : 'bg-medical-emerald'
            }`}
            style={{
              left: `${5 + (i * 8)}%`,
              top: `${10 + (i * 6)}%`,
            }}
            animate={{
              y: [0, -150, 0],
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
          />
        ))}

        {/* Enhanced Medical Waveform with shimmer effect */}
        <motion.div
          className="absolute bottom-20 left-10 w-40 h-8 opacity-30 health-shimmer"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, delay: 1 }}
        >
          <svg viewBox="0 0 160 32" className="w-full h-full text-medical-teal medical-glow">
            <path
              d="M0 16 Q20 8, 40 16 T80 16 Q100 8, 120 16 T160 16"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4,4"
              className="animate-wave"
            />
          </svg>
        </motion.div>

        {/* Enhanced Stethoscope Icon with swing animation */}
        <motion.div
          className="absolute top-80 right-20 w-10 h-10 text-medical-emerald opacity-20 animate-stethoscope medical-glow"
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

        {/* Enhanced Heart Icon with enhanced pulse */}
        <motion.div
          className="absolute bottom-80 left-80 w-8 h-8 text-red-400 opacity-30 animate-heartbeat medical-glow"
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Heart className="w-full h-full" />
        </motion.div>

        {/* Enhanced Gradient Orbs with medical theme */}
        <motion.div
          className="absolute top-40 left-1/3 w-32 h-32 bg-gradient-to-br from-green-200 via-teal-200 to-transparent rounded-full opacity-20 blur-xl medical-glow"
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
          className="absolute bottom-40 right-1/3 w-24 h-24 bg-gradient-to-br from-emerald-200 via-green-200 to-transparent rounded-full opacity-20 blur-xl medical-glow"
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full min-h-screen flex items-center justify-center relative z-10 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate={controls}
            className="space-y-8 text-center lg:text-left"
          >
            <motion.div variants={slideInLeft} className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                <TypewriterText text={title} delay={200} />
              </h1>
              <motion.p 
                variants={fadeInUp}
                className="text-xl lg:text-2xl text-gray-600 leading-relaxed font-light"
              >
                {subtitle}
              </motion.p>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.button onClick={() => window.location.href = primaryCta.href} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 group hover:shadow-lg transition-all duration-300" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}><Calendar className="w-5 h-5" /><span>{primaryCta.text}</span><ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" /></motion.button>
              <motion.a href={secondaryCta.href} className="bg-white text-gray-700 border border-gray-300 px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-gray-50 transition-all duration-300" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}><Eye className="w-5 h-5" /><span>{secondaryCta.text}</span></motion.a>
            </motion.div>
            <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              {stats.map((stat, index) => (<div key={index} className="text-center"><div className="flex justify-center mb-2"><stat.icon className="h-8 w-8 text-blue-600" /></div><div className="text-2xl font-bold text-gray-800">{stat.value}</div><div className="text-sm text-gray-600">{stat.label}</div></div>))}
            </motion.div>
          </motion.div>

          <motion.div className="flex justify-center items-center h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
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