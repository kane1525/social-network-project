import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpForm from '../components/SignUpForm';
import StartPageWrapper from '../components/StartPageWrapper/StartPageWrapper';
import { register } from '../api/api';

const Register = () => {
  const [formData, setFormData] = useState({
    login: '',
    email: '',
    password: '',
  });
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();

  const handleSubmitForm = async (userData) => {
    try {
      await register(userData);
      navigate('/login');
      setFormData({
        login: '',
        email: '',
        password: '',
      });
    } catch (error) {
      setApiError(error.message);
    }
  };

  return (
    <StartPageWrapper>
      <SignUpForm
        onSubmit={() => {
          handleSubmitForm(formData);
        }}
        setFormData={setFormData}
        formData={formData}
      />
      {apiError && <p style={{ color: 'red' }}>{apiError}</p>}
    </StartPageWrapper>
  );
};

export default Register;
