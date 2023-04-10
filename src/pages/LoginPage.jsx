import React, { useState, useEffect, useRef } from 'react';
import StartPageWrapper from '../components/StartPageWrapper/StartPageWrapper';
import LoginForm from '../components/Forms/LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk, fetchUserThunk } from '../store/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const LoginPage = () => {
  // const [formData, setFormData] = useState({ login: '', password: '' });
  // const dispatch = useDispatch();
  // const error = useSelector((state) => state.auth.error);
  // const navigate = useNavigate();
  // const location = useLocation();

  // let from = location.state?.from?.pathname || '/';

  // const handleFormSubmit = () => {
  //   dispatch(loginThunk(formData))
  //     .then(() => dispatch(fetchUserThunk()))
  //     .then((res) => {
  //       if (res.type === 'auth/fetchUser/fulfilled') {
  //         navigate(from, { replace: true });
  //       }
  //     });
  // };

  return (
    <StartPageWrapper>
      <LoginForm />
    </StartPageWrapper>
  );
};

export default LoginPage;
