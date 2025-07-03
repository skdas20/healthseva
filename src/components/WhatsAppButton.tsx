'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { WhatsAppButtonProps } from '@/types/components';

const mockMessages = [
  { from: 'agent', text: 'Hi! 👋 Welcome to HealthSeva. How can we help you today?' },
];

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber,
  message = 'Hi! I would like to get in touch.',
  position = 'bottom-right',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
  };

  useEffect(() => {
    if (isOpen && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages]);

  const handleSend = () => {
    if (input.trim() === '') return;
    setMessages((msgs) => [
      ...msgs,
      { from: 'user', text: input },
      // Optionally, add a mock agent reply after a delay
    ]);
    setInput('');
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className={cn('fixed z-50 flex flex-col items-end', positionClasses[position])}>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="mb-4 w-80 max-w-xs sm:max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
            style={{ boxShadow: '0 8px 32px 0 rgba(20,184,166,0.18)' }}
            aria-label="WhatsApp Chat Window"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#14b8a6] to-[#60a5fa] text-white">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
                  <MessageCircle className="w-5 h-5 text-white" />
                </span>
                <span className="font-semibold text-base">HealthSeva</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Chat Body */}
            <div className="flex-1 bg-[#f8fafc] px-3 py-2 overflow-y-auto" style={{ maxHeight: 320 }}>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={cn(
                    'flex mb-2',
                    msg.from === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      'px-3 py-2 rounded-xl text-sm max-w-[75%] shadow',
                      msg.from === 'user'
                        ? 'bg-gradient-to-br from-[#3b82f6] to-[#ec4899] text-white'
                        : 'bg-white border border-gray-200 text-[#1e293b]'
                    )}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            {/* Input */}
            <div className="flex items-center gap-2 px-3 py-2 bg-white border-t border-gray-100">
              <input
                type="text"
                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#14b8a6] text-sm bg-[#f8fafc]"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleInputKeyDown}
                aria-label="Type your message"
              />
              <button
                onClick={handleSend}
                className="p-2 rounded-full bg-gradient-to-br from-[#14b8a6] to-[#60a5fa] text-white hover:scale-105 transition"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen((open) => !open)}
        className="relative w-14 h-14 bg-gradient-to-br from-[#14b8a6] to-[#60a5fa] hover:from-[#60a5fa] hover:to-[#14b8a6] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
        aria-label="Open WhatsApp chat"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <MessageCircle className="w-6 h-6" />
        {/* Pulse Animation */}
        <motion.div
          className="absolute inset-0 bg-[#14b8a6] rounded-full opacity-40 pointer-events-none"
          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        />
        {/* Notification Badge (optional, can be dynamic) */}
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
