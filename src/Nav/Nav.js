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
        query: ''
    }
}


    static contextType = UdownContext

    openMenu = e => {
        this.context.expandNav()
        this.setState({
            toggledClass: !this.state.toggledClass
        })
    };

    logout = e => {
        authFunctions.logout(this.props)
        this.openMenu()
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
        }
        else if (e.key === "Enter") {
            this.context.defineQuery(this.state.query)
            this.queryRef.current.value = ''
            this.setState({ query: '' })
        }
    }

    render() {

        const navLinkClass = this.state.toggledClass ? "nav-links_container open" : "nav-links_container";
        const linkClass = this.state.toggledClass ? "nav-links fade" : "nav-links";
        const search_btn = !this.state.query ? "" : " on"

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
                <div className="search" onClick={e => this.searchQuery(e)}></div>
                    <div className={`search_btn_container${search_btn}`}>
                        <div className={`search_btn${search_btn}`}>
                            <span className=""></span>
                        </div>
                    </div>
                
                <div className={`hamburger_container${search_btn}`}>
                    <div id="hamburger" className="hamburger" onClick={e => this.openMenu(e)}>
                      <div className={`line${search_btn}`}></div>
                      <div className={`line${search_btn}`}></div>
                      <div className={`line${search_btn}`}></div>
                    </div>
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