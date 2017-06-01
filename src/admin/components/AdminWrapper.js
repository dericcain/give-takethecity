import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { Route, Redirect, Switch } from 'react-router-dom';
import AuthStore from '../stores/AuthStore';
import DonationStore from '../stores/DonationStore';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Login from './auth/Login';
import Donation from './donations/Donation';
import Donor from './donors/Donor';
import Navigation from './layout/Navigation';

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
              <Route path="/admin/donations" key="2" component={Donation} />
              <Route path="/admin/donors/:id" key="3" component={Donor} />
            </Switch>
          </CSSTransitionGroup>
        </div>
      </Provider>
    );
  }
}
