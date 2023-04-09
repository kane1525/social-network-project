import React from 'react';
import { Link } from 'react-router-dom';
import FormGroup from '../FormGroup';
import './style.css';

const LoginForm = ({ formData, setFormData, handleSubmit }) => {
  const handlePasswordChange = (e) => {
    setFormData({ ...formData, password: e.target.value });
  };

  const handleLoginChange = (e) => {
    setFormData({ ...formData, login: e.target.value });
  };

  const fieldsNotEmpty =
    formData.login.length > 0 && formData.password.length > 0;

  return (
    <div className="form">
      <h2>Sign In</h2>
      <form>
        <FormGroup
          label="Login"
          type="text"
          placeholder="enter your login"
          name="login"
          id="login"
          onChange={handleLoginChange}
        />
        <FormGroup
          label="Password"
          type="password"
          placeholder="enter your password"
          name="password"
          id="password"
          onChange={handlePasswordChange}
        />

        <button
          className={!fieldsNotEmpty ? 'disabled' : ''}
          onClick={() => {
            if (fieldsNotEmpty) {
              // взять данные из формы и отправить на сервер
              handleSubmit();
            }
          }}
          type="button"
        >
          Sign In
        </button>
      </form>
      <p>
        if you don't have an account, you can{' '}
        <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginForm;
