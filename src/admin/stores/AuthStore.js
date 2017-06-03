import { observable, action } from 'mobx';
import axios from 'axios';
import moment from 'moment';

class AuthStore {

  @observable isAuthenticated = false;
  @observable loginErrors = null;

  constructor() {
    this.setAuthHeader();
  }

  @action('Authenticates a user')
  authenticateUser(email, password) {
    this.loginErrors = null;
    axios.post(process.env.REACT_APP_API_LOGIN_URL, {
      grant_type: 'password',
      client_id: process.env.REACT_APP_API_CLIENT_ID,
      client_secret: process.env.REACT_APP_API_CLIENT_SECRET,
      username: email,
      password,
      scope: ''
    })
    .then(response => this.loginWasSuccessful(response.data))
    .catch(error => this.loginErrors = error.response.data.message);
  }

  @action('Stores a users token and marks them as authenticated.')
  loginWasSuccessful(response) {
    this.isAuthenticated = true;
    this.setAuthHeader();
    this.storeTokens(response);
  }

  storeTokens(tokens) {
    tokens.expires_at = moment().unix() + tokens.expires_in;
    localStorage.setItem('ttc_auth', JSON.stringify(tokens));
  }

  get accessToken() {
    return JSON.parse(localStorage.getItem('ttc_auth')).access_token || false;
  }

  get refreshToken() {
    return JSON.parse(localStorage.getItem('ttc_auth')).refresh_token || false;
  }

  get tokenExpiration() {
    const tokens = localStorage.getItem('ttc_auth');

    if (!tokens) {
      return false;
    }

    return JSON.parse(tokens).expires_at;
  }

  get tokenHasExpired() {
    if (!this.tokenExpiration) {
      return true;
    }

    return this.tokenExpiration - moment().unix() < 500;
  }

  checkAuth() {
    return !this.tokenHasExpired;
  }

  setAuthHeader() {
    if (this.checkAuth()) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(localStorage.getItem('ttc_auth')).access_token;
    }
  }
}

export default new AuthStore();
