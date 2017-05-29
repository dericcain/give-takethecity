import React, { Component } from 'react';
import icon from '../../../assets/icons/ok.svg';
import './Success.sass';

class Success extends Component {
  render() {
    return (
        <div className="transition-item success-section">
          <img src={icon} alt="Donation Successful" />
          <h5 className="text-center">Your gift was received!</h5>
          <p className="text-center">We can't thank you enough for partnering with us to help in transforming cities. Please continue to pray
            for us as we work diligently to reach our goal of Taking the City.
            <a href="http://takethecity.com" className="btn btn-link">Visit our site!</a>
          </p>
        </div>
    );
  }
}

export { Success };
