import React from "react";


const PriceDisplay = ({ price }) => {

    const formatPrice = (number) => {
        if (typeof number !== "number") {
          return number;
        }
        return number.toLocaleString('en-US', { minimumFractionDigits: 0 });
      };


  return (
    <div>
      <h2>₦{formatPrice(price)}</h2>
    </div>
  );
};


export default PriceDisplay