import React from 'react';
import FunctionalityCard from '../mini/FunctionalityCard';
import { motion } from 'framer-motion';

function BriefCards() {
  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  // Animation variants for individual cards
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
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
    <motion.div
      className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-8 max-w-[1440px] mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={cardVariants}>
        <FunctionalityCard
          imageSrc="/asset/HealthSupplement.png"
          imageAlt="Health supplements"
          imageSize="w-12 h-12"
          text="HEALTH SUPPLEMENTS"
          textColor="text-[#2D2D2D]"
          bgColor="bg-[#FFFFFF]"
        />
      </motion.div>
      <motion.div variants={cardVariants}>
        <FunctionalityCard
          imageSrc="/asset/SexWellness.png"
          imageAlt="SEXUAL WELLNESS"
          imageSize="w-12 h-12"
          text="SEXUAL WELLNESS"
          textColor="text-[#2D2D2D]"
          bgColor="bg-[#FFFFFF]"
        />
      </motion.div>
      <motion.div variants={cardVariants}>
        <FunctionalityCard
          imageSrc="/asset/Sports.png"
          imageAlt="SPORTS NUTRITION'S"
          imageSize="w-12 h-12"
          text="SPORTS NUTRITION'S"
          textColor="text-[#2D2D2D]"
          bgColor="bg-[#FFFFFF]"
        />
      </motion.div>
      <motion.div variants={cardVariants}>
        <FunctionalityCard
          imageSrc="/asset/Weight.png"
          imageAlt="Weight management "
          imageSize="w-12 h-12"
          text="WEIGHT MANAGEMENT"
          textColor="text-[#2D2D2D]"
          bgColor="bg-[#FFFFFF]"
        />
      </motion.div>
    </motion.div>
  );
}

export default BriefCards;