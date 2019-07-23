import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import config from './config';
import Login from './forms/login';
import Signup from './forms/signup';
import Profile from './profile/profile';

class App extends Component {

  renderLoginSignup() {
    return (
      <>
        <Route
          exact
          path="/login"
          component={ Login }
        />
        <Route
          path="/signup"
          component={ Signup }
        />
      </>
    )
  }

  render() {
    return (
      <main className='App'>
        {this.renderLoginSignup()}
      <Route
        path="/profile"
        component={ Profile }
      />
      </main>
    );
  }
}

export default App;