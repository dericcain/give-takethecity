import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import logException from '../../../helpers/error-tracker';
import DesignationComments from './DesignationComments';
import InputWrapper from '../common/InputWrapper';
import { showErrorMessages, sectionIsValid } from '../../helpers/validators';
import icon from '../../../assets/icons/system_information.svg'
import './PersonalInfo.sass';

@inject('donation') @observer
class PersonalInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      designations: [],
    }
  }

  componentWillMount() {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/designations`)
      .then(response => {
        this.setState({ designations: response.data });
      })
      .catch(error => logException(error));
  }

  handleKeyUp(event) {
    const { id, value } = event.target;
    this.props.donation.updatePersonalInfo(id, value);
  }

  handleDesignationChange(event) {
    this.props.donation.updateDesignation(event.target.value);
  }

  handleOnBlur(event) {
    const { donation } = this.props;
    showErrorMessages(event, donation.personalInfoValidation);
    donation.setIsPersonalInfoSectionValid(sectionIsValid(donation.personalInfoValidation));
  }

  render() {
    const { personalInfoValidation, designation } = this.props.donation;
    const {
      firstName,
      lastName,
      address,
      zipCode,
      email,
      phoneNumber
    } = this.props.donation.personalInfo;

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
            value={designation}
            onChange={this.handleDesignationChange.bind(this)}>
            {this.state.designations
                 .map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
          <InputWrapper
            size="half left"
            name="firstName"
            type="text"
            value={firstName}
            placeHolder="First Name"
            onChange={this.handleKeyUp.bind(this)}
            onBlur={this.handleOnBlur.bind(this)}
            errorMessage={personalInfoValidation.firstName.message}
          />
          <InputWrapper
            size="half right"
            name="lastName"
            type="text"
            value={lastName}
            placeHolder="Last Name"
            onChange={this.handleKeyUp.bind(this)}
            onBlur={this.handleOnBlur.bind(this)}
            errorMessage={personalInfoValidation.lastName.message}
          />
          <InputWrapper
            size="one-third left"
            name="email"
            type="email"
            value={email}
            placeHolder="Email"
            onChange={this.handleKeyUp.bind(this)}
            onBlur={this.handleOnBlur.bind(this)}
            errorMessage={personalInfoValidation.email.message}
          />
          <InputWrapper
            size="two-third right"
            name="address"
            type="text"
            value={address}
            placeHolder="Address"
            onChange={this.handleKeyUp.bind(this)}
            onBlur={this.handleOnBlur.bind(this)}
            errorMessage={personalInfoValidation.address.message}
          />
          <InputWrapper
            size="one-third left"
            name="zipCode"
            type="number"
            value={zipCode}
            placeHolder="Zip Code"
            onChange={this.handleKeyUp.bind(this)}
            onBlur={this.handleOnBlur.bind(this)}
            errorMessage={personalInfoValidation.zipCode.message}
          />
          <InputWrapper
            size="two-third right"
            name="phoneNumber"
            type="number"
            value={phoneNumber}
            placeHolder="Phone Number"
            onChange={this.handleKeyUp.bind(this)}
            onBlur={this.handleOnBlur.bind(this)}
            errorMessage={personalInfoValidation.phoneNumber.message}
          />
          <DesignationComments
            onChange={this.handleKeyUp.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export { PersonalInfo };
