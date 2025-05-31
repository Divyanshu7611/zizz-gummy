import React from 'react';

interface ProductBenefitCardProps {
  icon: React.ReactNode;
  text: string;
  textColor?: string;
  description: string;
  descriptionColor?: string;
}

const ProductBenefitCard: React.FC<ProductBenefitCardProps> = ({
  icon,
  text,
  textColor = 'text-black',
  description,
  descriptionColor = 'text-gray-600',
}) => {
  return (
    <div className="rounded-xl bg-white shadow-md md:p-6 p-4 w-full max-w-sm mx-auto border border-[#E5E7EB] shadow-[#0000001A] drop-shadow-lg poppins">
      <div className="flex items-center md:space-x-4 space-x-2 flex-col">
        <div className="md:text-2xl text-lg text-green-600 bg-gray-200 border border-gray-200 rounded-full md:p-5 p-3">
          {icon}
        </div>
        <h3 className={`font-semibold mt-4 md:text-[20px] text-base ${textColor}`}>{text}</h3>
      </div>
      <p className={`mt-4 text-sm font-normal text-center ${descriptionColor}`}>{description}</p>
    </div>
  );
};

export default ProductBenefitCard;
