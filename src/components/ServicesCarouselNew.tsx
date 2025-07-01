'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, Shield, Stethoscope, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  color: string;
  bgGradient: string;
}

interface ServicesCarouselProps {
  services?: ServiceItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showNavigation?: boolean;
  showDots?: boolean;
  onBookAppointment?: () => void;
}

const defaultServices: ServiceItem[] = [
  {
    id: 'physiotherapy',
    icon: <Users className="w-8 h-8" />,
    title: 'Physiotherapy',
    description: 'Professional physiotherapy services for rehabilitation and recovery',
    features: ['Movement Therapy', 'Pain Management', 'Recovery Plans', 'Expert Physiotherapists'],
    color: 'text-blue-500',
    bgGradient: 'from-blue-50 to-cyan-50'
  },
  {
    id: 'nursing-care',
    icon: <Heart className="w-8 h-8" />,
    title: 'Nursing Care',
    description: 'Compassionate nursing care with qualified healthcare professionals',
    features: ['24/7 Care', 'Qualified Nurses', 'Medical Assistance', 'Home Care'],
    color: 'text-green-500',
    bgGradient: 'from-green-50 to-emerald-50'
  },
  {
    id: 'medicine',
    icon: <Shield className="w-8 h-8" />,
    title: 'Medicine',
    description: 'Quality medicines and pharmaceutical care for all your health needs',
    features: ['Prescription Medicine', 'Home Delivery', 'Quality Assured', 'Expert Consultation'],
    color: 'text-purple-500',
    bgGradient: 'from-purple-50 to-violet-50'
  },
  {
    id: 'doctors-visit',
    icon: <Stethoscope className="w-8 h-8" />,
    title: 'Doctor Visits',
    description: 'Professional doctor consultations at your home or our clinic',
    features: ['Home Visits', 'Expert Doctors', 'Comprehensive Checkup', 'Follow-up Care'],
    color: 'text-red-500',
    bgGradient: 'from-red-50 to-pink-50'
  }
];

const ServicesCarousel: React.FC<ServicesCarouselProps> = ({
  services = defaultServices,
  autoPlay = true,
  autoPlayInterval = 4000,
  showNavigation = true,
  showDots = true,
  onBookAppointment
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play functionality
  React.useEffect(() => {
    if (isPlaying && autoPlay) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % services.length);
      }, autoPlayInterval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, autoPlay, autoPlayInterval, services.length]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-white via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-32 right-10 w-20 h-20 bg-blue-200 rounded-full opacity-30 blur-xl float" />
        <div className="absolute bottom-32 left-10 w-32 h-32 bg-purple-200 rounded-full opacity-30 blur-xl float" style={{animationDelay: '1s'}} />
        <div className="absolute top-20 left-1/3 w-16 h-16 bg-pink-200 rounded-full opacity-30 blur-xl float" style={{animationDelay: '2s'}} />
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
            Our Healthcare Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive medical care designed around your needs, available 24/7 
            with cutting-edge technology and compassionate professionals.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className={cn(
                'service-card p-6 rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300 cursor-pointer',
                `bg-gradient-to-br ${service.bgGradient} border border-white/50`
              )}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onClick={() => onBookAppointment?.()}
            >
              {/* Service Icon */}
              <motion.div
                className={cn(
                  'inline-flex p-4 rounded-xl bg-white shadow-soft mb-6',
                  service.color
                )}
                whileHover={{ 
                  rotate: 360,
                  scale: 1.1,
                  transition: { duration: 0.6 }
                }}
              >
                {service.icon}
              </motion.div>

              {/* Service Title */}
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {service.title}
              </h3>

              {/* Service Description */}
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Service Features */}
              <div className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Book Appointment Button */}
              <motion.button
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onBookAppointment?.();
                }}
              >
                Book Now
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Featured Service Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Service Content */}
              <div className="space-y-6">
                <motion.div
                  className={cn(
                    'inline-flex p-4 rounded-xl bg-gray-100',
                    services[currentIndex].color
                  )}
                  key={currentIndex}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {services[currentIndex].icon}
                </motion.div>

                <motion.h3
                  className="text-3xl font-bold text-gray-800"
                  key={`title-${currentIndex}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {services[currentIndex].title}
                </motion.h3>

                <motion.p
                  className="text-gray-600 text-lg leading-relaxed"
                  key={`desc-${currentIndex}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {services[currentIndex].description}
                </motion.p>

                <motion.div
                  className="space-y-3"
                  key={`features-${currentIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {services[currentIndex].features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    >
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <span className="text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onBookAppointment?.()}
                >
                  Book Appointment
                </motion.button>
              </div>

              {/* Visual Element */}
              <div className="relative">
                <motion.div
                  className={cn(
                    'w-80 h-80 rounded-3xl mx-auto bg-gradient-to-br',
                    services[currentIndex].bgGradient
                  )}
                  key={`visual-${currentIndex}`}
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className={cn(
                        'w-32 h-32 rounded-2xl bg-white shadow-lg flex items-center justify-center',
                        services[currentIndex].color
                      )}
                      animate={{ 
                        y: [-5, 5, -5],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    >
                      <div className="scale-150">
                        {services[currentIndex].icon}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Controls */}
          {showNavigation && (
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={goToPrevious}
                className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-xl transition-all duration-300"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>

                {showDots && (
                  <div className="flex space-x-2">
                    {services.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={cn(
                          'w-3 h-3 rounded-full transition-all duration-300',
                          index === currentIndex
                            ? 'bg-blue-600 scale-125'
                            : 'bg-gray-300 hover:bg-gray-400'
                        )}
                      />
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={goToNext}
                className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-xl transition-all duration-300"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesCarousel;
