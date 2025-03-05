import React from "react";
import Countdown from "react-countdown";
import { useNavigate } from "react-router-dom";


function Herobanner() {
  
  const countdownDate = new Date().getTime() + 1000 * 60 * 60 * 24; // 24 hours from now
  const navigate = useNavigate()

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between bg-black text-white p-6 md:p-12 rounded-lg shadow-lg">
      
      <div className="w-full text-center flex flex-col items-center md:text-left space-y-4">
        <h1 className="text-2xl md:text-4xl font-bold text-center">The Countdown Begins – Unbeatable Prices Await!</h1>
        
  
        <div className="w-full flex justify-center space-x-4">
          <Countdown
            date={countdownDate}
            renderer={({ hours, minutes, seconds, days }) => (
              <>
                <div className="text-center">
                  <p className="text-2xl font-bold">{days}</p>
                  <p className="text-sm">Days</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{hours}</p>
                  <p className="text-sm">Hours</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{minutes}</p>
                  <p className="text-sm">Minutes</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{seconds}</p>
                  <p className="text-sm">Seconds</p>
                </div>
              </>
            )}
          />
        </div>

        <div>
          <button className="bg-blue-800 text-white text-center px-6 py-2 rounded-md font-medium hover:bg-white hover:text-black transition duration-300" onClick={() => navigate('/products')}>
            Buy Now!
          </button>
        </div>
      </div>

    </div>
  );
}

export default Herobanner;
