import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { Provider } from 'mobx-react';
import DonationStore from '../stores/DonationStore';
import NavigationStore from '../stores/NavigationStore';
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

  handlePageTransition() {
    const { state } = this.props.location;
    if (state) {
      return state.direction;
    }

    return 'next';
  }

  render() {
    const { location } = this.props;

    return (
      <Provider donation={DonationStore} navigation={NavigationStore}>
        <div className="form-wrapper">
          <div className="form-container">
            <CSSTransitionGroup
              component="div"
              className="transition-wrapper"
              transitionName={this.handlePageTransition()}
              transitionEnterTimeout={700}
              transitionLeaveTimeout={700}
            >
              <Switch key={location.key} location={location}>
                <Route exact path="/" render={() => <Redirect to="/amount" />} />
                <Route path="/amount" key="1" component={Amount} />
                <Route path="/personal-info" key="2" component={PersonalInfo} />
                <Route path="/payment-method" key="3" component={PaymentMethod} />
                <Route path="/review" key="4" component={Review} />
                <Route path="/success" key="5" component={Success} />
              </Switch>
            </CSSTransitionGroup>
            <NavButtons
              prevLink="/"
              nextLink="/personal-info"
              {...this.props}
            />
          </div>
        </div>
      </Provider>
    );
  }
}

export { PublicWrapper };