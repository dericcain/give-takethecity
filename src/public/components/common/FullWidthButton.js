import React from 'react';
import { Link } from 'react-router-dom';
import './FullWidthButton.sass';

const FullWidthButton = ({ url, className = '', children }) => {
  return (
    <Link
      to={{
        pathname: url,
        state: { direction: 'next' }
      }}
      className={`btn-full-width ${className}`}>
      {children}
    </Link>
  )
};

export default FullWidthButton;

