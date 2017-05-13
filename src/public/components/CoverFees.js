import React from 'react';
import './CoverFees.sass';

const CoverFees = () => {
  return (
    <div className="cover-fees">
      <div className="cover-fees-checkbox">
        <input type="checkbox" id="cover-fees" />
      </div>
      <div className="cover-fees-text">
        <p>I'd like to cover the ( donation.fees / 100 ) processing fee so 100% of my donation
          goes to Take the City.</p>
      </div>
    </div>
  )
};

export default CoverFees;

