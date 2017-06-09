import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
import './Navigation.sass';

export default class Navigation extends Component {


  renderNavigation() {
    if (this.props.location.pathname === '/admin/login') {
      return null;
    }

    return (
      <nav>
        <div className="logo">
          <img src={logo} alt="Take the City Admin" />
        </div>
        <div className="nav-items">
          <NavLink to="/admin/donations">Donations</NavLink>
          <NavLink to="/admin/recurring-donations">Recurring Donations</NavLink>
          <NavLink to="/admin/donors">Donors</NavLink>
        </div>
      </nav>
    );
  }

  render() {
    return this.renderNavigation();
  }
}

