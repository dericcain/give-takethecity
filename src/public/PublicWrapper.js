import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
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
      <div id="wrapper--div">
        <Switch>
          <Route path="/amount" component={Amount} />
          <Route path="/personal-info" component={PersonalInfo} />
          <Route path="/payment-method" component={PaymentMethod} />
          <Route path="/review" component={Review} />
          <Route path="/success" component={Success} />
        </Switch>
        <div id="links">
          <Link to="/amount">amount</Link>
          <Link to="/personal-info">personal</Link>
          <Link to="/payment-method">payment</Link>
          <Link to="/review">review</Link>
          <Link to="/success">success</Link>
        </div>
      </div>
    );
  }
}

export { PublicWrapper };
