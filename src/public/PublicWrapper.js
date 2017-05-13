import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';
import DonationStore from './stores/DonationStore';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {
  Amount,
  PersonalInfo,
  PaymentMethod,
  Review,
  Success
} from '../public';
import './PublicWrapper.sass';

class PublicWrapper extends Component {

  constructor(props) {
    super(props);
  }

  handlePageTransition() {
    return this.props.location.action === 'PUSH'
      ? 'slide-in'
      : 'slide-out';
  }

  render() {
    const { location, donation } = this.props;
    const { key } = location;
    return (
      <Provider donation={DonationStore}>
        <div className="form--wrapper">
          <div className="form--container">
            <CSSTransitionGroup
              transitionName={this.handlePageTransition()}
              transitionEnterTimeout={1000}
              transitionLeaveTimeout={1000}
            >
              <Route path="/amount" component={Amount} />
              <Route path="/personal-info" component={PersonalInfo} />
              <Route path="/payment-method" component={PaymentMethod} />
              <Route path="/review" component={Review} />
              <Route path="/success" component={Success} />
            </CSSTransitionGroup>
          </div>
        </div>
      </Provider>
    );
  }
}

export { PublicWrapper };
