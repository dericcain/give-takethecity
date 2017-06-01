import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.sass';
import logo from '../../../assets/images/logo.png';

export default class Navigation extends Component {
  render() {
    return (
        <nav className="open">
          <div className="logo">
            <img src={logo} alt="Take the City - Admin" />
          </div>
          <div className="nav-items">
            <NavLink to="/donations">Donations</NavLink>
            <NavLink to="/recurring-donations">Recurring Donations</NavLink>
            <NavLink to="/donors">Donors</NavLink>
          </div>
        </nav>
    );
  }
}