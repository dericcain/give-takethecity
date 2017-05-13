import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import NavButtons from './components/common/NavButtons';
import AmountButtonGroup from './components/amount/AmountButtonGroup';
import CoverFees from './components/amount/CoverFees';
import Logo from './components/common/Logo';
import './Amount.sass';

@inject('donation') @observer
class Amount extends Component {

  constructor(props) {
    super(props);
  }

  handleInputChange(event) {
    this.props.donation.setAmount(parseFloat(event.target.value));
  }

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
                 onChange={this.handleInputChange.bind(this)}
                 type="number"
                 placeholder="Other amount"
          />
        <CoverFees />
        <NavButtons
          prevLink="/"
          nextLink="/personal-info"
        />
      </div>
    );
  }
}

export { Amount };