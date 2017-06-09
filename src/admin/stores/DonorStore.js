import { observable, action } from 'mobx';
import axios from 'axios';

class DonorStore {

  @observable donors;
  @observable isLoading = false;

  @action('Fetch donors')
  fetchDonors() {
    this.startLoading();
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/donors`)
      .then(response => {
        this.donors = response.data.donors;
        this.endLoading();
      })
      .catch(error => {
        console.error(error);
        this.endLoading();
      });
  }

  @action('Start the loading')
  startLoading() {
    this.isLoading = true;
  }

  @action('End the loading')
  endLoading() {
    this.isLoading = false;
  }
}

export default new DonorStore();