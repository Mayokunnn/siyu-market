import React from 'react'
import Herobanner from '../component/Herobanner'
import { useNavigate } from 'react-router-dom'
import Services from '../component/Services'
import Title from '../component/Title'
import Store from '../component/Store'
import Slider from '../component/Slider'
import ProductGrid from '../component/ProductGrid'

function Home() {
 

  const navigate = useNavigate()




  return (
    <div>
      <div className='max-w-[1800px] mx-auto px-4'>
        <Slider />

        <Services />
        <Title title="Top Vendors, Top Deals" subtitle="Our largest vendors with massive sales are ready to bring you unbeatable deals!"/>
        <Store />
        <div className="w-full flex justify-center items-center mt-[10px] mb-[40px]">
          <button onClick={() => navigate('/vendors')} className="rounded-[4px] px-[48px] py-[16px] mx-auto bg-blue-700 text-white hover:bg-blue-800 transition duration-300">
            Show All Vendors
          </button>
        </div>

        <Herobanner />

        <h3 className='text-4xl font-bold  mt-[60px]'>Browse products</h3>
        <ProductGrid />
      </div>
    </div>
  )
}

export default Home
