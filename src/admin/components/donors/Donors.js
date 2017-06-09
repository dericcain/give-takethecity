import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import DonorsTable from '../tables/DonorsTable';

@inject('donorStore') @observer
export default class Donors extends Component {

  componentWillMount() {
    this.props.donorStore.fetchDonors();
  }

  render() {
    const { donors, isLoading } = this.props.donorStore;

    return (
      <div className="section-wrapper">
        <h2>Donations</h2>
      <DonorsTable
        donors={donors}
        isLoading={isLoading}
        />
      </div>
    )
  }
}