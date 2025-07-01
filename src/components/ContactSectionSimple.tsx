'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock
} from 'lucide-react';
import { ContactSectionProps } from '@/types/components';

const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenModal
}) => {
  return (
    <section className="relative py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-navy-800 mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-navy-600 max-w-2xl mx-auto">
            Ready to take the next step in your healthcare journey? Contact us today.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <Phone className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-navy-800">Phone</h3>
                <p className="text-navy-600">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-navy-800">Email</h3>
                <p className="text-navy-600">info@healthseva.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-navy-800">Address</h3>
                <p className="text-navy-600">123 Healthcare Ave, Medical District, MD 12345</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-navy-800">Hours</h3>
                <p className="text-navy-600">24/7 Emergency Care Available</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white rounded-2xl p-8 shadow-soft">
            <h3 className="text-2xl font-bold text-navy-800 mb-4">
              Book Your Appointment
            </h3>
            <p className="text-navy-600 mb-6">
              Schedule a consultation with our healthcare professionals today.
            </p>
            <button 
              onClick={onOpenModal}
              className="btn-primary w-full"
            >
              Book Appointment Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
