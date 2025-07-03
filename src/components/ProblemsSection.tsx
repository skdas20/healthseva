'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock3, DollarSign, MapPin, MessageSquareX, ArrowRight, Heart, Zap } from 'lucide-react';
import { GSAPAnimations } from '@/lib/gsap';
import { ProblemItem, ProblemsProps } from '@/types';
import { cn } from '@/lib/utils';

const defaultProblems: ProblemItem[] = [
  {
    id: 'wait-times',
    icon: <Clock3 className="w-8 h-8" />,
    title: 'Long Wait Times',
    description: 'Patients often wait hours for appointments and emergency care',
    solution: 'Our smart scheduling system and 24/7 availability ensure immediate care when you need it most',
    severity: 'high',
    color: 'text-red-500'
  },
  {
    id: 'expensive-care',
    icon: <DollarSign className="w-8 h-8" />,
    title: 'Expensive Healthcare',
    description: 'Medical bills can be overwhelming and unpredictable',
    solution: 'Transparent pricing, flexible payment plans, and insurance partnerships make quality care affordable',
    severity: 'high',
    color: 'text-orange-500'
  },
  {
    id: 'limited-access',
    icon: <MapPin className="w-8 h-8" />,
    title: 'Limited Access',
    description: 'Geographic barriers prevent access to quality healthcare',
    solution: 'Telemedicine, home visits, and multiple locations bring healthcare directly to you',
    severity: 'medium',
    color: 'text-yellow-500'
  },
  {
    id: 'poor-communication',
    icon: <MessageSquareX className="w-8 h-8" />,
    title: 'Poor Communication',
    description: 'Unclear medical information and lack of patient engagement',
    solution: 'Digital health records, clear communication protocols, and 24/7 support keep you informed',
    severity: 'medium',
    color: 'text-blue-500'
  }
];

