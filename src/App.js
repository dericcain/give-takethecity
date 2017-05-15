import React, { Component } from 'react';
import {
  Route,
} from 'react-router-dom'
import { PublicWrapper } from './public/components';
import './App.sass';
import DevTools from 'mobx-react-devtools';

class App extends Component {
  render() {
    return (
    <div>
      <DevTools/>
      <Route path="/" component={PublicWrapper} />
    </div>
    );
  }
}

export default App;
