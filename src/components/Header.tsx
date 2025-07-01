'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail, MapPin, Heart, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { menuVariants, menuItemVariants } from '@/lib/animations';
import React from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/doctors', label: 'Doctors' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Enhanced Top Bar with Hover Effects */}
      <motion.div 
        className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-2 px-4 text-sm relative overflow-hidden"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20"
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
        
        <div className="container-custom flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 relative z-10">
          <div className="flex items-center space-x-6">
            <motion.div 
              className="flex items-center space-x-2 group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Phone className="h-4 w-4 group-hover:text-yellow-300 transition-colors" />
              </motion.div>
              <span className="group-hover:text-yellow-300 transition-colors">+1 (555) 123-4567</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-2 group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Mail className="h-4 w-4 group-hover:text-yellow-300 transition-colors" />
              </motion.div>
              <span className="group-hover:text-yellow-300 transition-colors">info@healthseva.com</span>
            </motion.div>
          </div>
          
          <motion.div 
            className="flex items-center space-x-2 group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <MapPin className="h-4 w-4 group-hover:text-yellow-300 transition-colors" />
            </motion.div>
            <span className="group-hover:text-yellow-300 transition-colors font-medium">
              24/7 Emergency Care Available
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Main Header */}
      <motion.header
        className={cn(
          'sticky top-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100'
            : 'bg-white shadow-sm'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between py-4">
            {/* Enhanced Logo with Glow Effect */}
            <Link href="/" className="flex items-center group">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full blur-lg opacity-0 group-hover:opacity-30"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0, 0.3, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Logo */}
                <motion.div
                  className="relative z-10"
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src="/assets/logo.svg"
                    alt="HealthSeva"
                    width={60}
                    height={60}
                    className="h-16 w-auto transition-all duration-300 group-hover:drop-shadow-lg"
                    priority
                  />
                </motion.div>
                
                {/* Sparkle Effect */}
                <motion.div
                  className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100"
                  animate={{
                    rotate: 360,
                    scale: [0, 1, 0]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Sparkles className="h-4 w-4 text-yellow-400" />
                </motion.div>
              </motion.div>
            </Link>

            {/* Enhanced Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {navItems.map((item, index) => {
                const active = isActive(item.href);
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "relative px-4 py-2 font-medium transition-all duration-300 rounded-lg group",
                        active
                          ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
                          : "text-gray-700 hover:text-blue-600"
                      )}
                    >
                      {/* Active State Glow */}
                      {active && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg blur-sm opacity-50"
                          animate={{
                            scale: [1, 1.05, 1],
                            opacity: [0.5, 0.8, 0.5]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      )}
                      
                      {/* Hover Background */}
                      {!active && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg opacity-0 group-hover:opacity-100"
                          transition={{ duration: 0.3 }}
                        />
                      )}
                      
                      {/* Text with Sparkle Effect for Active */}
                      <span className="relative z-10 flex items-center space-x-1">
                        <span>{item.label}</span>
                        {active && (
                          <motion.div
                            animate={{
                              rotate: 360,
                              scale: [0.8, 1.2, 0.8]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            <Sparkles className="h-3 w-3" />
                          </motion.div>
                        )}
                      </span>
                      
                      {/* Hover Underline */}
                      {!active && (
                        <motion.span 
                          className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Enhanced CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href="/appointment"
                  className="relative px-6 py-2 text-blue-600 border-2 border-blue-600 rounded-lg font-medium transition-all duration-300 hover:bg-blue-600 hover:text-white group overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10">Book Appointment</span>
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href="/emergency"
                  className="relative px-6 py-2 text-white bg-gradient-to-r from-red-500 to-pink-600 rounded-lg font-medium transition-all duration-300 hover:shadow-lg group overflow-hidden"
                >
                  {/* Pulse Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-500 opacity-0 group-hover:opacity-100"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0, 0.3, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <span className="relative z-10 flex items-center space-x-1">
                    <span>Emergency Care</span>
                    <motion.div
                      animate={{
                        scale: [1, 1.3, 1]
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Heart className="h-4 w-4" />
                    </motion.div>
                  </span>
                </Link>
              </motion.div>
            </div>

            {/* Enhanced Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 rounded-lg hover:bg-gray-100 transition-all duration-300 group"
              aria-label="Toggle menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-gray-700 group-hover:text-red-500 transition-colors" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={menuVariants}
              className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-xl"
            >
              <div className="container-custom py-6">
                <nav className="space-y-2">
                  {navItems.map((item, index) => {
                    const active = isActive(item.href);
                    return (
                      <motion.div
                        key={item.href}
                        variants={menuItemVariants}
                        custom={index}
                      >
                        <Link
                          href={item.href}
                          className={cn(
                            "block py-3 px-4 rounded-lg font-medium transition-all duration-300",
                            active
                              ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
                              : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                          )}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span className="flex items-center space-x-2">
                            <span>{item.label}</span>
                            {active && (
                              <motion.div
                                animate={{
                                  rotate: 360,
                                  scale: [0.8, 1.2, 0.8]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              >
                                <Sparkles className="h-3 w-3" />
                              </motion.div>
                            )}
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                  
                  {/* Enhanced Mobile CTA Buttons */}
                  <motion.div
                    variants={menuItemVariants}
                    className="pt-6 space-y-3 border-t border-gray-200"
                  >
                    <Link
                      href="/appointment"
                      className="block w-full text-center py-3 px-4 text-blue-600 border-2 border-blue-600 rounded-lg font-medium transition-all duration-300 hover:bg-blue-600 hover:text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Book Appointment
                    </Link>
                    <Link
                      href="/emergency"
                      className="block w-full text-center py-3 px-4 text-white bg-gradient-to-r from-red-500 to-pink-600 rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Emergency Care
                    </Link>
                  </motion.div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Header;
