import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextInput from '../../TextInput';
import './style.css';

const LoginForm = ({ formData, setFormData, handleSubmit }) => {
  const initialValues = {
    login: '',
    password: '',
  };

  const validationSchema = Yup.object({
    login: Yup.string().required('Login is required'),
    password: Yup.string().required('Password is required'),
  });

  const onSubmit = (values, onSubmitProps) => {
    console.log(values);
  };

  return (
    <div className="login-form-wrapper">
      <h2 className="login-form-title">Sign In</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        <Form className="login-form">
          <TextInput
            label="Login"
            type="text"
            placeholder="enter your login"
            name="login"
            id="login"
          />
          <TextInput
            label="Password"
            type="password"
            placeholder="enter your password"
            name="password"
            id="password"
          />

          <button type="submit" className="login-form__button">
            Sign In
          </button>
        </Form>
      </Formik>
      <p>
        if you don't have an account, you can{' '}
        <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginForm;
