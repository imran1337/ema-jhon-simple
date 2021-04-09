import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./Components/Header/Header";
import { Shop } from "./Components/Shop/Shop";
import Review from "./Components/Review/Review";
import Inventory from "./Components/Inventory/Inventory";
import NotFound from "./Components/NotFound/NotFound";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Shipment from "./Components/Shipment/Shipment";
import Login from "./Components/Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./Components/SignUp/SignUp";
import { auth } from "./firebase";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import PrivateRoute2 from "./Components/PrivateRoute2/PrivateRoute2";

export const userContext = React.createContext();
export const shippingDataContext = React.createContext();

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    isLoggedIn: false,
    userCredential: "",
  });

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedInUser({
          isLoggedIn: false,
          userCredential: user,
        });
      } else {
        console.log("auth user not found");
      }
    });
  }, [setLoggedInUser]);

  const [shippingData, setShippingData] = useState(null);

  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
    <shippingDataContext.Provider value={[shippingData, setShippingData]}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Shop} />

          <Route path="/shop" component={Shop} />

          <Route path="/review" component={Review} />

          <PrivateRoute path="/manage">
            <Inventory />
          </PrivateRoute>

          <Route path="/product/:key" component={() => <ProductDetails />} />

          <Route path="/place-order" render={() => <h1>hEllo</h1>} />

          <PrivateRoute path="/shipment">
            <Shipment />
          </PrivateRoute>

          <PrivateRoute2 path="/login">
            <Login />
          </PrivateRoute2>

          <PrivateRoute2 path="/signup">
            <SignUp />
          </PrivateRoute2>

          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </shippingDataContext.Provider>
    </userContext.Provider>
  );
}
