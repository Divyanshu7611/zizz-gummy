import React from 'react';
import { motion } from 'framer-motion';
import FeatureCard from '../mini/FeatureCard';
import { 
  FaCheckCircle, 
  FaFlask, 
  FaCertificate, 
  FaLeaf, 
  FaHeart, 
  FaTruck 
} from 'react-icons/fa';

const WhyChooseZizz: React.FC = () => {
  // Features data
  const features = [
    {
      icon: <FaCheckCircle size={40} />,
      title: 'FDA Registered Facility',
      description: 'Manufactured in FDA-compliant facilities following strict quality standards',
    },
    {
      icon: <FaFlask size={40} />,
      title: 'Third-Party Lab Tested',
      description: 'Every batch tested for purity, potency, and safety by independent laboratories',
    },
    {
      icon: <FaCertificate size={40} />,
      title: 'GMP Certified',
      description: 'Good Manufacturing Practices certification ensures consistent quality',
    },
    {
      icon: <FaLeaf size={40} />,
      title: '100% Natural Ingredients',
      description: 'No artificial colors, flavors, or preservatives in our formulations',
    },
    {
      icon: <FaHeart size={40} />,
      title: 'Customer Satisfaction',
      description: "30-day money-back guarantee if you're not completely satisfied",
    },
    {
      icon: <FaTruck size={40} />,
      title: 'Free Shipping',
      description: 'Free delivery on orders over $50 with fast, reliable shipping',
    },
  ];

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Animation variants for the heading
  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.section
      className="py-12 md:py-16 lg:py-20 px-3 md:px-10 w-full mx-auto bg-[#F5F5F5]"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Section Header */}
      <motion.div 
        className="text-center mb-8 md:mb-12"
        variants={headingVariants}
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1F1F1F] mb-3 flex items-center justify-center gap-2 flex-wrap">
          <span>Why Choose</span>
          <img 
            src="/static/logo.png" 
            alt="Zizz" 
            className="h-5 md:h-6 lg:h-8 inline-block"
          />
          <span>?</span>
        </h2>
        <p className="text-sm md:text-base lg:text-lg text-[#666666] max-w-2xl mx-auto">
          Your health and trust are our top priorities. Here's what sets us apart
        </p>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            index={index}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default WhyChooseZizz;
