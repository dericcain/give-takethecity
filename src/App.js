import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import {
  Amount,
  PersonalInfo,
  PaymentMethod,
  Review,
  Success,
  PublicWrapper
} from './public';
import './App.css';

class App extends Component {

  render() {
    return (
      <Router>
        <Route exact path="/" component={PublicWrapper}>
          <Route path="/amount" component={Amount} />
          <Route path="/personal-info" component={PersonalInfo} />
          <Route path="/payment-method" component={PaymentMethod} />
          <Route path="/review" component={Review} />
          <Route path="/success" component={Success} />
        </Route>
      </Router>
    );
  }
}

export default App;
