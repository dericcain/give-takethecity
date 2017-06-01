import { observable, action, computed } from 'mobx';
import axios from 'axios';

class DonationStore {

  @observable donations;
  @observable isLoading = false;

  @action('Updates the donations')
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
