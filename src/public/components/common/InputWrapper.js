import React from 'react';

const InputWrapper = (props) => {

  const {
    name,
    onChange,
    onBlur,
    placeHolder,
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
             placeholder={placeHolder} />
      <span className={`hidden error error-${name}`}>
        {errorMessage}
      </span>
    </div>
  );
};

export default InputWrapper;
