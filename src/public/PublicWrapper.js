import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
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
    const { location } = this.props;
    const { key } = location;
    return (
      <div className="form--wrapper">
        <div className="form--container">
          <CSSTransitionGroup
            transitionName={this.handlePageTransition()}
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}
          >
            <Switch>
              <Route path="/amount"
                     component={Amount}
                     location={location}
                     key={key}
              />
              <Route path="/personal-info"
                     component={PersonalInfo}
                     location={location}
                     key={key}
              />
              <Route path="/payment-method"
                     component={PaymentMethod}
                     location={location}
                     key={key}
              />
              <Route path="/review"
                     component={Review}
                     location={location}
                     key={key}
              />
              <Route path="/success"
                     component={Success}
                     location={location}
                     key={key}
              />
            </Switch>
          </CSSTransitionGroup>
        </div>
      </div>
    );
  }
}

export { PublicWrapper };
