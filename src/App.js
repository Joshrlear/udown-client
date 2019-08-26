import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import config from './config';
import Nav from './Nav/Nav';
import LandingPage from './LandingPage/LandingPage';
import Home from './Home/Home'
import Login from './forms/login';
import Signup from './forms/signup';
import Profile from './profile/Profile';
import EditProfile from './profile/EditProfile'
import ErrorBoundary from './Errors/ErrorBoundary';
import UdownContext from './UdownContext';
import ChatButton from './Chat/ChatButton';
import Chat from './Chat/Chat'
import ChatRedirect from './Chat/ChatRedirect'

class App extends Component {

  state = {
    userHistory: [],
    isLoggedIn: false,
    hasMessage: true,
    chatOpened: false,
    chatRoomName: '',
    navExpanded: false,
    query: '',
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

  defineQuery = query => {
    this.setState({
      query
    })
  }

  // opens chat when socket room created (after clicking play - on infoDisplay)
  startChat = chatRoomName => {
    this.setState({
      chatOpened: true,
      chatRoomName
    })
  }

  expandNav = () => {
    this.setState({
      navExpanded: !this.state.navExpanded
    })
  }

  // if new message, click button to open chat
  openMsg = () => {
    this.setState({
      chatOpened: !this.state.chatOpened
    })
    setTimeout(() => this.state.hasMessage && this.setState({
      hasMessage: !this.state.hasMessage
    }))
  }

  closeChat = () => {
    this.setState({
      chatOpened: !this.state.chatOpened
    })
  }

  setIsLoggedIn = () => {
    /* fetch('/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => { */
      console.log(localStorage.user_id)
      if (localStorage.user_id) {
        console.log('has user_id')
        this.state.isLoggedIn !== true && this.setState({ isLoggedIn: true })
      }
      else {
        console.log('no user_id')
        this.state.isLoggedIn !== false && this.setState({ isLoggedIn: false })
      } 
    //})
  }

  componentWillMount() {
    /* fetch(`${config.API_ENDPOINT}isLoggedIn`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'user_id': localStorage.user_id
      },
      //credentials: 'include'
    }) */
    console.log('app will mount')
    this.setIsLoggedIn()
  }

  componentDidUpdate() {
    /* fetch(`${config.API_ENDPOINT}isLoggedIn`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'user_id': localStorage.user_id
      },
      //credentials: 'include'
    }) */
    console.log('app did update')
    this.setIsLoggedIn()
  }

  msgBtnClass(val) {
    if (!val) {
      const chatOpened = this.state.chatOpened
      const hasMessage = this.state.hasMessage
      let classValue
      !hasMessage
        ? classValue = ''
        : hasMessage && !chatOpened
          ? classValue = 'active'
          : classValue = 'active open'
      
      return classValue
    }
  }

  render() {
    const contextValue = {
      isLoggedIn: this.state.isLoggedIn,
      setIsLoggedIn: this.setIsLoggedIn,
      chatOpened: this.state.chatOpened,
      closeChat: this.closeChat,
      openMsg: this.openMsg,
      msgBtnClass: this.msgBtnClass(),
      startChat: this.startChat,
      chatRoomName: this.state.chatRoomName,
      expandNav: this.expandNav,
      navExpanded: this.state.navExpanded,
      query: this.state.query,
      defineQuery: this.defineQuery,
      hasMessage: this.state.hasMessage,
    }
    console.log(this.state.isLoggedIn)
    return (
      <UdownContext.Provider value={ contextValue }>
        <main className="App">
          <ErrorBoundary>

            {/* Components available anywhere */}
            <Route
              path="/"
              component={ Nav }
            />
            <Route
              path="/"
              component={ Chat }
            />
            <Route
              exact
              path="/"
              component={ this.state.isLoggedIn ? Home : LandingPage }
            />

            {/* Routes with specific paths */}
            <Route
              path="/home"
              component={ this.state.isLoggedIn ? Home : LandingPage }
            />
            { this.renderLoginSignup() }
            <Route
              path="/profile"
              component={ Profile }
            />
            <Route
                  path="/profileEdit"
                  component={ EditProfile }
                />
            <Route
              path="/chat/:roomName"
              component={ ChatRedirect }
            />
        </ErrorBoundary>
        </main>
      </UdownContext.Provider>
    );
  }
}

export default App;