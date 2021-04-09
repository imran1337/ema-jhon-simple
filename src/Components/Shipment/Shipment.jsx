import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { auth } from "./../../firebase";
import {
  getDatabaseCart,
  processOrder,
} from "./../../Resources/utilities/databaseManager";
import { useHistory } from "react-router-dom";
import ProcessPayment from "../ProcessPayment/ProcessPayment";
import { shippingDataContext } from "../../App";
const Shipment = () => {
  const history = useHistory();
  const { displayName, email } = auth.currentUser;
  const { register, handleSubmit, errors, reset } = useForm({
    mode: "onChange",
  });

  const [shippingData, setShippingData] = useContext(shippingDataContext);

  const onSubmitHandler = (data) => {
    setShippingData(data);
  };

  const handlePaymentSuccess = (paymentId) => {
    console.log({ paymentId });
    const saveCart = getDatabaseCart();
    const shipmentDetails = {
      displayName,
      email,
      saveCart,
      shipment: shippingData,
      paymentId,
      orderSubmitTime: new Date(),
    };
    fetch("https://fierce-shelf-90636.herokuapp.com/submitOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(shipmentDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        processOrder();
        console.log(data);
        reset();
        history.replace("/");
      });
  };

  return (
    <Row>
      {!shippingData ? (
        <Col sm={12}>
          <Container style={{ maxWidth: "700px" }}>
            <Card>
              <Card.Body>
                <Form onSubmit={handleSubmit(onSubmitHandler)}>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      name="name"
                      type="text"
                      ref={register({ required: true, minLength: 3 })}
                      defaultValue={displayName}
                    />
                    {errors.name && errors.name.type === "required" && (
                      <p className="text-danger">This field is required</p>
                    )}
                    {errors.name && errors.name.type === "minLength" && (
                      <p className="text-danger">
                        Name field required minimum 3 word
                      </p>
                    )}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      name="email"
                      type="text"
                      ref={register({
                        required: true,
                        pattern: /\S+@\S+\.\S+/,
                      })}
                      defaultValue={email}
                    />
                    {errors.email && errors.email.type === "required" && (
                      <p className="text-danger">This field is required</p>
                    )}
                    {errors.email && errors.email.type === "pattern" && (
                      <p className="text-danger">Email not valid</p>
                    )}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      name="address"
                      type="text"
                      ref={register({ required: true, minLength: 5 })}
                    />
                    {errors.address && errors.address.type === "required" && (
                      <p className="text-danger">This field is required</p>
                    )}
                    {errors.address && errors.address.type === "minLength" && (
                      <p className="text-danger">
                        Address field required minimum 5 word
                      </p>
                    )}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control
                      name="zipCode"
                      type="text"
                      ref={register({
                        required: true,
                        minLength: 2,
                        pattern: /^([0-9]*)$/,
                      })}
                    />
                    {errors.zipCode && errors.zipCode.type === "required" && (
                      <p className="text-danger">This field is required</p>
                    )}
                    {errors.zipCode && errors.zipCode.type === "minLength" && (
                      <p className="text-danger">
                        Zip Code field is required minimum 2 digit number
                      </p>
                    )}
                    {errors.zipCode && errors.zipCode.type === "pattern" && (
                      <p className="text-danger">Zip Code is not valid</p>
                    )}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      name="phoneNumber"
                      type="text"
                      ref={register({
                        required: true,
                        minLength: 8,
                        pattern: /^([0-9]*)$/,
                      })}
                    />
                    {errors.phoneNumber &&
                      errors.phoneNumber.type === "required" && (
                        <p className="text-danger">This field is required</p>
                      )}
                    {errors.phoneNumber &&
                      errors.phoneNumber.type === "minLength" && (
                        <p className="text-danger">
                          Phone Number field is required minimum 8 digit number
                        </p>
                      )}
                    {errors.phoneNumber &&
                      errors.phoneNumber.type === "pattern" && (
                        <p className="text-danger">Phone Number is not valid</p>
                      )}
                  </Form.Group>
                  <Button type="submit" className="w-100">
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Container>
        </Col>
      ) : (
        <Col sm={12} className="justify-content-center">
          <Container style={{ maxWidth: "960px" }}>
            <h3 className="text-center">Pay now</h3>
            <div className="mt-4">
              <ProcessPayment handlePaymentSuccess={handlePaymentSuccess} />
            </div>
          </Container>
        </Col>
      )}
    </Row>
  );
};

export default Shipment;
