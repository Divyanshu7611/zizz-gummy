import React from 'react';
import FunctionalityCard from '../mini/FunctionalityCard';

function BriefCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-8 max-w-[1440px] mx-auto">
      <FunctionalityCard
        imageSrc="/asset/HealthSupplement.png"
        imageAlt="Health supplements"
        imageSize="w-12 h-12"
        text="HEALTH SUPPLEMENTS"
        textColor="text-[#2D2D2D]"
        bgColor="bg-[#FFFFFF]"
      />
      <FunctionalityCard
        imageSrc="/asset/SexWellness.png"
        imageAlt="SEXUAL WELLNESS"
        imageSize="w-12 h-12"
        text="SEXUAL WELLNESS"
        textColor="text-[#2D2D2D]"
        bgColor="bg-[#FFFFFF]"
      />
      <FunctionalityCard
        imageSrc="/asset/Sports.png"
        imageAlt="SPORTS NUTRITION'S"
        imageSize="w-12 h-12"
        text="SPORTS NUTRITION'S"
        textColor="text-[#2D2D2D]"
        bgColor="bg-[#FFFFFF]"
      />
      <FunctionalityCard
        imageSrc="/asset/Weight.png"
        imageAlt="Weight management "
        imageSize="w-12 h-12"
        text="WEIGHT MANAGEMENT"
        textColor="text-[#2D2D2D]"
        bgColor="bg-[#FFFFFF]"
      />
    </div>
  );
}

export default BriefCards;
