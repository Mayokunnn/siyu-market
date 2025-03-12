import React from 'react';

const Loader = () => {
  return (
    <div className="flex w-full justify-center items-center h-[5vh]">
      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white-800"></div>
    </div>
  );
}

export default Loader;
