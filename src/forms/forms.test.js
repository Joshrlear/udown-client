import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16';

import Login from './login';
import Signup from './signup';

configure({ adapter: new Adapter() })

describe('Components', () => {
    it(`renders Login without crashing`, () => {
        const div = document.createElement('div')
        ReactDOM.render(
        <BrowserRouter>
           <Login />
        </BrowserRouter>, div)
        ReactDOM.unmountComponentAtNode(div)
    })

    it(`renders Signup without crashing`, () => {
        const div = document.createElement('div')
        ReactDOM.render(
        <BrowserRouter>
           <Signup />
        </BrowserRouter>, div)
        ReactDOM.unmountComponentAtNode(div)
    })

    it('renders Login correctly', () => {
        const wrapper = shallow(<Login/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it('renders Signup correctly', () => {
        const wrapper = shallow(<Signup/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it(`handleInput should update state.username`, () => {
        const wrapper = shallow(<Login />).instance()
        wrapper.handleInput({ name: "username", value: "testUser" })
        expect(wrapper.state.username).toStrictEqual("testUser")
    })

    it(`handleInput should update state.username`, () => {
        const wrapper = shallow(<Signup />).instance()
        wrapper.handleInput({ name: "username", value: "testUser" })
        expect(wrapper.state.username).toStrictEqual("testUser")
    })
})