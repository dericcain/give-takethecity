import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
import './Login.sass';

@inject('authStore') @observer
export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: props.authStore.checkAuth()
    };
  }

  handleOnClick() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    this.props.authStore.authenticateUser(email, password);
    this.setState({ isAuthenticated: this.props.authStore.checkAuth() })
  }

  showLoginErrors() {
    const { loginErrors } = this.props.authStore;
    if (loginErrors) {
      return (
        <div className="error-message">
          <p>{loginErrors}</p>
        </div>
      )
    }
  }

  render() {
    if (this.state.isAuthenticated) {
      return <Redirect to="/admin/donations" />
    }

    return (
      <div className="login-wrapper text-center">
        <div className="login-form">
          <img src={logo} alt="Take the City Admin" className="m-b-24" />
          <h5 className="text-center">Please login!</h5>
          <input id="email" type="email" placeholder="Email"/>
          <input id="password" type="password" placeholder="Password"/>
          {this.showLoginErrors()}
          <button onClick={this.handleOnClick.bind(this)} className="btn btn-block">Login</button>
          <a href="/">Forgot password?</a>
        </div>
      </div>
    );
  }
}
