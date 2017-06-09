import { observable, action } from 'mobx';
import axios from 'axios';

class DonationStore {

  @observable donations;
  @observable recurringDonations;
  @observable isLoading = false;

  @action('Gets the donations')
  fetchDonations() {
    this.startLoading();
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/donations`)
         .then(response => {
           this.donations = response.data.donations;
           this.endLoading();
         })
         .catch(error => {
           console.error(error);
           this.endLoading();
         });
  }

  @action('Gets the recurring donations')
  fetchRecurringDonations() {
    this.startLoading();
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/recurring-donations`)
         .then(response => {
           this.recurringDonations = response.data.donations;
           this.endLoading();
         })
         .catch(error => {
           console.error(error);
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

  @action('Update recurring donation')
  updateRecurringDonation(value, event) {
    console.log(event.target);
    // const donationId = event.target.
    // axios.post('http://give.takethecity.dev/api/recurring-donations')
  }
}

export default new DonationStore();
