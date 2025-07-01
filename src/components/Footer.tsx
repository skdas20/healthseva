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
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';

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
        { name: 'Privacy Policy', href: '#privacy' },
        { name: 'Terms of Service', href: '#terms' },
        { name: 'Patient Rights', href: '#rights' },
        { name: 'Feedback', href: '#feedback' }
      ]
    }
  ];

  const socialLinks = [
    { Icon: FaFacebook, href: 'https://facebook.com/healthseva', color: 'hover:text-blue-600' },
    { Icon: FaTwitter, href: 'https://twitter.com/healthseva', color: 'hover:text-blue-400' },
    { Icon: FaLinkedin, href: 'https://linkedin.com/company/healthseva', color: 'hover:text-blue-700' },
    { Icon: FaInstagram, href: 'https://instagram.com/healthseva', color: 'hover:text-pink-500' },
    { Icon: FaYoutube, href: 'https://youtube.com/healthseva', color: 'hover:text-red-500' }
  ];

  const achievements = [
    { icon: <Users className="w-6 h-6" />, value: '50,000+', label: 'Happy Patients' },
    { icon: <Award className="w-6 h-6" />, value: '15+', label: 'Years Experience' },
    { icon: <Shield className="w-6 h-6" />, value: '99.9%', label: 'Success Rate' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full opacity-10 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500 rounded-full opacity-10 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-500 rounded-full opacity-10 blur-3xl" />
      </div>

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
                  <div className="text-blue-400">
                    <Heart className="w-8 h-8" />
                  </div>
                  <span className="text-2xl font-bold text-gradient-primary">
                    HealthSeva
                  </span>
                </div>
                
                <p className="text-gray-300 leading-relaxed mb-6">
                  Your trusted healthcare partner, providing world-class medical services 
                  with compassionate care, cutting-edge technology, and personalized treatment 
                  plans designed around your unique needs.
                </p>

                {/* Contact Info */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-blue-400" />
                    <a href="tel:+918521835910" className="text-gray-300 hover:text-white transition-colors">
                      +91 85218 35910
                    </a>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-blue-400" />
                    <a href="mailto:info@healthseva.com" className="text-gray-300 hover:text-white transition-colors">
                      info@healthseva.com
                    </a>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">
                      123 Healthcare Ave, Medical District, MD 12345
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">
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
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center group"
                      >
                        <span>{link.name}</span>
                        <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Achievements Section */}
          <motion.div
            className="mt-16 pt-8 border-t border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid md:grid-cols-3 gap-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mb-4 group-hover:shadow-lg transition-all duration-300">
                    <div className="text-white">
                      {achievement.icon}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">
                    {achievement.value}
                  </div>
                  <div className="text-gray-300">
                    {achievement.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Newsletter Subscription */}
          <motion.div
            className="mt-16 pt-8 border-t border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Stay Updated with Health Tips
              </h3>
              <p className="text-gray-300 mb-6">
                Subscribe to our newsletter for the latest health tips, medical updates, and exclusive offers.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <motion.button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Footer */}
        <div className="py-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <motion.div
              className="text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              © {currentYear} HealthSeva. All rights reserved. | 
              <span className="ml-1">Made with ❤️ for better healthcare</span>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {socialLinks.map(({ Icon, href, color }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400 ${color} transition-all duration-300 hover:bg-white/20`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-5 h-5" />
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
