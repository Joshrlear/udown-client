import React, { Component, useState, useRef } from 'react';
import { withScriptjs, withGoogleMap } from 'react-google-maps';
import config from '../config';
import LocationContext from './LocationContext'
import InfoDisplay from './InfoDisplay'
import Map from './Map'
import './Home.scss';

const WrappedMap = withScriptjs(withGoogleMap(Map))

class Home extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            hasSelection: false
        }
    }

    static contextType = LocationContext

    setSelection = (boolean) => {
        this.state.hasSelection !== boolean && (
            this.setState({
                hasSelection: boolean
            })
        )   
    }
    
    render() {
        const contextValue = { 
            hasSelection: this.state.hasSelection,
            setSelection: this.setSelection,
        }

        // controls map size on selection (only on mobile)
        const isMobileDevice = window.innerWidth <= 1023
        const height = isMobileDevice && this.state.hasSelection ? "35vh" : "100vh"
        const width = !isMobileDevice && this.state.hasSelection ? "55vw" : "100vw"
        return (
            <LocationContext.Provider value={ contextValue }>
                <div className="map_container">
                    <div id="map" ref={this.myRef}>
                        <WrappedMap
                            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${config.GOOGLE_MAPS_API_KEY}`}
                            loadingElement={<div className="loadingElement" style={{ height: height }}/>}
                            containerElement={<div className="containerElement" style={{ height: height }}/>}
                            mapElement={<div className="mapElement" style={{ height: height, width: width}}/>}
                        />
                    </div>
                </div>
            </LocationContext.Provider>
        );
    }
}

export default Home;