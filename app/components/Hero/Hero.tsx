import React from 'react';
import { Image } from '@shopify/hydrogen';

function Hero() {
  return (
    <div className="relative w-full">
      <Image src="/static/HeroBanner.png" alt="Zizz Hero" className="w-full h-auto" />

      {/* Overlayed content */}
      <div className="absolute top-1/4 left-10 max-w-md text-white space-y-4">
        <h3 className="text-[#2D2D2D] text-6xl font-extrabold">Wellness Just Got Tastier</h3>
        <p className="text-[#2D2D2D] text-xl font-medium">
          Say goodbye to boring pills. ZIZZ Gummies are your fun, flavorful fix for real health goals –
          better sleep, stronger hair, stronger bones, and more.
        </p>
        <div className="flex gap-4 mt-5">
          <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            Shop Now
          </button>
          <button className="bg-transparent border border-white text-white px-6 py-2 rounded hover:bg-white hover:text-green-700">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
