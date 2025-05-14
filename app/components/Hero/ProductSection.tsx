// import React from "react";
// import { FaCheckCircle } from "react-icons/fa";

// const features = [
//   { text: "Natural Sugar of just 1.5g/gummies", className: "top-2 left-18" },
//   { text: "100% Vegetarian", className: "top-1/3 left-1" },
//   { text: "No Preservatives", className: "bottom-1/4 left-4" },
//   { text: "Essential Vitamins and Minerals", className: "bottom-1/4 -right-32" },
//   { text: "Natural Colors and Flavours", className: "top-1/3 -right-36" },
//   { text: "Pectin Based", className: "top-2 -right-16" },
// ];

// const GummyProductSection: React.FC = () => {
//   return (
//     <section className="text-center py-12 bg-white relative mb-28">
//       <h3 className="text-2xl font-bold mb-2 md:text-4xl text-[#000000]">
//         Your Daily Dose of Health Now in a Gummy!
//       </h3>
//       <p className="text-[#2D2D2D] mx-auto mb-6 text-center mt-5 text-2xl">
//         Let’s face it — pills are boring. Syrups are messy. Powders are a hassle.
//         That’s why we created ZIZZ
//       </p>

//       <div className="flex justify-center mb-8 mt-10 border border-[#1F1F1F40] w-fit mx-auto rounded-lg">

//         <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition ">
//           Our Product
//         </button>
//         <button className="border px-4 py-2 hover:bg-gray-100 transition border-none">
//           Other Products
//         </button>
//       </div>

//       <div className="relative w-full max-w-[700px] h-[500px] mx-auto mt-36">
//         {/* Circles */}
//         <img
//           src="/Hero/outer.png"
//           alt="circle3"
//           className="absolute w-[712px] h-[712px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-30"
//         />
//         <img
//           src="/Hero/middle.png"
//           alt="circle2"
//           className="absolute w-[560px] h-[560px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-50"
//         />
//         <img
//           src="/Hero/Inner.png"
//           alt="circle1"
//           className="absolute w-[300px] h-[300px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-70"
//         />

//         {/* Product */}
//         <img
//           src="/Hero/blissProduct.png"
//           alt="product"
//           className="relative z-10 w-auto max-h-[602px] mx-auto"
//         />

//         {/* Feature Points */}
//         {features.map((feature, index) => (
//           <div
//             key={index}
//             className={`absolute z-20 ${feature.className} text-green-700 font-semibold text-sm w-40 flex items-center gap-2`}
//           >
//             <FaCheckCircle className="text-green-500 min-w-[20px] text-xl" />
//             <span>{feature.text}</span>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default GummyProductSection;



import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const features = [
  { text: "Natural Sugar of just 1.5g/gummies", className: "top-2 -left-14", reverse: true },
  { text: "100% Vegetarian", className: "top-1/3 -left-42", reverse: true },
  { text: "No Preservatives", className: "bottom-1/4 -left-38", reverse: true },
  { text: "Essential Vitamins and Minerals", className: "bottom-1/4 -right-40", reverse: false },
  { text: "Natural Colors and Flavours", className: "top-1/3 -right-44", reverse: false },
  { text: "Pectin Based", className: "top-2 -right-12", reverse: false },
];

const GummyProductSection: React.FC = () => {
  return (
    <section className="text-center py-12 bg-white relative mb-28 px-4">
      <h3 className="text-2xl font-bold mb-2 md:text-4xl text-[#000000]">
        Your Daily Dose of Health Now in a Gummy!
      </h3>
      <p className="text-[#2D2D2D] mx-auto mb-6 text-center mt-5 text-xl md:text-2xl text-wrap">
        Let’s face it — pills are boring. Syrups are messy. Powders are a hassle.
        That’s why we created ZIZZ
      </p>

      <div className="flex justify-center mb-8 mt-10 border border-[#1F1F1F40] w-fit mx-auto rounded-lg overflow-hidden">
        <button className="bg-green-500 text-white px-4 py-2 rounded-l-lg hover:bg-green-600 transition">
          Our Product
        </button>
        <button className="border px-4 py-2 hover:bg-gray-100 transition border-none">
          Other Products
        </button>
      </div>

      <div className="relative w-full max-w-[700px] h-[500px] md:h-[600px] mx-auto mt-36">
        {/* Circles */}
        <img
          src="/Hero/outer.png"
          alt="circle3"
          className="absolute w-[712px] h-[712px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-30"
        />
        <img
          src="/Hero/middle.png"
          alt="circle2"
          className="absolute w-[560px] h-[560px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-50"
        />
        <img
          src="/Hero/Inner.png"
          alt="circle1"
          className="absolute w-[300px] h-[300px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-70"
        />

        {/* Product */}
        <img
          src="/Hero/blissProduct.png"
          alt="product"
          className="relative z-10 w-auto max-h-[602px] mx-auto"
        />

        {/* Feature Points */}
        {features.map((feature, index) => (
          <div
            key={index}
            className={`absolute z-20 ${feature.className} text-green-700 font-semibold text-xs md:text-sm w-40 md:w-48 flex items-center gap-2
              ${feature.reverse ? "flex-row-reverse text-right" : "flex-row text-left"}
              max-sm:static max-sm:flex-row !max-sm:my-2`}
          >
            <FaCheckCircle className="text-green-500 min-w-[16px] text-lg" />
            <span>{feature.text}</span>
          </div>
        ))}
      </div>

      {/* Mobile stacked feature list */}
      <div className="md:hidden mt-10 flex flex-col items-center gap-3 px-4">
        {features.map((feature, index) => (
          <div
            key={`mobile-${index}`}
            className={`flex items-center gap-2 text-green-700 font-semibold text-sm ${
              feature.reverse ? "flex-row-reverse text-right" : ""
            }`}
          >
            <FaCheckCircle className="text-green-500 min-w-[16px] text-lg" />
            <span>{feature.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GummyProductSection;
