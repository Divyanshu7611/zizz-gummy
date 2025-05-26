import React from 'react'
import ProductBenefitCard from '../mini/ProductBenefitCard'
import { FaLeaf } from "react-icons/fa";
import { PiFlaskFill } from "react-icons/pi";
import { FaHeart } from "react-icons/fa6";
import { GiMedicines } from "react-icons/gi";

function WhyZizzExist() {
  return (
    <div className='py-12 inter bg-[#FAFAFA] px-5'>
        <div className='flex max-w-screen-xl mx-auto flex-col gap-16'>
            <h1 className='text-center text-[#1F1F1F] md:text-4xl text-2xl font-bold'>Why ZIZZ Exists</h1>

            <div className='flex md:flex-row flex-col justify-between w-full gap-5'>
                <ProductBenefitCard icon={<FaLeaf/>} text='Complex Routines' description='Too many pills, powders, and serums to juggle.' textColor='text-[#1F2937]' descriptionColor='text-[#4B5563]'/>
                <ProductBenefitCard icon={<PiFlaskFill/>} text='Low Compliance' description='Bitter tastes and forgetfulness kill consistency.' textColor='text-[#1F2937]' descriptionColor='text-[#4B5563]'/>
                <ProductBenefitCard icon={<FaHeart/>} text='High Costs' description='Multiple supplements add up.' textColor='text-[#1F2937]' descriptionColor='text-[#4B5563]'/>
                <ProductBenefitCard icon={<GiMedicines/>} text='Trust Gaps' description='People are skeptical of unregulated brands.' textColor='text-[#1F2937]' descriptionColor='text-[#4B5563]'/>

            </div>


        </div>
    </div>
  )
}

export default WhyZizzExist