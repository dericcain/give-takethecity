import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { Provider } from 'mobx-react';
import DonationStore from '../stores/DonationStore';
import NavButtons from './common/NavButtons';
import {
  Amount,
  PersonalInfo,
  PaymentMethod,
  Review,
  Success
} from '../components';
import './PublicWrapper.sass';

class PublicWrapper extends Component {

  render() {
    const { location } = this.props;

    return (
      <Provider donation={DonationStore}>
        <div className="form-wrapper">
          <div className="form-container">
            <CSSTransitionGroup
              component="div"
              className="transition-wrapper"
              transitionName="transition"
              transitionAppear={true}
              transitionAppearTimeout={700}
              transitionEnterTimeout={700}
              transitionLeaveTimeout={700}
              >
              <Switch key={location.key} location={location}>
                <Route exact path="/" render={() => <Redirect to="/amount" />} />
                <Route path="/amount" component={Amount} />
                <Route path="/personal-info" component={PersonalInfo} />
                <Route path="/payment-method" component={PaymentMethod} />
                <Route path="/review" component={Review} />
                <Route path="/success" component={Success} />
              </Switch>
            </CSSTransitionGroup>
            <NavButtons
              location={location}
              prevLink="/"
              nextLink="/personal-info"
            />
          </div>
        </div>
      </Provider>
    );
  }
}

export { PublicWrapper };
