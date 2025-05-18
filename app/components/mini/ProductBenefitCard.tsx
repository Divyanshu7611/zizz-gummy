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
    <div className="rounded-xl bg-white shadow-md p-6 w-full max-w-sm mx-auto border border-[#E5E7EB] shadow-[#0000001A] drop-shadow-lg poppins">
      <div className="flex items-center space-x-4 flex-col">
        <div className="text-2xl text-green-600 bg-gray-200 border border-gray-200 rounded-full p-5">
          {icon}
        </div>
        <h3 className={`font-semibold mt-4 text-[20px] ${textColor}`}>{text}</h3>
      </div>
      <p className={`mt-4 text-sm font-normal text-center ${descriptionColor}`}>{description}</p>
    </div>
  );
};

export default ProductBenefitCard;
