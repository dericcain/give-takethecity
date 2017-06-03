import { observable, action } from 'mobx';
import axios from 'axios';

class DonationStore {

  @observable donations;
  @observable recurringDonations;
  @observable isLoading = false;

  @action('Gets the donations')
  fetchDonations() {
    this.startLoading();
    axios.get('http://give.takethecity.dev/api/donations')
         .then(response => {
           this.donations = response.data.donations;
           this.endLoading();
         })
         .catch(error => {
           console.log(error);
           this.endLoading();
         });
  }

  @action('Gets the recurring donations')
  fetchRecurringDonations() {
    this.startLoading();
    axios.get('http://give.takethecity.dev/api/recurring-donations')
         .then(response => {
           this.recurringDonations = response.data.donations;
           this.endLoading();
         })
         .catch(error => {
           console.log(error);
           this.endLoading();
         });
  }

  @action('Sets loading to true')
  startLoading() {
    this.isLoading = true;
  }

  @action('Sets loading to false')
  endLoading() {
    this.isLoading = false;
  }
}

export default new DonationStore();
