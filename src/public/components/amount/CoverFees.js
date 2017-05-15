import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import './CoverFees.sass';

@inject('donation') @observer
export default class CoverFees extends Component {

  handleOnChange() {
    this.props.donation.toggleCoverFees();
  }

  isVisible() {
    return !!this.props.donation.amount
      ? ''
      : 'hidden';
  }

  render() {
    const { fees } = this.props.donation;
    return (
      <div className={`cover-fees ${this.isVisible()}`}>
        <div className="cover-fees-checkbox">
          <input type="checkbox" id="cover-fees" name="cover-fees" onChange={this.handleOnChange.bind(this)} />
        </div>
        <label htmlFor="cover-fees" className="cover-fees-text">
          <p>I'd like to cover the ${ fees } processing fee so 100% of my donation
            goes to Take the City.</p>
        </label>
      </div>
    )

  }
}

