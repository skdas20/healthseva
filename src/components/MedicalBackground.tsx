import React from 'react';
import { motion } from 'framer-motion';

// Simple SVGs for stethoscope, heart rate, pulse, shield, etc. in a light greenish/whitish style
// These are decorative, non-interactive, and positioned absolutely/fixed

const MedicalBackground: React.FC = () => (
  <div
    className="fixed inset-0 pointer-events-none z-0"
    aria-hidden="true"
    style={{
      // Ensures the background is always behind content
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
    }}
  >
    {/* Stethoscope */}
    <motion.svg
      className="absolute top-10 left-10 opacity-20"
      width="120" height="120" viewBox="0 0 120 120" fill="none"
      initial={{ y: -30, opacity: 0.1 }}
      animate={{ y: 0, opacity: 0.2 }}
      transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
    >
      <circle cx="60" cy="60" r="50" stroke="#14B8A6" strokeWidth="4" fill="none" />
      <path d="M60 90 Q70 100 80 90" stroke="#14B8A6" strokeWidth="3" fill="none" />
      <circle cx="80" cy="90" r="6" fill="#14B8A6" opacity="0.5" />
    </motion.svg>

    {/* Heart Rate Line */}
    <motion.svg
      className="absolute bottom-20 left-1/4 opacity-20"
      width="220" height="60" viewBox="0 0 220 60" fill="none"
      initial={{ x: -20, opacity: 0.1 }}
      animate={{ x: 0, opacity: 0.2 }}
      transition={{ duration: 2.5, repeat: Infinity, repeatType: 'reverse' }}
    >
      <polyline
        points="0,30 30,30 40,10 60,50 80,20 100,40 120,10 140,30 160,30 220,30"
        stroke="#14B8A6" strokeWidth="3" fill="none" strokeLinejoin="round" />
    </motion.svg>

    {/* Pulse Circle */}
    <motion.circle
      className="absolute right-16 top-1/2 opacity-10"
      cx="0" cy="0" r="40"
      style={{ position: 'absolute', right: '4rem', top: '50%' }}
      fill="#14B8A6"
      initial={{ scale: 0.8, opacity: 0.08 }}
      animate={{ scale: 1.1, opacity: 0.13 }}
      transition={{ duration: 2.2, repeat: Infinity, repeatType: 'reverse' }}
    />

    {/* Shield */}
    <motion.svg
      className="absolute bottom-10 right-10 opacity-20"
      width="80" height="90" viewBox="0 0 80 90" fill="none"
      initial={{ y: 10, opacity: 0.1 }}
      animate={{ y: 0, opacity: 0.2 }}
      transition={{ duration: 2.3, repeat: Infinity, repeatType: 'reverse' }}
    >
      <path d="M40 10 L70 25 V50 Q70 75 40 85 Q10 75 10 50 V25 Z" stroke="#14B8A6" strokeWidth="3" fill="#fff" fillOpacity="0.3" />
    </motion.svg>
  </div>
);

export default MedicalBackground;
