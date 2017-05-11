import React, { Component } from 'react';
import DonationButtons from './components/DonationButtons';

class PersonalInfo extends Component {
  render() {
    return (
        <div>
          <DonationButtons
            prevLink="/amount"
            nextLink="/payment-method"
          />
        </div>
    );
  }
}

export { PersonalInfo };
