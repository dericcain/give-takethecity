import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css'

export default class DonorsTable extends Component {

  composeColumns() {
    return [{
      Header: 'Name',
      accessor: 'full_name',
    }, {
      Header: 'Address',
      accessor: 'address'
    }, {
      Header: 'Phone',
      accessor: 'phone',
    }, {
      Header: 'Email',
      accessor: 'email',
    }, {
      id: 'viewDonor',
      Header: 'View Donor',
      accessor: donor => donor.id,
      Cell: props => <Link className="btn btn-sm btn-view-donor" to={`/admin/donors/${props.value}`}>View Donor</Link>
    }];
  }

  render() {
    const { donors, isLoading } = this.props;

    return (
        <ReactTable
          data={donors}
          columns={this.composeColumns()}
          loading={isLoading}
          defaultPageSize={50}
          minRows={1}
        />
    );
  }
}

