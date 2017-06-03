import React from 'react';
import loader from '../../../assets/images/loader-dark.svg';
import './Loader.sass';

const Loader = () => {
  return (
    <div className="loader">
      <img src={loader} alt="Loading" />
    </div>
  )
};

export default Loader;

