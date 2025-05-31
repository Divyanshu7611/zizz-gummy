import React from 'react';
import {Image} from '@shopify/hydrogen';
import Button from '../mini/Button';
import {PiHandbagFill} from 'react-icons/pi';
import {BsArrowUpRightCircle} from 'react-icons/bs';
import { motion } from 'framer-motion';

function Hero() {
  // Animation variants for the overlay content
  const overlayVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        staggerChildren: 0.2 
      }
    }
  };

  // Animation variants for individual elements
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      <>
        <Image
          src="/static/HeroBanner.png"
          alt="Zizz Hero"
          className="hidden md:block w-full h-auto"
        />
        <Image
          src="/static/mobileBanner.png"
          alt="Zizz Hero Mobile"
          className="block md:hidden w-full h-[240px]"
        />
      </>

      {/* Overlayed content with Framer Motionn */}
      <motion.div 
        className="absolute md:top-1/4 top-2 md:left-10 px-5 md:px-0 max-w-lg py-5 md:py-0 text-white md:space-y-4 inset-0 flex flex-col gap-2"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h3 
          className="text-[#2D2D2D] md:text-6xl text-[28px] font-extrabold inter w-[14rem] md:w-full"
          variants={itemVariants}
        >
          Wellness Just Got Tastier
        </motion.h3>
        <motion.p 
          className="text-[#2D2D2D] md:text-xl text-[9px] w-[175px] md:w-full font-medium md:mt-6 poppins"
          variants={itemVariants}
        >
          Say goodbye to boring pills. ZIZZ Gummies are your fun, flavorful fix
          for real health goals – better sleep, stronger hair, stronger bones,
          and more.
        </motion.p>
        <motion.div 
          className="flex gap-4 md:mt-10"
          variants={itemVariants}
        >
          <div>
            <Button
              text="Shop Now"
              bgColor="bg-[#1E1E1E]"
              textColor="text-white"
              borderColor="border-[#1E1E1E]"
              icon={<PiHandbagFill />}
            />
          </div>
          <div className='md:block hidden'>
            <Button
              text="Learn More"
              bgColor="bg-transparent"
              borderColor="border-[#1E1E1E]"
              textColor="text-[#2D2D2D]"
              icon={<BsArrowUpRightCircle />}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Hero;