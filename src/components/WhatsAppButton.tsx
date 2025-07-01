'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { WhatsAppButtonProps } from '@/types/components';

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber,
  message = 'Hi! I would like to get in touch.',
  position = 'bottom-right'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6'
  };

  return (
    <div className={cn('fixed z-50', positionClasses[position])}>
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className={cn(
              'absolute bottom-full mb-2 px-3 py-2 bg-white text-gray-800 text-sm rounded-lg shadow-lg whitespace-nowrap border',
              position === 'bottom-right' ? 'right-0' : 'left-0'
            )}
          >
            Chat with us on WhatsApp
            <div className={cn(
              'absolute top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white',
              position === 'bottom-right' ? 'right-4' : 'left-4'
            )} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleClick}
        onMouseEnter={() => {
          setIsHovered(true);
          setShowTooltip(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setShowTooltip(false);
        }}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        className="relative w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        whileHover={{ 
          scale: 1.1,
          rotate: 5
        }}
        whileTap={{ 
          scale: 0.95 
        }}
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        aria-label="Chat on WhatsApp"
      >
        <motion.div
          animate={{
            rotate: isHovered ? 360 : 0
          }}
          transition={{ duration: 0.5 }}
        >
          <MessageCircle className="w-6 h-6" />
        </motion.div>

        {/* Pulse Animation */}
        <motion.div
          className="absolute inset-0 bg-green-400 rounded-full opacity-75"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.75, 0, 0.75]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />

        {/* Notification Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
        >
          1
        </motion.div>
      </motion.button>
    </div>
  );
};

export default WhatsAppButton;
