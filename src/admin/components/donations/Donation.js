import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import DonationTable from '../tables/DonationTable';
import './Donation.sass';

@inject('donation') @observer
class Donation extends Component {

  componentWillMount() {
    this.props.donation.fetchDonations();
  }

  render() {
    const { isLoading, donations } = this.props.donation;

    return (
      <div className="section-wrapper">
        <h2>Donations</h2>
        <DonationTable
          donations={donations}
          isLoading={isLoading}
        />
      </div>
    );
  }
}

export default Donation;
