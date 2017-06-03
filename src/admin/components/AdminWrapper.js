import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { Route, Redirect, Switch } from 'react-router-dom';
import AuthStore from '../stores/AuthStore';
import DonationStore from '../stores/DonationStore';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Login from './auth/Login';
import Donations from './donations/Donations';
import Donor from './donors/Donor';
import Navigation from './layout/Navigation';
import RecurringDonations from './recurring-donations/RecurringDonations';

export default class AdminWrapper extends Component {

  render() {
    const { location } = this.props;

    return (
      <Provider donation={DonationStore} auth={AuthStore}>
        <div className="section-admin">
          <Navigation />
          <CSSTransitionGroup
            component="div"
            className="transition-wrapper"
            transitionName='fade'
            transitionEnterTimeout={700}
            transitionLeaveTimeout={700}
          >
            <Switch key={location.key} location={location}>
              <Route exact path="/admin" render={() => <Redirect to="/admin/login" />} />
              <Route path="/admin/login" key="1" component={Login} />
              <Route path="/admin/donations" key="2" component={Donations} />
              <Route path="/admin/recurring-donations" key="3" component={RecurringDonations} />
              <Route path="/admin/donors/:id" key="4" component={Donor} />
            </Switch>
          </CSSTransitionGroup>
        </div>
      </Provider>
    );
  }
}
