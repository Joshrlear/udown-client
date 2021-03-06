import React, { Component } from 'react';
import config from '../config';
import { NavLink } from 'react-router-dom';
import UdownContext from '../UdownContext';
import functions from '../functions';
import ErrorMsg from '../Errors/ErrorMsg/ErrorMsg';
import './forms.scss';

const formFunctions = functions.formFunctions
const authFunctions = functions.authFunctions

export default class Login extends Component {
    state = {
        error: true,
        username: '',
        password: '',
    };

    static contextType = UdownContext;

    handleInput = target => {
        const value = target.value.toLowerCase()
        this.setState({
            [target.name]: value
        })
    }

    formValidate(user) {
        const form = formFunctions.inputLengthValidator(user)
        if (!form.every(val => val === true)) {
            const filter = form.filter(val => val !== true)
            const invalidFields = filter.length === 2 
                ? 'username and password are'
                : form.filter(val => val !== true)
            const errorMsg = `${invalidFields} invalid`
            this.setState({
                error: true,
                errorMsg
            })
            return false
        } 
        else {
            this.setState({
                error: false, 
                errorMsg: ''
            })
            return true
        } 
    }
  

    handleSubmit = (e) => {
        e.preventDefault();
        // filtering unwwanted state elements then validating state
        const { username, password } = this.state
        const   user = { username, password }

        if (this.formValidate(user)) {
            fetch(`${config.API_ENDPOINT}login`, {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json"
                }
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
                    errorMsg: error.errorMsg
                })
            })            
        }
    }

    componentWillMount() {
        authFunctions.redirectIfLoggedIn(this.props, this.context.isLoggedIn)
    }

    render() {
        
    return (
        <div className="login_container">
            <section className="test_account_info">
                <h3>Test account</h3>
                <p>username: test</p>
                <p>password: password</p>
                </section>
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
                    className="username"
                    placeholder="username here"
                    onChange={e => this.handleInput(e.target)}/>
              </div>
              <br/>
              <div>
                <label>Password: </label>
                <input 
                    type="password"
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