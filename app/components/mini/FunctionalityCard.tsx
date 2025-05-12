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
  imageSize = 'w-16 h-16',
  text,
  textColor = 'text-gray-800',
  bgColor = 'bg-white',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 ${bgColor}`}
    >
      <img src={imageSrc} alt={imageAlt} className={`${imageSize} object-contain`} />
      <p className={`mt-4 text-center ${textColor} font-medium`}>{text}</p>
    </div>
  );
};

export default FunctionalityCard;
