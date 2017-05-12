import React, { Component } from 'react';
import DonationButtons from './components/DonationButtons';

class PaymentMethod extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    return (
        <div>
          <DonationButtons
            prevLink="/personal-info"
            nextLink="/review"
          />
        </div>
    );
  }
}

export { PaymentMethod };
