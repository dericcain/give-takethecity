import React, { Component } from 'react';
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { PublicWrapper } from './public/components';
import AdminWrapper from './admin/components/AdminWrapper';
import './App.sass';



class App extends Component {

  render() {
    return (
      <div>
        <Switch>
          <Route path="/admin" component={AdminWrapper} />
          <Route path="/" component={PublicWrapper} />
          <Route render={() => <Redirect to="/amount" /> } />
        </Switch>
      </div>
    );
  }
}

export default App;
