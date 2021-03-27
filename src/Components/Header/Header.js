import React, { useContext } from "react";
import "./Header.css";
import Logo from "../../Resources/images/logo.png";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { auth } from "./../../firebase";
import { userContext } from "./../../App";
export const Header = () => {
  return (
    <header>
      <section id="logo">
        <Link to="/shop">
          <img src={Logo} alt="logo" />
        </Link>
      </section>
      <NavLink />
    </header>
  );
};

function NavLink() {
  const [loggedInUser, setLoggedInUser] = useContext(userContext);

  function signOutHandler() {
    auth
      .signOut()
      .then(() => {
        alert("sign out successful");
        setLoggedInUser({
          isLoggedIn: false,
          userCredential: "",
        });
      })
      .catch((err) => {
        alert("sign out not success see console tab");
        console.log(err);
      });
  }
  return (
    <nav id="navBar" className="bg-gold mt-2">
      <ul className="d-flex justify-content-center align-items-center flex-wrap fs-4">
        <li>
          <Link to="/shop">Shop</Link>
        </li>
        <li>
          <Link to="/review">Order Review</Link>
        </li>
        <li>
          <Link to="/manage">Manage Inventory</Link>
        </li>
        {auth.currentUser && (
          <>
            <li className="mr-2">
              {loggedInUser?.userCredential?.displayName}
            </li>
            <li>
              <Button onClick={signOutHandler}>Sign Out</Button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
