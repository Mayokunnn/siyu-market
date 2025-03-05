import React from 'react';
import mail from '../assets/email.png'
import Instagram from '../assets/icon-instagram.png'
import Twitter from '../assets/Icon-Twitter.png'
import Facebook from '../assets/Icon-Facebook.png'
import LinkedIn from '../assets/Icon-Linkedin.png'
import Phone from '../assets/phone.png'
import Location from '../assets/location.png'


function Footer() {
  return (
    <footer className="bg-black text-white pt-8 mt-[100px]">
      <div className="w-full px-[80px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 ">
        
        
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <div className='flex items-center mb-[10px]'><img src={mail} alt="mail icon" className='mr-[7px] w-[25px]'/>support@siyumarket.com</div>
          <div className='flex items-center mb-[10px]'><img src={Phone} alt="phone icon" className='mr-[5px] w-[25px]'/>+234 80 SIYUMARKET</div>
          <div className='flex items-center mb-[5px]'><img src={Location} alt="location icon" className='mr-[4px] w-[30px]'/>Covenant University</div>
        </div>
        

        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <div className=' cursor-pointer'>
            Become a vendor
          </div>

            
        </div>
        
        
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <div className='cursor-pointer'><img src={Instagram} alt="Instagram" /></div>
            <div className='cursor-pointer'><img src={Twitter} alt="Twitter" /></div>
            <div className='cursor-pointer'><img src={Facebook} alt="Facebook" /></div>
            <div className='cursor-pointer'><img src={LinkedIn} alt="LinkedIn" /></div>
          </div>
        </div>

      </div>
      <div className='w-full text-center font-thin pt-9 pb-3'>© Copyright SiyuMarket 2024. All rights reserved</div>
    </footer>
  );
}

export default Footer;
