import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaStar, FaCheckCircle } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

// Define testimonial type
interface Testimonial {
  name: string;
  location: string;
  category: string;
  image: string;
  description: string;
  rating: number;
  verified: boolean;
}

const testimonials: Testimonial[] = [
  {
    name: "Jennifer Rodriguez, 38",
    location: "Miami, FL",
    category: "Energy + Collagen Gummies",
    image: "/static/doctor.png",
    description:
      "My collagen and vitamin supplements, plus I loved taking pills. These gummies are convenient and actually taste forward to taking them. My family even asks me to share sometimes!",
    rating: 5,
    verified: true,
  },
  {
    name: "Sarah Mitchell, 42",
    location: "Austin, TX",
    category: "Sleep Support Gummies",
    image: "/static/doctor.png",
    description:
      "I've struggled with sleep for years. These gummies have been a game-changer! I fall asleep faster and wake up feeling refreshed. No grogginess in the morning either.",
    rating: 5,
    verified: true,
  },
  {
    name: "Michael Chen, 35",
    location: "Seattle, WA",
    category: "Hair Growth Formula",
    image: "/static/doctor.png",
    description:
      "After 3 months of using these gummies, I've noticed significant improvement in my hair thickness and overall health. The taste is great too, which makes it easy to stay consistent.",
    rating: 5,
    verified: true,
  },
  {
    name: "Emily Thompson, 29",
    location: "New York, NY",
    category: "Immunity Boost Gummies",
    image: "/static/doctor.png",
    description:
      "These immunity gummies have kept me healthy all season long. I love that they're made with natural ingredients and actually work. Highly recommend to anyone looking to boost their wellness!",
    rating: 5,
    verified: true,
  },
  {
    name: "David Martinez, 45",
    location: "Los Angeles, CA",
    category: "Joint Support Gummies",
    image: "/static/doctor.png",
    description:
      "As someone who exercises regularly, joint support is crucial. These gummies have helped reduce my post-workout discomfort significantly. Plus, they taste amazing!",
    rating: 5,
    verified: true,
  },
];

const TestimonialSlider: React.FC = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.navigation?.update();
    }
  }, []);

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
      ref={ref}
      className="py-12 md:py-16 px-3 md:px-10 bg-[#F5F5F5] text-center mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {/* Header */}
      <motion.div className="mb-8 md:mb-12" variants={itemVariants}>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1F1F1F] mb-2">
          Real Results, Real People
        </h2>
        <p className="text-sm md:text-base text-[#666666]">
          Hear from our satisfied customers who have transformed their wellness journey with Zizz
        </p>
      </motion.div>

      {/* Testimonial Slider */}
      <div className="relative max-w-4xl mx-auto">
        {/* Left Navigation Button */}
        <motion.button
          className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 bg-white text-gray-600 p-3 rounded-full border-2 border-gray-200 flex items-center justify-center h-12 w-12 z-50 hover:bg-gray-50 transition-colors shadow-md"
          variants={buttonVariants}
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous testimonial"
        >
          <FaArrowLeft size={18} />
        </motion.button>

        {/* Right Navigation Button */}
        <motion.button
          className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 bg-white text-gray-600 p-3 rounded-full border-2 border-gray-200 flex items-center justify-center w-12 h-12 z-50 hover:bg-gray-50 transition-colors shadow-md"
          variants={buttonVariants}
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Next testimonial"
        >
          <FaArrowRight size={18} />
        </motion.button>

        {/* Swiper Component */}
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          navigation={false}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          modules={[Pagination, Navigation, Autoplay]}
          pagination={{
            clickable: true,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
          }}
          onSwiper={(swiper: SwiperType) => (swiperRef.current = swiper)}
          className="pb-12"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <motion.div
                className="bg-white rounded-2xl p-8 md:p-10 shadow-sm max-w-3xl mx-auto"
                variants={slideVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                {/* Rating Stars */}
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-[#FF9800] text-lg" />
                  ))}
                </div>

                {/* Testimonial Content */}
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-left">
                  {/* Profile Image */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="object-cover rounded-full w-20 h-20 md:w-24 md:h-24"
                    />
                    {testimonial.verified && (
                      <div className="absolute bottom-0 right-0 w-7 h-7 bg-[#4CAF50] text-white rounded-full flex items-center justify-center border-2 border-white">
                        <FaCheckCircle size={14} />
                      </div>
                    )}
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 text-center md:text-left">
                    <p className="text-sm md:text-base text-[#333333] leading-relaxed mb-4">
                      "{testimonial.description}"
                    </p>
                    <div>
                      <h4 className="font-bold text-base md:text-lg text-[#1F1F1F]">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs md:text-sm text-[#666666]">
                        {testimonial.location}
                      </p>
                      <p className="text-xs md:text-sm text-[#4CAF50] font-medium mt-1">
                        {testimonial.category}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.section>
  );
};

export default TestimonialSlider;
