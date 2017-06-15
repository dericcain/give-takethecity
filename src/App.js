import React, { Component } from 'react';
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import asyncComponent from './AsyncComponent';
import './App.sass';

const AsyncAdminWrapper = asyncComponent(() => import('./admin/components/AdminWrapper'))
const AsyncPublicWrapper = asyncComponent(() => import('./public/components/PublicWrapper'))

class App extends Component {

  render() {
    return (
      <div>
        <Switch>
          <Route path="/admin" component={AsyncAdminWrapper} />
          <Route path="/" component={AsyncPublicWrapper} />
          <Route render={() => <Redirect to="/amount" /> } />
        </Switch>
      </div>
    );
  }
}

export default App;
