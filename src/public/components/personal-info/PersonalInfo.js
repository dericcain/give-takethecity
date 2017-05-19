import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import DesignationComments from './DesignationComments';
import InputWrapper from '../common/InputWrapper';
import icon from '../../../assets/icons/system_information.svg'
import './PersonalInfo.sass';
import _ from 'lodash';

@inject('donation') @observer
class PersonalInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      designations: [],
      sectionIsValid: false,
    }
  }

  isSectionValid() {
    const { donation } = this.props;
    let fieldsWithErrors = [];
    _.forIn(donation.personalInfoValidation, (field, key) => {
      if (!field.isValid) {
        fieldsWithErrors.push(key);
      }
    });

    donation.setIsPersonalInfoSectionValid(fieldsWithErrors.length === 0);
  }

  componentWillMount() {
    fetch('http://give.takethecity.dev/api/designations')
    .then(response => response.json())
    .then(designations => {
      this.setState({ designations });
    })
    .catch(error => console.log(error));
  }

  handleKeyUp(event) {
    const { id, value } = event.target;
    this.props.donation.updatePersonalInfo(id, value);
    this.checkIfValid()
  }

  checkIfValid() {
    return this.props.donation.personalInfoValidation;
  }

  handleDesignationChange(event) {
    this.props.donation.updateDesignation(event.target.value);
  }

  handleOnBlur(event) {
    const { personalInfoValidation } = this.props.donation;
    const { id } = event.target;
    const input = event.target;
    const errorMessage = document.querySelector(`.error-${id}`);
    if (!personalInfoValidation[id].isValid) {
      errorMessage.classList.remove('hidden');
      input.classList.add('input-error');
    } else {
      errorMessage.classList.add('hidden');
      input.classList.remove('input-error');
    }
    this.isSectionValid();
  }

  render() {
    const { personalInfoValidation } = this.props.donation;

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
          <InputWrapper
            size="half left"
            name="firstName"
            type="text"
            placeHolder="First Name"
            onChange={this.handleKeyUp.bind(this)}
            onBlur={this.handleOnBlur.bind(this)}
            errorMessage={personalInfoValidation.firstName.message}
          />
          <InputWrapper
            size="half right"
            name="lastName"
            type="text"
            placeHolder="Last Name"
            onChange={this.handleKeyUp.bind(this)}
            onBlur={this.handleOnBlur.bind(this)}
            errorMessage={personalInfoValidation.lastName.message}
          />
          <InputWrapper
            size="one-third left"
            name="email"
            type="email"
            placeHolder="Email"
            onChange={this.handleKeyUp.bind(this)}
            onBlur={this.handleOnBlur.bind(this)}
            errorMessage={personalInfoValidation.email.message}
          />
          <InputWrapper
            size="two-third right"
            name="address"
            type="text"
            placeHolder="Address"
            onChange={this.handleKeyUp.bind(this)}
            onBlur={this.handleOnBlur.bind(this)}
            errorMessage={personalInfoValidation.address.message}
          />
          <InputWrapper
            size="one-third left"
            name="zipCode"
            type="number"
            placeHolder="Zip Code"
            onChange={this.handleKeyUp.bind(this)}
            onBlur={this.handleOnBlur.bind(this)}
            errorMessage={personalInfoValidation.zipCode.message}
          />
          <InputWrapper
            size="two-third right"
            name="phoneNumber"
            type="number"
            placeHolder="Phone Number"
            onChange={this.handleKeyUp.bind(this)}
            onBlur={this.handleOnBlur.bind(this)}
            errorMessage={personalInfoValidation.phoneNumber.message}
          />
          <DesignationComments />
        </div>
      </div>
    );
  }
}

export { PersonalInfo };
