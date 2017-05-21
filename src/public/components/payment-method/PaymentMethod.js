import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import _ from 'lodash';
import { showErrorMessages, isSectionValid } from '../../helpers/validators';
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

  handleKeyUp() {

  }

  handleOnBlur(event) {
    const {
      paymentMethodValidation,
      setIsPaymentMethodSectionValid
    } = this.props.donation;
    showErrorMessages(event, paymentMethodValidation);
    // Note: Not sure about this...
    isSectionValid(paymentMethodValidation, setIsPaymentMethodSectionValid());
  }

  handleSelectChange() {

  }

  isSectionValid() {
    const { donation } = this.props;
    let fieldsWithErrors = [];
    _.forIn(donation.paymentMethodValidation, (field, key) => {
      if (!field.isValid) {
        fieldsWithErrors.push(key);
      }
    });

    donation.setIsPaymentMethodSectionValid(fieldsWithErrors.length === 0);
  }

  render() {
    const { paymentMethodValidation } = this.props.donation;
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
            onChange={this.handleKeyUp.bind(this)}
            onBlur={this.handleOnBlur.bind(this)}
            errorMessage={paymentMethodValidation.nameOnCard.message}
          />
          <InputWrapper
            size="full"
            name="cc"
            type="number"
            placeHolder="Credit Card"
            onChange={this.handleKeyUp.bind(this)}
            onBlur={this.handleOnBlur.bind(this)}
            errorMessage={paymentMethodValidation.cc.message}
          />
          <InputWrapper
            size="cc-one-third left"
            name="cvc"
            type="number"
            placeHolder="CVC"
            onChange={this.handleKeyUp.bind(this)}
            onBlur={this.handleOnBlur.bind(this)}
            errorMessage={paymentMethodValidation.cvc.message}
          />
          <SelectWrapper
            size="cc-one-third middle"
            name="expMonth"
            placeHolder="Exp. Month"
            data={this.state.months}
            onChange={this.handleSelectChange.bind(this)}
            errorMessage={paymentMethodValidation.expMonth.message}
          />
          <SelectWrapper
            size="cc-one-third right"
            name="expYear"
            placeHolder="Exp. Year"
            data={this.state.years}
            onChange={this.handleSelectChange.bind(this)}
            errorMessage={paymentMethodValidation.expYear.message}
          />
        </div>
      </div>
    );
  }
}

export { PaymentMethod };
