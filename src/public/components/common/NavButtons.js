import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import FullWidthButton from './FullWidthButton';
import './NavButtons.sass';

@inject('navigation') @inject('donation') @observer
export default class NavButtons extends Component {

  constructor(props) {
    super(props);
    const { navigation, location } = props;
    navigation.updateNavButtonUrl(location.pathname, location.action);
    this.listenForPageChange();
  }

  listenForPageChange() {
    this.props.history.listen((location, action) => {
      this.props.navigation.updateNavButtonUrl(location.pathname, action);
    });
  }

  renderButton() {
    const { nextPage, previousPage } = this.props.navigation;

    switch (this.props.location.pathname) {
      case '/amount':
        let { isValid } = this.props.donation.amountValidation.amount;
        return (
          <FullWidthButton
            isValid={isValid ? '' : 'disabled'}
            url="/personal-info"
            {...this.props}>
            Next
          </FullWidthButton>
        );
      default:
        return (
          <div className="btn-group">
            <Link
              to={{
                pathname: previousPage,
                state: { direction: 'previous' }
              }}
              className="btn btn-prev ">
              Previous
            </Link>
            <Link
              to={{
                pathname: nextPage,
                state: { direction: 'next' }
              }}
              className={`btn btn-next ${this.props.disabled ? 'disabled' : ''}`}>
              Next
            </Link>
          </div>
        );
    }
  }

  render() {
    return this.renderButton();
  }

}
