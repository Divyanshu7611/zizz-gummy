// // import React from 'react';

// // interface ButtonProps {
// //   text: string;
// //   bgColor?: string;
// //   textColor?: string;
// //   hoverBgColor?: string;
// //   borderColor?:string
// //   hoverTextColor?: string;
// //   icon?: React.ReactNode;
// //   onClick?: () => void;
// // }

// // const Button: React.FC<ButtonProps> = ({
// //   text,
// //   bgColor = 'bg-green-600',
// //   textColor = 'text-white',
// //   hoverBgColor = '',
// //   hoverTextColor = '',
// //   borderColor = '',
// //   icon,
// //   onClick,
// // }) => {
// //   return (
// //     <button
// //       onClick={onClick}
// //       className={`flex items-center gap-2 px-6 py-2 rounded border-2 font-medium poppins justify-center text-xs md:text-[20px]
// //         transition-all duration-300 ease-in-out transform
// //         ${bgColor} ${textColor} ${hoverBgColor} ${hoverTextColor} ${borderColor}
// //         hover:-translate-y-1 hover:shadow-lg`}
// //     >
// //       <span>{text}</span>
// //       {icon && <span className="text-xl">{icon}</span>}
// //     </button>
// //   );
// // };

// // export default Button;


// import React from 'react';
// import { motion } from 'framer-motion';

// interface ButtonProps {
//   text: string;
//   bgColor?: string;
//   textColor?: string;
//   hoverBgColor?: string;
//   borderColor?: string
//   hoverTextColor?: string;
//   icon?: React.ReactNode;
//   onClick?: () => void;
// }

// const Button: React.FC<ButtonProps> = ({
//   text,
//   bgColor = 'bg-green-600',
//   textColor = 'text-white',
//   hoverBgColor = '',
//   hoverTextColor = '',
//   borderColor = '',
//   icon,
//   onClick,
// }) => {
//   // Animation variants for the button
//   const buttonVariants = {
//     hidden: { opacity: 0, scale: 0.9 },
//     visible: { 
//       opacity: 1, 
//       scale: 1, 
//       transition: { 
//         duration: 0.5, 
//         ease: "easeOut" 
//       }
//     }
//   };

//   return (
//     <motion.button
//       variants={buttonVariants}
//       initial="hidden"
//       animate="visible"
//       onClick={onClick}
//       className={`flex items-center gap-2 md:px-6 md:py-2 px-4 py-2 rounded border-2 font-medium poppins justify-center text-xs md:text-[20px]
//         transition-all duration-300 ease-in-out transform
//         ${bgColor} ${textColor} ${hoverBgColor} ${hoverTextColor} ${borderColor}
//         hover:-translate-y-1 hover:shadow-lg`}
//     >
//       <span>{text}</span>
//       {icon && <span className="md:text-xl text-base">{icon}</span>}
//     </motion.button>
//   );
// };

// export default Button;



import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@remix-run/react';

interface ButtonProps {
  text: string;
  bgColor?: string;
  textColor?: string;
  hoverBgColor?: string;
  borderColor?: string;
  hoverTextColor?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
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
  href,
  target = '_self',
}) => {
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const classes = `flex items-center gap-2 md:px-6 md:py-2 px-4 py-2 rounded border-2 font-medium poppins justify-center text-xs md:text-[20px]
    transition-all duration-300 ease-in-out transform
    ${bgColor} ${textColor} ${hoverBgColor} ${hoverTextColor} ${borderColor}
    hover:-translate-y-1 hover:shadow-lg`;

  if (href) {
    return (
      <Link to={href}>
        <motion.a
          target={target}
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          className={classes}
        >
          <span>{text}</span>
          {icon && <span className="md:text-xl text-base">{icon}</span>}
        </motion.a>
      </Link>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      variants={buttonVariants}
      initial="hidden"
      animate="visible"
      className={classes}
    >
      <span>{text}</span>
      {icon && <span className="md:text-xl text-base">{icon}</span>}
    </motion.button>
  );
};

export default Button;
