import React from 'react';


const VendorTile = ({ name, logo, description, id }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-lg">
        <div className="flex items-center justify-between px-3 mb-4">
          <h3 className="text-xl sm:text-2xl font-semibold">{name}</h3>
          <div className="mx-auto mb-4 w-24 h-24 sm:w-32 sm:h-32">
            <img
              src={logo}
              alt={`${name} logo`}
              className="rounded-full w-full h-full object-cover"
            />
          </div>
        </div>
      <div className="text-sm text-gray-700">
        <span className="inline-block bg-gray-100 text-gray-800 px-4 py-1 rounded-full mb-2 mr-2 font-semibold">
          {description}
        </span>
      </div>
    </div>
  );
};

export default VendorTile;
