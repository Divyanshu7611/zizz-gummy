import React from 'react';
import { Image } from '@shopify/hydrogen';
import Button from '../mini/Button';
import { PiHandbagFill } from "react-icons/pi";
import { BsArrowUpRightCircle } from "react-icons/bs";

function Hero() {
  return (
    <div className="relative w-full">
      <Image src="/static/HeroBanner.png" alt="Zizz Hero" className="w-full h-auto" />

      {/* Overlayed content */}
      <div className="absolute top-1/4 left-10 max-w-md text-white space-y-4">
        <h3 className="text-[#2D2D2D] text-6xl font-extrabold">Wellness Just Got Tastier</h3>
        <p className="text-[#2D2D2D] text-xl font-medium mt-16">
          Say goodbye to boring pills. ZIZZ Gummies are your fun, flavorful fix for real health goals –
          better sleep, stronger hair, stronger bones, and more.
        </p>
        <div className="flex gap-4 mt-16">
            <Button text='Shop Now' bgColor='bg-[#1E1E1E]' textColor='text-white' icon={<PiHandbagFill/>}/>
          <Button text='Learn More' bgColor='bg-transparent' textColor='text-[#2D2D2D]'icon={<BsArrowUpRightCircle/>}/>
        </div>
      </div>
    </div>
  );
}

export default Hero;
