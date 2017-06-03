import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import './RecurringDonationsTable.sass';
import 'react-table/react-table.css'
import 'react-datepicker/dist/react-datepicker.min.css'

export default class RecurringDonationTable extends Component {

  handleOnChange(value, event) {
    console.log(value);
    console.log(event);
  }

  composeColumns() {
    return [{
      id: 'donorName',
      Header: 'Donor',
      accessor: recurringDonation => recurringDonation.donor.full_name,
    }, {
      Header: 'Date',
      accessor: 'created_at',
      Cell: props => <span>{moment(props.value).format('M-d-Y')}</span>
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
          selected={moment(props.value)}
          excludeDates={[moment(), moment().subtract(1, "days")]}
          calendarClassName="next-donation-on"
          onChange={this.handleOnChange.bind(this)}
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
        defaultPageSize={50}
      />
    );
  }
}
