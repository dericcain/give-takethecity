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
      <div className="transition-item">
        <h2 className="section-header">Recurring Donations</h2>
        <div className="section-wrapper">
          <RecurringDonationsTable
            recurringDonations={recurringDonations}
            isLoading={isLoading}
          />
        </div>
      </div>
    );
  }
}
