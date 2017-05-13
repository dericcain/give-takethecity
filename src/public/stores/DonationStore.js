import { observable, action, computed } from 'mobx';

class DonationStore {
  feeAmount = .026;
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

  @computed get amountWithFees() {
    if (this.amount === 0) {
      return 0;
    }

    const baseFee = this.amount + .30;
    const calculatedFee = baseFee / (1 - this.feeAmount);

    return Math.round((calculatedFee - this.amount) * 100) / 100;
  }

  @action('Toggles the donation as recurring')
  toggleRecurring() {
    this.isRecurring = !this.isRecurring
  }

  @computed get amountIsValid() {
    return !!this.amount;
  }
}

export default new DonationStore;