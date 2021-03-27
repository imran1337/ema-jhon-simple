import React, { useContext, useRef, useState } from "react";
import { Button, Card, Container, Form, Alert } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import { auth } from "../../firebase";
import SocialMediaLogin from "../SocialMediaLogin/SocialMediaLogin";
import { userContext } from "./../../App";
const SignUp = () => {
  const [loggedInUser, setLoggedInUser] = useContext(userContext);

  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/login" } };
  const redirect = () => {
    auth.currentUser && history.replace(from);
  };

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswrodRef = useRef();

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const signUpWithEmailHandler = (e) => {
    e.preventDefault();

    setError(false);
    setSuccess(false);

    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;
    const confirmPasswrodValue = confirmPasswrodRef.current.value;

    if (passwordValue !== confirmPasswrodValue) {
      return setError({
        isError: true,
        errCode: "PasswordNotMatched",
        errMsg: "Password Not Matched",
      });
    }

    auth
      .createUserWithEmailAndPassword(emailValue, passwordValue)
      .then((userCredential) => {
        const user = userCredential.user;
        storeUserInfo();
        setSuccess(true);
        setLoggedInUser({
          isLoggedIn: false,
          userCredential: user,
        });
        console.log(user);
        redirect();
        // reset
        resetFormValue();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({ errorCode, errorMessage });
      });
  };

  const storeUserInfo = () => {
    auth.currentUser
      .updateProfile({
        displayName: nameRef.current.value,
      })
      .then(() => {
        console.log("name stored");
      })
      .catch((err) => {
        console.log("name not stored", err);
      });
  };

  const resetFormValue = () => {
    nameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
    confirmPasswrodRef.current.value = "";
  };

  return (
    <>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <div className="w-100" style={{ maxWidth: "450px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-3">SignUp</h2>
              <SocialMediaLogin redirect={redirect} setError={setError} />
              {error.isError && error.errCode === "PasswordNotMatched" && (
                <Alert variant="danger" className="text-center">
                  {error.errMsg}
                </Alert>
              )}
              {error.isError &&
                error.errCode === "auth/popup-closed-by-user" && (
                  <Alert variant="danger" className="text-center">{error.errMsg}</Alert>
                )}
              {success && (
                <Alert className="text-center" variant="success">
                  Account Created Successfully
                </Alert>
              )}
              <Form onSubmit={signUpWithEmailHandler}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Type your name"
                    ref={nameRef}
                    required
                  ></Form.Control>
                </Form.Group>

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

                <Form.Group>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Type your password again"
                    ref={confirmPasswrodRef}
                    required
                  ></Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="text-center mt-4">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SignUp;
