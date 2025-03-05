import React from 'react'
import Title from '../component/Title'
import Store from '../component/Store'

function AllStores() {
  return (
    <div>
      <div className='max-w-[1800px] mx-auto px-4'>
        <Title title="Explore Our Trusted Vendors" subtitle="Browse through a diverse range of vendors offering quality products across various categories" />
        <Store />
      </div>
     
    </div>
  )
}

export default AllStores
