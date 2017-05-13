import React from 'react';
import AmountButton from './AmountButton';
import './AmountButtonGroup.sass'

const AmountButtonGroup = () => {
  return (
    <div>
      <p>How much would you like to give?</p>
      <div className="amount-button-group">
        <AmountButton amount={25} />
        <AmountButton amount={50} />
        <AmountButton amount={100} />
        <AmountButton amount={250} />
      </div>
    </div>
  );
};

export default AmountButtonGroup;
