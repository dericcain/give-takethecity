import React, { Component } from 'react';
import {Table, Column, Cell} from 'fixed-data-table-2';
import 'fixed-data-table-2/dist/fixed-data-table.css';

class Donation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      donations: null,
    }
  }

  componentWillMount() {
    fetch('http://give.takethecity.dev/api/donations')
      .then(response => response.json())
      .then(donations => this.setState({
        donations: donations.donations,
        isLoaded: true
      }))
      .catch(error => console.log(error));
  }

  render() {
    const { isLoaded, donations } = this.state;
    return (
      <div>
        { !isLoaded
          ? 'Loading....'
          : (
            <Table
              rowHeight={50}
              rowsCount={donations.length || 0}
              width={1000}
              height={500}
              headerHeight={50}
            >
              <Column
                header={<Cell>Donor</Cell>}
                width={200}
                cell={props => (
                  <Cell {...props}>
                    {donations[props.rowIndex].donor.full_name}
                  </Cell>
                )}
              />
              <Column
                header={<Cell>Date</Cell>}
                width={200}
                cell={props => (
                  <Cell {...props}>
                    {donations[props.rowIndex].created_at}
                  </Cell>
                )}
              />
              <Column
                header={<Cell>Designation</Cell>}
                width={200}
                cell={props => (
                  <Cell {...props}>
                    {donations[props.rowIndex].designation.name}
                  </Cell>
                )}
              />
              <Column
                header={<Cell>Covering Fees?</Cell>}
                width={200}
                cell={props => (
                  <Cell {...props}>
                    {donations[props.rowIndex].is_paying_fees ? 'Yes' : 'No'}
                  </Cell>
                )}
              />
              <Column
                header={<Cell>Recurring?</Cell>}
                width={200}
                cell={props => (
                  <Cell {...props}>
                    {donations[props.rowIndex].is_recurring ? 'Yes' : 'No'}
                  </Cell>
                )}
              />
              <Column
                header={<Cell>Amount</Cell>}
                width={200}
                cell={props => (
                  <Cell {...props}>
                    ${donations[props.rowIndex].amount / 100}
                  </Cell>
                )}
              />
              <Column
                header={<Cell></Cell>}
                width={200}
                cell={props => (
                  <Cell {...props}>
                    <a href={`/admin/donors/${donations[props.rowIndex].donor_id}`} className="btn btn-sm">View Donor</a>
                    ${donations[props.rowIndex].amount / 100}
                  </Cell>
                )}
              />
            </Table>
          )}
      </div>
    );
  }
}

export default Donation;
