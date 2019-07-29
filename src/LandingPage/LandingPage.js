import React from 'react';
import { Link } from 'react-router-dom';
import UdownContext from '../UdownContext';
import functions from '../functions';
import './LandingPage.css';


export default class LandingPage extends React.Component {

    static contextType = UdownContext;

    componentDidUpdate() {
        functions.redirectIfLoggedIn(this.props, this.context.isLoggedIn)
    }


    render() {
        return (
            <div className="landing-page_container">
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