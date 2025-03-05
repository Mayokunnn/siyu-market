import React from 'react';
import { motion } from 'framer-motion'; 
import Delivery from '../assets/delivery.png';
import Customercare from '../assets/customer.png';
import Approved from '../assets/approved.png';

function Services() {
  return (
    <section className="pt-7 pb-[100px]">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        
       
        <motion.div
          className="text-center"
          initial={{ x: '-100vw'}}
          animate={{ x: 0 }} 
          transition={{ type: 'spring', stiffness: 50 }}
          
        >
          <img src={Delivery} alt="Fast Delivery" className="mx-auto mb-4 w-20 h-20" />
          <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
          <p className="text-gray-700">
            Get your products delivered quickly with our efficient delivery system, ensuring you get what you need on time.
          </p>
        </motion.div>

        
        <motion.div
          className="text-center"
          initial={{ x: '-100vw' }} 
          animate={{ x: 0 }} 
          transition={{ type: 'spring', stiffness: 50, delay: 0.2 }}
        >
          <img src={Customercare} alt="Customer Service" className="mx-auto mb-4 w-20 h-20" />
          <h3 className="text-xl font-semibold mb-2">Customer Service</h3>
          <p className="text-gray-700">
            Our team is here to help with any questions or concerns, providing you with outstanding support and service.
          </p>
        </motion.div>

        
        <motion.div
          className="text-center"
          initial={{ x: '-100vw' }} 
          animate={{ x: 0 }} 
          transition={{ type: 'spring', stiffness: 50, delay: 0.4 }}
        >
          <img src={Approved} alt="Approved Vendors" className="mx-auto mb-4 w-20 h-20" />
          <h3 className="text-xl font-semibold mb-2">Approved Vendors</h3>
          <p className="text-gray-700">
            We work with reliable, vetted vendors to ensure you receive quality products from trusted sources.
          </p>
        </motion.div>

      </div>
    </section>
  );
}

export default Services;
