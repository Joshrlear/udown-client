import React, { Component } from 'react';
import config from '../config';
import { NavLink } from 'react-router-dom';
import functions from '../functions';
import ErrorMsg from '../ErrorMsg/ErrorMsg';
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

    formValidate(newUser) {
        if (functions.inputLengthValidator(newUser).includes(false) === true) {
            
            const invalidArr = functions.inputLength(newUser)
            const invalid = invalidArr.filter(val => val !== null).map(val => val[0]).join(', ')
            const errorMsg = `Invalid fields: ${invalid}`
            this.setState({
                error: true,
                errorMsg
            }) 
        } 
        else {
            // validate retype_password
            if (this.state.password !== this.state.retype_password) {
                console.log('failed password')
                this.setState({
                    error: true
                }) 
            } 
            else { 
                this.setState({ 
                    error: false, 
                    errorMsg: ''
                }) 
            }
        }
    }    

    handleSubmit = (e) => {
        e.preventDefault();
        // filtering unwwanted state elements then validating state
        const { username, password } = this.state
        const   newUser = { username, password }

        this.formValidate(newUser)

        fetch(`${config.API_ENDPOINT}login`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "username": username,
                "password": password
            }
        })
        .then(res => {
            console.log(res)
        })   
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