import React from 'react';
import { motion } from 'framer-motion';
import IngredientCard from '../mini/IngredientCard';
import { GiDna2, GiNightSleep, GiMedicines } from 'react-icons/gi';

const ScienceBackedWellness: React.FC = () => {
  // Ingredients data
  const ingredients = [
    {
      image: '/Hero/blissProduct.png',
      title: 'The Science of Biotin',
      description:
        "Biotin (Vitamin B7) plays a crucial role in keratin production, the protein that makes up hair, skin, and nails. Our hair growth formula delivers optimal biotin levels for visible results.",
      stats: [
        { value: '5000 mcg', label: 'Biotin per serving', color: 'text-[#4CAF50]' },
        { value: '15+', label: 'Clinical studies', color: 'text-[#4CAF50]' },
      ],
      icon: <GiDna2 size={24} className="text-[#4CAF50]" />,
    },
    {
      image: '/Hero/blissProduct.png',
      title: 'Natural Sleep Support',
      description:
        'Melatonin regulates your sleep-wake cycle naturally. Combined with L-theanine, our formula promotes relaxation without next day grogginess, helping you achieve restorative sleep.',
      stats: [
        { value: '3 mg', label: 'Melatonin per gummy', color: 'text-[#5C6BC0]' },
        { value: '87%', label: 'Sleep quality improvement', color: 'text-[#5C6BC0]' },
      ],
      icon: <GiNightSleep size={24} className="text-[#5C6BC0]" />,
    },
    {
      image: '/Hero/blissProduct.png',
      title: 'Calcium & Vitamin D3',
      description:
        'Calcium absorption requires Vitamin D3. Our enhanced formula ensures maximum bioavailability, supporting bone density, muscle function, and overall skeletal health throughout life.',
      stats: [
        { value: '500 mg', label: 'Calcium per serving', color: 'text-[#FF9800]' },
        { value: '1000 IU', label: 'Vitamin D3', color: 'text-[#FF9800]' },
      ],
      icon: <GiMedicines size={24} className="text-[#FF9800]" />,
    },
  ];

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
      className="py-12 md:py-16 lg:py-20 px-3 md:px-10 mx-auto"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Section Header */}
      <motion.div
        className="text-center mb-10 md:mb-16"
        variants={headingVariants}
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1F1F1F] mb-3">
          Science-Backed Wellness
        </h2>
        <p className="text-sm md:text-base lg:text-lg text-[#666666] max-w-3xl mx-auto">
          Understanding the ingredients that power your health journey
        </p>
      </motion.div>

      {/* Ingredients List */}
      <div className="space-y-2">
        {ingredients.map((ingredient, index) => (
          <IngredientCard
            key={index}
            image={ingredient.image}
            title={ingredient.title}
            description={ingredient.description}
            stats={ingredient.stats}
            icon={ingredient.icon}
            index={index}
            imagePosition={index % 2 === 0 ? 'left' : 'right'}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default ScienceBackedWellness;
