import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaSpinner } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setMessage('Thank you for subscribing!');
      setEmail('');
      setIsSubmitting(false);
      setTimeout(() => setMessage(''), 3000);
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      className="mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <div className="relative overflow-hidden bg-linear-to-r from-[#4CAF50] via-[#5C6BC0] to-[#9C27B0] p-8 md:p-12 text-center text-white shadow-xl">
        {/* Background Pattern/Overlay */}
        <div className="absolute inset-0 bg-black opacity-10"></div>
        
        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            className="flex justify-center mb-4"
            variants={iconVariants}
          >
            <div className="bg-white bg-opacity-20 rounded-full p-4 backdrop-blur-sm">
              <FaEnvelope className="text-3xl md:text-4xl text-white" />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Join Our Wellness Community
          </motion.h2>

          {/* Subheading */}
          <motion.p
            className="text-sm md:text-base mb-6 max-w-2xl mx-auto opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Get exclusive health tips, special offers, and be the first to know about new products. Plus, save 15% off your first order!
          </motion.p>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 text-sm md:text-base"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-black text-white font-semibold cursor-pointer rounded-lg hover:bg-opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base whitespace-nowrap flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin" size={16} />
                  <span>Subscribing...</span>
                </>
              ) : (
                'Subscribe'
              )}
            </button>
          </motion.form>

          {/* Success Message */}
          {message && (
            <motion.p
              className="text-sm text-white font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              {message}
            </motion.p>
          )}

          {/* Privacy Note */}
          <motion.p
            className="text-xs opacity-75 mt-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.75 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            We respect your privacy. Unsubscribe anytime. No spam, we promise!
          </motion.p>
        </div>
      </div>
    </motion.section>
  );
};

export default NewsletterSignup;
