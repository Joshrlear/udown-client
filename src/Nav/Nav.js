import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import UdownContext from '../UdownContext'
import ChatContext from '../Chat/ChatContext';
import functions from '../functions';
import './Nav.css';

const authFunctions = functions.authFunctions

class Nav extends Component {

    state = {
        toggledClass: false,
        navStatus:"nav_on",
        pathEntries: 0,
    }

    static contextType = UdownContext

    openMenu = e => {
        this.setState({
            toggledClass: !this.state.toggledClass
        })
    };

    logout = e => {
        authFunctions.logout(this.props)
    }

    navOff() {
        this.setState({
            navStatus: "nav_off"
        })
    }

    navOn() {
        this.setState({
            navStatus: "nav_on"
        })
    }

    /* componentDidMount() {
        const currentPath = this.props.location.pathname
        // find index for last path if one exists (greater than 0)
        const lastPath = this.context.userHistory.length && (this.context.userHistory.length - 1)
        console.log(lastPath)
        console.log(currentPath)
        
        // if current path exists (isn't falsy)
        currentPath
          // then check if lastPath exists (isn't falsy)
          &&  (lastPath
                // if last userHistory entry isn't equal to the current path
                ? this.context.userHistory[1] !== currentPath
                    // push currentPath as second value
                    && (this.setState({
                            pathEntries: 2
                        }, this.context.pushHistory(currentPath, 2))
                    )
                      
                // if lastPath doesn't exist push currentPath as initial value
                : this.setState({
                    pathEntries: 1
                }, this.context.pushHistory(currentPath, 1))
              )
    } */

    render() {

        {/*const chatContextValue = {
            navStatus: this.state.navStatus,
            navOff: this.navOff,
            navOn: this.navOn,
        }

         const udownContextValue = {
            currentPath: this.props.location.pathname,
            pathEntries: this.state.pathEntries,
        } */}

        const navLinkClass = this.state.toggledClass ? "nav-links_container open" : "nav-links_container";
        const linkClass = this.state.toggledClass ? "nav-links fade" : "nav-links";
        const navClass = this.state.navStatus ? "nav off" : "nav"

        return (
            <UdownContext.Provider value={ ''/* udownContextValue */ }>
                <ChatContext.Provider value={ ''/* chatContextValue */ }>
                    <nav className={navClass}>
                        <div id="hamburger" className="hamburger" onClick={e => this.openMenu(e)}>
                          <div className="line"></div>
                          <div className="line"></div>
                          <div className="line"></div>
                        </div>
                        <div className={ navLinkClass }>
                          <ul className={ linkClass }>
                            <NavLink className="link" name="home" to="/home">Home</NavLink>
                            <NavLink className="link" name="profile" to="/profile">Profile</NavLink>
                            <NavLink className="link" name="logout" to="/login" onClick={e => this.logout(e)}>Logout</NavLink>
                          </ul>
                        </div>
                    </nav>
                </ChatContext.Provider>
            </UdownContext.Provider>
        );
    }
}

export default Nav;