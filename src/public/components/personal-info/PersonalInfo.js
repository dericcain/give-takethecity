import React, { Component } from 'react';
import axios from 'axios';
import { inject, observer } from 'mobx-react';
import DesignationComments from './DesignationComments';
import icon from '../../../assets/icons/system_information.svg'
import './PersonalInfo.sass';

@inject('donation') @observer
class PersonalInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      designations: []
    }
  }

  componentWillMount() {
    axios.get('http://give.takethecity.dev/api/designations')
         .then(response => {
           this.setState({designations: response.data});
         })
         .catch(error => console.log(error));
  }

  handleKeyUp(event) {
    const { id, value } = event.target;
    this.props.donation.updatePersonalInfo(id, value);
    this.checkIfValid()
  }

  checkIfValid() {
    console.log(this.props.donation.personalInfoValidation);
    return this.props.donation.personalInfoValidation;
  }

  handleDesignationChange(event) {
    this.props.donation.updateDesignation(event.target.value);
  }

  handleOnBlur(event) {
    const { personalInfoValidation } = this.props.donation;
    const { id } = event.target;
    if (!personalInfoValidation[id].isValid) {
      const validationErrors = document.getElementById('validation-errors');
    }
  }

  render() {
    return (
      <div className="personal-info transition-item">
        <img src={icon} alt="Personal Information" />
        <h4 className="text-center">Personal Info</h4>
        <p>How would you like to designate this gift?</p>
        <div className="personal-info-fields">
          <select
            id="designation"
            title="Designation"
            className="select-designation"
            onChange={this.handleDesignationChange.bind(this)}>
            {this.state.designations
                 .map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
          <input id="firstName"
                 className="input-half left"
                 onChange={this.handleKeyUp.bind(this)}
                 onBlur={this.handleOnBlur.bind(this)}
                 type="text"
                 placeholder="First Name" />
          <input id="lastName"
                 className="input-half right"
                 onChange={this.handleKeyUp.bind(this)}
                 onBlur={this.handleOnBlur.bind(this)}
                 type="text"
                 placeholder="Last Name" />
          <input id="email"
                 className="input input-one-third left"
                 onChange={this.handleKeyUp.bind(this)}
                 onBlur={this.handleOnBlur.bind(this)}
                 type="email"
                 placeholder="Email" />
          <input id="address"
                 className="input input-two-third right"
                 onChange={this.handleKeyUp.bind(this)}
                 onBlur={this.handleOnBlur.bind(this)}
                 type="text"
                 placeholder="Address" />
          <input id="zipCode"
                 className="input-one-third left"
                 onChange={this.handleKeyUp.bind(this)}
                 onBlur={this.handleOnBlur.bind(this)}
                 type="text"
                 placeholder="Zip" />
          <input id="phone"
                 className="input-two-third right"
                 onChange={this.handleKeyUp.bind(this)}
                 onBlur={this.handleOnBlur.bind(this)}
                 type="text"
                 placeholder="Phone" />
          <DesignationComments />
        </div>
        <div id="validation-errors">

        </div>
      </div>
    );
  }
}

export { PersonalInfo };
