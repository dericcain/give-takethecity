import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import './RecurringButton.sass';

@inject('donation') @observer
class RecurringButton extends Component {

  handleClick() {
    this.props.donation.toggleRecurring();
  }

  isRecurring() {
    return this.props.donation.isRecurring;
  }

  render() {
    return (
      <button
        className={`btn-recurring ${this.isRecurring() ? 'active' : ''}`}
        onClick={this.handleClick.bind(this)}>
        {this.isRecurring()
          ? `You're gift is recurring.`
          : 'Make my gift recurring!'
        }
      </button>
    );
  }
}

export default RecurringButton;
