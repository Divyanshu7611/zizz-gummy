import React from 'react';
import FunctionalityCard from '../mini/FunctionalityCard';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function BriefCards() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

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
      ref={ref}
      className="grid grid-cols-4 gap-6 px-4 py-8 max-w-[1440px] mx-auto items-center"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <motion.div variants={cardVariants}>
        <FunctionalityCard
          imageSrc="/asset/HealthSupplement.png"
          imageAlt="Bottle of health supplements for daily wellness"
          text="HEALTH SUPPLEMENTS"
          textColor="text-[#2D2D2D]"
          bgColor="bg-[#FFFFFF]"
        />
      </motion.div>
      <motion.div variants={cardVariants}>
        <FunctionalityCard
          imageSrc="/asset/SexWellness.png"
          imageAlt="Products for sexual wellness and intimacy"
          text="SEXUAL WELLNESS"
          textColor="text-[#2D2D2D]"
          bgColor="bg-[#FFFFFF]"
        />
      </motion.div>
      <motion.div variants={cardVariants}>
        <FunctionalityCard
          imageSrc="/asset/Sports.png"
          imageAlt="Sports nutrition products for athletic performance"
          text="SPORTS NUTRITION"
          textColor="text-[#2D2D2D]"
          bgColor="bg-[#FFFFFF]"
        />
      </motion.div>
      <motion.div variants={cardVariants}>
        <FunctionalityCard
          imageSrc="/asset/Weight.png"
          imageAlt="Weight management products for a healthy lifestyle"
          text="WEIGHT MANAGEMENT"
          textColor="text-[#2D2D2D]"
          bgColor="bg-[#FFFFFF]"
        />
      </motion.div>
    </motion.div>
  );
}

export default BriefCards;