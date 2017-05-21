import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import icon from '../../../assets/icons/checkmark.svg';
import './Review.sass';

@inject('navigation') @inject('donation') @observer
class Review extends Component {

  getReviewSection() {
    const { isRecurring, total } = this.props.donation;
    if (isRecurring) {
      return (
        <div>
          <p>You're gift will be a monthly recurring gift in the amount of <span
            className="text-bold">${total}</span>.
          </p>
        </div>
        );
    }

    return (
      <p>You're gift is a one-time gift in the amount of <span className="text-bold">${total}</span>.</p>
    );
  }

  render() {
    const { donation } = this.props;
    return (
      <div className="transition-item review-section">
        <img src={icon} alt="Review Section" />
        <h4 className="text-center">Time to review!</h4>
        <p>Please review all of the information below and make sure it is correct before you hit the "Give now!" button.</p>
        {this.getReviewSection()}
        <p>Your name is <span className="text-bold">{donation.fullName}</span> and your live at <span className="text-bold">{donation.personalInfo.address}</span>.
          As a side note, we will use that address to mail your donation receipts.</p>
        <p>If everything above looks good, click the give button below and let's partner together to transform a
          city!</p>
        <button className="button btn-block button-submit m-t-24" id="submit-donation">Give now!</button>
      </div>
    );
  }

}

export { Review };
