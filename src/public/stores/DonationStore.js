import { observable, action, computed } from 'mobx';
import validator from 'validator';

class DonationStore {
  feePercentage = .026;
  @observable amount = 0;
  @observable isCoveringFees;
  @observable isRecurring = false;
  @observable personalInfo = {
    firstName: '',
    lastName: '',
    address: '',
    zipCode: '',
    email: '',
    phoneNumber: '',
  };
  @observable designation;

  @action('Set the donation amount')
  setAmount(amount) {
    this.amount = amount;
  }

  @computed get fees() {
    if (this.amount === 0) {
      return 0;
    }

    const baseFee = this.amount + .30;
    const calculatedFee = baseFee / (1 - this.feePercentage);

    return Math.round((calculatedFee - this.amount) * 100) / 100;
  }

  @action('Toggles recurring donation')
  toggleRecurring() {
    this.isRecurring = !this.isRecurring
  }

  @action('Toggles covering donation fees')
  toggleCoverFees() {
    this.isCoveringFees = !this.isCoveringFees;
  }

  @computed get total() {
    if (this.isCoveringFees) {
      return this.amount + this.fees;
    }

    return this.amount;
  }

  @action('Updates personal info')
  updatePersonalInfo(field, value) {
    this.personalInfo[field] = value;
  }

  @action
  updateDesignation(designation) {
    this.designation = designation;
  }

  @computed get amountValidation() {
    return {
      amount: {
        isValid: !!this.amount && this.amount > 0,
        message: 'The amount is not valid.'
      }
    }
  }

  @computed get personalInfoValidation() {
    return {
      firstName: {
        isValid: !validator.isEmtpy(this.firstName),
        message: 'You must enter a first name.'
      },
      lastName: {
        isValid: !validator.isEmtpy(this.lastName),
        message: 'You must enter a last name.'
      },
      address: {
        isValid: !validator.isEmtpy(this.address),
        message: 'You must enter an address.'
      },
      zipCode: {
        isValid: validator.isLength(this.zipCode, { min: 5, max: 5 }) && validator.isInt(this.zipCode),
        message: 'The zip code must be 5 digits long.'
      },
      email: {
        isValid: validator.isEmail(this.email),
        message: 'You must supply a valid email address.'
      },
      phoneNumber: {
        isValid: validator.isLength(this.phoneNumber, { min: 10, max: 10 })
          || validator.isEmpty(this.phoneNumber),
        message: 'The phone number must 10 digits only.'
      },
    };
  };
}

export default new DonationStore();