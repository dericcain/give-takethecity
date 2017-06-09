import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-table/react-table.css'
import 'react-datepicker/dist/react-datepicker.min.css'
import './RecurringDonationsTable.sass';

@inject('donationStore') @observer
export default class RecurringDonationTable extends Component {

  handleOnChange(value, event) {
    this.props.donation.updateRecurringDonation(value, event);
  }

  handleOnRawChange(event) {
    console.log(event);
  }

  handleOnBlur(event) {
    console.log(event.target);
  }

  composeColumns() {
    return [{
      id: 'donorName',
      Header: 'Donor',
      accessor: recurringDonation => recurringDonation.donor.full_name,
    }, {
      Header: 'Created on',
      accessor: 'created_at',
      Cell: props => <span>{moment(props.value).format('MM/D/Y')}</span>
    }, {
      id: 'designation',
      Header: 'Designation',
      accessor: recurringDonation => recurringDonation.designation.name
    }, {
      Header: 'Covering fees',
      accessor: 'is_paying_fees',
      Cell: props => <span>{props.value ? 'Yes' : 'No'}</span>
    }, {
      Header: 'Amount',
      accessor: 'amount',
      Cell: props => <span>${props.value / 100}</span>
    }, {
      Header: 'Next Donation',
      accessor: 'next_donation_on',
      Cell: props => (
        <DatePicker
          className={`recurring-datepicker recurring-${props.original.id}`}
          selected={moment(props.value)}
          excludeDates={[moment(), moment().subtract(10, 'years')]}
          minDate={moment()}
          calendarClassName="next-donation-on"
          onChange={this.handleOnChange.bind(this)}
          onBlur={this.handleOnBlur.bind(this)}
          onRawChange={this.handleOnRawChange.bind(this)}
        />
      )
    }, {
      id: 'viewDonor',
      Header: 'View Donor',
      accessor: recurringDonation => recurringDonation.donor.id,
      Cell: props => <Link className="btn btn-sm btn-view-donor"
                           to={`/admin/donors/${props.value}`}>View Donor</Link>
    }];
  }

  render() {
    const { recurringDonations, isLoading } = this.props;

    return (
      <ReactTable
        data={recurringDonations}
        columns={this.composeColumns()}
        loading={isLoading}
        defaultPageSize={20}
        minRows={3}
      />
    );
  }
}
