import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import config from '../config';
import UdownContext from '../UdownContext';
import functions from '../functions';
import ErrorMsg from '../Errors/ErrorMsg/ErrorMsg';
import './forms.scss';

const formFunctions = functions.formFunctions

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

    formValidate(stateVals) {

        if (formFunctions.inputLengthValidator(stateVals).includes(false) === true) {

            const invalidArr = formFunctions.inputLength(stateVals)
            const invalid = invalidArr.filter(val => val !== null).map(val => val[0]).join(', ')
            const errorMsg = `Invalid fields: ${invalid}`
            this.setState({
                error: true,
                errorMsg
            })
            return false
        } 
        else {
            // validate retype_password

            if (this.state.password !== this.state.retype_password) {
                console.log('failed password')
                this.setState({
                    error: true,
                    errorMsg: `Passwords don't match`
                })
                return false
            } 
            else {
                this.setState({ 
                    error: false, 
                    errorMsg: ''
                }, )
                return true
            }
        }
    }
    

    handleSubmit = (e) => {
        e.preventDefault();
        const { username, password, retype_password } = this.state
        const stateVals = { username, password, retype_password }
        const newUser = { username, password }

        // wait for valid inputs
        let validated = new Promise((resolve, reject) => {
            this.formValidate(stateVals) === true
            ? resolve()
            : reject()
        })

        // if valid inputs run fetch request
        validated.then(() => {
            fetch(`${config.API_ENDPOINT}signup` , {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: {
                    'Content-Type': 'application/json'
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
                functions.setIdRedirect(this.props, data)
            })
            .catch(error => {
                this.setState({
                    errorMsg: error.message
                })
            })
        })
    }

    componentDidUpdate() {
        functions.redirectIfLoggedIn(this.props, this.context.isLoggedIn)
    }
    
    render() {

    return (
        <div className="signup_container">
            <form 
                className="signup_form"
                onSubmit={this.handleSubmit}>
              <h2>Signup</h2>
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
              <div>
                <label>Retype password: </label>
                <input 
                    name="retype_password"
                    placeholder="password here"
                    onChange={e => this.handleInput(e.target)}/>
              </div>
              <br/>
              <div className="button_container">
                <button
                    type="submit">
                    SignUp
                </button>
                </div>
                <br/>
              <NavLink
                    className="link"
                    to='/login'>
                    Go to Login
                </NavLink>
            </form>
        </div>
    )}
}