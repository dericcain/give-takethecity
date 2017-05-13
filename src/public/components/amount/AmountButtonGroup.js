import React, { Component } from 'react';
import AmountButton from './AmountButton';
import './AmountButtonGroup.sass'

class AmountButtonGroup extends Component {

  constructor(props) {
    super(props);
  }

  render() {
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

    )
  }
}

export default AmountButtonGroup;
