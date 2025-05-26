import React from 'react'
import { Image } from '@shopify/hydrogen'

function WhatIsZizz() {
  return (
    <div className='bg-[#FAFAFA] min-w-screen py-12 px-5 inter'>
        <div className='flex md:flex-row flex-col-reverse max-w-screen-xl justify-between mx-auto'>
        {/* content Section */}
        <div className='flex flex-col gap-5 py-16'>
             <h1 className='text-black font-bold md:text-4xl text-3xl text-center md:text-start'>What is ZIZZ?</h1>
             <p className='text-[#2D2D2D] md:text-2xl text-lg text-justify max-w-xl'>
                ZIZZ is a vibrant Indian nutraceutical brand redefining wellness through multi-benefit, science-backed gummies that are fun to take, delicious to taste, and simple to stick with. We're turning complex routines into a single, delightful habit.
             </p>
        </div>
        {/* Image Section */}
        <div>
             <Image src='/static/gummyDesc.png' alt='Zizz Gummy Image Description' className='max-w-[560px] max-h-[485px] rounded-lg'/>
        </div>
        </div>


    </div>
  )
}

export default WhatIsZizz