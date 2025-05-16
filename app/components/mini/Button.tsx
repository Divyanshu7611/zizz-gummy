import React from 'react';

interface ButtonProps {
  text: string;
  bgColor?: string;
  textColor?: string;
  hoverBgColor?: string;
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
  icon,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-2 rounded transition transform duration-300 ease-in-out border-2 font-medium poppins   
        ${bgColor} ${textColor} ${hoverBgColor} ${hoverTextColor} hover:scale-105`}
    >
      <span>{text}</span>
      {icon && <span className="text-xl">{icon}</span>}
    </button>
  );
};

export default Button;
