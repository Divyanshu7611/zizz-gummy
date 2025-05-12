import React from 'react';
import FunctionalityCard from '../mini/FunctionalityCard';

function BriefCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-8">
      <FunctionalityCard
        imageSrc="/asset/HealthSupplement.png"
        imageAlt="Health supplements"
        imageSize="w-14 h-14"
        text="Health supplements"
        textColor="text-[#2D2D2D]"
        bgColor="bg-[#FFFFFF]"
      />
      <FunctionalityCard
        imageSrc="/asset/SexWellness.png"
        imageAlt="Sexual wellness"
        imageSize="w-14 h-14"
        text="Sexual wellness"
        textColor="text-[#2D2D2D]"
        bgColor="bg-[#FFFFFF]"
      />
      <FunctionalityCard
        imageSrc="/asset/Sports.png"
        imageAlt="Sports nutrition's"
        imageSize="w-14 h-14"
        text="Sports nutrition's"
        textColor="text-[#2D2D2D]"
        bgColor="bg-[#FFFFFF]"
      />
      <FunctionalityCard
        imageSrc="/asset/Weight.png"
        imageAlt="Weight management "
        imageSize="w-14 h-14"
        text="Weight management"
        textColor="text-[#2D2D2D]"
        bgColor="bg-[#FFFFFF]"
      />
    </div>
  );
}

export default BriefCards;
