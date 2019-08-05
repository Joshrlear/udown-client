import React from 'react';
import { Link } from 'react-router-dom';
import UdownContext from '../UdownContext';
import functions from '../functions';
import './LandingPage.css';

const authFunctions = functions.authFunctions

export default class LandingPage extends React.Component {

    static contextType = UdownContext;

    componentDidUpdate() {
        authFunctions.redirectIfLoggedIn(this.props, this.context.isLoggedIn)
    }


    render() {
        const containerClass = !this.context.chatOpened ? 'landing-page_container ' : 'landing-page_container off'

        return (
            <div className={ containerClass }>
                <div className="landing-page">
                    <h1 className="title">Landing Page</h1>
                    <div className="button_rack">
                        <Link to='/login'>
                            <button className="login">Login</button>
                        </Link>
                        <Link to='/signup'>
                            <button className="signup">Signup</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}