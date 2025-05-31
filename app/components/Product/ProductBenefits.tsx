import React from 'react'
import ProductBenefitCard from '../mini/ProductBenefitCard'
import { HiBeaker } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import { FaLeaf } from "react-icons/fa";
function ProductBenefits() {
  return (
     <div className='max-w-screen-xl mx-auto flex flex-col py-10 px-3'>
        <div>
            <h1 className='inter md:text-4xl text-xl font-bold text-center'>Product Benefits & Ingredients</h1>
        </div>

        
        <div className='flex justify-between w-full md:flex-row flex-col gap-3 md:mt-16 mt-8'>
              <ProductBenefitCard text='Regulates Sleep' description='Promotes natural melatonin production' icon={<FaLeaf/>} textColor='text-[#1F2937]' descriptionColor='text-[#4B5563]'/>
              <ProductBenefitCard text='Calms Your Mind' description='Infused with herbal extracts' icon={<HiBeaker/>} textColor='text-[#1F2937]' descriptionColor='text-[#4B5563]'/>
              <ProductBenefitCard text='Natural Flavor' description='Cranberry goodness, no added sugar' icon={<FaHeart/>} textColor='text-[#1F2937]' descriptionColor='text-[#4B5563]'/>                                                                                                                     
        </div>

      </div>
  )
}

export default ProductBenefits