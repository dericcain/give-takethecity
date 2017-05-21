import validator from 'validator';

export function isNotEmpty(value) {
  return value !== '';
}

export function hasLengthOf(length, value) {
  return value.length === length;
}

export function isNumber(value) {
  return validator.isNumeric(value);
}

export function isEmail(value) {
  return validator.isEmail(value);
}

export function showErrorMessages(event, validationType) {
  const { id } = event.target;
  const input = event.target;
  const errorMessage = document.querySelector(`.error-${id}`);
  if (!validationType[id].isValid) {
    errorMessage.classList.remove('hidden');
    input.classList.add('input-error');
  } else {
    errorMessage.classList.add('hidden');
    input.classList.remove('input-error');
  }
}

export function isSectionValid(validationObject, callback) {
  const { donation } = this.props;
  let fieldsWithErrors = [];
  _.forIn(validationObject, (field, key) => {
    if (!field.isValid) {
      fieldsWithErrors.push(key);
    }
  });

  callback(fieldsWithErrors.length === 0);
}