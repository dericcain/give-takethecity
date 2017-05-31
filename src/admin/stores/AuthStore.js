import { observable, action, computed } from 'mobx';

class AuthStore {
  @observable isAuthenticated = false;

  @action('Authenticates a user')
  authenticateUser(email, password) {
    // Perform auth here
    // Store token in local storage
  }
}

export default new AuthStore();
