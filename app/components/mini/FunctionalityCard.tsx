import React from 'react';

interface FunctionalityCardProps {
  imageSrc: string;
  imageAlt?: string;
  imageSize?: string; // e.g., 'w-16 h-16'
  text: string;
  textColor?: string;
  bgColor?: string;
}

const FunctionalityCard: React.FC<FunctionalityCardProps> = ({
  imageSrc,
  imageAlt = 'Function Icon',
  text,
  textColor = 'text-gray-800',
  bgColor = 'bg-white',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center drop-shadow-lg poppins md:p-6 md:px-6 px-8 py-3 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 inter ${bgColor}`}
    >
      <img src={imageSrc} alt={imageAlt} className='object-contain md:w-12 md:h-12 w-8 h-8' />
      <h1 className={`md:mt-4 text-center text-[8px] md:text-xl ${textColor} font-bold`}>{text}</h1>
    </div>
  );
};

export default FunctionalityCard;
