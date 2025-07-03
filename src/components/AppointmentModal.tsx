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
  XCircle,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AppointmentModalProps, AppointmentFormData } from '@/types/components';

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
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
    trigger,
    watch,
  } = useForm<AppointmentFormData>({
    mode: 'onChange',
    defaultValues: {
      serviceRequirement: '',
      patientFirstName: '',
      patientLastName: '',
      gender: '',
      age: '',
      complaints: [],
      otherComplaint: '',
      sinceWhen: '',
      medicalHistory: '',
      guardianFirstName: '',
      guardianLastName: '',
      guardianPhone: '',
      guardianEmail: '',
      addressStreet: '',
      addressLandmark: '',
      addressPin: '',
      referral: '',
      consent: false,
    },
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

  useEffect(() => {
    const navbar = document.getElementById('navbar');
    if (isOpen && navbar) {
      navbar.classList.add('hidden');
    } else if (navbar) {
      navbar.classList.remove('hidden');
    }
    return () => {
      if (navbar) navbar.classList.remove('hidden');
    };
  }, [isOpen]);

  const handleFormSubmit: SubmitHandler<AppointmentFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
      setIsSuccess(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3B82F6', '#EC4899', '#14B8A6', '#F59E0B'],
      });
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
    const fieldsToValidate =
      currentStep === 1
        ? [
            'serviceRequirement',
            'patientFirstName',
            'patientLastName',
            'gender',
            'age',
            'complaints',
            'sinceWhen',
          ]
        : [
            'guardianFirstName',
            'guardianLastName',
            'guardianPhone',
            'addressStreet',
            'addressLandmark',
            'addressPin',
            'referral',
            'consent',
          ];
    const isStepValid = await trigger(fieldsToValidate as (keyof AppointmentFormData)[]);
    if (isStepValid) {
      setCurrentStep(2);
    }
  };

  const prevStep = () => setCurrentStep(1);

  const complaintsOptions = [
    'Fever',
    'Headache',
    'Bodyache',
    'Weakness',
    'Chest Pain',
    'Abdomen Pain',
    'Vomiting',
    'Cough & Cold',
    'Dizziness',
    'Breathlessness',
    'Loose Motion',
    'Burning Urination',
    'Regular Checkup',
    'Body Pain',
    'Other',
  ];

  const sinceWhenOptions = [
    'Less than 1 Day',
    '1-2 Days',
    '2-3 Days',
    '4-7 Days',
    'More than a Week',
  ];

  const referralOptions = [
    'Google',
    'Past User',
    'Friends or Family',
    'Social Media',
    'Offline Advertisement',
  ];

  const backdropVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    initial: { opacity: 0, scale: 0.8, y: 50 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring' as const, damping: 25, stiffness: 300 },
    },
    exit: { opacity: 0, scale: 0.8, y: 50, transition: { duration: 0.2 } },
  };

  const stepVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  const successVariants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring' as const, damping: 20, stiffness: 300 },
    },
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        variants={backdropVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9999] flex items-start justify-center pt-36 pb-4 px-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          ref={modalRef}
          variants={modalVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[calc(100vh-6rem)] overflow-hidden border border-gray-100 relative my-4"
          onClick={(e) => e.stopPropagation()}
          tabIndex={-1}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <XCircle className="w-5 h-5 text-gray-500" />
          </button>

          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              Health Seva Onboarding Form
            </h2>
          </div>

          {/* Responsive Step Indicator + Form Layout */}
          <div className="flex flex-col md:flex-row w-full">
            {/* Step Indicator Sidebar */}
            <div className="flex md:flex-col flex-row md:w-56 w-full md:min-h-[500px] md:border-r border-b md:border-b-0 border-gray-100 bg-gray-50 md:bg-white py-2 md:py-8 px-2 md:px-4 items-center md:items-start justify-center md:justify-start gap-4 md:gap-8">
              <div className="flex items-center md:flex-col flex-row gap-2 md:gap-4">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  currentStep === 1 ? "bg-teal-600 text-white" : "bg-teal-100 text-teal-700"
                )}>
                  1
                </div>
                <span className={cn(
                  "text-xs md:text-sm font-medium md:mt-2",
                  currentStep === 1 ? "text-teal-700" : "text-gray-400"
                )}>
                  Patient Info
                </span>
              </div>
              <div className="hidden md:block w-1 h-8 bg-gray-200 mx-auto rounded-full" />
              <div className="flex items-center md:flex-col flex-row gap-2 md:gap-4">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  currentStep === 2 ? "bg-teal-600 text-white" : "bg-teal-100 text-teal-700"
                )}>
                  2
                </div>
                <span className={cn(
                  "text-xs md:text-sm font-medium md:mt-2",
                  currentStep === 2 ? "text-teal-700" : "text-gray-400"
                )}>
                  Guardian Info
                </span>
              </div>
            </div>

            {/* Form Content */}
            <div className="flex-1 px-2 md:px-8 py-4 max-h-[calc(100vh-16rem)] overflow-y-auto">
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
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 0.6,
                      ease: 'easeInOut',
                    }}
                    className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Appointment Booked!
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Thank you! We&apos;ll contact you shortly to confirm your appointment details.
                  </p>
                  <div className="text-sm text-gray-500">
                    This window will close automatically...
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                  <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        variants={stepVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                      >
                        {/* Left Column */}
                        <div className="space-y-4">
                          {/* Service Requirement */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Service Requirement <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-1 gap-2">
                              {[
                                'In-Home Doctor Consultation',
                                'In-Home Physiotherapy',
                                'In-Home Nursing Care',
                                'In-Home ECG',
                              ].map((option) => (
                                <label
                                  key={option}
                                  className="flex items-center space-x-2 cursor-pointer"
                                >
                                  <input
                                    type="checkbox"
                                    value={option}
                                    {...register('serviceRequirement', {
                                      required: 'Please select a service',
                                    })}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                  />
                                  <span className="text-sm text-gray-700">{option}</span>
                                </label>
                              ))}
                            </div>
                            {errors.serviceRequirement && (
                              <p className="mt-1 text-sm text-red-600">
                                {errors.serviceRequirement.message}
                              </p>
                            )}
                          </div>

                          {/* Patient Name */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Patient&apos;s Name <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <input
                                  type="text"
                                  {...register('patientFirstName', {
                                    required: 'First name is required',
                                  })}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                  placeholder="First Name"
                                />
                                <span className="text-xs text-gray-500 mt-1">First Name</span>
                              </div>
                              <div>
                                <input
                                  type="text"
                                  {...register('patientLastName', {
                                    required: 'Last name is required',
                                  })}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                  placeholder="Last Name"
                                />
                                <span className="text-xs text-gray-500 mt-1">Last Name</span>
                              </div>
                            </div>
                            {(errors.patientFirstName || errors.patientLastName) && (
                              <p className="mt-1 text-sm text-red-600">
                                {errors.patientFirstName?.message || errors.patientLastName?.message}
                              </p>
                            )}
                          </div>

                          {/* Gender */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Gender <span className="text-red-500">*</span>
                            </label>
                            <div className="flex space-x-6">
                              {['Male', 'Female'].map((option) => (
                                <label
                                  key={option}
                                  className="flex items-center space-x-2 cursor-pointer"
                                >
                                  <input
                                    type="radio"
                                    value={option}
                                    {...register('gender', {
                                      required: 'Please select gender',
                                    })}
                                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                  />
                                  <span className="text-sm text-gray-700">{option}</span>
                                </label>
                              ))}
                            </div>
                            {errors.gender && (
                              <p className="mt-1 text-sm text-red-600">
                                {errors.gender.message}
                              </p>
                            )}
                          </div>

                          {/* Age */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Patient&apos;s Age <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="number"
                              min="0"
                              {...register('age', { required: 'Age is required' })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                              placeholder="Age"
                            />
                            {errors.age && (
                              <p className="mt-1 text-sm text-red-600">
                                {errors.age.message}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                          {/* Complaints */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Complaints <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                              {complaintsOptions.map((option) => (
                                <label
                                  key={option}
                                  className="flex items-center space-x-2 cursor-pointer"
                                >
                                  <input
                                    type="checkbox"
                                    value={option}
                                    {...register('complaints', {
                                      required: 'Please select at least one complaint',
                                    })}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                  />
                                  <span className="text-sm text-gray-700">{option}</span>
                                </label>
                              ))}
                            </div>
                            {errors.complaints && (
                              <p className="mt-1 text-sm text-red-600">
                                {errors.complaints.message}
                              </p>
                            )}
                          </div>

                          {/* Since When */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Since When <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-1 gap-2">
                              {sinceWhenOptions.map((option) => (
                                <label
                                  key={option}
                                  className="flex items-center space-x-2 cursor-pointer"
                                >
                                  <input
                                    type="radio"
                                    value={option}
                                    {...register('sinceWhen', {
                                      required: 'Please select duration',
                                    })}
                                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                  />
                                  <span className="text-sm text-gray-700">{option}</span>
                                </label>
                              ))}
                            </div>
                            {errors.sinceWhen && (
                              <p className="mt-1 text-sm text-red-600">
                                {errors.sinceWhen.message}
                              </p>
                            )}
                          </div>

                          {/* Medical History */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Existing Medical Conditions
                            </label>
                            <textarea
                              {...register('medicalHistory')}
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                              placeholder="Please provide details about the patient's medical history, if any."
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 2 && (
                      <motion.div
                        key="step2"
                        variants={stepVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                      >
                        {/* Left Column */}
                        <div className="space-y-4">
                          {/* Contact Person Name */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Contact Person&apos;s Name <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <input
                                  type="text"
                                  {...register('guardianFirstName', {
                                    required: 'First name is required',
                                  })}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                  placeholder="First Name"
                                />
                                <span className="text-xs text-gray-500 mt-1">First Name</span>
                              </div>
                              <div>
                                <input
                                  type="text"
                                  {...register('guardianLastName', {
                                    required: 'Last name is required',
                                  })}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                  placeholder="Last Name"
                                />
                                <span className="text-xs text-gray-500 mt-1">Last Name</span>
                              </div>
                            </div>
                            {(errors.guardianFirstName || errors.guardianLastName) && (
                              <p className="mt-1 text-sm text-red-600">
                                {errors.guardianFirstName?.message || errors.guardianLastName?.message}
                              </p>
                            )}
                          </div>

                          {/* Phone Number */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Number <span className="text-red-500">*</span>
                            </label>
                            <div className="flex">
                              <span className="inline-flex items-center px-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md text-gray-600 text-sm">
                                🇮🇳 +91
                              </span>
                              <input
                                type="tel"
                                {...register('guardianPhone', {
                                  required: 'Phone number is required',
                                  pattern: {
                                    value: /^[6-9]\d{9}$/,
                                    message: 'Enter a valid 10-digit Indian number',
                                  },
                                })}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                placeholder="Phone Number"
                                maxLength={10}
                              />
                            </div>
                            {errors.guardianPhone && (
                              <p className="mt-1 text-sm text-red-600">
                                {errors.guardianPhone.message}
                              </p>
                            )}
                          </div>

                          {/* Email */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Email
                            </label>
                            <input
                              type="email"
                              {...register('guardianEmail')}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                              placeholder="Email (optional)"
                            />
                          </div>

                          {/* How did you find us */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              How did you find us? <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-1 gap-2">
                              {referralOptions.map((option) => (
                                <label
                                  key={option}
                                  className="flex items-center space-x-2 cursor-pointer"
                                >
                                  <input
                                    type="radio"
                                    value={option}
                                    {...register('referral', {
                                      required: 'Please select a referral source',
                                    })}
                                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                  />
                                  <span className="text-sm text-gray-700">{option}</span>
                                </label>
                              ))}
                            </div>
                            {errors.referral && (
                              <p className="mt-1 text-sm text-red-600">
                                {errors.referral.message}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                          {/* Patient Address */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Patient Address <span className="text-red-500">*</span>
                            </label>
                            <div className="space-y-2">
                              <div>
                                <input
                                  type="text"
                                  {...register('addressStreet', {
                                    required: 'Street address is required',
                                  })}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                  placeholder="Street Address"
                                />
                                <span className="text-xs text-gray-500 mt-1">Street Address</span>
                              </div>
                              <div>
                                <input
                                  type="text"
                                  {...register('addressLandmark', {
                                    required: 'Landmark is required',
                                  })}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                  placeholder="Landmark"
                                />
                                <span className="text-xs text-gray-500 mt-1">Landmark</span>
                              </div>
                              <div>
                                <input
                                  type="text"
                                  {...register('addressPin', {
                                    required: 'Pin code is required',
                                    pattern: {
                                      value: /^\d{6}$/,
                                      message: 'Enter a valid 6-digit PIN code',
                                    },
                                  })}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                  placeholder="Pin Code"
                                  maxLength={6}
                                />
                                <span className="text-xs text-gray-500 mt-1">Pin Code</span>
                              </div>
                            </div>
                            {(errors.addressStreet || errors.addressLandmark || errors.addressPin) && (
                              <p className="mt-1 text-sm text-red-600">
                                {errors.addressStreet?.message ||
                                  errors.addressLandmark?.message ||
                                  errors.addressPin?.message}
                              </p>
                            )}
                          </div>

                          {/* Terms and Conditions */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Terms and Conditions <span className="text-red-500">*</span>
                            </label>
                            <div className="border border-gray-300 rounded-md p-3 bg-gray-50 max-h-40 overflow-y-auto text-xs text-gray-600">
                              <p className="mb-2">
                                <strong>Consent for Medical Consultation and Treatment</strong>
                              </p>
                              <p className="mb-2">
                                I willingly agree to receive medical consultation or treatment from healthcare professionals, including but not limited to doctors, physiotherapists, and nursing staff.
                              </p>
                              <p className="mb-2">
                                By providing my consent, I acknowledge that Health Seva At Your Home, Health Sevak, and their associated personnel have explained the nature of the treatment, potential risks, benefits, and alternative treatment options available to me.
                              </p>
                              <p>
                                I furthermore assume full responsibility for all reasonable charges incurred during the diagnosis and treatment of my dependent.
                              </p>
                            </div>
                            <div className="flex items-start space-x-2 mt-2">
                              <input
                                type="checkbox"
                                {...register('consent', {
                                  required: 'You must accept the terms and conditions',
                                })}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                              />
                              <span className="text-sm text-gray-700">
                                I confirm that I fully understand and accept the risks and benefits of the treatment provided, and I consent to my dependent receiving treatment at home.
                              </span>
                            </div>
                            {errors.consent && (
                              <p className="mt-1 text-sm text-red-600">
                                {errors.consent.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              )}
            </div>
          </div>

          {/* Footer */}
          {!isSuccess && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors bg-white border border-gray-300 rounded-md"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              {currentStep === 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={handleSubmit(handleFormSubmit)}
                  className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Submit</span>
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
