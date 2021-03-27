import React, { useContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { userContext } from "./../../App";
import {
  faFacebook,
  faGoogle,
  faYahoo,
} from "@fortawesome/free-brands-svg-icons";

const SocialMediaLogin = ({ redirect, setError }) => {
  const [loggedInUser, setLoggedInUser] = useContext(userContext);

  const socialMediaLoginHandler = (e, providerName) => {
    e.preventDefault();

    firebase
      .auth()
      .signInWithPopup(providerName)
      .then((result) => {
        const userData = result.user;
        setLoggedInUser({
          isLoggedIn: true,
          userCredential: userData,
        });
        redirect();
      })
      .catch((error) => {
        var errCode = error.code;
        var errMsg = error.message;
        setError({
          isError: true,
          errCode,
          errMsg,
        });
        console.log(error);
      });
  };

  const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
  const FacebookAuthProvider = new firebase.auth.FacebookAuthProvider();
  const YahooAuthProvider = new firebase.auth.OAuthProvider("yahoo.com");

  return (
    <div className="d-flex justify-content-end">
      <FontAwesomeIcon
        onClick={(e) => socialMediaLoginHandler(e, GoogleAuthProvider)}
        className="m-2 cursor-pointer"
        icon={faGoogle}
        size="2x"
      />
      <FontAwesomeIcon
        onClick={(e) => socialMediaLoginHandler(e, FacebookAuthProvider)}
        className="m-2 cursor-pointer"
        icon={faFacebook}
        size="2x"
      />
      <FontAwesomeIcon
        onClick={(e) => socialMediaLoginHandler(e, YahooAuthProvider)}
        className="m-2 cursor-pointer"
        icon={faYahoo}
        size="2x"
      />
    </div>
  );
};

export default SocialMediaLogin;
