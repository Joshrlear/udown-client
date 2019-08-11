import React, { Component, useState, useRef } from 'react';
import { withScriptjs, withGoogleMap } from 'react-google-maps';
import config from '../config';
import LocationContext from './LocationContext'
import InfoDisplay from './InfoDisplay'
import Map from './Map'
import './Home.sass';

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

    isSelected = (boolean) => {
        console.log('is selected')
        this.setState({
            hasSelection: boolean
        })
    }

    isUnselected = (boolean) => {
        console.log('no selection')
        this.setState({
            hasSelection: boolean
        })
    }
    
    render() {
        const contextValue = { 
            hasSelection: this.state.hasSelection,
            isSelected: this.isSelected,
            isUnselected: this.isUnselected
            }

        const height = this.state.hasSelection ? "35vh" : "100vh"
            console.log(process.env.NODE_ENV)
        return (
            <LocationContext.Provider value={ contextValue }>
                <div className="map_container">
                    <div id="map" ref={this.myRef}>
                        <WrappedMap
                            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${config.GOOGLE_MAPS_API_KEY}`}
                            loadingElement={<div style={{ height: height }}/>}
                            containerElement={<div style={{ height: height }}/>}
                            mapElement={<div style={{ height: height }}/>}
                        />
                    </div>
                </div>
            </LocationContext.Provider>
        );
    }
}

export default Home;