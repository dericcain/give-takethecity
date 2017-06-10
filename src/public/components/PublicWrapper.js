import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { Provider } from 'mobx-react';
import DonationStore from '../stores/DonationStore';
import NavigationStore from '../stores/NavigationStore';
import NavButtons from './common/NavButtons';
import trackPageView from '../../helpers/analytics';
import URlParser from '../../helpers/url-parser';
import {
  Amount,
  PersonalInfo,
  PaymentMethod,
  Review,
  Success
} from '../components';
import './PublicWrapper.sass';

class PublicWrapper extends Component {
  constructor(props) {
    super(props);
    const query = new URlParser(props.location.search);
    this.designationQuery = query.designation() || 1;
    this.amountQuery = query.amount() || 0;
  }

  componentWillMount() {
    DonationStore.updateDesignation(this.designationQuery);
    DonationStore.setAmount(this.amountQuery);
    this.trackPageViews();
  }

  trackPageViews() {
    this.props.history.listen(() => {
      trackPageView();
    });
  }

  handlePageTransition() {
    const { state } = this.props.location;
    if (state) {
      return state.direction;
    }
    return 'next';
  }

  render() {
    const { location } = this.props;
    const donation = DonationStore;

    return (
      <Provider donation={donation} navigation={NavigationStore}>
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
                <Route path="/personal-info" key="2" render={() => {
                  return donation.amountSectionIsValid ? (
                      <PersonalInfo/>
                    ) : (
                      <Redirect to="/amount"/>
                    )
                  }
                } />
                <Route path="/payment-method" key="3" render={() => {
                  return donation.personalInfoSectionIsValid ? (
                    <PaymentMethod/>
                  ) : (
                    <Redirect to="/personal-info"/>
                  )
                }
                } />
                <Route path="/review" key="4" render={() => {
                  return donation.paymentMethodSectionIsValid ? (
                    <Review/>
                  ) : (
                    <Redirect to="/payment-method"/>
                  )
                }
                } />
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