const ProblemsSection: React.FC<ProblemsProps> = ({
  problems = defaultProblems,
  title = 'Healthcare Challenges We Solve',
  subtitle = 'Addressing the pain points that matter most to patients'
}) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [visibleSolutions, setVisibleSolutions] = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Color transition animation for problem icons
    problems.forEach((problem) => {
      const iconElement = document.querySelector(`#problem-icon-${problem.id}`);
      if (iconElement) {
        GSAPAnimations.colorTransition(iconElement as HTMLElement, [
          problem.color.replace('text-', '#'),
          '#6366f1', // indigo
          problem.color.replace('text-', '#')
        ]);
      }
    });

    // Intersection observer for entrance animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate cards with stagger
            cardRefs.current.forEach((card) => {
              if (card) {
                setTimeout(() => {
                  card.style.opacity = '1';
                  card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
                }, 150);
              }
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [problems]);

  const handleCardHover = (problemId: string, isHovered: boolean) => {
    setHoveredCard(isHovered ? problemId : null);
    
    const cardElement = document.getElementById(`problem-card-${problemId}`);
    if (cardElement) {
      GSAPAnimations.isometricCard(cardElement, isHovered);
    }
  };

  const toggleSolution = (problemId: string) => {
    setVisibleSolutions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(problemId)) {
        newSet.delete(problemId);
      } else {
        newSet.add(problemId);
      }
      return newSet;
    });
  };

  const getSeverityColor = (severity: ProblemItem['severity']) => {
    switch (severity) {
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50';
      case 'low':
        return 'border-green-200 bg-green-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <section ref={sectionRef} className="section-padding bg-gradient-soft relative overflow-hidden">
      {/* Background geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-40 h-40 bg-primary-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-20 w-32 h-32 bg-accent-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-secondary-200/20 rounded-full blur-3xl" />
        
        {/* Floating geometric shapes */}
        <div className="absolute top-40 right-1/4 w-8 h-8 bg-primary-300 rounded rotate-45 opacity-20" />
        <div className="absolute bottom-40 left-1/4 w-6 h-6 bg-accent-300 rounded-full opacity-20" />
        <div className="absolute top-60 left-20 w-4 h-8 bg-secondary-300 rounded opacity-20" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 
            className="text-4xl lg:text-5xl font-extrabold mb-6 bg-clip-text text-transparent"
            style={{
              background: 'linear-gradient(135deg, #009999, #00CED1, #1E90FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent'
            }}
          >
            {title}
          </h2>
          <p className="text-xl text-navy-600 max-w-3xl mx-auto mt-4 drop-shadow-sm bg-white/60 rounded-xl px-4 py-2 inline-block">
            {subtitle}
          </p>
        </motion.div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              id={`problem-card-${problem.id}`}
              className={cn(
                'relative group cursor-pointer transition-all duration-500 opacity-0',
                'transform translate-y-12 rotateX-12 rotateY-6',
                getSeverityColor(problem.severity)
              )}
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
              onMouseEnter={() => handleCardHover(problem.id, true)}
              onMouseLeave={() => handleCardHover(problem.id, false)}
              onClick={() => toggleSolution(problem.id)}
              initial={{ opacity: 0, y: 60, rotateX: 15, rotateY: -5 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
            >
              <div className="card rounded-2xl p-8 h-full min-h-[300px] flex flex-col">
                {/* Problem Header */}
                <div className="flex items-start space-x-4 mb-6">
                  <motion.div
                    id={`problem-icon-${problem.id}`}
                    className={cn(
                      'flex-shrink-0 p-3 rounded-full bg-white shadow-soft',
                      problem.color
                    )}
                    animate={{
                      y: hoveredCard === problem.id ? [-5, 5, -5] : 0,
                      rotate: hoveredCard === problem.id ? [0, 10, -10, 0] : 0
                    }}
                    transition={{
                      duration: 2,
                      repeat: hoveredCard === problem.id ? Infinity : 0,
                      ease: 'easeInOut'
                    }}
                  >
                    {problem.icon}
                  </motion.div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-navy-800 mb-2">
                      {problem.title}
                    </h3>
                    <div className={cn(
                      'inline-block px-2 py-1 rounded-full text-xs font-medium',
                      problem.severity === 'high' ? 'bg-red-100 text-red-700' :
                      problem.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    )}>
                      {problem.severity.toUpperCase()} PRIORITY
                    </div>
                  </div>
                </div>

                {/* Problem Description */}
                <p className="text-navy-600 leading-relaxed mb-6 flex-1">
                  {problem.description}
                </p>

                {/* Solution Toggle */}
                <motion.div
                  className="border-t border-gray-200 pt-4"
                  initial={false}
                >
                  <motion.button
                    className="flex items-center justify-between w-full text-left group"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-sm font-medium text-teal-600 group-hover:text-teal-500">
                      How HealthSeva Solves This
                    </span>
                    <motion.div
                      animate={{ 
                        rotate: visibleSolutions.has(problem.id) ? 90 : 0 
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight className="w-4 h-4 text-teal-600 group-hover:text-teal-500" />
                    </motion.div>
                  </motion.button>

                  {/* Solution Content */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: visibleSolutions.has(problem.id) ? 'auto' : 0,
                      opacity: visibleSolutions.has(problem.id) ? 1 : 0
                    }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 pb-2">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-navy-600 leading-relaxed">
                          {problem.solution}
                        </p>
                      </div>
                      
                      <motion.button
                        className="mt-4 btn-primary text-sm px-4 py-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Learn More
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Hover overlay effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-primary opacity-0 rounded-2xl pointer-events-none"
                  animate={{ 
                    opacity: hoveredCard === problem.id ? 0.05 : 0 
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          className="mt-20 text-center bg-white rounded-3xl shadow-soft-lg p-8 lg:p-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-r from-[#009999] to-[#00cccc] animate-spin-slow mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent" style={{ background: 'linear-gradient(135deg, #009999, #00cccc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Ready for better health care?
              </h3>
            </div>
            <p className="text-navy-600 mb-8 text-lg">
              Don&apos;t let these problems affect your health and well-being. 
              Experience the HealthSeva difference today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bg-gradient-to-r from-[#009999] to-[#00cccc] text-white px-8 py-3 flex items-center space-x-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Zap className="w-5 h-5" />
                <span>Book Appointment Now</span>
              </motion.button>
              
              <motion.button
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn About Our Solutions
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Custom CSS for 3D effects */}
      <style jsx>{`
        .rotateX-12 {
          transform: rotateX(12deg);
        }
        .rotateY-6 {
          transform: rotateY(6deg);
        }
      `}</style>
    </section>
  );
};

export default ProblemsSection;
