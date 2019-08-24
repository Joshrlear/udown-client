import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LandingPage from './LandingPage';

configure({ adapter: new Adapter() })

describe('LandingPage rendering', () => {
    it(`renders LandingPage without crashing`, () => {
        const div = document.createElement('div');
        ReactDOM.render(
        <BrowserRouter>
           <LandingPage/>
        </BrowserRouter>, div)
        ReactDOM.unmountComponentAtNode(div)
    })

    const resizeWindow = (x, y) => {
        window.innerWidth = x;
        window.innerHeight = y;
        window.dispatchEvent(new Event('resize'));
      }
      
    it('should display the window size', () => {
        const component = shallow(<LandingPage />);

        resizeWindow(320, 568);
        expect(component.html()).toMatchSnapshot();

        resizeWindow(1024, 1366);
        expect(component.html()).toMatchSnapshot();

        resizeWindow(1920, 1080);
        expect(component.html()).toMatchSnapshot();
    });
})