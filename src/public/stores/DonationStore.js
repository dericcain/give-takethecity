import { observable, action, computed } from 'mobx';

class DonationStore {
  feePercentage = .026;
  @observable amount = 0;
  @observable isRecurring = false;
  @observable firstName;
  @observable lastName;
  @observable address;
  @observable zipCode;
  @observable email;
  @observable phoneNumber;
  @observable isCoveringFees;

  @action('Sets the donation amount')
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

  @action('Toggles the donation as recurring')
  toggleRecurring() {
    this.isRecurring = !this.isRecurring
  }

  @action('Covering the fees, so we need to add that to the donation')
  toggleCoverFees() {
    this.isCoveringFees = !this.isCoveringFees;
  }

  @computed get amountIsValid() {
    return !!this.amount;
  }

  @computed get total() {
    if (this.isCoveringFees) {
      return this.amount + this.fees;
    }

    return this.amount;
  }

}

export default new DonationStore;