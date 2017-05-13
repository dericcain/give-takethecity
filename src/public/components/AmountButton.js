import React from 'react';
import './AmountButton.sass';

const AmountButton = ({ amount }) => {
  return (
    <button type="button" className="amount-button">${amount}</button>
  )
};

export default AmountButton;
