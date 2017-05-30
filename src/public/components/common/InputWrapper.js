import React from 'react';
import './InputWrapper.sass';

const InputWrapper = (props) => {

  const {
    name,
    onChange,
    onBlur,
    placeHolder,
    value,
    type,
    errorMessage,
    size
  } = props;

  return (
    <div className={`input-wrapper ${size}`}>
      <input id={name}
             onChange={onChange}
             onBlur={onBlur}
             type={type}
             value={value}
             placeholder={placeHolder} />
      <span className={`hidden error error-${name}`}>
        {errorMessage}
      </span>
    </div>
  );
};

export default InputWrapper;
