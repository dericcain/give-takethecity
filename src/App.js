import React, { Component } from 'react';
import {
  Route,
} from 'react-router-dom'
import { PublicWrapper } from './public';
import { AdminWrapper } from './admin';
import './App.sass';

class App extends Component {

  render() {
    return (
    <div>
      <Route path="/" component={PublicWrapper} />
      <Route path="/admin" component={AdminWrapper} />
    </div>
    );
  }
}

export default App;
