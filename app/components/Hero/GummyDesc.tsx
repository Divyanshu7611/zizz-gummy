import React from 'react';
import { Image } from '@shopify/hydrogen';

function GummyDesc() {
  return (
    <div className="w-full flex flex-col-reverse md:flex-row items-stretch justify-between px-4 md:px-16 lg:px-0 py-8 gap-8">
      {/* Text Section */}
      <div className="flex flex-col gap-4 w-full md:max-w-xl text-center md:text-left justify-center">
        <h3 className="text-[#000000] text-3xl md:text-4xl font-bold inter">
          Your Daily Dose of Health – Now in a Gummy!
        </h3>

        <h4 className="text-[#2D2D2D] font-normal text-lg md:text-2xl inter">
          Let’s face it — pills are boring. Syrups are messy. Powders are a hassle. That’s why we created ZIZZ — a delicious gummy that takes care of your health without disrupting your routine. Pop a gummy, live your life.
        </h4>

        <ol className="text-[#2D2D2D] text-lg md:text-2xl list-disc list-outside pl-6 space-y-2 inter">
          <li>Tastes amazing</li>
          <li>Easy to carry, easy to consume</li>
          <li>Scientifically formulated</li>
          <li>No added sugar, no fuss</li>
        </ol>
      </div>

      {/* Image Section */}
      <div className="w-full md:max-w-xl flex justify-center items-center">
        <Image src="/static/gummyDesc.png" alt="Gummy Overview" className="w-full h-full object-contain" />
      </div>
    </div>
  );
}

export default GummyDesc;
