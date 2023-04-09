import React from 'react';
import { useField } from 'formik';

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="settings-form__form-group">
      <label className="settings-form__label" htmlFor={props.id || props.name}>
        {label}
      </label>
      <input className="settings-form__input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="settings-form__error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default TextInput;
