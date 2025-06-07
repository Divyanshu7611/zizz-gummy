import React from 'react';
import { Image } from '@shopify/hydrogen';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const GummyDesc: React.FC = () => {
  // Hook to detect when the component is in view
  const { ref, inView } = useInView({
    triggerOnce: true, // Animation triggers only once
    threshold: 0.2, // Trigger when 20% of the component is visible
  });

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

  // Animation variants for the text section
  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  // Animation variants for individual text elements
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  // Animation variants for the image section
  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="w-full inter flex flex-col-reverse overflow-x-hidden lg:flex-row items-stretch justify-between px-4 lg:px-0 md:py-8 py-0 gap-8 max-w-[1440px] mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {/* Text Section */}
      <motion.div
        className="flex flex-col gap-0 md:gap-4 w-full md:max-w-xl text-start md:text-left justify-center"
        variants={textVariants}
      >
        <motion.h1
          className="text-[#000000] text-xl md:text-4xl font-bold inter"
          variants={itemVariants}
        >
          Your Daily Dose of Health – Now in a Gummy!
        </motion.h1>

        <motion.h4
          className="text-[#2D2D2D] font-normal text-sm md:text-2xl inter"
          variants={itemVariants}
        >
          Let’s face it — pills are boring. Syrups are messy. Powders are a hassle. That’s why we created ZIZZ — a delicious gummy that takes care of your health without disrupting your routine. Pop a gummy, live your life.
        </motion.h4>

        <motion.ol
          className="text-[#2D2D2D] text-sm md:text-2xl text-start list-disc list-outside pl-6 space-y-2 inter"
          variants={itemVariants}
        >
          <li>Tastes amazing</li>
          <li>Easy to carry, easy to consume</li>
          <li>Scientifically formulated</li>
          <li>No added sugar, no fuss</li>
        </motion.ol>
      </motion.div>

      {/* Image Section */}
      <motion.div
        className="w-full md:max-w-xl flex justify-center items-center"
        variants={imageVariants}
      >
        <Image
          src="/static/gummyDesc.png"
          // aspectRatio='1/1'
          alt="ZIZZ gummy product for daily health and wellness"
          className="w-full h-full object-contain aspect-auto"
        />
      </motion.div>
    </motion.div>
  );
};

export default GummyDesc;