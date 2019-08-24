import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json'
import { BrowserRouter } from 'react-router-dom';
import Chat from './Chat';

configure({ adapter: new Adapter() })

describe('Chat', () => {
    const mappedComponents = ['Chat']
    mappedComponents.map(Component => {
        it(`renders ${Component} without crashing`, () => {
            const div = document.createElement('div');
            ReactDOM.render(
            <BrowserRouter>
               { `<${Component }/>` }
            </BrowserRouter>, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        
    })
    
    it(`handleInput should update state.currentMessage`, () => {
        const wrapper = shallow(<Chat />).instance();
        wrapper.handleInput('message')
        expect(wrapper.state.currentMessage).toStrictEqual({
            'username': undefined,
            'message': 'message'
        })
    })

    it('renders Chat correctly', () => {
        const wrapper = shallow(<Chat/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})