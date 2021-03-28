import React from "react";
import "./Inventory.css";
import fakeData from "./../../Resources/fakeData/index";
const Inventory = () => {
  const handleAddProduct = () => {
    // fetch("https://fierce-shelf-90636.herokuapp.com/addProduct", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(fakeData),
    // });
    alert('coming soon')
  };
  return (
    <div style={{marginTop: '50px',textAlign: 'center'}}>
      <form action="">
        <p>
          <label htmlFor="productName">Product Name</label><br/>
          <input type="text" name="productName" id="productName" />
        </p>
       <p>
       <label htmlFor="productPrice">Product Price</label><br/>
        <input type="text" name="productPrice" id="productPrice" />
       </p>
        <p>
        <label htmlFor="productQuantity">Product Quantity</label><br/>
        <input type="text" name="productQuantity" id="productQuantity" />
        </p>
        <p>
        <label htmlFor="productImage">Product Image</label>
        <input type="file" name="productImage" id="productImage" />
        </p>
        <input type="submit" onClick={handleAddProduct} value="Add Product" />
      </form>
    </div>
  );
};

export default Inventory;
