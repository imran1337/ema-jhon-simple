import React, { useEffect, useState } from "react";
import "./Shop.css";
import { Products } from "../Products/Products";
import Cart from "../Cart/Cart";
import { Link } from "react-router-dom";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../Resources/utilities/databaseManager";

// const BtnAndFeaturesContainer = (props) => {
//   const { features } = props;
//   return (
//     <>
//       <div className="d-flex flex-column flex-lg-row justify-content-between">
//         <div className="button_div order-1 tc mb-3">
//           <button className="btn btn-success">add to cart</button>
//         </div>
//         {features.length ? (
//           <div className="features order-lg-2 ms-1">
//             <h4 className="ms-3">Features</h4>
//             <ol>
//               <div className="">
//                 <Features features={features} />
//               </div>
//             </ol>
//           </div>
//         ) : null}
//       </div>
//     </>
//   );
// };

// const Features = (props) => {
//   return props.features.map((feature) => {
//     const { description, value } = feature;
//     return (
//       <>
//         {/*<div className="col-12"> */}
//         <li>
//           {description}: <span className="gold">{value}</span>
//         </li>
//         {/* </div> */}
//       </>
//     );
//   });
// };

// const ProductsItems = () => {
//   const [products, setProducts] = useState(fakeData);
//   return products.map((pd) => {
//     console.log(pd);
//     const { name, img, seller, price, stock, features } = pd;
//     return (
//       <>
//         <section className="products d-flex flex-column flex-lg-row m-5 bb">
//           <div className="product_img align-self-center">
//             <img src={img} alt="" />
//           </div>
//           <div className="product_details ms-5">
//             <p className="fs-4 product_title">{name}</p>
//             <div className="d-flex flex-md-column">
//               <p className="me-5">by: {seller}</p>
//               <p className="b">$ {price}</p>
//             </div>
//             <div className="star_and_left_items d-flex justify-content-between">
//               <p>only {stock} left in stock - order soon</p>
//               <p>star star star star star</p>
//             </div>
//             <BtnAndFeaturesContainer features={features} />
//           </div>
//         </section>
//       </>
//     );
//   });
// };

export const Shop = () => {
  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("https://fierce-shelf-90636.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    console.log(productKeys);
    fetch("https://fierce-shelf-90636.herokuapp.com/productsByKeys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productKeys),
    })
      .then((res) => res.json())
      .then((data) => setCart(data))
      .catch((err) => console.log(err));
    console.log("useeffect runed");
  }, []);

  const handleAddProduct = (productForBtn) => {
    const toBeAddedKey = productForBtn.key;
    // console.log(productForBtn);
    const countSameProduct = cart.find((pd) => pd.key === productForBtn.key);
    let count = 1;
    let newCart;
    if (countSameProduct) {
      count = countSameProduct.quantity + 1;
      countSameProduct.quantity = count;
      const others = cart.filter((pd) => pd.key !== toBeAddedKey);
      newCart = [...others, countSameProduct];
    } else {
      productForBtn.quantity = 1;
      newCart = [...cart, productForBtn];
    }
    setCart(newCart);
    addToDatabaseCart(productForBtn.key, count);
  };

  const searchProductHandler = () => {
    const searchValue = document
      .getElementById("searchBox")
      .value.toString()
      .toLowerCase()
      .trim();
    fetch("https://fierce-shelf-90636.herokuapp.com/searchProduct", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ searchValue }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.length) return alert("Product not found");
        setProducts(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="d-flex justify-content-center mb-5">
        <input
          type="text"
          className="form-control"
          id="searchBox"
          style={{ width: "100vh", maxWidth: "500px" }}
        />
        <button className="btn btn-primary" onClick={searchProductHandler}>
          Search
        </button>
      </div>
      <main className="d-flex justify-content-center">
        <div className="row justify-content-center">
          {/* Product container */}
          <div className="col-7">
            {products.map((pd) => {
              return (
                <Products
                  product={pd}
                  handleAddProduct={handleAddProduct}
                  key={pd.key}
                ></Products>
              );
            })}
          </div>
          <div className="col-5 bl text-center">
            {/* cart container */}
            <div className="shop_container ">
              <h3>Order Summary</h3>
              <Cart cart={cart}>
                <Link to="/review">
                  <button className="btn bg-gold b">Review Order</button>
                </Link>
              </Cart>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
