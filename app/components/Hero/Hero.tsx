// import React from 'react';
// import {Image} from '@shopify/hydrogen';
// import Button from '../mini/Button';
// import {PiHandbagFill} from 'react-icons/pi';
// import {BsArrowUpRightCircle} from 'react-icons/bs';
// import { motion } from 'framer-motion';

// function Hero() {
//   // Animation variants for the overlay content
//   const overlayVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { 
//       opacity: 1, 
//       y: 0, 
//       transition: { 
//         duration: 0.8, 
//         ease: "easeOut",
//         staggerChildren: 0.2 
//       }
//     }
//   };

//   // Animation variants for individual elements
//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { 
//       opacity: 1, 
//       y: 0, 
//       transition: { duration: 0.5, ease: "easeOut" }
//     }
//   };

//   return (
//     <div className="relative w-full overflow-hidden">
//       <>
//         <Image
//           src="/static/HeroBanner.png"
//           alt="Zizz Hero"
//           className="hidden md:block w-full h-auto"
//         />
//         <Image
//           src="/static/mobileBanner.png"
//           alt="Zizz Hero Mobile"
//           className="block md:hidden w-full h-[240px]"
//         />
//       </>

//       {/* Overlayed content with Framer Motionn */}
//       <motion.div 
//         className="absolute md:top-1/4 top-2 md:left-10 px-5 md:px-0 max-w-lg py-5 md:py-0 text-white md:space-y-4 inset-0 flex flex-col gap-2"
//         variants={overlayVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <motion.h3 
//           className="text-[#2D2D2D] md:text-6xl text-[28px] font-extrabold inter w-[14rem] md:w-full"
//           variants={itemVariants}
//         >
//           Wellness Just Got Tastier
//         </motion.h3>
//         <motion.p 
//           className="text-[#2D2D2D] md:text-xl text-[9px] w-[175px] md:w-full font-medium md:mt-6 poppins"
//           variants={itemVariants}
//         >
//           Say goodbye to boring pills. ZIZZ Gummies are your fun, flavorful fix
//           for real health goals – better sleep, stronger hair, stronger bones,
//           and more.
//         </motion.p>
//         <motion.div 
//           className="flex gap-4 md:mt-10"
//           variants={itemVariants}
//         >
//           <div>
//             <Button
//               text="Shop Now"
//               bgColor="bg-[#1E1E1E]"
//               textColor="text-white"
//               borderColor="border-[#1E1E1E]"
//               icon={<PiHandbagFill />}
//             />
//           </div>
//           <div className='md:block hidden'>
//             <Button
//               text="Learn More"
//               bgColor="bg-transparent"
//               borderColor="border-[#1E1E1E]"
//               textColor="text-[#2D2D2D]"
//               icon={<BsArrowUpRightCircle />}
//             />
//           </div>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// }

// export default Hero;




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
          className="hidden md:block w-full lg:h-auto lg:object-cover md:h-[500px]"
        />
        <Image
          src="/static/mobileBanner.png"
          alt="Zizz Hero Mobile"
          className="block md:hidden w-full h-[240px] sm:h-[360px] object-cover"
        />
      </>

      {/* Overlayed content with Framer Motion */}
      <motion.div 
        className="absolute top-5 sm:top-6 md:top-1/4 left-0 sm:left-2 md:left-8 lg:left-10 px-4 sm:px-5 md:px-0 max-w-[260px] sm:max-w-[340px] md:max-w-lg py-4 sm:py-5 md:py-0 text-white sm:space-y-0 md:space-y-0 lg:space-y-4 inset-0 flex flex-col gap-0 sm:gap-0 lg:gap-3"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h3 
          className="text-[#2D2D2D] text-[22px] sm:text-3xl md:text-5xl lg:text-6xl font-extrabold inter w-[11rem] sm:w-[16rem] md:w-[26rem] lg:w-full"
          variants={itemVariants}
        >
          Wellness Just Got Tastier
        </motion.h3>
        <motion.p 
          className="text-[#2D2D2D] text-[8px] sm:text-sm md:text-xl w-[160px] sm:w-[200px] md:w-full font-medium poppins mt-2 sm:mt-3 md:mt-6"
          variants={itemVariants}
        >
          Say goodbye to boring pills. ZIZZ Gummies are your fun, flavorful fix
          for real health goals – better sleep, stronger hair, stronger bones,
          and more.
        </motion.p>
        <motion.div 
          className="flex gap-2 sm:gap-3 md:gap-4 mt-3 sm:mt-4 md:mt-10"
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