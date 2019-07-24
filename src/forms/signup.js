import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import config from '../config';
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

    formValidate(stateVals) {
        if (functions.inputLengthValidator(stateVals).includes(false) === true) {
            
            const invalidArr = functions.inputLength(stateVals)
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
        const { username, password, retype_password } = this.state
        const stateVals = { username, password, retype_password }
        const newUser = { username, password }

        this.formValidate(stateVals)

        fetch(`${config.API_ENDPOINT}/users` , {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(err => {
                    throw err
                })
            }
            return res.json()
        })
        .then(data => {
            this.props.history.push('/profile')
        })
        .catch(err => {
            console.log(`Error: ${err}`)
        })
    }
    
    render() {

    return (
        <div>
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