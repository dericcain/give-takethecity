import React from 'react';
import { Link } from 'react-router-dom';
import './FullWidthButton.sass';

const FullWidthButton = ({ url, isValid, children }) => {
  return (
    <Link
      to={{
        pathname: url,
        state: { direction: 'next' }
      }}
      onClick={event => {
        if (isValid) {
          event.preventDefault();
        }
      } }
      className={`btn-full-width ${isValid}`}>
      {children}
    </Link>
  )
};

export default FullWidthButton;

