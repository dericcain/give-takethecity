import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { Route, Redirect, Switch } from 'react-router-dom';
import AuthStore from '../stores/AuthStore';
import DonationStore from '../stores/DonationStore';
import DonorStore from '../stores/DonorStore';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Login from './auth/Login';
import Donations from './donations/Donations';
import Donor from './donors/Donor';
import Donors from './donors/Donors';
import Navigation from './layout/Navigation';
import RecurringDonations from './recurring-donations/RecurringDonations';
import './AdminWrapper.sass';

export default class AdminWrapper extends Component {

  isFired = false;

  protectRoute() {
    // todo: Need to fix this... It is really hacky..
    if (!AuthStore.checkAuth() && !this.isFired) {
      console.log('Not logged in.');
      this.props.history.replace('/admin/login');
      this.isFired = true;
      setTimeout(() => this.isFired = false, 500);
    }
  }

  render() {
    const { location } = this.props;

    return (
      <Provider
        donationStore={DonationStore}
        authStore={AuthStore}
        donorStore={DonorStore}
      >
        <div className="section-admin">
          <Navigation {...this.props} />
          <CSSTransitionGroup
            component="div"
            className="transition-wrapper-admin"
            transitionName='fade'
            transitionEnterTimeout={700}
            transitionLeaveTimeout={700}
          >
            <Switch key={location.key} location={location}>
              <Route exact path="/admin"
                render={() => <Redirect to="/admin/login" />}
              />
              <Route path="/admin/login" component={Login} />
              <Route path="/admin/donations"
                onEnter={this.protectRoute()}
                component={Donations}
              />
              <Route path="/admin/recurring-donations"
                onEnter={this.protectRoute()}
                component={RecurringDonations}
              />
              <Route exact path="/admin/donors"
                onEnter={this.protectRoute()}
                component={Donors}
              />
              <Route path="/admin/donors/:id"
                onEnter={this.protectRoute()}
                component={Donor}
              />
            </Switch>
          </CSSTransitionGroup>
        </div>
      </Provider>
    );
  }
}
