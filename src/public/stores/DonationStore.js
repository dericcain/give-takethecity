import { observable, action, computed } from 'mobx';

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

  @computed get amountSectionIsValid() {
    return !!this.amount;
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
}

export default new DonationStore();