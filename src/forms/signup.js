import React, { Component } from 'react';
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
    

    handleSubmit = (e) => {
        e.preventDefault();

        // filtering unwwanted state elements then validating state
        const { username, password, retype_password } = this.state
        const stateVals = { username, password, retype_password }

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
                this.setState({ error: false }) 
                this.props.history.push('/profile') 
            }
        }
        
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