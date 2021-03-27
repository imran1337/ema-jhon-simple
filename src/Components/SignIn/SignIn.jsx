import React, { useContext, useRef, useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import { auth } from "./../../firebase";
import { userContext } from "./../../App";
import SocialMediaLogin from "../SocialMediaLogin/SocialMediaLogin";

const SignIn = () => {
  //context api theke newa
  const [loggedInUser, setLoggedInUser] = useContext(userContext);

  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: "/" } };
  const redirect = () => {
    auth.currentUser && history.replace(from);
  };

  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState({
    isError: false,
    errCode: "",
    errMsg: "",
  });

  // sign in with email
  function SignInWithEmailHandler(e) {
    e.preventDefault();

    setError({
      isError: false,
      errCode: "",
      errMsg: "",
    });

    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((userCredential) => {
        const userData = userCredential.user;
        setLoggedInUser({
          isLoggedIn: true,
          userCredential: userData,
        });
        redirect();
        console.log(loggedInUser);
      })
      .catch((err) => {
        const errCode = err.code;
        const errMsg = err.message;
        setError({
          isError: true,
          errCode,
          errMsg,
        });
        console.log(errCode === "auth/user-not-found");
        console.log(errCode);
      });
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "50vh" }}
    >
      <div className="w-100" style={{ maxWidth: "450px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center">Sign In</h2>
            <SocialMediaLogin redirect={redirect} setError={setError} />
            {/* error shown here */}
            <div className="text-center">
              {error.isError && error.errCode === "auth/user-not-found" && (
                <Alert variant="danger">User Not Found</Alert>
              )}
              {error.isError && error.errCode === "auth/wrong-password" && (
                <Alert variant="danger">The password is invalid</Alert>
              )}
              {error.isError && error.errCode === "auth/popup-closed-by-user" && (
                <Alert variant="danger">{error.errMsg}</Alert>
              )}
              {loggedInUser.isLoggedIn && (
                <Alert variant="success">Login Successful</Alert>
              )}
            </div>
            <Form onSubmit={SignInWithEmailHandler}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Type your email"
                  ref={emailRef}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Type your password"
                  ref={passwordRef}
                  required
                ></Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Sign In
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="text-center mt-4">
          Already not have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </Container>
  );
};

export default SignIn;
