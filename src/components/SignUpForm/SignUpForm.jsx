import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FormGroup from '../FormGroup';
import './style.css';

const SignUpForm = ({ setFormData, onSubmit, formData }) => {
  const [isLoginValid, setIsLoginValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const isFormValid = isEmailValid && isPasswordValid && isLoginValid;

  const handleLoginChange = (e) => {
    const loginValue = e.target.value;
    const isValid = /^[a-zA-z0-9]+$/.test(loginValue);
    setIsLoginValid(isValid);
    setFormData({ ...formData, login: loginValue });
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
    setIsEmailValid(isValid);
    setFormData({ ...formData, email: emailValue });
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    const isValid = /^.{3,16}$/.test(passwordValue);
    setIsPasswordValid(isValid);
    setFormData({ ...formData, password: passwordValue });
  };

  return (
    <div className="form">
      <h2>Sign Up</h2>
      <form>
        <FormGroup
          label="Login"
          type="text"
          placeholder="enter your login"
          pattern="[a-zA-z0-9]+"
          errorMessage="login must consits only of alphabetic characters"
          name="login"
          id="login"
          onChange={handleLoginChange}
        />
        <FormGroup
          label="Email"
          type="email"
          placeholder="Your email"
          // prettier-ignore
          // eslint-disable-next-line
          pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
          errorMessage="must be correct email"
          name="email"
          id="email"
          onChange={handleEmailChange}
        />
        <FormGroup
          label="Password"
          type="password"
          placeholder="enter your password"
          pattern="^.{3,16}$"
          errorMessage="password must exist"
          name="password"
          id="password"
          onChange={handlePasswordChange}
        />

        <button
          onClick={() => {
            // взять данные из формы и отправить на сервер
            onSubmit(formData);
          }}
          className={!isFormValid ? 'disabled' : ''}
          disabled={!isFormValid}
          type="button"
        >
          Sign Up
        </button>
      </form>
      <p>
        if you have account, you can <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default SignUpForm;
