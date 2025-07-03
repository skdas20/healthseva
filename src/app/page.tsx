'use client';

import React, { useState } from 'react';
import Hero from '@/components/Hero';
import ServicesCarousel from '@/components/ServicesCarouselNew';
import BenefitsSection from '@/components/BenefitsSectionNew';
import ProblemsSection from '@/components/ProblemsSection';
import ContactSection from '@/components/ContactSectionSimple';
import AppointmentModal from '@/components/AppointmentModal';
import WhatsAppButton from '@/components/WhatsAppButton';
import Footer from '@/components/Footer';
import { AppointmentFormData } from '@/types/components';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hero section configuration
  const heroConfig = {
    title: 'Your Health, Our Priority',
    subtitle: 'Experience world-class healthcare with compassionate care, cutting-edge technology, and personalized treatment plans designed just for you.',
    primaryCta: {
      text: 'Book Appointment',
      href: '#contact'
    },
    secondaryCta: {
      text: 'Learn More',
      href: '#services'
    },
    videoSrc: '/assets/demo.mp4',
    socialLinks: [
      {
        platform: 'Facebook',
        href: 'https://facebook.com/healthseva',
        icon: '📘'
      },
      {
        platform: 'Twitter',
        href: 'https://twitter.com/healthseva',
        icon: '🐦'
      },
      {
        platform: 'Instagram',
        href: 'https://instagram.com/healthseva',
        icon: '📷'
      }
    ]
  };

  // Handle appointment form submission
  const handleAppointmentSubmit = async (data: AppointmentFormData) => {
    try {
      // Simulate API call
      console.log('Submitting appointment:', data);
      
      // Here you would typically send the data to your backend
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit appointment');
      }

      // Success handling is done in the modal component
      return await response.json();
    } catch (error) {
      console.error('Appointment submission error:', error);
      throw error;
    }
  };

  // Modal control functions
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <section id="home" className="min-h-screen">
          <Hero
            title={heroConfig.title}
            subtitle={heroConfig.subtitle}
            primaryCta={{
              ...heroConfig.primaryCta,
              onClick: openModal
            }}
            secondaryCta={heroConfig.secondaryCta}
            videoSrc={heroConfig.videoSrc}
            socialLinks={heroConfig.socialLinks}
          />
        </section>

        {/* Services Section */}
        <section id="services" className="relative">
          <ServicesCarousel onBookAppointment={openModal} />
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="relative">
          <BenefitsSection />
        </section>

        {/* Problems We Solve Section */}
        <section id="about" className="relative">
          <ProblemsSection />
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative">
          <ContactSection onOpenModal={openModal} />
        </section>
      </main>

      {/* Floating Action Buttons */}
      <WhatsAppButton 
        phoneNumber="+15551234567"
        message="Hi! I'd like to book an appointment with HealthSeva."
        position="bottom-right"
      />

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleAppointmentSubmit}
      />

      {/* Footer */}
      <Footer />

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalOrganization",
            "name": "HealthSeva",
            "description": "Premium healthcare services with compassionate care and cutting-edge technology",
            "url": "https://healthseva.com",
            "logo": "https://healthseva.com/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-555-123-4567",
              "contactType": "customer service",
              "availableLanguage": ["English"]
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "123 Healthcare Ave",
              "addressLocality": "Medical District",
              "addressRegion": "MD",
              "postalCode": "12345",
              "addressCountry": "US"
            },
            "openingHours": "Mo-Su 00:00-23:59",
            "priceRange": "$$",
            "hasMap": "https://maps.google.com/?cid=123456789",
            "sameAs": [
              "https://facebook.com/healthseva",
              "https://twitter.com/healthseva",
              "https://instagram.com/healthseva"
            ]
          })
        }}
      />
    </div>
  );
}
