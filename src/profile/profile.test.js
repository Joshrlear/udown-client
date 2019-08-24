import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16';

import Profile from './Profile';
import EditProfile from './EditProfile';

configure({ adapter: new Adapter() })

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

    it('renders Profile correctly', () => {
        const wrapper = shallow(<Profile/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it('renders EditProfile correctly', () => {
        const wrapper = shallow(<EditProfile/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})