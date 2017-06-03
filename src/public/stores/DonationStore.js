import { observable, action, computed } from 'mobx';
import axios from 'axios';
import {
  isNotEmpty,
  hasLengthOf,
  isEmail,
  isNumber
} from '../helpers/validators';

class DonationStore {

  feePercentage = .026;
  @observable amount = 0;
  @observable isPayingFees = false;
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
  @observable designation = 1;
  @observable personalInfoSectionIsValid = false;
  @observable paymentMethodSectionIsValid = false;
  @observable token = null;
  @observable isSubmittingRequest = false;
  @observable response = {};

  @action('Set the donation amount')
  setAmount(amount) {
    this.amount = amount;
  }

  @computed get amountSectionIsValid() {
    return !!this.amount;
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
    this.isPayingFees = !this.isPayingFees;
  }

  @computed get total() {
    if (this.isPayingFees) {
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
    this.paymentMethodSectionIsValid = isValid;
  }

  @action('Updates the response object')
  submitDonation() {
    this.isSubmittingRequest = true;
    window.Stripe.setPublishableKey(process.env.REACT_APP_STRIPE_KEY);
    const self = this;
    window.Stripe.card.createToken({
      number: self.paymentMethod.cc,
      cvc: self.paymentMethod.cvc,
      exp_month: self.paymentMethod.expMonth,
      exp_year: self.paymentMethod.expYear,
    }, this.sendDataToServer.bind(this));
    return false;
  }

  sendDataToServer(status, response) {
    const self = this;
    if (status !== 200) {
      this.isSubmittingRequest = false;
      self.response = {
        status: 'error',
        message: response.error.message
      };
    } else {
      self.setStripeToken(response.id);
      axios.post(`${process.env.REACT_APP_API_BASE_URL}/donations`, self.donationSubmissionObject)
      .then(response => {
        console.log(response);
        if (response.error) {
          self.response = {
            status: 'error',
            message: response.error.error.message
          };
        } else {
          self.response = {
            status: 'success',
            message: response.message
          };
        }
        this.isSubmittingRequest = false;
      })
      .catch(error => {
        console.log(error);
        this.isSubmittingRequest = false;
        self.response = {
          status: 'error',
          message: 'There was a server error and we are looking into what happened.'
        };
      });
    }
  }

  @action('Set the Stripe token')
  setStripeToken(token) {
    this.token = token;
  }

  @computed get donationSubmissionObject() {
    return {
      token: this.token,
      first_name: this.personalInfo.firstName,
      last_name: this.personalInfo.lastName,
      email: this.personalInfo.email,
      address: this.personalInfo.address,
      zip: this.personalInfo.zipCode,
      phone: this.personalInfo.phone,
      amount: this.total * 100,
      designation: this.designation,
      is_paying_fees: this.isPayingFees,
      mission_support: this.personalInfo.missionsSupport,
      staff_support: this.personalInfo.staffSupport,
      is_recurring: this.isRecurring
    }
  }

}

export default new DonationStore();
