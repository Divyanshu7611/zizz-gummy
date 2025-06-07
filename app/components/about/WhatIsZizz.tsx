import React from 'react'
import { Image } from '@shopify/hydrogen'

function WhatIsZizz() {
  return (
    <div className='bg-[#FAFAFA] min-w-screen md:py-12 pt-12 px-3 inter pb-12'>
        <div className='flex md:flex-row flex-col max-w-screen-xl justify-between mx-auto'>
        {/* content Section */}
        <div className='flex flex-col gap-2 md:py-16 pb-6 md:pb-0'>
             <h1 className='text-black font-bold md:text-4xl text-xl text-start md:text-start'>What is ZIZZ?</h1>
             <p className='text-[#2D2D2D] md:text-2xl text-sm text-justify max-w-xl opacity-85'>
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