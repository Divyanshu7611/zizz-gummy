import React from 'react';

interface ButtonProps {
  text: string;
  bgColor?: string;
  textColor?: string;
  hoverBgColor?: string;
  borderColor?:string;
  hoverTextColor?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  text,
  bgColor = 'bg-green-600',
  textColor = 'text-white',
  hoverBgColor = '',
  hoverTextColor = '',
  borderColor = '',
  icon,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-2 rounded border-2 font-medium poppins
        transition-all duration-300 ease-in-out transform
        ${bgColor} ${textColor} ${hoverBgColor} ${hoverTextColor} ${borderColor}
        hover:-translate-y-1 hover:shadow-lg`}
    >
      <span>{text}</span>
      {icon && <span className="text-xl">{icon}</span>}
    </button>
  );
};

export default Button;
