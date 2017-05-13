import React, { Component } from 'react';
import NavButtons from './components/common/NavButtons';

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
