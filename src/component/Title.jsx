import React from 'react'

function Title({title, subtitle}) {
  return (
    <div className="text-center mt-7">
      
      <h2 className={`text-5xl font-bold mb-2`}>
        {title}
      </h2>
    
      <p className={`text-lg text-gray-600`}>
        {subtitle}
      </p>
    </div>
  )
}

export default Title
