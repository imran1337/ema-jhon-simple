import React from "react";
import "./Products.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

// const Button = (props) => {
//     const {handleAddProduct,productForBtn} = props;
//     return (
//       <button className="btn bg-gold b" onClick={() => handleAddProduct(productForBtn)}>
//         <FontAwesomeIcon icon={faShoppingCart} />
//         add to cart
//       </button>
//     );
//   };

// const Features = (props) => {
//   return props.features.map((feature, i) => {
//     const { description, value } = feature;
//     return (
//       <>
//         <li key={i}>
//           {description}: <span className="gold">{value}</span>
//         </li>
//       </>
//     );
//   });
// };

export const Products = (props) => {
  // console.log(props);
  const { name, img, seller, price, stock, features, key } = props.product;
  return (
    <>
      <section className="products d-flex flex-column flex-lg-row m-5 bb">
        <div className="product_img align-self-center">
          <img src={img} alt="product" className="img-fluid" />
        </div>
        <div className="product_details ms-5">
          <p className="fs-4 product_title">
            <Link to={`/product/${key}`}>{name}</Link>
          </p>
          <div className="d-flex flex-md-column">
            <p className="me-5">by: {seller}</p>
            <p className="b">$ {price}</p>
          </div>
          <div className="star_and_left_items d-flex justify-content-between">
            <p>only {stock} left in stock - order soon</p>
            <p className="gold">
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} spin />
              <FontAwesomeIcon icon={faStar} />
            </p>
          </div>
          <BtnAndFeaturesContainer
            features={features}
            handleAddProduct={props.handleAddProduct}
            productForBtn={props.product}
            isShowBtn={props.showAddToCartBtn}
          />
        </div>
      </section>
    </>
  );
};


const BtnAndFeaturesContainer = (props) => {
  const { features, handleAddProduct, productForBtn, isShowBtn } = props;
  return (
    <>
      <div className="d-flex flex-column flex-lg-row justify-content-between">
        <div className="button_div order-1 mb-3">
          {isShowBtn !== false && (
            <button
              className="btn bg-gold b"
              onClick={() => handleAddProduct(productForBtn)}
            >
              <FontAwesomeIcon icon={faShoppingCart} />
              add to cart
            </button>
          )}
        </div>
        {features?.length ? (
          <div className="features order-lg-2 ms-1">
            <h4 className="ms-3">Features</h4>
            <ol>
              {/* <Features features={features} key={key} /> */}
              {features.map((feature, i) => {
                const { description, value } = feature;
                return (
                  <li key={i.toString()}>
                    {description}: <span className="gold">{value}</span>
                  </li>
                );
              })}
            </ol>
          </div>
        ) : null}
      </div>
    </>
  );
};