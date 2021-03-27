import React from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import fakeData from "./../../Resources/fakeData/index";
import { Products } from "../Products/Products";
const ProductDetails = () => {
  const { key } = useParams();

  const product = fakeData.find((pd) => pd.key === key);

//   const { name, img, price, seller, star, features } = product;

//   console.log(product);

  return (
    <div className="d-flex flex-column container">
      {/* <img src={img} alt="" className="img-fluid w-25 align-self-center " />
      <h1>{name}</h1>
      <div className="d-flex justify-content-around">
        <h3>{price}</h3>
        <p>{seller}</p>
        <p>{star}</p>
      </div>
      <ol>
        {(features &&
          features.length &&
          features.map((featuresDetails) => {
            const { description, value } = featuresDetails;
            return (
              <li>
                {description}: {value}
              </li>
            );
          })) || <h3>Features not available</h3>}
      </ol> */}
      <Products product={product} showAddToCartBtn={false}/>
    </div>
  );
};

export default ProductDetails;
