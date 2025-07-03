'use client';

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Activity, Shield, Stethoscope, Pill, Plus, Zap, Users } from 'lucide-react';
import { LoadingScreenProps, FloatingElement } from '@/types/components';

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading, onComplete }) => {
  const [progress, setProgress] = React.useState(0);
  const [showContent, setShowContent] = React.useState(true);
  const [currentPhase, setCurrentPhase] = React.useState(0);
  const [loadingText, setLoadingText] = React.useState('Initializing HealthSeva...');

  const loadingPhases = useMemo(() => [
    { text: 'Initializing HealthSeva...', progress: 20 },
    { text: 'Connecting to healthcare network...', progress: 40 },
    { text: 'Loading medical resources...', progress: 60 },
    { text: 'Securing your health data...', progress: 80 },
    { text: 'Almost ready for your care...', progress: 100 }
  ], []);

  const floatingElements: FloatingElement[] = [
    { id: '1', icon: <Heart className="w-8 h-8 text-red-400" />, position: { x: 15, y: 25 }, delay: 0, duration: 4 },
    { id: '2', icon: <Activity className="w-6 h-6 text-green-400" />, position: { x: 85, y: 35 }, delay: 0.5, duration: 3.5 },
    { id: '3', icon: <Shield className="w-7 h-7 text-blue-400" />, position: { x: 25, y: 75 }, delay: 1, duration: 4.5 },
    { id: '4', icon: <Stethoscope className="w-6 h-6 text-purple-400" />, position: { x: 75, y: 65 }, delay: 1.5, duration: 3 },
    { id: '5', icon: <Pill className="w-5 h-5 text-pink-400" />, position: { x: 65, y: 20 }, delay: 2, duration: 3.8 },
    { id: '6', icon: <Plus className="w-8 h-8 text-teal-400" />, position: { x: 45, y: 85 }, delay: 2.5, duration: 4.2 },
    { id: '7', icon: <Zap className="w-6 h-6 text-yellow-400" />, position: { x: 10, y: 60 }, delay: 3, duration: 3.5 },
    { id: '8', icon: <Users className="w-7 h-7 text-indigo-400" />, position: { x: 90, y: 70 }, delay: 3.5, duration: 4 },
  ];

  React.useEffect(() => {
    if (!isLoading) return;

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 8 + 2;
        
        // Update phase based on progress
        const currentPhaseIndex = loadingPhases.findIndex(phase => newProgress <= phase.progress);
        if (currentPhaseIndex !== -1 && currentPhaseIndex !== currentPhase) {
          setCurrentPhase(currentPhaseIndex);
          setLoadingText(loadingPhases[currentPhaseIndex].text);
        }

        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setShowContent(false);
            setTimeout(onComplete, 800);
          }, 1000);
          return 100;
        }
        return newProgress;
      });
    }, 150);

    return () => clearInterval(progressInterval);
  }, [isLoading, onComplete, currentPhase, loadingPhases]);

  const logoVariants = {
    initial: { 
      scale: 0.5,
      opacity: 0,
      rotateY: -180
    },
    animate: {
      scale: [0.5, 1.2, 1],
      opacity: 1,
      rotateY: 0,
      transition: {
        duration: 2,
        ease: "easeOut" as const,
        times: [0, 0.6, 1]
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  const particleVariants = {
    animate: {
      y: [-20, -100],
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(90deg, #e0f7fa 0%, #fbeee6 100%)',
          }}
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)",
            transition: { duration: 0.8, ease: "easeInOut" }
          }}
        >
          {/* Animated Background Grid */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(90deg, #009999 1px, transparent 1px),
                linear-gradient(#009999 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }} />
          </div>

          {/* Floating Particles - Fixed positions to prevent hydration mismatch */}
          {[
            { left: '10%', top: '20%', delay: 0 },
            { left: '80%', top: '15%', delay: 0.5 },
            { left: '15%', top: '80%', delay: 1 },
            { left: '85%', top: '75%', delay: 1.5 },
            { left: '50%', top: '10%', delay: 2 },
            { left: '25%', top: '50%', delay: 2.5 },
            { left: '75%', top: '45%', delay: 3 },
            { left: '5%', top: '60%', delay: 0.2 },
            { left: '95%', top: '40%', delay: 0.7 },
            { left: '40%', top: '90%', delay: 1.2 },
            { left: '60%', top: '85%', delay: 1.7 },
            { left: '30%', top: '25%', delay: 2.2 },
            { left: '70%', top: '20%', delay: 2.7 },
            { left: '20%', top: '70%', delay: 0.3 },
            { left: '90%', top: '60%', delay: 0.8 },
            { left: '35%', top: '35%', delay: 1.3 },
            { left: '65%', top: '65%', delay: 1.8 },
            { left: '45%', top: '55%', delay: 2.3 },
            { left: '55%', top: '30%', delay: 2.8 },
            { left: '12%', top: '45%', delay: 0.4 }
          ].map((particle, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-2 h-2 bg-gradient-to-r from-[#009999] to-[#FF6F61] rounded-full"
              style={{
                left: particle.left,
                top: particle.top,
              }}
              variants={particleVariants}
              animate="animate"
              transition={{
                delay: particle.delay,
                duration: 3
              }}
            />
          ))}

          {/* Enhanced Floating Medical Icons */}
          {floatingElements.map((element) => (
            <motion.div
              key={element.id}
              className="absolute pointer-events-none"
              style={{
                left: `${element.position.x}%`,
                top: `${element.position.y}%`,
              }}
              initial={{ 
                opacity: 0,
                scale: 0,
                y: 50,
                rotate: -180
              }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, 1.2, 1, 0],
                y: [50, 0, 0, -50],
                rotate: [0, 360, 720],
                filter: ["blur(5px)", "blur(0px)", "blur(0px)", "blur(5px)"]
              }}
              transition={{
                duration: element.duration,
                repeat: Infinity,
                delay: element.delay,
                ease: "easeInOut"
              }}
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.2 }}
                variants={pulseVariants}
                animate="animate"
              >
                {element.icon}
                <motion.div
                  className="absolute inset-0 rounded-full bg-current opacity-20"
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.2, 0, 0.2]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: element.delay
                  }}
                />
              </motion.div>
            </motion.div>
          ))}

          {/* Main Content Container */}
          <motion.div
            className="text-center relative z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: showContent ? 1 : 0,
              y: showContent ? 0 : -30
            }}
            transition={{ duration: 0.8 }}
          >
            {/* Enhanced Logo with 3D Effect */}
            <motion.div
              className="relative mb-8 mx-auto w-32 h-32"
              variants={logoVariants}
              initial="initial"
              animate="animate"
              style={{ perspective: 1000 }}
            >
              {/* Glowing Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#009999] via-[#00cccc] to-[#FF6F61] rounded-full blur-xl opacity-30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Main Logo Container */}
              <motion.div
                className="relative w-full h-full bg-gradient-to-br from-white to-[#e6f7f7] rounded-2xl shadow-2xl border border-gray-200 flex items-center justify-center"
                animate={{
                  rotateY: [0, 5, -5, 0],
                  rotateX: [0, -5, 5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <motion.img 
                  src="/assets/logo.svg" 
                  alt="HealthSeva" 
                  className="w-20 h-20 filter drop-shadow-lg"
                  animate={{
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Rotating Ring */}
                <motion.div
                  className="absolute inset-0 border-4 border-transparent border-t-[#009999] border-r-[#FF6F61] rounded-2xl"
                  animate={{
                    rotate: 360
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Enhanced Brand Name with Gradient Animation */}
            <motion.h1
              className="text-5xl font-bold bg-gradient-to-r from-[#009999] via-[#00cccc] to-[#FF6F61] bg-clip-text text-transparent mb-2"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  backgroundSize: "200% 200%"
                }}
              >
                HealthSeva
              </motion.span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className="text-gray-500 text-lg mb-8 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Your Health, Our Priority
            </motion.p>

            {/* Dynamic Loading Text with Typewriter Effect */}
            <motion.div
              className="mb-8 h-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <motion.p
                key={loadingText}
                className="text-gray-600 text-lg font-medium"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                {loadingText}
              </motion.p>
            </motion.div>

            {/* Enhanced Progress Bar with Glow Effect */}
            <motion.div
              className="relative w-96 h-3 bg-gray-200 rounded-full mx-auto overflow-hidden shadow-inner"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              {/* Background Glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#009999] to-[#FF6F61] rounded-full blur-sm opacity-30"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Progress Fill */}
              <motion.div
                className="relative h-full bg-gradient-to-r from-[#009999] via-[#00cccc] to-[#FF6F61] rounded-full overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {/* Animated Shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                  animate={{
                    x: ["-100%", "100%"]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Pulse Effect */}
                <motion.div
                  className="absolute inset-0 bg-white/20 rounded-full"
                  animate={{
                    opacity: [0, 0.5, 0]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Enhanced Percentage with Animation */}
            <motion.div
              className="mt-6 flex items-center justify-center space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <motion.div
                className="text-3xl font-bold bg-gradient-to-r from-[#009999] to-[#FF6F61] bg-clip-text text-transparent"
                animate={{
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {Math.round(progress)}%
              </motion.div>
              
              {/* Loading Dots */}
              <div className="flex space-x-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-gradient-to-r from-[#009999] to-[#FF6F61] rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Phase Indicators */}
            <motion.div
              className="mt-8 flex justify-center space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.6 }}
            >
              {loadingPhases.map((phase, index) => (
                <motion.div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index <= currentPhase 
                      ? 'bg-gradient-to-r from-[#009999] to-[#FF6F61]' 
                      : 'bg-gray-300'
                  }`}
                  animate={{
                    scale: index === currentPhase ? [1, 1.3, 1] : 1,
                    opacity: index <= currentPhase ? 1 : 0.5
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: index === currentPhase ? Infinity : 0
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Corner Decorations */}
          <motion.div
            className="absolute top-8 left-8 w-16 h-16 border-l-4 border-t-4 border-[#009999] rounded-tl-2xl"
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-8 right-8 w-16 h-16 border-r-4 border-t-4 border-[#00cccc] rounded-tr-2xl"
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute bottom-8 left-8 w-16 h-16 border-l-4 border-b-4 border-[#FF6F61] rounded-bl-2xl"
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-16 h-16 border-r-4 border-b-4 border-[#00cccc] rounded-br-2xl"
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
