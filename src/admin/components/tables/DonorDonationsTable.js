import React, { Component } from 'react';
import ReactTable from 'react-table';
import moment from 'moment';
import './DonationsTable.sass';
import 'react-table/react-table.css'

export default class DonorDonationsTable extends Component {

  composeColumns() {
    return [{
      Header: 'Date',
      accessor: 'created_at',
      Cell: props => <span>{moment(props.value).format('M-d-Y M:hha')}</span>
    }, {
      id: 'designation',
      Header: 'Designation',
      accessor: donation => donation.designation.name
    }, {
      Header: 'Covering fees',
      accessor: 'is_paying_fees',
      Cell: props => <span>{props.value ? 'Yes' : 'No'}</span>
    }, {
      Header: 'Recurring',
      accessor: 'is_recurring',
      Cell: props => <span>{props.value ? 'Yes' : 'No'}</span>
    }, {
      Header: 'Amount',
      accessor: 'amount',
      Cell: props => <span>${props.value / 100}</span>
    }];


  }

  render() {
    const { donations, isLoading } = this.props;

    return (
      <ReactTable
        data={donations}
        columns={this.composeColumns()}
        loading={isLoading}
        defaultPageSize={50}
      />
    );
  }
}

