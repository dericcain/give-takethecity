import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import DonationTable from '../tables/DonationsTable';
import './Donations.sass';

@inject('donationStore') @observer
export default class Donations extends Component {

  componentWillMount() {
    this.props.donationStore.fetchDonations();
  }

  render() {
    const { isLoading, donations } = this.props.donationStore;

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
