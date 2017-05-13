import React, { Component } from 'react';
import DonationButtons from './components/DonationButtons';
import AmountButtonGroup from './components/AmountButtonGroup';
import CoverFees from './components/CoverFees';
import Logo from './components/Logo';
import './Amount.sass';

class Amount extends Component {

  render() {
    return (
      <div key={this.props.key} className="amount">
        <Logo />
        <h4 className="text-center m-b-6">Thanks for giving!</h4>
        <p>We are honored the you want to partner with us to transform cities! Your gift will have a
          direct impact
          on the lives of those who need to hear the hope of Christ. If you want to learn more about
          what we do, <a href="https://takethecity.com">click here</a>.</p>
        <AmountButtonGroup />
          <input id="other-amount"
                 type="number"
                 placeholder="Other amount"
          />
        <CoverFees />
        <DonationButtons
          prevLink="/"
          nextLink="/personal-info"
        />
      </div>
    );
  }
}

export { Amount };