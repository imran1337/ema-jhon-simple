import React from "react";
import "./ReviewItems.css";
const ReviewItems = (props) => {
  const {handleRemoveProduct,products} = props;
  const {name,quantity,key,price} = products;
  
  return (
    <div className="m-3 border p-2 container">
      <h4 className="text-primary lh-base">{name}</h4>
      <p>Quantity:{quantity}</p>
      <p><small>${price}</small></p>
      <button
        className="btn bg-gold b"
        onClick={() => handleRemoveProduct(key)}
      >
        Remove
      </button>
    </div>
  );
};

export default ReviewItems;