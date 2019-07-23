import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import inputLengthValidator from '../functions';
import './forms.css';

export default class Login extends Component {
    state = {
        error: true
    };

    handleInput = target => {
        this.setState({
            [target.name]: target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // filtering unwwanted state elements then validating state
        const stateVals = Object.keys(this.state)
        .filter((key, val) => key !== 'error' ? val : null)

        if (inputLengthValidator(stateVals) === false) {
            console.log('true')
            this.setState({
                error: true
            }) 
        } else { this.setState({ error: false }) }
        this.props.history.push('/profile')
    }

    render() {

    return (
        <div>
            <form
                className="login_form"
                onSubmit={this.handleSubmit}>
              <h2>Login</h2>
              <div>
                <label>Username: </label>
                <input 
                    name="Username"
                    placeholder="username here"
                    onChange={e => this.handleInput(e.target)}/>
              </div>
              <br/>
              <div>
                <label>Password: </label>
                <input 
                    name="Password"
                    placeholder="password here"
                    onChange={e => this.handleInput(e.target)}/>
              </div>
              <br/>
              <div className="button_container">
                <button type="submit">Login</button>
              </div>
              <br/>
              <NavLink
                    className="link"
                    to='/signup'>
                    Go to SignUp
                </NavLink>
            </form>
        </div>
    )}
}