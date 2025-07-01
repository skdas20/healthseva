'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  UserCheck, 
  Clock, 
  Cpu, 
  DollarSign
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface BenefitItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  shortDescription: string;
  detailedExplanation: string;
  stats: { value: string; label: string };
  color: string;
}

interface BenefitsProps {
  benefits?: BenefitItem[];
  title?: string;
  subtitle?: string;
}

const defaultBenefits: BenefitItem[] = [
  {
    id: 'expert-doctors',
    icon: <UserCheck className="w-8 h-8" />,
    title: 'Expert Doctors',
    shortDescription: 'Certified medical professionals with years of experience',
    detailedExplanation: 'Our team consists of board-certified doctors with specialized training in their respective fields. Each physician undergoes rigorous screening and continuous education to ensure the highest standards of medical care.',
    stats: { value: '500+', label: 'Certified Doctors' },
    color: 'text-blue-500'
  },
  {
    id: 'support',
    icon: <Clock className="w-8 h-8" />,
    title: '24/7 Support',
    shortDescription: 'Round-the-clock medical assistance whenever you need it',
    detailedExplanation: 'Healthcare emergencies don\'t follow a schedule, and neither do we. Our 24/7 support system includes emergency hotlines, chat support, and on-call medical professionals.',
    stats: { value: '24/7', label: 'Availability' },
    color: 'text-green-500'
  },
  {
    id: 'technology',
    icon: <Cpu className="w-8 h-8" />,
    title: 'Advanced Technology',
    shortDescription: 'Cutting-edge medical equipment and digital solutions',
    detailedExplanation: 'We invest in the latest medical technology to provide accurate diagnoses and effective treatments. From AI-powered diagnostic tools to robotic surgery systems, our advanced equipment ensures precision in every procedure.',
    stats: { value: '95%', label: 'Accuracy Rate' },
    color: 'text-purple-500'
  },
  {
    id: 'affordable',
    icon: <DollarSign className="w-8 h-8" />,
    title: 'Affordable Plans',
    shortDescription: 'Quality healthcare that doesn\'t break the bank',
    detailedExplanation: 'We believe healthcare should be accessible to everyone. Our flexible payment plans and insurance partnerships make quality medical care affordable.',
    stats: { value: '40%', label: 'Cost Savings' },
    color: 'text-orange-500'
  }
];


const BenefitsSection: React.FC<BenefitsProps> = ({
  benefits = defaultBenefits,
  title = 'Why Choose HealthSeva',
  subtitle = 'Experience healthcare excellence with benefits designed around your needs'
}) => {
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleCardFlip = (cardId: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const isCardFlipped = (cardId: string) => flippedCards.has(cardId);

  return (
    <section ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-50 rounded-full opacity-20 blur-2xl" />
        <div className="absolute bottom-32 right-20 w-40 h-40 bg-purple-50 rounded-full opacity-20 blur-2xl" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-50 rounded-full opacity-20 blur-2xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gradient-primary mb-6">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              className={cn("flip-card cursor-pointer", isCardFlipped(benefit.id) && "flipped")}
              initial={{ opacity: 0, y: 60, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onClick={() => handleCardFlip(benefit.id)}
              whileHover={{ y: -5 }}
            >
              <div className="flip-card-inner">
                {/* Front of card */}
                <div className="flip-card-front bg-gradient-to-br from-white to-gray-50 border border-gray-100">
                  <div className="flex flex-col items-center justify-center text-center h-full">
                    {/* Icon */}
                    <motion.div
                      className={cn(
                        'inline-flex p-4 rounded-full bg-white shadow-soft mb-6',
                        benefit.color
                      )}
                      whileHover={{ 
                        rotate: 360,
                        scale: 1.1,
                        transition: { duration: 0.6 }
                      }}
                    >
                      {benefit.icon}
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      {benefit.title}
                    </h3>

                    {/* Short description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {benefit.shortDescription}
                    </p>

                    {/* Stats */}
                    {benefit.stats && (
                      <div className="text-center mb-4">
                        <div className="text-2xl font-bold text-blue-600">
                          {benefit.stats.value}
                        </div>
                        <div className="text-sm text-gray-500">
                          {benefit.stats.label}
                        </div>
                      </div>
                    )}

                    {/* Click hint */}
                    <div className="mt-auto">
                      <span className="text-xs text-gray-400">Click to learn more</span>
                    </div>
                  </div>
                </div>

                {/* Back of card */}
                <div className="flip-card-back">
                  <div className="flex flex-col items-center justify-center text-center h-full text-white">
                    <motion.div
                      className="mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: isCardFlipped(benefit.id) ? 1 : 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      {benefit.icon}
                    </motion.div>

                    <h3 className="text-xl font-bold mb-4">
                      {benefit.title}
                    </h3>

                    <p className="text-sm leading-relaxed mb-6 opacity-90">
                      {benefit.detailedExplanation}
                    </p>

                    {benefit.stats && (
                      <div className="text-center">
                        <div className="text-3xl font-bold">
                          {benefit.stats.value}
                        </div>
                        <div className="text-sm opacity-80">
                          {benefit.stats.label}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-600 mb-6">
            Ready to experience the HealthSeva difference?
          </p>
          <motion.button
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
