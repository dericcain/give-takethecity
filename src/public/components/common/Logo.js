import React from 'react';
import logo from '../../../assets/images/logo.png';

const styles = {
  margin: '12px auto',
  display: 'block'
};

const Logo = () => {
  return (
    <div className="logo">
      <img src={logo} alt="Take the City" className="logo" style={styles} />
    </div>
  );
};


export default Logo;