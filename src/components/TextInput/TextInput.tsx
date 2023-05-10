import { Field, FieldAttributes, useField } from "formik";
import React from "react";

import "./style.css";

type FormGroupProps = FieldAttributes<{ label?: string }>;

const TextInput = ({ label, ...props }: FormGroupProps) => {
  const [field, meta] = useField(props);

  return (
    <div className="text-input__form-group">
      <label className="text-input__label" htmlFor={props.id || props.name}>
        {label}
      </label>
      <Field className="text-input__input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="text-input__error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default TextInput;
