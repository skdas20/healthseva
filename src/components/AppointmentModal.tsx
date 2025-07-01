'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import confetti from 'canvas-confetti';
import { 
  Calendar,
  User,
  Phone,
  Mail,
  MessageSquare,
  Stethoscope,
  CheckCircle,
  Loader2,
  ArrowRight,
  ArrowLeft,
  XCircle,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AppointmentModalProps, AppointmentFormData } from '@/types/components';

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger
  } = useForm<AppointmentFormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      serviceType: '',
      preferredDate: '',
      preferredTime: '',
      message: ''
    }
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = 'unset';
      setCurrentStep(1);
      setIsSuccess(false);
      reset();
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, reset]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleFormSubmit: SubmitHandler<AppointmentFormData> = async (data) => {
    setIsSubmitting(true);
    
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
      setIsSuccess(true);
      
      // Trigger confetti animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3B82F6', '#EC4899', '#14B8A6', '#F59E0B']
      });
      
      // Auto close after success
      setTimeout(() => {
        onClose();
      }, 4000);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    const fieldsToValidate = currentStep === 1 
      ? ['name', 'phone', 'email'] 
      : ['serviceType', 'preferredDate', 'preferredTime'];
    
    const isStepValid = await trigger(fieldsToValidate as (keyof AppointmentFormData)[]);
    
    if (isStepValid) {
      setCurrentStep(2);
    }
  };

  const prevStep = () => {
    setCurrentStep(1);
  };

  const serviceTypes = [
    'General Consultation',
    'Emergency Care',
    'Specialist Appointment',
    'Health Checkup',
    'Telemedicine',
    'Home Visit',
    'Follow-up Consultation'
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
    '05:00 PM', '05:30 PM'
  ];

  const backdropVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const modalVariants = {
    initial: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50 
    },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 25,
        stiffness: 300
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  const stepVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  const successVariants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: 'spring' as const,
        damping: 20,
        stiffness: 300
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        variants={backdropVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          ref={modalRef}
          variants={modalVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-soft-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          tabIndex={-1}
        >
          {/* Header */}
          <div className="relative px-6 py-4 border-b border-gray-200/50 bg-gradient-soft">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-2 hover:bg-white/50 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <XCircle className="w-5 h-5 text-navy-600" />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-navy-800">Book Appointment</h2>
                <p className="text-sm text-navy-600">Schedule your healthcare consultation</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 flex items-center space-x-2">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-primary"
                  initial={{ width: '50%' }}
                  animate={{ width: currentStep === 1 ? '50%' : '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <span className="text-xs text-navy-600">
                Step {currentStep} of 2
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6 max-h-[60vh] overflow-y-auto">
            {isSuccess ? (
              <motion.div
                variants={successVariants}
                initial="initial"
                animate="animate"
                className="text-center py-8"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 360]
                  }}
                  transition={{ 
                    duration: 0.6,
                    ease: 'easeInOut'
                  }}
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </motion.div>
                <h3 className="text-2xl font-bold text-navy-800 mb-2">
                  Appointment Booked!
                </h3>
                <p className="text-navy-600 mb-4">
                  Thank you! We&apos;ll contact you shortly to confirm your appointment details.
                </p>
                <div className="text-sm text-navy-500">
                  This window will close automatically...
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                <AnimatePresence mode="wait">
                  {currentStep === 1 ? (
                    <motion.div
                      key="step1"
                      variants={stepVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="space-y-6"
                    >
                      <h3 className="text-lg font-semibold text-navy-800 mb-4">
                        Personal Information
                      </h3>

                      {/* Name Field */}
                      <div>
                        <label className="block text-sm font-medium text-navy-700 mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-navy-400" />
                          <input
                            {...register('name', { 
                              required: 'Name is required',
                              minLength: { value: 2, message: 'Name must be at least 2 characters' }
                            })}
                            type="text"
                            className={cn(
                              'w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors',
                              errors.name ? 'border-red-300' : 'border-gray-300'
                            )}
                            placeholder="Enter your full name"
                          />
                        </div>
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                        )}
                      </div>

                      {/* Phone Field */}
                      <div>
                        <label className="block text-sm font-medium text-navy-700 mb-2">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-navy-400" />
                          <input
                            {...register('phone', { 
                              required: 'Phone number is required',
                              pattern: {
                                value: /^[\+]?[1-9][\d]{0,15}$/,
                                message: 'Invalid phone number'
                              }
                            })}
                            type="tel"
                            className={cn(
                              'w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors',
                              errors.phone ? 'border-red-300' : 'border-gray-300'
                            )}
                            placeholder="Enter your phone number"
                          />
                        </div>
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                        )}
                      </div>

                      {/* Email Field */}
                      <div>
                        <label className="block text-sm font-medium text-navy-700 mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-navy-400" />
                          <input
                            {...register('email', { 
                              required: 'Email is required',
                              pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address'
                              }
                            })}
                            type="email"
                            className={cn(
                              'w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors',
                              errors.email ? 'border-red-300' : 'border-gray-300'
                            )}
                            placeholder="Enter your email address"
                          />
                        </div>
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="step2"
                      variants={stepVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="space-y-6"
                    >
                      <h3 className="text-lg font-semibold text-navy-800 mb-4">
                        Appointment Details
                      </h3>

                      {/* Service Type */}
                      <div>
                        <label className="block text-sm font-medium text-navy-700 mb-2">
                          Service Type *
                        </label>
                        <div className="relative">
                          <Stethoscope className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-navy-400" />
                          <select
                            {...register('serviceType', { required: 'Please select a service type' })}
                            className={cn(
                              'w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors',
                              errors.serviceType ? 'border-red-300' : 'border-gray-300'
                            )}
                          >
                            <option value="">Select a service</option>
                            {serviceTypes.map((service) => (
                              <option key={service} value={service}>
                                {service}
                              </option>
                            ))}
                          </select>
                        </div>
                        {errors.serviceType && (
                          <p className="mt-1 text-sm text-red-600">{errors.serviceType.message}</p>
                        )}
                      </div>

                      {/* Date and Time */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-navy-700 mb-2">
                            Preferred Date *
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-navy-400" />
                            <input
                              {...register('preferredDate', { required: 'Please select a date' })}
                              type="date"
                              min={new Date().toISOString().split('T')[0]}
                              className={cn(
                                'w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors',
                                errors.preferredDate ? 'border-red-300' : 'border-gray-300'
                              )}
                            />
                          </div>
                          {errors.preferredDate && (
                            <p className="mt-1 text-sm text-red-600">{errors.preferredDate.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-navy-700 mb-2">
                            Preferred Time *
                          </label>
                          <div className="relative">
                            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-navy-400" />
                            <select
                              {...register('preferredTime', { required: 'Please select a time' })}
                              className={cn(
                                'w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors',
                                errors.preferredTime ? 'border-red-300' : 'border-gray-300'
                              )}
                            >
                              <option value="">Select time</option>
                              {timeSlots.map((time) => (
                                <option key={time} value={time}>
                                  {time}
                                </option>
                              ))}
                            </select>
                          </div>
                          {errors.preferredTime && (
                            <p className="mt-1 text-sm text-red-600">{errors.preferredTime.message}</p>
                          )}
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-sm font-medium text-navy-700 mb-2">
                          Additional Message (Optional)
                        </label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-navy-400" />
                          <textarea
                            {...register('message')}
                            rows={4}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                            placeholder="Tell us about your symptoms or any specific concerns..."
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            )}
          </div>

          {/* Footer */}
          {!isSuccess && (
            <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-200/50 flex justify-between">
              {currentStep === 2 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center space-x-2 px-4 py-2 text-navy-600 hover:text-navy-800 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              ) : (
                <div />
              )}

              {currentStep === 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center space-x-2 btn-primary"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={handleSubmit(handleFormSubmit)}
                  className="flex items-center space-x-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Booking...</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      <span>Book Appointment</span>
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AppointmentModal;
