import React, { useEffect, useState } from "react";
import {
  getDatabaseCart,
  processOrder,
  removeFromDatabaseCart,
} from "../../Resources/utilities/databaseManager";
import "./Review.css";
import fakeData from "./../../Resources/fakeData/index";
import ReviewItems from "./../ReviewItems/ReviewItems";
import Cart from "../Cart/Cart";
import giffy from "./../../Resources/images/giphy.gif";
import { useHistory } from "react-router";

const Review = () => {
  const [cart, setCart] = useState([]);

  const [placeOrder, setPlaceOrder] = useState(false);

  const history = useHistory();

  const handleProceedCheckout = () => {
    history.push("/shipment");
  };

  const handleRemoveProduct = (productKey) => {
    console.log("removed", productKey);
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };

  useEffect(() => {
    //cart er data load
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const cartProducts = productKeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = savedCart[key];
      return product;
    });
    setCart(cartProducts);
  }, []);

  return (
    <section className="d-flex justify-content-center">
      {!placeOrder ? (
        <>
          {cart.length > 0 ? (
            <div className="row justify-content-center">
              <div className="col-7">
                {cart.map((cart) => (
                  <ReviewItems
                    products={cart}
                    key={cart.key}
                    handleRemoveProduct={handleRemoveProduct}
                  />
                ))}
              </div>
              <div className="col-4 bl text-center ms-2">
                <Cart cart={cart}>
                  <button
                    className="btn bg-gold b"
                    onClick={handleProceedCheckout}
                  >
                    Proceed Checkout
                  </button>
                </Cart>
              </div>
            </div>
          ) : (
            <h1 className="text-danger border p-5 font-monospace shadow bg-body rounded">
              Please add some product to checkout!
            </h1>
          )}
        </>
      ) : (
        <img src={giffy} alt="giffy" />
      )}
    </section>
  );
};

export default Review;

/***
 * <main className="d-flex justify-content-center">
      <div className="row justify-content-center">
        // {/* Product container */
//     <div className="col-7">
//       {products.map((pd) => {
//         return (
//           <Products
//             product={pd}
//             handleAddProduct={handleAddProduct}
//             key={pd.key}
//           ></Products>
//         );
//       })}
//     </div>
//     <div className="col-5 bl text-center">
//       {/* cart container */}
//       <div className="shop_container ">
//         <h3>Order Summary</h3>
//         <Cart cart={cart}></Cart>
//       </div>
//     </div>
//   </div>
// </main>
