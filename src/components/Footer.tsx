'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  ArrowRight,
  Shield,
  Award,
  Users
} from 'lucide-react';
import { FaFacebook, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Services',
      links: [
        { name: 'Emergency Care', href: '#emergency' },
        { name: 'Telemedicine', href: '#telemedicine' },
        { name: 'Health Checkups', href: '#checkups' },
        { name: 'Specialist Care', href: '#specialists' },
        { name: 'Home Visits', href: '#home-visits' },
        { name: 'Digital Records', href: '#records' }
      ]
    },
    {
      title: 'Quick Links',
      links: [
        { name: 'About Us', href: '#about' },
        { name: 'Our Doctors', href: '#doctors' },
        { name: 'Appointments', href: '#appointments' },
        { name: 'Health Tips', href: '#tips' },
        { name: 'Insurance', href: '#insurance' },
        { name: 'Careers', href: '#careers' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '#help' },
        { name: 'Contact Us', href: '#contact' },
        { name: 'Privacy Policy', href: '/privacy-policy', external: true },
        { name: 'Terms and Conditions', href: '/terms-and-conditions', external: true },
        { name: 'Patient Rights', href: '#rights' },
        { name: 'Feedback', href: '#feedback' }
      ]
    }
  ];

  const socialLinks = [
    { Icon: FaFacebook, href: 'https://www.facebook.com/healthsevatyourhome', color: 'hover:text-blue-600' },
    { Icon: FaLinkedin, href: 'https://www.linkedin.com/company/healthsevaatyourhome', color: 'hover:text-blue-700' },
    { Icon: FaInstagram, href: 'https://www.instagram.com/healthsevaatyourhome', color: 'hover:text-pink-500' },
    { Icon: FaYoutube, href: 'https://www.youtube.com/HealthSevaAtYourHome', color: 'hover:text-red-500' }
  ];

  return (
    <footer className="relative overflow-hidden text-white" style={{ background: 'linear-gradient(135deg, #009999, #00CED1, #1E90FF)' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="pt-16 pb-8">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="text-white">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-white">
                    HealthSeva
                  </span>
                </div>
                
                <p className="text-white leading-relaxed mb-6">
                  Your trusted healthcare partner, providing world-class medical services 
                  with compassionate care, cutting-edge technology, and personalized treatment 
                  plans designed around your unique needs.
                </p>

                {/* Contact Info */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-white" />
                    <a href="tel:+918521835910" className="text-white hover:text-white transition-colors">
                      +91 85218 35910
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-white" />
                    <a href="mailto:info@healthseva.com" className="text-white hover:text-white transition-colors">
                      info@healthseva.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-white" />
                    <span className="text-white">
                      123 Healthcare Ave, Medical District, MD 12345
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-white" />
                    <span className="text-white">
                      24/7 Emergency Services Available
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
              >
                <h3 className="text-lg font-semibold mb-6 text-white">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: linkIndex * 0.05 }}
                    >
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center group"
                        >
                          <span>{link.name}</span>
                          <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ) : (
                        <a
                          href={link.href}
                          className="text-white hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center group"
                        >
                          <span>{link.name}</span>
                          <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-8 border-t border-gray-700">
          <div className="flex flex-col items-center space-y-4 w-full">
            {/* Copyright */}
            <motion.div
              className="text-white text-center w-full"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Copyright © 2025 Health Seva At Your Home Brand by DNP Healthseva Private Limited. All rights reserved.<br />
              <span className="block mt-2">Site Developed by <a href="https://www.linkedin.com/in/sumitkumardas-ai/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-200 transition-colors">Sumit Kumar Das</a></span>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {socialLinks.map(({ Icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    'w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white transition-all duration-300 hover:bg-white/20'
                  }
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-5 h-5 text-white" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { left: '10%', top: '20%', delay: 0 },
          { left: '30%', top: '15%', delay: 0.5 },
          { left: '50%', top: '25%', delay: 1 },
          { left: '70%', top: '10%', delay: 1.5 },
          { left: '20%', top: '80%', delay: 0.3 },
          { left: '40%', top: '85%', delay: 0.8 },
          { left: '60%', top: '75%', delay: 1.2 },
          { left: '80%', top: '90%', delay: 0.6 },
          { left: '15%', top: '50%', delay: 1.8 },
          { left: '85%', top: '60%', delay: 0.2 }
        ].map((item, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30"
            style={{
              left: item.left,
              top: item.top,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay
            }}
          />
        ))}
      </div>
    </footer>
  );
};

export default Footer;
