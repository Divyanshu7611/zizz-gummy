import React from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, index = 0 }) => {
  // Animation variants for the card
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: index * 0.1, // Stagger animation based on index
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="bg-white rounded-lg p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      {/* Icon Container */}
      <div className="mb-4 text-[#4CAF50]">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-lg md:text-xl font-bold text-[#1F1F1F] mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm md:text-base text-[#666666] leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;
