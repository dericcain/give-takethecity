import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import logo from '../../../assets/images/logo.png';
import './Login.sass';

@inject('auth') @observer
export default class Login extends Component {

  handleOnClick() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    this.props.auth.authenticateUser(email, password);
  }

  render() {
    return (
      <div className="login-wrapper text-center">
        <div className="login-form">
          <img src={logo} alt="Take the City Admin" className="m-b-24" />
          <h5 className="text-center">Please login!</h5>
          <input id="email" type="email" placeholder="Email"/>
          <input id="password" type="password" placeholder="Password"/>
          <button onClick={this.handleOnClick.bind(this)} className="btn btn-block">Login</button>
          <a href="/">Forgot password?</a>
        </div>
      </div>
    );
  }
}
