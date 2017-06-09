import React, { Component } from 'react';
import axios from 'axios';
import DonorFields from './DonorFields';
import DonorDonationsTable from '../tables/DonorDonationsTable';
import Loader from '../common/Loader';
import './Donor.sass';

export default class Donor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      donor: null,
      isLoading: false,
    }
  }

  componentWillMount() {
    this.setState({ isLoading: true });
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/donors/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          donor: response.data.donor,
          isLoading: false,
        })
      })
      .catch(error => console.log(error));
  }

  renderDonorFields() {
    const { donor, isLoading } = this.state;

    if (isLoading) {
      return <Loader/>
    }
    return (
      <div>
        <DonorFields
          donor={donor}
          isLoading={isLoading}
        />
        <DonorDonationsTable
          isLoading={isLoading}
          donations={donor.donations}
        />
      </div>
    );
  }

  render() {
    return this.renderDonorFields();
  }
}
