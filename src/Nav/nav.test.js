import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Enzyme from 'enzyme';
import Nav from './Nav';

describe('Nav', () => {
    it(`renders Nav without crashing`, () => {
        const div = document.createElement('div')
        ReactDOM.render(
        <BrowserRouter>
           <Nav/>
        </BrowserRouter>, div)
        ReactDOM.unmountComponentAtNode(div)
    })
})