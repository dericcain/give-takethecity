import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import DonationTable from '../tables/DonationsTable';

@inject('donationStore') @observer
export default class Donations extends Component {

  componentWillMount() {
    this.props.donationStore.fetchDonations();
  }

  render() {
    const { isLoading, donations } = this.props.donationStore;

    return (
      <div className="transition-item">
        <h2 className="section-header">Donations</h2>
        <div className="section-wrapper">
          <DonationTable
            donations={donations}
            isLoading={isLoading}
          />
        </div>
      </div>
    );
  }
}
