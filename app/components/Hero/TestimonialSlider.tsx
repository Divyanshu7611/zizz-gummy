// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import Button from "../mini/Button";
// import { motion } from "framer-motion";

// const testimonials = [
//   {
//     name: "Dr. manhor Singh",
//     title: "Dermatologist",
//     image: "/static/doctor.png", // Replace with actual image path
//     description:
//       "Nourishing our skin, hair and nail is as important as the rest of body and this product here just does the job. It provides an all around balanced pick of all the vital nutritional requirements.",
//   },
//   {
//     name: "Dr. manhor Singh",
//     title: "Dermatologist",
//     image: "/static/doctor.png",
//     description:
//       "Nourishing our skin, hair and nail is as important as the rest of body and this product here just does the job. It provides an all around balanced pick of all the vital nutritional requirements.",
//   },
//   {
//     name: "Dr. manhor Singh",
//     title: "Dermatologist",
//     image: "/static/doctor.png",
//     description:
//       "Nourishing our skin, hair and nail is as important as the rest of body and this product here just does the job. It provides an all around balanced pick of all the vital nutritional requirements.",
//   },
// ];

// const TestimonialSlider: React.FC = () => {
//   // Animation variants for the container
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         delayChildren: 0.3,
//       },
//     },
//   };

//   // Animation variants for individual elements
//   const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut",
//       },
//     },
//   };

//   // Animation variants for Swiper slides
//   const slideVariants = {
//     hidden: { opacity: 0, scale: 0.95 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut",
//       },
//     },
//   };

//   return (
//     <motion.section
//       className="py-12 px-4 bg-[#FAFAFA] text-center max-w-[1440px] mx-auto"
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       <motion.h3
//         className="text-xl md:text-4xl font-bold mb-10 text-[#1F1F1F]"
//         variants={itemVariants}
//       >
//         What Experts are Saying
//       </motion.h3>

//       <Swiper
//         spaceBetween={30}
//         modules={[Pagination]}
//         breakpoints={{
//           640: { slidesPerView: 1 },
//           768: { slidesPerView: 2 },
//           1024: { slidesPerView: 3 },
//         }}
//       >
//         {testimonials.map((t, index) => (
//           <SwiperSlide key={index}>
//             <motion.div
//               className="bg-white my-5 rounded-xl p-6 shadow-md max-w-sm mx-auto text-left h-full flex flex-col justify-between inter"
//               variants={slideVariants}
//               initial="hidden"
//               animate="visible"
//             >
//               <div className="flex flex-col items-center mb-4 py-8">
//                 <div className="relative">
//                   <img
//                     src={t.image}
//                     alt={t.name}
//                     className="object-cover rounded-full"
//                   />
//                   <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 text-white rounded-full text-center text-sm font-bold flex items-center justify-center border-2 border-white">
//                     +
//                   </div>
//                 </div>
//                 <motion.h3
//                   className="font-bold text-lg mt-2"
//                   variants={itemVariants}
//                 >
//                   {t.name}
//                 </motion.h3>
//                 <motion.p
//                   className="text-gray-600 text-sm"
//                   variants={itemVariants}
//                 >
//                   {t.title}
//                 </motion.p>
//               </div>
//               <hr className="my-2" />
//               <motion.p
//                 className="text-sm text-gray-700 poppins"
//                 variants={itemVariants}
//               >
//                 {t.description}
//               </motion.p>
//             </motion.div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//       <motion.div
//         className="w-full flex justify-center mt-10 mb-16"
//         variants={itemVariants}
//       >
//         <Button text="Read More Glow Stories" bgColor="bg-[#1F1F1F]" textColor="text-[#FAFAFA]"/>
//       </motion.div>
//     </motion.section>
//   );
// };

// export default TestimonialSlider;



