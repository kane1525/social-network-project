import React, { useState, useRef } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import TextInput from '../../TextInput';
import { updatePassword } from '../../../api';
import './style.css';

const ChangePasswordForm = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  const initialValues = {
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, 'min length is 8 characters')
      .max(20, 'max length is 20 characters')
      .required('This field is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Passwords must match')
      .required('This field is required'),
  });

  const onSubmit = (values, formikBag) => {
    updatePassword(values)
      .then(() => {
        formikBag.resetForm();
        setMessage('Password changed successfully');
        setTimeout(setMessage, 1500, '');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form className="password-form">
            <TextInput label="Password" name="password" type="text" />
            <TextInput
              label="Confirm password"
              name="confirmPassword"
              type="text"
              onKeyDown={() => {
                formik.setFieldTouched('confirmPassword');
              }}
            />
            <p className="password-form-message">{message}</p>
            <button
              disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
              type="submit"
              className="settings-form__submit-btn settings-form__avatar-upload-button"
            >
              Save password
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ChangePasswordForm;
