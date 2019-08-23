import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Enzyme from 'enzyme';
import Profile from './Profile';
import EditProfile from './EditProfile';


describe('Components', () => {
    const mappedComponents = [Profile, EditProfile]
    mappedComponents.map(Component => {
        it(`renders Components without crashing`, () => {
            const div = document.createElement('div')
            ReactDOM.render(
            <BrowserRouter>
               <Component/>
            </BrowserRouter>, div)
            ReactDOM.unmountComponentAtNode(div)
        })
    })
})