import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Button from "../mini/Button";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Define testimonial type
interface Testimonial {
  name: string;
  title: string;
  image: string;
  description: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Dr. manhor Singh",
    title: "Dermatologist",
    image: "/static/doctor.png",
    description:
      "Nourishing our skin, hair and nail is as important as the rest of body and this product here just does the job. It provides an all around balanced pick of all the vital nutritional requirements.",
  },
  {
    name: "Dr. manhor Singh",
    title: "Dermatologist",
    image: "/static/doctor.png",
    description:
      "Nourishing our skin, hair and nail is as important as the rest of body and this product here just does the job. It provides an all around balanced pick of all the vital nutritional requirements.",
  },
    {
    name: "Dr. manhor Singh",
    title: "Dermatologist",
    image: "/static/doctor.png",
    description:
      "Nourishing our skin, hair and nail is as important as the rest of body and this product here just does the job. It provides an all around balanced pick of all the vital nutritional requirements.",
  },
    {
    name: "Dr. manhor Singh",
    title: "Dermatologist",
    image: "/static/doctor.png",
    description:
      "Nourishing our skin, hair and nail is as important as the rest of body and this product here just does the job. It provides an all around balanced pick of all the vital nutritional requirements.",
  },
  {
    name: "Dr. manhor Singh",
    title: "Dermatologist",
    image: "/static/doctor.png",
    description:
      "Nourishing our skin, hair and nail is as important as the rest of body and this product here just does the job. It provides an all around balanced pick of all the vital nutritional requirements.",
  },
];

const TestimonialSlider: React.FC = () => {
  // Ref for Swiper instance
  const swiperRef = useRef<SwiperType | null>(null);

  // Ensure Swiper navigation updates after initialization
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.navigation?.update();
    }
  }, []);

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
        ease: "easeOut",
      },
    },
  };

  // Animation variants for Swiper slides
  const slideVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Animation variants for navigation buttons
  const buttonVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      className="py-12 px-3 bg-[#FAFAFA] text-center mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h3
        className="text-xl md:text-4xl font-bold mb-10 text-[#1F1F1F]"
        variants={itemVariants}
      >
        What Experts are Saying
      </motion.h3>

      <Swiper
        spaceBetween={30}
        navigation={{
          nextEl: ".custom-swiper-button-next",
          prevEl: ".custom-swiper-button-prev",
        }}
        modules={[Pagination, Navigation]}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        onSwiper={(swiper: SwiperType) => (swiperRef.current = swiper)}
      >
        {testimonials.map((t, index) => (
          <SwiperSlide key={index}>
            <motion.div
              className="bg-white my-5 rounded-xl p-6 shadow-md max-w-sm mx-auto text-left h-full flex flex-col justify-between inter"
              variants={slideVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="flex flex-col items-center mb-4 py-8">
                <div className="relative">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="object-cover rounded-full w-24 h-24"
                  />
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 text-white rounded-full text-center text-sm font-bold flex items-center justify-center border-2 border-white">
                    +
                  </div>
                </div>
                <motion.h3
                  className="font-bold text-lg mt-2"
                  variants={itemVariants}
                >
                  {t.name}
                </motion.h3>
                <motion.p
                  className="text-gray-600 text-sm"
                  variants={itemVariants}
                >
                  {t.title}
                </motion.p>
              </div>
              <hr className="my-2" />
              <motion.p
                className="text-sm text-gray-700 poppins"
                variants={itemVariants}
              >
                {t.description}
              </motion.p>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex flex-col justify-between max-w-[1440px] mx-auto">
        <motion.div className="flex gap-4 justify-start" variants={itemVariants}>
          <motion.button
            className="custom-swiper-button-prev bg-black text-white p-3 rounded-full border-2 border-white flex items-center justify-center h-10 w-10 z-50 hover:bg-gray-800 transition-colors"
           
            variants={buttonVariants}
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous testimonial"
          >
            <FaArrowLeft size={16} />
          </motion.button>
          <motion.button
            className="custom-swiper-button-next bg-black text-white p-3 rounded-full border-2 border-white flex items-center justify-center w-10 h-10 z-50 hover:bg-gray-800 transition-colors"
            variants={buttonVariants}
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next testimonial"
          >
            <FaArrowRight size={16} />
          </motion.button>
        </motion.div>
        <motion.div
          className="w-full flex justify-center mb-16 mt-10"
          variants={itemVariants}
        >
          <Button
            text="Read More Glow Stories"
            bgColor="bg-[#1F1F1F]"
            textColor="text-[#FAFAFA]"
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TestimonialSlider;