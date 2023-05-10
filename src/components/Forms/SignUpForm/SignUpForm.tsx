import { Form, Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { register } from "../../../api";
import TextInput from "../../TextInput";

import "./style.css";

interface FormValues {
  login: string;
  password: string;
  email: string;
}

const SignUpForm = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const initialValues = {
    login: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    login: Yup.string()
      .required("Login is required")
      .matches(/^[A-z0-9]+$/, {
        message: "Just latin letters and numbers",
      })
      .min(4, "min length is 8 characters")
      .max(20, "max length is 20 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("email must be valid"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "min length is 8 characters")
      .max(20, "max length is 20 characters"),
  });

  const onSubmit = (
    values: FormValues,
    onSubmitProps: FormikHelpers<FormValues>
  ) => {
    setIsLoading(true);
    register(values)
      .then((res) => {
        onSubmitProps.resetForm();
        setError("");
        setMessage("New user created successfully");
        setTimeout(() => {
          setMessage("");
        }, 2000);
        navigate("/login");
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        onSubmitProps.setSubmitting(false);
        setIsLoading(false);
      });
  };

  return (
    <div className="login-form-wrapper">
      <h2 className="login-form-title">Sign Up</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          const disabled =
            !formik.isValid || !formik.dirty || formik.isSubmitting;
          return (
            <Form className="login-form">
              <TextInput
                label="Login"
                type="text"
                placeholder="enter your login"
                name="login"
                id="login"
              />
              <TextInput
                label="Email"
                type="email"
                placeholder="enter your email"
                name="email"
                id="email"
              />
              <TextInput
                label="Password"
                type="password"
                placeholder="enter your password"
                name="password"
                id="password"
              />

              <button
                type="submit"
                className={`login-form__button ${disabled ? "disabled" : ""}`}
                disabled={formik.isSubmitting}
              >
                Sign In
              </button>
            </Form>
          );
        }}
      </Formik>
      <p>
        if you have an account, you can <Link to="/login">Login</Link>
      </p>
      {isLoading && <p className="login-form-status">Loading...</p>}
      {error && <p className="login-form-error">{error}</p>}
      {message && <p className="login-form-message">{message}</p>}
    </div>
  );
};

export default SignUpForm;
