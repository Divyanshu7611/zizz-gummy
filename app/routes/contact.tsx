import React, { useState } from 'react';
import { Image } from '@shopify/hydrogen';
import { type MetaFunction } from '@remix-run/react';
import { FaFacebookF, FaInstagram, FaTwitter, FaPinterestP, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Button from '~/components/mini/Button';

export const meta: MetaFunction = () => {
  return [{ title: 'Contact Us | Zizz Gummy' }];
};

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      {/* Hero Banner */}
      <div className="relative w-full h-48 md:h-64 bg-gradient-to-r from-[#4CAF50] to-[#6D9773] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-white"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-2">Get In Touch</h1>
          <p className="text-sm md:text-lg">We'd love to hear from you</p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto px-4 md:px-10 py-10 md:py-16">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-2xl md:text-4xl text-[#1F1F1F] font-bold mb-10 inter"
        >
          Send Us a Message
        </motion.h2>

        <div className="flex flex-col md:flex-row gap-8 md:gap-10">
          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 shadow-lg rounded-xl bg-white p-6 md:p-10"
          >
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] transition-all"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] transition-all"
              required
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] transition-all"
              required
            />
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] transition-all"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="border border-gray-300 rounded-lg px-4 py-3 md:col-span-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-[#4CAF50] transition-all"
              required
            />
            <div className="flex md:justify-start justify-center md:col-span-2">
              <button
                type="submit"
                className="bg-black text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
              >
                SEND MESSAGE
              </button>
            </div>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex-1 text-sm md:text-base space-y-6 text-[#1F1F1F] bg-white p-6 md:p-10 shadow-lg rounded-xl"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                <FaEnvelope className="text-white text-xl" />
              </div>
              <div>
                <p className="font-semibold text-lg mb-1">Email</p>
                <a href="mailto:support@zizzwellness.com" className="text-gray-600 hover:text-[#4CAF50] transition-colors">
                  support@zizzwellness.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                <FaPhone className="text-white text-xl" />
              </div>
              <div>
                <p className="font-semibold text-lg mb-1">Phone</p>
                <a href="tel:+919876543210" className="text-gray-600 hover:text-[#4CAF50] transition-colors">
                  +91-98765-43210
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                <FaMapMarkerAlt className="text-white text-xl" />
              </div>
              <div>
                <p className="font-semibold text-lg mb-1">Address</p>
                <p className="text-gray-600">Zizz Wellness HQ<br />Kota, Rajasthan, India</p>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <p className="font-semibold text-lg mb-4">Follow Us</p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-all duration-300"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-all duration-300"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-all duration-300"
                >
                  <FaTwitter />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-all duration-300"
                >
                  <FaPinterestP />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Contact;