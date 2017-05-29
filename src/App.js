import React, { Component } from 'react';
import {
  Redirect,
  Route,
} from 'react-router-dom'
import { PublicWrapper } from './public/components';
import './App.sass';

class App extends Component {

  render() {
    return (
      <div>
        <Route path="/" component={PublicWrapper} />
        <Route render={() => <Redirect to="/amount" /> } />
      </div>
    );
  }
}

export default App;