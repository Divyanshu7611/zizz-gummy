import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Button from "../mini/Button";

const testimonials = [
  {
    name: "Dr. manhor Singh",
    title: "Dermatologist",
    image: "/static/doctor.png", // Replace with actual image path
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
  return (
    <section className="md:py-12 py-2 px-4 bg-[#FAFAFA] text-center max-w-screen-xl mx-auto">
      <h3 className="text-xl md:text-4xl font-bold mb-5 text-[#1F1F1F]">Backed by Science</h3>
      <h4 className="text-[#2D2D2D] md:text-2xl text-sm text-center font-normal mb-10">Formulated by sleep researchers and nutritionists</h4>

      <Swiper
        spaceBetween={30}
        modules={[Pagination]}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {testimonials.map((t, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white my-5 rounded-xl p-6 shadow-md max-w-sm mx-auto text-left h-full flex flex-col justify-between inter">
              <div className="flex flex-col items-center mb-4">
                <div className="relative">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 text-white rounded-full text-center text-sm font-bold flex items-center justify-center border-2 border-white">
                    +
                  </div>
                </div>
                <h3 className="font-bold text-lg mt-2">{t.name}</h3>
                <p className="text-gray-600 text-sm">{t.title}</p>
              </div>
              <hr className="my-2" />
              <p className="text-sm text-gray-700">{t.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="w-full flex justify-center mt-10 mb-16">
      <Button text="Read More Glow Stories" bgColor="bg-[#1F1F1F]" textColor="text-[#FAFAFA]"/>
      </div>
    </section>
  );
};

export default TestimonialSlider;
