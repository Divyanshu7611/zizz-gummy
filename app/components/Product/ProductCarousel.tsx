    // import React, { useState, useRef, useEffect } from "react";
    // import { Image } from "@shopify/hydrogen";

    // type ImageNode = {
    //     url: string;
    //     alt?: string;
    // };

    // export default function ProductCarousel({ images }: { images: ImageNode[] }) {
    //   const [currentIndex, setCurrentIndex] = useState(0);
    //   const mainRef = useRef<HTMLDivElement>(null);
    //   const thumbRef = useRef<HTMLDivElement>(null);

    //   const totalSlides = images.length;

    //   const goToSlide = (index: number) => {
    //     if (index < 0) {
    //       setCurrentIndex(totalSlides - 1);
    //     } else if (index >= totalSlides) {
    //       setCurrentIndex(0);
    //     } else {
    //       setCurrentIndex(index);
    //     }
    //   };

    //   const handlePrev = () => {
    //     goToSlide(currentIndex - 1);
    //   };

    //   const handleNext = () => {
    //     goToSlide(currentIndex + 1);
    //   };

    //   useEffect(() => {
    //     if (mainRef.current) {
    //       mainRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    //     }
    //     if (thumbRef.current) {
    //       const thumbWidth = thumbRef.current.clientWidth / totalSlides;
    //       thumbRef.current.scrollTo({
    //         left: thumbWidth * currentIndex - thumbWidth,
    //         behavior: "smooth",
    //       });
    //     }
    //   }, [currentIndex, totalSlides]);

    //   return (
    //     <div className="flex flex-col gap-4">
    //       {/* Main Carousel */}
    //       <div className="relative w-full overflow-hidden max-w-xl">
    //         <div
    //           ref={mainRef}
    //           className="flex transition-transform duration-500 ease-in-out"
    //           style={{ width: `${totalSlides * 100}%` }}
    //         >
    //           {images.map((image, index) => (
    //             <div
    //               key={index}
    //               className="w-full flex-shrink-0 flex items-center justify-center"
    //               style={{ width: `${100 / totalSlides}%` }}
    //             >
    //               <Image
    //                 src={image.url}
    //                 alt={image.alt || `Slide ${index + 1}`}
    //                 width={500}
    //                 height={500}
    //                 className="object-contain rounded-xl"
    //               />
    //             </div>
    //           ))}
    //         </div>
    //         {/* Navigation Buttons */}
    //         <button
    //           onClick={handlePrev}
    //           className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full"
    //         >
    //           ❮
    //         </button>
    //         <button
    //           onClick={handleNext}
    //           className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full"
    //         >
    //           ❯
    //         </button>
    //       </div>

    //       {/* Thumbnail Carousel */}
    //       <div
    //         ref={thumbRef}
    //         className="flex overflow-x-auto gap-2 px-4 py-2"
    //         style={{ scrollSnapType: "x mandatory" }}
    //       >
    //         {images.map((image, index) => (
    //           <div
    //             key={index}
    //             onClick={() => goToSlide(index)}
    //             className={`cursor-pointer flex-shrink-0 border-2 rounded-md ${
    //               currentIndex === index
    //                 ? "border-blue-500"
    //                 : "border-transparent"
    //             }`}
    //             style={{ scrollSnapAlign: "start" }}
    //           >
    //             <Image
    //               src={image.url}
    //               alt={image.alt || `Thumbnail ${index + 1}`}
    //               width={100}
    //               height={100}
    //               className="object-cover rounded-md"
    //             />
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   );
    // }






import React, { useState, useRef, useEffect } from "react";
import { Image } from "@shopify/hydrogen";

type ImageNode = {
  url: string;
  alt?: string;
};

export default function ProductCarousel({ images }: { images: ImageNode[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const totalSlides = images.length;

  const goToSlide = (index: number) => {
    if (index < 0) {
      setCurrentIndex(totalSlides - 1);
    } else if (index >= totalSlides) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(index);
    }
  };

  const handlePrev = () => {
    goToSlide(currentIndex - 1);
  };

  const handleNext = () => {
    goToSlide(currentIndex + 1);
  };

  useEffect(() => {
    if (thumbRef.current) {
      const thumbItems = thumbRef.current.querySelectorAll('[data-thumb]');
      if (thumbItems.length > 0 && thumbItems[currentIndex]) {
        const thumbItem = thumbItems[currentIndex] as HTMLElement;
        thumbItem.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [currentIndex]);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Carousel */}
      <div className="relative w-full overflow-hidden max-w-xl" ref={mainRef}>
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="min-w-full flex justify-center items-center"
            >
              <Image
                src={image.url}
                alt={image.alt || `Slide ${index + 1}`}
                width={500}
                height={500}
                className="object-contain rounded-xl max-w-full max-h-full"
              />
            </div>
          ))}
        </div>
        {/* Navigation Buttons */}
        {/* {totalSlides > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full z-20"
            >
              ❮
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full z-20"
            >
              ❯
            </button>
          </>
        )} */}
      </div>

      {/* Thumbnail Carousel */}
      {totalSlides > 1 && (
        <div
          ref={thumbRef}
          className="flex overflow-x-auto gap-2 px-4 py-2 scroll-smooth"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              data-thumb={true}
              onClick={() => goToSlide(index)}
              className={`cursor-pointer flex-shrink-0 border-2 rounded-md mx-auto ${
                currentIndex === index
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
              style={{ scrollSnapAlign: "center" }}
            >
              <Image
                src={image.url}
                alt={image.alt || `Thumbnail ${index + 1}`}
                width={100}
                height={100}
                className="object-cover rounded-md w-20 h-20"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}