import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import Raven from 'raven-js';

import App from './App';

Raven.config('https://c11cc2ccae2a4208850846e2564c6233@sentry.io/195208').install();

ReactDOM.render((
      <BrowserRouter>
        <App />
      </BrowserRouter>
  ), document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    console.log('Hot moduling...');
    ReactDOM.render((
      <BrowserRouter>
       <NextApp />
      </BrowserRouter>
    ), document.getElementById('root'));
  });
}