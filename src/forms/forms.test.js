import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
//import { shallow } from 'enzyme';
//import toJson from 'enzyme-to-json';
import Login from './login';
import Signup from './signup';

describe('Login/Signup Component', () => {
    it('renders Login without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>, div)
        ReactDOM.unmountComponentAtNode(div)
    })
    
    it('renders Signup without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(
        <BrowserRouter>
            <Signup />
        </BrowserRouter>, div)
        ReactDOM.unmountComponentAtNode(div)
    })
})