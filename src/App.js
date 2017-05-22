import React, { Component } from 'react';
import {
  Route,
} from 'react-router-dom'
import { PublicWrapper } from './public/components';
import './App.sass';

class App extends Component {

  render() {
    return (
      <div>
        <Route
          path="/"
          component={PublicWrapper} />
      </div>
    );
  }
}

export default App;