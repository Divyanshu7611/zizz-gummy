import React from 'react'
import { Image } from '@shopify/hydrogen'
import { FaFacebookF, FaInstagram, FaTwitter, FaPinterestP } from 'react-icons/fa';
import Button from '~/components/mini/Button';

function contact() {
  return (
    <div className='bg-[#FAFAFA]'>
      <Image src='/static/ContactPage.png' alt='zizz contact Page' className='min-h-[150px] object-fill'/>
        <h1 className='text-center md:text-4xl text-2xl text-[#1F1F1F] font-bold mt-10 inter'>Send Us a Message</h1>
        <div className="flex flex-col md:flex-row mx-auto max-w-screen-xl p-4 md:p-10 gap-10 inter drop-shadow-xl">
      {/* Contact Form */}
      <form className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 shadow-md rounded-xl bg-white p-10">
        <input type="text" name="name" placeholder="Full Name" className="input-style" required />
        <input type="email" name="email" placeholder="Email Address" className="input-style" required />
        <input type="tel" name="phone" placeholder="Phone number" className="input-style" required />
        <input type="text" name="subject" placeholder="Subject" className="input-style" required />
        <textarea name="message" placeholder="Message" className="input-style md:col-span-2 h-32 resize-none" required />
        <div className='flex md:justify-start justify-center'>

        <Button text='SEND MESSAGE' bgColor='bg-[#1F1F1F]' textColor='text-white'/>
        </div>
      </form>

      {/* Contact Info */}
      <div className="flex-1 text-sm md:text-base space-y-4 text-[#1F1F1F] font-medium bg-white p-10 shadow-md drop-shadow-xl rounded-xl md:max-w-fit w-full">
        <div>
          <p className="font-semibold">Email:</p>
          <p>support@zizzwellness.com</p>
        </div>
        <div>
          <p className="font-semibold">Phone:</p>
          <p>+91-98765-43210</p>
        </div>
        <div>
          <p className="font-semibold">Address:</p>
          <p>Zizz Wellness HQ, Kota, India</p>
        </div>
        <div>
          <p className="font-semibold mb-1">Follow Us</p>
          <div className="flex gap-4 text-lg">
            <a href="#" className="hover:text-gray-600"><FaFacebookF /></a>
            <a href="#" className="hover:text-gray-600"><FaInstagram /></a>
            <a href="#" className="hover:text-gray-600"><FaTwitter /></a>
            <a href="#" className="hover:text-gray-600"><FaPinterestP /></a>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default contact