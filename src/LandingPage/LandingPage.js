import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'

export default function LandingPage() {
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