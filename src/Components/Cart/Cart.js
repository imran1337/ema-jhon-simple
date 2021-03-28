import React from "react";

const Cart = (props) => {
  const { cart } = props;
  console.log(cart);
  console.log(props);
  const beforeShipTotalPrice =
    parseFloat(
      cart.map((pd) => pd.price).reduce((p = 0, c) => p + c, 0) *
        parseFloat(cart.map((pd) => pd.quantity || 1))
    ).toFixed(2) | 0 ;
      console.log(beforeShipTotalPrice);
  const shipCost = parseFloat(
    cart.map((pd) => pd.shipping).reduce((p = 0, c) => p + c, 0) *
      parseFloat(cart.map((pd) => pd.quantity))
  ).toFixed(2);

  let newShipCost;
  if (beforeShipTotalPrice < 50) {
    newShipCost = 0;
  } else {
    newShipCost = +shipCost;
  }

  const tax = parseFloat(beforeShipTotalPrice * 0.1).toFixed(2);

  const grandTotal = parseFloat(
    +beforeShipTotalPrice + +newShipCost + +tax
  ).toFixed(2);
  return (
    <>
      <p className="fs-4">Items ordered: {cart.length}</p>
      <p>Price: {beforeShipTotalPrice}</p>
      <p>Shipping And Handling: {newShipCost}</p>
      <p>Tax: {tax}</p>
      <p>Total: {grandTotal}</p>
      {props.children}
    </>
  );
};

export default Cart;