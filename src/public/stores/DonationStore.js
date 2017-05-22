import { observable, action, computed } from 'mobx';
import {
  isNotEmpty,
  hasLengthOf,
  isEmail,
  isNumber
} from '../helpers/validators';

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
    generalComments: '',
    missionsSupport: '',
    staffSupport: ''
  };
  @observable paymentMethod = {
    cc: '',
    cvc: '',
    expMonth: '',
    expYear: '',
    nameOnCard: '',
  };
  @observable designation;
  @observable personalInfoSectionIsValid = false;
  @observable paymentMethodSectionIsValid = false;

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

  @computed get fullName() {
    const { firstName, lastName } = this.personalInfo;

    return `${firstName} ${lastName}`;
  }

  @action('Updates personal info')
  updatePersonalInfo(field, value) {
    this.personalInfo[field] = value;
  }

  @action('Updates personal info')
  updatePaymentMethod(field, value) {
    this.paymentMethod[field] = value;
  }

  @action
  updateDesignation(designation) {
    this.designation = designation;
  }

  @computed get amountValidation() {
    return {
      amount: {
        isValid: !!this.amount && this.amount > 0,
        value: this.amount,
        message: 'The amount is not valid.'
      }
    }
  }

  @computed get personalInfoValidation() {
    return {
      firstName: {
        isValid: isNotEmpty(this.personalInfo.firstName),
        value: this.personalInfo.firstName,
        message: 'You must enter a first name.'
      },
      lastName: {
        isValid: isNotEmpty(this.personalInfo.lastName),
        value: this.personalInfo.lastName,
        message: 'You must enter a last name.'
      },
      address: {
        isValid: isNotEmpty(this.personalInfo.address),
        value: this.personalInfo.address,
        message: 'You must enter an address.'
      },
      zipCode: {
        isValid: hasLengthOf(5, this.personalInfo.zipCode)
          && isNumber(this.personalInfo.zipCode),
        value: this.personalInfo.zipCode,
        message: 'The zip code must be 5 digits long.'
      },
      email: {
        isValid: isEmail(this.personalInfo.email),
        value: this.personalInfo.email,
        message: 'You must supply a valid email address.'
      },
      phoneNumber: {
        isValid: (hasLengthOf(10, this.personalInfo.phoneNumber)
          && isNotEmpty(this.personalInfo.phoneNumber))
        || !isNotEmpty(this.personalInfo.phoneNumber),
        value: this.personalInfo.phoneNumber,
        message: 'The phone number must 10 digits only.'
      },
    };
  };

  @action('Updates the validity of the personal info section')
  setIsPersonalInfoSectionValid(isValid) {
    this.personalInfoSectionIsValid = isValid;
  }

  @computed get paymentMethodValidation() {
    return {
      cc: {
        isValid: isNotEmpty(this.paymentMethod.cc)
        && isNumber(this.paymentMethod.cc),
        value: this.paymentMethod.cc,
        message: 'You must provide a credit card number.'
      },
      cvc: {
        isValid: isNotEmpty(this.paymentMethod.cvc)
        && isNumber(this.paymentMethod.cvc),
        value: this.paymentMethod.cvc,
        message: 'You must provide a CVC number.'
      },
      expMonth: {
        isValid: isNotEmpty(this.paymentMethod.expMonth),
        value: this.paymentMethod.expMonth,
        message: 'You must enter an expiration month.'
      },
      expYear: {
        isValid: isNotEmpty(this.paymentMethod.expYear),
        value: this.paymentMethod.expYear,
        message: 'You must enter an expiration year.'
      },
      nameOnCard: {
        isValid: isNotEmpty(this.paymentMethod.nameOnCard),
        value: this.paymentMethod.nameOnCard,
        message: 'You must provide the name of the card holder.'
      },
    };
  };

  @action('Updates the validity of the payment method section')
  setIsPaymentMethodSectionValid(isValid) {
    console.log(isValid);
    this.paymentMethodSectionIsValid = isValid;
  }

  submitDonation() {

  }
}

export default new DonationStore();