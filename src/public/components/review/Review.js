import React, { Component } from 'react';
import NavButtons from '../common/NavButtons';

class Review extends Component {
  render() {
    return (
       <div>
         <NavButtons
           prevLink="/payment-method"
           nextLink="/success"
         />
       </div>
    );
  }
}

export { Review };
