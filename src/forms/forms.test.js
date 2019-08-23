import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { shallow, mount, render } from 'enzyme'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Login from './login';
import Signup from './signup';

configure({ adapter: new Adapter() })

describe('Components', () => {
    const mappedComponents = ['Login', 'Signup']
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

        it(`handleInput should update state.username`, () => {
            const wrapper = mount(<Login />, {
                disableLifecycleMethods: true,
            })
            .instance();
            const input = wrapper.find('.username');
            expect(input.simulate('change', {
                target: { name: "username", value: "josh" }
            }))
            console.log(wrapper.state)
            expect(wrapper.state.username).toBe({
                'username': 'josh'
            })
        })

        it(`handleInput should update state.username`, () => {
            const wrapper = shallow(<Signup />, {
                disableLifecycleMethods: true,
            })
            .instance();
            wrapper.handleInput({target: { name: "username", value: "josh" }})
            console.log(wrapper.state)
            expect(wrapper.state.username).toBe({
                'username': 'josh'
            })
        })
})