import React, { Component } from 'react';
import './AmountButton.sass';
import { inject, observer } from 'mobx-react';

@inject('donation') @observer
class AmountButton extends Component {

  constructor(props) {
    super(props);
    this.amount = this.props.amount;
  }

  handleButtonClick(amount) {
    this.props.donation.setAmount(amount);
  }

  get isActive() {
    return this.props.donation.amount === this.amount
      ? 'active'
      : '';
  }

  render() {
    const boundAmount = this.handleButtonClick.bind(this, this.amount);
    return (
      <button
        type="button"
        key={this.amount}
        onClick={boundAmount}
        className={`amount-button ${this.isActive}`}>
          ${this.amount}
      </button>
    )
  }
}

export default AmountButton;
