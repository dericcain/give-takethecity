import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject(['auth', 'donation']) @observer
export default class AuthGate extends Component {

  componentWillMount() {
    console.log('here');
    if (!this.props.auth.checkAuth()) {
      console.log('Not logged in.');
      this.props.history.replace('/admin/login');
    }
  }

  render() {
    return this.props.children;
  }
}
