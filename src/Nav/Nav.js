import React, { Component } from 'react';
import './Nav.css';

class Nav extends Component {
    state = {
        toggledClass: false
    }

    openMenu = (e) => {
        this.setState({
            toggledClass: !this.state.toggledClass
        })
    };

    render() {
        const navLinkClass = this.state.toggledClass ? "nav-links_container open" : "nav-links_container";
        const linkClass = this.state.toggledClass ? "nav-links fade" : "nav-links";

        return (
            <nav>
                <div id="hamburger" className="hamburger" onClick={e => this.openMenu(e)}>
                  <div className="line"></div>
                  <div className="line"></div>
                  <div className="line"></div>
                </div>
                <div className={ navLinkClass }>
                  <ul className={ linkClass }>
                    <li>Home</li>
                    <li>Profile</li>
                    <li>Logout</li>
                  </ul>
                </div>
            </nav>
        );
    }
}

export default Nav;