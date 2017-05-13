import React, { Component } from 'react';
import NavButtons from './components/common/NavButtons';

class PersonalInfo extends Component {

  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
        <div key={this.props.key}>
          <NavButtons
            prevLink="/amount"
            nextLink="/payment-method"
          />
        </div>
    );
  }
}

export { PersonalInfo };
