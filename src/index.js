import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

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

registerServiceWorker();
