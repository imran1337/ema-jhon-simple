import React from "react";
import { Redirect, Route } from "react-router";
import { auth } from "./../../firebase";
const PrivateRoute2 = ({ children, ...others }) => {
  return (
    <Route
      {...others}
      render={() => (auth.currentUser ? <Redirect to="/" /> : children)}
    />
  );
};

export default PrivateRoute2;