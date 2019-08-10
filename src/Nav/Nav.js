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
        this.openMenu()
    }

    render() {

        const navLinkClass = this.state.toggledClass ? "nav-links_container open" : "nav-links_container";
        const linkClass = this.state.toggledClass ? "nav-links fade" : "nav-links";
        const navClass = this.state.navStatus ? "nav off" : "nav"

        return (
            <nav>
                <div id="hamburger" className="hamburger" onClick={e => this.openMenu(e)}>
                  <div className="line"></div>
                  <div className="line"></div>
                  <div className="line"></div>
                </div>
                <div className={ navLinkClass }>
                  <ul className={ linkClass }>
                    <NavLink className="link" name="home" to="/home" onClick={() => this.openMenu()}>Home</NavLink>
                    <NavLink className="link" name="profile" to="/profile"onClick={() => this.openMenu()}>Profile</NavLink>
                    <NavLink className="link" name="logout" to="/login" onClick={e => this.logout(e)}>Logout</NavLink>
                  </ul>
                </div>
            </nav>
        );
    }
}

export default Nav;