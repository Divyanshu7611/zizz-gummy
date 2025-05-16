import React from 'react'
import { FiPhone } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { SlSocialFacebook } from "react-icons/sl";
import { RiTwitterXFill } from "react-icons/ri";
import { SlSocialLinkedin } from "react-icons/sl";
import { SlSocialInstagram } from "react-icons/sl";

function HeaderTop() {
  return (
    <>
        <div className='flex items-center justify-between bg-[#FFF176] px-5 py-2 text-sm'>
            <div className='flex items-center gap-5'>
              <div className='flex items-center gap-3'>
              <FiPhone className='text-lg'/>
              <h3> +91 1234567890</h3>
              </div>
              <div className='flex items-baseline gap-3'>
                <MdOutlineMail className='text-lg'/>
                <h3>support@zizzbliss.com</h3>
              </div>

              <div>

              </div>

            </div>

            <h3 className='text-[#02343F] font-semibold text-center text-sm'>
                Free shipping on all orders above ₹499
            </h3>

            <div className='flex gap-5 text-lg'>
              <SlSocialFacebook/>
              <RiTwitterXFill/>
              <SlSocialLinkedin/>
              <SlSocialInstagram/>

            </div>


        </div>

    </>
  )
}

export default HeaderTop