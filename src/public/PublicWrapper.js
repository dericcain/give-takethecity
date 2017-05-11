import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
  Amount,
  PersonalInfo,
  PaymentMethod,
  Review,
  Success
} from '../public';
import './PublicWrapper.sass';

class PublicWrapper extends Component {
  render() {
    return (
      <div className="form--wrapper">
        <div className="form--container">
          <ReactCSSTransitionGroup
            transitionName="pageSlider"
            transitionEnterTimeout={600}
            transitionLeaveTimeout={600}
          >
            <Switch>
              <Route path="/amount" component={Amount} />
              <Route path="/personal-info" component={PersonalInfo} />
              <Route path="/payment-method" component={PaymentMethod} />
              <Route path="/review" component={Review} />
              <Route path="/success" component={Success} />
            </Switch>
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}

export { PublicWrapper };
