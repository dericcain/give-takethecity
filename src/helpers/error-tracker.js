import Raven from 'raven-js';

export default function logException(exception, context) {
  Raven.captureException(exception, {
    extra: context
  });
  /*eslint no-console:0*/
  window.console && console.error && console.error(exception);
}