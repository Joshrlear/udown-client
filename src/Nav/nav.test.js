import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16';

import Nav from './Nav';

configure({ adapter: new Adapter() })

describe('Nav', () => {
    it(`renders Nav without crashing`, () => {
        const div = document.createElement('div')
        ReactDOM.render(
        <BrowserRouter>
           <Nav/>
        </BrowserRouter>, div)
        ReactDOM.unmountComponentAtNode(div)
    })

    it('renders Nav correctly', () => {
        const wrapper = shallow(<Nav/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})