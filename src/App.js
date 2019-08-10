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
  }

  /* static contextType = UdownContext

  pushHistory = (currentPath, pathEntries) => {

    console.log(currentPath, pathEntries)

    switch (pathEntries || 0) {
      case 2:
        this.setState({ userHistory: [this.state.userHistory[0], currentPath] })
        break
      case 1:
        this.setState({ userHistory: currentPath })
        break
      case 0:
        break
    }

    // if current path exists
    currentPath
      // then check if lastPath exists
      &&  (lastPath
            // if last userHistory entry isn't equal to the current path
            ? this.state.userHistory[1] !== currentPath
                // push currentPath as second value
                && (this.setState({
                      userHistory: [this.state.userHistory[lastPath], currentPath]
                    }, console.log('pushed second path'))
                )
                  
            // if lastPath doesn't exist push currentPath as initial value
            : this.setState({
              userHistory: currentPath
            }, console.log('pushed initial path'))
          ) 
  }*/

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

  // opens chat when socket room created (after clicking play - on infoDisplay)
  startChat = chatRoomName => {
    console.log(chatRoomName)
    this.setState({
      chatOpened: true,
      chatRoomName
    })
  }

  // if new message, click button to open chat
  openMsg = () => {

    this.setState({
      chatOpened: !this.state.chatOpened
    })
    setTimeout(() => this.setState({
      hasMessage: !this.state.hasMessage
    }))
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

  msgBtnClass() {
    const chatOpened = this.state.chatOpened
    const hasMessage = this.state.hasMessage
    let classValue
    !hasMessage
      ? classValue = 'chat_button'
      : hasMessage && !chatOpened
        ? classValue = 'chat_button active'
        : classValue = 'chat_button active open'
    
    return classValue
  }

  render() {
    const contextValue = {
      //userHistory: this.state.userHistory,
      //pushHistory: this.pushHistory,
      isLoggedIn: this.state.isLoggedIn,
      chatOpened: this.state.chatOpened,
      openMsg: this.openMsg,
      msgBtnClass: this.msgBtnClass(),
      startChat: this.startChat,
      chatRoomName: this.state.chatRoomName,
    }

    //console.log(this.state.userHistory)

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
              path="/"
              component={ ChatButton }
            />
            <Route
              exact
              path="/"
              component={ LandingPage }
            />

            {/* Routes with specific paths */}
            <Route
              path="/home"
              component={ Home }
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