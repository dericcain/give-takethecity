import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import FullWidthButton from './FullWidthButton';
import './NavButtons.sass';
import PrevNextButtons from './PrevNextButtons';

@inject('navigation') @inject('donation') @observer
export default class NavButtons extends Component {

  constructor(props) {
    super(props);
    const { navigation, location } = props;
    navigation.updateNavButtonUrl(location.pathname);
    this.listenForPageChange();
  }

  listenForPageChange() {
    this.props.history.listen((location, action) => {
      this.props.navigation.updateNavButtonUrl(location.pathname);
    });
  }

  render() {
    const { nextPage, previousPage } = this.props.navigation;
    const { donation } = this.props;

    switch (this.props.location.pathname) {
      case '/amount':
        return (
          <FullWidthButton
            isValid={donation.amountSectionIsValid ? '' : 'disabled'}
            url="/personal-info"
            {...this.props}>
            Next
          </FullWidthButton>
        );
      case '/personal-info':
        return (
          <PrevNextButtons
            previousPage={previousPage}
            nextPage={nextPage}
            canMoveForward={donation.personalInfoSectionIsValid}
          />
        );
      case '/payment-method':
        return (
          <PrevNextButtons
            previousPage={previousPage}
            nextPage={nextPage}
            canMoveForward={donation.paymentMethodSectionIsValid}
          />
        );
      default:
        return (
          <PrevNextButtons
            isHidden={true}
            previousPage={previousPage}
            nextPage={nextPage}
            canMoveForward={false}
          />
        );
    }
  }
}
