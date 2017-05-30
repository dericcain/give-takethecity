import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { showErrorMessages, sectionIsValid } from '../../helpers/validators';
import InputWrapper from '../common/InputWrapper';
import SelectWrapper from '../common/SelectWrapper';
import icon from '../../../assets/icons/wallet.svg'
import './PaymentMethod.sass';

@inject('donation') @observer
class PaymentMethod extends Component {

  constructor(props) {
    super(props);
    this.state = {
      months: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ],
      years: [],
      sectionIsValid: false,
    }
  }

  componentWillMount() {
    const year = new Date().getFullYear();
    let yearsArray = [];
    let counter = year;
    const numberOfYears = year + 12;
    while (counter < numberOfYears) {
      yearsArray.push(counter);
      counter++;
    }

    this.setState({
      years: yearsArray
    });
  }

  handleOnChange(event) {
    const { id, value } = event.target;
    this.props.donation.updatePaymentMethod(id, value);
  }

  handleOnBlur(event) {
    const { donation } = this.props;
    showErrorMessages(event, donation.paymentMethodValidation);
    donation.setIsPaymentMethodSectionValid(sectionIsValid(donation.paymentMethodValidation));
  }

  handleSelectChange(event) {
    const { id, value } = event.target;
    this.props.donation.updatePaymentMethod(id, value);

    if (this.isDropdownChange(event)) {
      this.handleOnBlur(event);
    }
  }

  isDropdownChange(event) {
    const { id } = event.target;

    return id === 'expMonth' || id === 'expYear';
  }

  render() {
    const { paymentMethodValidation } = this.props.donation;
    const { nameOnCard, cc, cvc, expMonth, expYear } = this.props.donation.paymentMethod;

    return (
      <div className="payment-method transition-item">
        <img src={icon} alt="Payment Method" />
        <h4 className="text-center">Payment Method</h4>
        <p>Please enter your payment details below.</p>
        <div className="payment-method-fields">
          <InputWrapper
            size="full"
            name="nameOnCard"
            type="text"
            placeHolder="Name on card"
            value={nameOnCard}
            onChange={this.handleOnChange.bind(this)}
            onBlur={this.handleOnBlur.bind(this)}
            errorMessage={paymentMethodValidation.nameOnCard.message}
          />
          <InputWrapper
            size="full"
            name="cc"
            type="number"
            placeHolder="Credit Card"
            value={cc}
            onChange={this.handleOnChange.bind(this)}
            onBlur={this.handleOnBlur.bind(this)}
            errorMessage={paymentMethodValidation.cc.message}
          />
          <InputWrapper
            size="cc-one-third left"
            name="cvc"
            type="number"
            placeHolder="CVC"
            value={cvc}
            onChange={this.handleOnChange.bind(this)}
            onBlur={this.handleOnBlur.bind(this)}
            errorMessage={paymentMethodValidation.cvc.message}
          />
          <SelectWrapper
            size="cc-one-third middle"
            name="expMonth"
            placeHolder="Exp. Month"
            data={this.state.months}
            value={expMonth}
            onChange={this.handleSelectChange.bind(this)}
            errorMessage={paymentMethodValidation.expMonth.message}
          />
          <SelectWrapper
            size="cc-one-third right"
            name="expYear"
            placeHolder="Exp. Year"
            data={this.state.years}
            value={expYear}
            onChange={this.handleSelectChange.bind(this)}
            errorMessage={paymentMethodValidation.expYear.message}
          />
        </div>
      </div>
    );
  }
}

export { PaymentMethod };
