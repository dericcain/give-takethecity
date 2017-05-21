import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools';
import {
  Route,
} from 'react-router-dom'
import { PublicWrapper } from './public/components';
import './App.sass';

class App extends Component {

  render() {
    return (
      <div>
        <DevTools />
        <Route
          path="/"
          component={PublicWrapper} />
      </div>
    );
  }
}

export default App;