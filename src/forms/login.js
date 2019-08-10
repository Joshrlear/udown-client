import React, { Component } from 'react';
import config from '../config';
import { NavLink } from 'react-router-dom';
import UdownContext from '../UdownContext';
import functions from '../functions';
import ErrorMsg from '../Errors/ErrorMsg/ErrorMsg';
import './forms.css';

const formFunctions = functions.formFunctions
const authFunctions = functions.authFunctions

export default class Login extends Component {
    state = {
        error: true
    };

    static contextType = UdownContext;

    handleInput = target => {
        this.setState({
            [target.name]: target.value
        })
    }

    formValidate(newUser) {
        if (formFunctions.inputLengthValidator(newUser).includes(false) === true) {
            
            const invalidArr = formFunctions.inputLength(newUser)
            const invalid = invalidArr.filter(val => val !== null).map(val => val[0]).join(', ')
            const errorMsg = `Invalid fields: ${invalid}`
            this.setState({
                error: true,
                errorMsg
            }) 
        } 
        else {
            this.setState({
                error: false, 
                errorMsg: ''
            })
        } 
    }
  

    handleSubmit = (e) => {
        e.preventDefault();
        // filtering unwwanted state elements then validating state
        const { username, password } = this.state
        const   newUser = { username, password }

        this.formValidate(newUser)

        fetch(`${config.API_ENDPOINT}login`, {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(error => {
                    
                    throw error
                })
            }
            
            return res.json()
            
        })
        .then(data => {
            authFunctions.setIdRedirect(this.props, data)
        })
        .catch(error => {
            this.setState({
                errorMsg: error.message
            })
        })
    }

    componentDidUpdate() {
        authFunctions.redirectIfLoggedIn(this.props, this.context.isLoggedIn)
    }

    render() {
        
    return (
        <div>
            <form
                className="login_form"
                onSubmit={this.handleSubmit}>
              <h2>Login</h2>
              <ErrorMsg
                errorMsg={this.state.errorMsg}
              />
              <div>
                <label>Username: </label>
                <input 
                    name="username"
                    placeholder="username here"
                    onChange={e => this.handleInput(e.target)}/>
              </div>
              <br/>
              <div>
                <label>Password: </label>
                <input 
                    name="password"
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