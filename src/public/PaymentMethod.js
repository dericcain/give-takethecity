import React, { Component } from 'react';
import NavButtons from './components/common/NavButtons';

class PaymentMethod extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    return (
        <div>
          <NavButtons
            prevLink="/personal-info"
            nextLink="/review"
          />
        </div>
    );
  }
}

export { PaymentMethod };
