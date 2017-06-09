import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import RecurringDonationsTable from '../tables/RecurringDonationsTable';

@inject('donationStore') @observer
export default class RecurringDonations extends Component {

  componentWillMount() {
    this.props.donationStore.fetchRecurringDonations();
  }

  render() {
    const { isLoading, recurringDonations } = this.props.donationStore;

    return (
      <div className="section-wrapper">
        <h2>Recurring Donations</h2>
        <RecurringDonationsTable
          recurringDonations={recurringDonations}
          isLoading={isLoading}
        />
      </div>
    );
  }
}
