import React from 'react';
import { Image } from '@shopify/hydrogen';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ProductSection: React.FC = () => {
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

  // Animation variants for individual elements
  const itemVariants = {
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

  // Animation variants for images
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="mt-10 max-w-[1440px] mx-auto px-3"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <motion.h3
        className="text-xl font-bold mb-2 text-center md:text-4xl text-[#000000] inter"
        variants={itemVariants}
      >
        Your Daily Dose of Health Now in a Gummy!
      </motion.h3>
      <motion.p
        className="text-[#2D2D2D] mx-auto mb-6 text-center mt-5 text-sm md:text-2xl text-wrap inter"
        variants={itemVariants}
      >
        Let’s face it — pills are boring. Syrups are messy. Powders are a hassle.
        That’s why we created ZIZZ
      </motion.p>

      <motion.div
        className="flex justify-center mb-8 mt-10 border border-[#1F1F1F40] w-fit mx-auto rounded-lg overflow-hidden poppins"
        variants={itemVariants}
      >
        <button
          className="bg-green-500 text-white px-4 md:text-xl text-xs py-2 rounded-l-lg hover:bg-green-600 transition"
          aria-label="View our product"
        >
          Our Product
        </button>
        <button
          className="border px-4 py-2 md:text-xl text-xs hover:bg-gray-100 transition border-none"
          aria-label="View other products"
        >
          Other Products
        </button>
      </motion.div>

      <motion.div variants={imageVariants}>
        <Image
          src="/static/landingPageDescGummyMobile.png"
          alt="ZIZZ gummy product for mobile view"
          className="block md:hidden"
        />
      </motion.div>
      <motion.div variants={imageVariants}>
        <Image
          src="/static/ProductDesc.png"
          alt="ZIZZ gummy product for desktop view"
          className="md:block hidden"
        />
      </motion.div>
    </motion.div>
  );
};

export default ProductSection;