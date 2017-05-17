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