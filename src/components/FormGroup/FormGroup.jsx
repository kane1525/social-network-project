import { useState } from 'react';
import './style.css';

const FormGroup = (props) => {
  const { label, errorMessage, onChange, id, ...inputProps } = props;
  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  };
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === 'confirmPassword' && setFocused(true)
        }
        focused={focused.toString()}
      />
      <div className="error">{errorMessage}</div>
    </div>
  );
};

export default FormGroup;
