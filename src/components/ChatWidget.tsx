import React, { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

const DUMMY_CONTACT = {
  name: 'HealthSeva Support',
  avatar: '/assets/logo.svg', // Use the actual HealthSeva logo
  status: 'Typically replies within a few minutes',
};

const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { from: 'support', text: 'Hi! 👋 How can we help you today?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { from: 'user', text: input }]);
      setInput('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-24 right-6 z-50 w-80 max-w-[95vw] h-96 bg-white rounded-2xl shadow-2xl flex flex-col border border-teal-200"
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#009999] to-[#14B8A6] rounded-t-2xl">
            <img src={DUMMY_CONTACT.avatar} alt="HealthSeva logo" className="w-10 h-10 rounded-full border-2 border-white bg-white object-contain p-1 shadow-md" />
            <div className="flex-1">
              <div className="font-semibold text-white text-base">{DUMMY_CONTACT.name}</div>
              <div className="text-xs text-teal-100">{DUMMY_CONTACT.status}</div>
            </div>
            <button onClick={onClose} className="text-white hover:text-teal-100 p-1"><X size={20} /></button>
          </div>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-2 bg-teal-50/40">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
                <div className={`rounded-xl px-3 py-2 text-sm max-w-[70%] ${msg.from === 'user' ? 'bg-gradient-to-br from-[#14B8A6] to-[#009999] text-black' : 'bg-white border border-teal-100 text-gray-800'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          {/* Input */}
          <form
            className="flex items-center gap-2 px-3 py-2 border-t bg-white rounded-b-2xl"
            onSubmit={e => { e.preventDefault(); handleSend(); }}
          >
            <input
              type="text"
              className="flex-1 px-3 py-2 rounded-full border border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-300 text-sm text-black"
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              autoFocus={isOpen}
            />
            <button type="submit" className="p-2 text-teal-600 hover:text-teal-800" aria-label="Send">
              <Send size={20} />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatWidget;
