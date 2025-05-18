import React from 'react';
import { FiPhone } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { SlSocialFacebook } from "react-icons/sl";
import { RiTwitterXFill } from "react-icons/ri";
import { SlSocialLinkedin, SlSocialInstagram } from "react-icons/sl";

function HeaderTop() {
  return (
    <div className="bg-[#FFF176] px-4 md:px-8 py-2 text-sm text-[#02343F]">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-3 lg:space-y-0">
        
        {/* Left Section - Contact */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full lg:w-1/3 justify-center lg:justify-start inter">
          <div className="flex items-center gap-2">
            <FiPhone className="text-lg" />
            <span>+91 1234567890</span>
          </div>
          <div className="flex items-center gap-2">
            <MdOutlineMail className="text-lg" />
            <span>support@zizzbliss.com</span>
          </div>
        </div>

        {/* Middle Section - Message */}
        <div className="text-center font-semibold w-full lg:w-1/3 poppins">
          Free shipping on all orders above ₹499
        </div>

        {/* Right Section - Socials */}
        <div className="flex items-center gap-4 text-lg w-full lg:w-1/3 justify-center lg:justify-end inter">
          <a href="#" aria-label="Facebook">
            <SlSocialFacebook />
          </a>
          <a href="#" aria-label="Twitter">
            <RiTwitterXFill />
          </a>
          <a href="#" aria-label="LinkedIn">
            <SlSocialLinkedin />
          </a>
          <a href="#" aria-label="Instagram">
            <SlSocialInstagram />
          </a>
        </div>
      </div>
    </div>
  );
}

export default HeaderTop;
