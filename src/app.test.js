import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Enzyme from 'enzyme';
import App from './App';



describe('Components', () => {
    it(`renders App without crashing`, () => {
        const div = document.createElement('div')
        ReactDOM.render(
        <BrowserRouter>
           <App/>
        </BrowserRouter>, div)
        ReactDOM.unmountComponentAtNode(div)
    })
})