import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import config from './config';
import Nav from './Nav/Nav';
import LandingPage from './LandingPage/LandingPage';
import Login from './forms/login';
import Signup from './forms/signup';
import Profile from './profile/profile';
import ErrorBoundary from './Errors/ErrorBoundary';
import UdownContext from './UdownContext';

class App extends Component {

  state = {
    isLoggedIn: false
  }

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

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}isLoggedIn`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'user_id': localStorage.user_id
      },
      credentials: 'include'
    })
    .then(res => {
      return res.json()
    })
    .then(data => {
      this.setState({
        "isLoggedIn": data.isLoggedIn
      })
    })
  }

  render() {
    const contextValue = {
      isLoggedIn: this.state.isLoggedIn,
    }
    
    return (
      <UdownContext.Provider value={contextValue}>
        <main className='App'>
          <ErrorBoundary>
            <Route
              path="/"
              component={ Nav }
            />
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
        </ErrorBoundary>
        </main>
      </UdownContext.Provider>
    );
  }
}

export default App;