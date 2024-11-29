import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./registerForm.css";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { API_URL } from '../../Api/constants.js'

export const RegisterForm = () => {
  const validationSchema = yup.object().shape({
    name: yup.string().required("Required"),
    email: yup.string().required("Required").email("Invalid email addres"),
    password: yup.string().required("Required"),
    confirmPassword: yup.string().required("Please, confirm your password"),
  });

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleName(event) {
    setName(event.target.value);
  }

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  function handleConfirmPassword(event) {
    setConfirmPassword(event.target.value);
  }

  async function signUpHandler() {
    const request = {
      email: email,
      name: name,
      password: password,
    };

    const response = await fetch(API_URL + "/register", {
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
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
        >
          <Form className="custom-form">
            {/* <form className="custom-form"> */}
            <h2 className="row justify-content-center mb-4">Register Form</h2>
            <div className="col-auto">
              <Field
                name="name"
                type="text"
                className="form-control size"
                id="staticName"
                placeholder="Name"
                value={name}
                onChange={handleName}
              />
              <ErrorMessage
                name="name"
                component="div"
                style={{ color: "red" }}
              />
              <label htmlFor="staticName" className="visually-hidden">
                Name
              </label>

              {/* <input
                type="text"
                className="form-control size"
                id="staticName"
                placeholder="Name"
                value={name}
                onChange={handleName}
              /> */}
            </div>
            <div className="col-auto">
              <label htmlFor="inputEmail" className="visually-hidden">
                E-mail
              </label>
              <Field
                name="email"
                type="email"
                className="form-control size"
                id="inputEmail"
                placeholder="E-mail"
                value={email}
                onChange={handleEmail}
              />
              <ErrorMessage
                name="email"
                component="div"
                style={{ color: "red" }}
              />
              {/* <input
                type="email"
                className="form-control size"
                id="inputEmail"
                placeholder="E-mail"
                value={email}
                onChange={handleEmail}
              /> */}
            </div>
            <div className="col-auto">
              <label htmlFor="inputPassword" className="visually-hidden">
                Password
              </label>
              <Field
                name="password"
                type="password"
                className="form-control size"
                id="inputPassword"
                placeholder="Password"
                value={password}
                onChange={handlePassword}
              />
              <ErrorMessage
                name="password"
                component="div"
                style={{ color: "red" }}
              />
              {/* <input
                type="password"
                className="form-control size"
                id="inputPassword"
                placeholder="Password"
                value={password}
                onChange={handlePassword}
              /> */}
            </div>
            <div className="col-auto">
              <label htmlFor="inputConfirmPassword" className="visually-hidden">
                Confirm password
              </label>
              <Field
                name="confirmPassword"
                type="password"
                className="form-control size"
                id="inputConfirmPassword"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={handleConfirmPassword}
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                style={{ color: "red" }}
              />
              {/* <input
                type="password"
                className="form-control size"
                id="inputConfirmPassword"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={handleConfirmPassword}
              /> */}
            </div>
            <div className="col-auto">
              <button
                type="button"
                className="btn btn-primary mb-3 w-100"
                onClick={signUpHandler}
              >
                Register
              </button>
            </div>
          </Form>
          {/* </form> */}
        </Formik>
      </div>
    </div>
  );
};
