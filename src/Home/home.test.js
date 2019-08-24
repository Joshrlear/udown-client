import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import { withScriptjs, withGoogleMap } from 'react-google-maps';
import config from '../config';


import Home from './Home';
import InfoDisplay from './InfoDisplay';
import Map from './Map';

configure({ adapter: new Adapter() })

describe('Components', () => {
    const mappedComponents = [Home, InfoDisplay]
    mappedComponents.map(Component => {
        it(`renders without crashing`, () => {
            const div = document.createElement('div')
            ReactDOM.render(
            <BrowserRouter>
               <Component/>
            </BrowserRouter>, div)
            ReactDOM.unmountComponentAtNode(div)
        })
    })
    const WrappedMap = withScriptjs(withGoogleMap(Map))
    test("renders Map correctly", () => {
        const wrapper = shallow(<WrappedMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${config.GOOGLE_MAPS_API_KEY}`}
            loadingElement={<div className="loadingElement" style={{ height: '100%' }}/>}
            containerElement={<div className="containerElement" style={{ height: '100%' }}/>}
            mapElement={<div className="mapElement" style={{ height: '100%', width: '100%' }}/>}
        />);
      
        expect(wrapper).toMatchSnapshot();
    });
    const location = {
        name: 'park name',
        address: '123 main street',
        hours_of_operations: 'open'
    }

    it('renders Home correctly', () => {
        const wrapper = shallow(<Home/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it('renders InfoDisplay with location properties', () => {
        const wrapper = shallow(<InfoDisplay location={ location }/>)
        expect(toJson(wrapper)).toMatchSnapshot();
    })
})