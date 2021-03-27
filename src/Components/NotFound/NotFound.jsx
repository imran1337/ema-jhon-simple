import React from "react";
import "./NotFound.css";
const NotFound = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "60vh" }}
    >
      <h1 className="text-danger text-center">
        Hello Dear, Your requested page not found!
      </h1>
    </div>
  );
};

export default NotFound;
