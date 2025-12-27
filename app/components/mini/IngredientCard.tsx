import React from 'react';
import { motion } from 'framer-motion';

interface Stat {
  value: string;
  label: string;
  color?: string;
}

interface IngredientCardProps {
  image: string;
  title: string;
  description: string;
  stats: Stat[];
  index?: number;
  imagePosition?: 'left' | 'right';
  icon?: React.ReactNode;
}

const IngredientCard: React.FC<IngredientCardProps> = ({
  image,
  title,
  description,
  stats,
  index = 0,
  imagePosition = 'left',
  icon,
}) => {
  // Animation variants for the card
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
        delay: index * 0.2,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const contentOrder = imagePosition === 'left' ? 'md:flex-row' : 'md:flex-row-reverse';

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={`flex flex-col ${contentOrder} gap-6 md:gap-8 items-center bg-white rounded-2xl p-6 md:p-8`}
    >
      {/* Image Section */}
      <motion.div
        variants={imageVariants}
        className="w-full md:w-1/2 relative"
      >
        <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          {icon && (
            <div className="absolute top-4 left-4 bg-white rounded-full p-3 shadow-md z-10">
              {icon}
            </div>
          )}
          <img
            src={image}
            alt={title}
            className="w-full h-64 md:h-80 object-cover"
          />
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1F1F1F] mb-3">
          {title}
        </h3>
        <p className="text-sm md:text-base text-[#666666] leading-relaxed mb-6">
          {description}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col bg-[#F5F5F5] rounded-lg p-4">
              <span
                className={`text-2xl md:text-3xl font-bold ${
                  stat.color || 'text-[#4CAF50]'
                }`}
              >
                {stat.value}
              </span>
              <span className="text-xs md:text-sm text-[#666666] mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default IngredientCard;
