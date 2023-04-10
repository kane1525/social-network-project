import React from 'react';
import { useField } from 'formik';
import './style.css';

const FormGroup = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="text-input__form-group">
      <label className="text-input__label" htmlFor={props.id || props.name}>
        {label}
      </label>
      <input className="text-input__input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="text-input__error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default FormGroup;
