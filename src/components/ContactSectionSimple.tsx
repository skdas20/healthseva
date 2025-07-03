'use client';

import React from 'react';
import { ContactSectionProps } from '@/types/components';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenModal
}) => {
  return (
    <section className="relative py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent" style={{ background: 'linear-gradient(135deg, #009999, #00cccc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Get in Touch
          </h2>
          <p className="text-xl mb-2 bg-clip-text text-transparent" style={{ background: 'linear-gradient(135deg, #009999, #00cccc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Ready to take the next step in your healthcare journey? Contact us today.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#e0f7fa] rounded-lg flex items-center justify-center">
                <Phone className="w-6 h-6 text-[#009999]" />
              </div>
              <div>
                <h3 className="font-semibold text-navy-800">Phone</h3>
                <p className="text-navy-600">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#e0f7fa] rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-[#009999]" />
              </div>
              <div>
                <h3 className="font-semibold text-navy-800">Email</h3>
                <p className="text-navy-600">info@healthseva.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#e0f7fa] rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-[#009999]" />
              </div>
              <div>
                <h3 className="font-semibold text-navy-800">Address</h3>
                <p className="text-navy-600">123 Healthcare Ave, Medical District, MD 12345</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#e0f7fa] rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#009999]" />
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
              className="w-full bg-gradient-to-r from-[#009999] to-[#00cccc] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
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
