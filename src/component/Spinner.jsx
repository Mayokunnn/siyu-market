import React from 'react';

const Spinner = () => {
  return (
    <div className="flex w-full justify-center items-center h-[20vh]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-800"></div>
    </div>
  );
}

export default Spinner;
