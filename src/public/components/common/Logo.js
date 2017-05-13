import React from 'react';
import logo from '../../../assets/images/logo.png';

const Logo = () => {
  return (
    <div className="logo">
      <img src={logo} alt="Take the City" className="logo" style={styles} />
    </div>
  );
};

const styles = {
  margin: '12px auto',
  display: 'block'
};

export default Logo;