import React, { Component } from 'react';
import DonationButtons from './components/DonationButtons';

class Amount extends Component {
  render() {
    return (
        <div>
          <DonationButtons
            prevLink="/"
            nextLink="/personal-info"
          />
        </div>
    );
  }
}

export { Amount };