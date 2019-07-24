import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import config from './config';
import LandingPage from './LandingPage/LandingPage';
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
        <Route
          exact
          path="/"
          component={ LandingPage }
        />
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