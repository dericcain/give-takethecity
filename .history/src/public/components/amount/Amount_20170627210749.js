import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import AmountButtonGroup from './AmountButtonGroup';
import CoverFees from './CoverFees';
import RecurringButton from './RecurringButton';
import Logo from '../common/Logo';
import './Amount.sass';

@inject('donation') @observer
class Amount extends Component {

  handleInputChange(event) {
    this.props.donation.setAmount(parseFloat(event.target.value));
  }

  render() {
    return (
      <div className="amount transition-item">
        <Logo />
        <h4 className="text-center m-b-6">Thanks for giving!</h4>
        <p className="p-intro">We are honored that you want to partner with us to transform cities! Your gift will have a
          direct impact
          on the lives of those who need to hear the hope of Christ. If you want to learn more about
          what we do, <a href="https://takethecity.com">click here</a>.</p>
        <AmountButtonGroup />
          <input id="other-amount"
                 onChange={this.handleInputChange.bind(this)}
                 type="number"
                 value={this.props.donation.amount}
                 placeholder="Other amount"
          />
        <CoverFees />
        <RecurringButton />
      </div>
    );
  }
}

export { Amount };
