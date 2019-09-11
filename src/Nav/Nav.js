import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import UdownContext from '../UdownContext'
import functions from '../functions';
import './Nav.scss';

const authFunctions = functions.authFunctions

class Nav extends Component {
constructor(props) {
    super(props);
    this.queryRef = React.createRef()
    this.state = {
        toggledClass: false,
        searchbar_status: 'on',
        query: '',
        hasMsg: false,
    }
}


    static contextType = UdownContext

    componentDidUpdate() {
        const { hasMessage } = this.context
        hasMessage !== this.state.hasMsg 
            && (
                this.setState({
                    hasMsg: hasMessage
                })
            )
    }

    toggleMenu = e => {
        const { openMsg } =this.context
        if (window.innerWidth < 1099) {
            this.context.expandNav()
            this.setState({
                toggledClass: !this.state.toggledClass
            })
            e.target.innerHTML === 'Chat' && openMsg()
        }
    };

    viewChat = e => {
        const { isLoggedIn, openMsg } =this.context
        
        // close expanded nav menu
        this.context.expandNav()
            this.setState({
                toggledClass: !this.state.toggledClass
            })
        
        if (isLoggedIn) {
            // open chat
            e.target.innerHTML === 'Chat' && openMsg()
            this.state.hasMsg === true && (
                this.setState({
                    hasMsg: false
                })
            )  
        }

    }

    loginLogout = e => {
        if (this.context.isLoggedIn) {
            authFunctions.logout(this.props)
            this.context.setIsLoggedIn()
        }
        this.toggleMenu(e) 
    }

    inputFocus = () => {
        this.setState({
            searchbar_status: 'off'
        })
    }

    inputFocusout = () => {
        !this.state.query && (
            this.setState({ 
                searchbar_status: 'on' 
            })
        )
    }

    handleValue = e => {
        this.setState({
            query: this.queryRef.current.value
        })
    }

    searchQuery = e => {
        if (!e.key) {
            this.context.defineQuery(this.state.query)
            this.queryRef.current.value = ''
            const queryReset = Promise.resolve(this.setState({ query: '' }))
            queryReset.then(() => this.inputFocusout())
            this.props.history.push('/home')
        }
        else if (e.key === "Enter") {
            this.context.defineQuery(this.state.query)
            this.queryRef.current.value = ''
            this.setState({ query: '' })
            this.props.history.push('/home')
        }
    }

    render() {

        const navLinkClass = this.state.toggledClass ? "nav-links_container open" : "nav-links_container";
        const linkClass = this.state.toggledClass ? "nav-links fade" : "nav-links";
        const search_btn = !this.state.query ? "" : " on"
        const hasMsg = this.state.hasMsg ? "newMsg" : ""
        const loginLogout = this.context.isLoggedIn ? "Logout" : "Login"

        return (
            <nav>
            <div className="searchbar_container" onFocus={this.inputFocus} onBlur={this.inputFocusout}>
                <div id="magnifying-glass" className={this.state.searchbar_status}></div>
                    <input 
                        ref={this.queryRef} 
                        className="searchbar_input" 
                        placeholder="search..." 
                        onChange={this.handleValue} 
                        onKeyPress={this.searchQuery}
                    />
                </div>
                <div className="search" onClick={e => this.searchQuery(e)}>
                    <div className={`search_btn_container${search_btn}`}>
                        <div className={`search_btn${search_btn}`}>
                            <span className=""></span>
                        </div>
                    </div>
                </div>
                {/* to be integrated on next version */}
                {/* <div className={ `newMsg_notification ${hasMsg}` }/> */}
                <div className={`hamburger_container${search_btn}`}>
                    <div id="hamburger" className="hamburger" onClick={e => this.toggleMenu(e)}>
                      <div className={`line${search_btn}`}/>
                      <div className={`line${search_btn}`}/>
                      <div className={`line${search_btn}`}/>
                    </div>
                </div>
                <div className={ navLinkClass }>
                  <ul className={ linkClass }>
                    <NavLink className="link" name="home" to="/home" onClick={e => this.toggleMenu(e)}>Home</NavLink>
                    <span className={ `link ${hasMsg}`} name="chat" onClick={e => this.viewChat(e)}>Chat</span>
                    <NavLink className="link" name="profile" to="/profile" onClick={e => this.toggleMenu(e)}>Profile</NavLink>
                    <NavLink className="link" name="loginLogout" to="/login" onClick={e => this.loginLogout(e)}>{ loginLogout }</NavLink>
                  </ul>
                </div>
            </nav>
        );
    }
}

export default Nav;