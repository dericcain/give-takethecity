import React, { Component } from 'react';
import DonationButtons from './components/DonationButtons';

class PersonalInfo extends Component {

  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
        <div key={this.props.key}>
          <DonationButtons
            prevLink="/amount"
            nextLink="/payment-method"
          />
        </div>
    );
  }
}

export { PersonalInfo };
