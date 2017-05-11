import React, { Component } from 'react';
import DonationButtons from './components/DonationButtons';

class Review extends Component {
  render() {
    return (
       <div>
         <DonationButtons
           prevLink="/payment-method"
           nextLink="/success"
         />
       </div>
    );
  }
}

export { Review };
