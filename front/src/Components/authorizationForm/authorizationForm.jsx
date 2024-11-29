import React, { useState } from "react";
import "./authorizationForm.css";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { API_URL } from '../../Api/constants.js'

export const AuthorizationForm = () => {
  const validationSchema = yup.object().shape({
    email: yup.string().required("Required").email("Invalid email addres"),
    password: yup.string().required("Required"),
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function goToRegister() {
    navigate("/register");
  }

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  async function signinHandler() {
    const request = {
      email: email,
      password: password,
    };

    const response = await fetch(API_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (response.ok) {
      const encrypted = btoa(request.email + ":" + request.password);
      localStorage.setItem("user", `Basic ${encrypted}`);
      navigate("/adminPanel");
    } else {
      const json = await response.json();
      console.log(json.message);
    }
  }

  return (
    <div className="container mt-5 ">
      <div className=" row justify-content-center align-items-center">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
        >
          <Form className="custom-form">
            <h2 className="row justify-content-center mb-4">Authorization</h2>
            <div className="col-auto">
              <Field
                name="email"
                type="email"
                className="form-control size"
                id="staticEmail2"
                placeholder="E-mail"
                value={email}
                onChange={handleEmail}
              />
              <ErrorMessage
                name="email"
                component="div"
                style={{ color: "red" }}
              />
              <label htmlFor="staticEmail2" className="visually-hidden">
                Email
              </label>
            </div>
            <div className="col-auto">
              <Field
                name="password"
                type="password"
                className="form-control size"
                id="inputPassword2"
                placeholder="Password"
                value={password}
                onChange={handlePassword}
              />
              <ErrorMessage
                name="password"
                component="div"
                style={{ color: "red" }}
              />
              <label htmlFor="inputPassword2" className="visually-hidden">
                Password
              </label>
            </div>
            <div className="col-auto">
              <button
                type="button"
                className="btn btn-primary mb-3 w-100"
                onClick={signinHandler}
              >
                Sign in
              </button>
            </div>
            <div>
              <span>
                Don't have an account?
                <a className="breadcrumb-item" onClick={goToRegister}>
                  Sign up
                </a>
              </span>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
