import validator from 'validator';

export default class Validation {

  validationErrors = [];

  static required(value, element) {
    if (validator.isEmpty(value)) {
      this.validationErrors.push(this.buildValidationErrors(element, 'required'))
    }

    return this;
  }

  static email(value, element) {
    if (!validator.isEmail(value)) {
      this.validationErrors.push(this.buildValidationErrors(element, 'email'))
    }
  }

  static phone(value, element) {
    if (!validator.isNumeric(value)) {
      this.validationErrors.push(this.buildValidationErrors(element, 'phone'))
    }
  }

  buildValidationErrors(element, type) {
    return {
      element,
      message: this.getValidationMessage(type)
    }
  }

  getValidationMessage(type) {
    switch (type) {
      case 'phone':
        return 'Please only enter numbers for the phone number.';
      case 'email':
        return 'You must supply a valid email.';
      default:
        return 'This field is required.'

    }
  }

  validate() {
    return this.validationErrors;
  }
}
