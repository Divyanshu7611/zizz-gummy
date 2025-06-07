import React from 'react'
import { Image } from '@shopify/hydrogen'

function VisionAndMission() {
  return (
    <div className='bg-white md:py-10 px-5 flex flex-col max-w-screen-xl mx-auto gap-10 inter'>
      <div className='flex md:flex-row flex-col-reverse justify-between gap-5'>
        {/* Image Section */}
        <div>
          <Image src='/static/vision.png' alt='vision of zizz' className='w-[570px] md:h-[400px] h-[250px]'/>
        </div>

        {/* COntent Section */}
        <div className='flex flex-col gap-5 md:pt-16 pt-0'>
          <h1 className='md:text-4xl text-2xl font-bold'>Vision:</h1>

          <p className='text-[#2D2D2D] md:text-2xl text-lg max-w-lg text-justify'>To redefine health in India by turning daily wellness into a delightful, flavorful experience that transcends traditional supplements.</p>

        </div>

           
      </div>

      <div className='flex md:flex-row flex-col justify-between gap-5'>


        {/* COntent Section */}
        <div className='flex flex-col gap-5 md:pt-16 pt-0'>
          <h1 className='md:text-4xl text-2xl font-bold'>Mission:</h1>

          <p className='text-[#2D2D2D] md:text-2xl text-lg max-w-lg text-justify'>To empower every Indian with irresistibly tasty, science-backed gummies that make staying healthy as enjoyable as savoring a treat – no routines, no high costs, no compromises.</p>

        </div>

        
         {/* Image Section */}
        <div>
          <Image src='/static/mission.png' alt='mission of zizz' className='w-[570px] md:h-[400px] h-[250px]'/>
        </div>


      </div>

          
    </div>
  )
}

export default VisionAndMission