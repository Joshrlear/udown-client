import React, { Component, useState } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import uuid from 'uuid/v4';
import config from '../config';
import './Home.css';
import LocationContext from './LocationContext'
import locations from '../data/tennis-courts.json'
import InfoDisplay from './InfoDisplay'

function Map() {

    const [selectedLocation, setSelectedLocation] = useState(null);
    const [toggleClass, setToggleClass] = useState('')

    // fix this after main functions complete
    /* async function isSelected() {
        setToggleClass(toggleClass === '' ? ' isActive' : '')
        const toBeToggled = await selectedLocation && (selectedLocation.setAttribute('className', `marker ${toggleClass}`))
    } */

    const contextValue = {
        name: selectedLocation ? selectedLocation.name : 'Name',
        address: selectedLocation ? selectedLocation.address : 'Address',
        details: selectedLocation ? selectedLocation.details : 'Details',
        hours_of_operations: selectedLocation ? selectedLocation.hours_of_operations : 'Hours of operations',
        phone: selectedLocation ? selectedLocation.phone : 'Phone number'
    }

    return (
        <>
            <GoogleMap
                defaultZoom={11}
                defaultCenter={{ lat: 32.8180, lng: -117.0560 }}
                defaultOptions={{ disableDefaultUI: true }}
            >
                {locations.map(loc => (
                    <Marker 
                        key={ uuid() } 
                        position={{ 
                            lat: loc.position.lat, 
                            lng: loc.position.long 
                        }}
                        onClick={() => {
                            setSelectedLocation(loc)
                            //isSelected(loc)
                        }}
                        onCloseClick={() => {
                            setSelectedLocation(null)
                        }}
                        className="marker"
                    />
                ))}

            </GoogleMap>
            <LocationContext.Provider value={contextValue}>
                <InfoDisplay />
            </LocationContext.Provider>
        </>
    )
}


const WrappedMap = withScriptjs(withGoogleMap(Map))

class Home extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {

        }
    }

    componentDidMount() {
        // this fetch request works. commented out for development purposes
        // need to flesh out how people will interact with the data before using actual data
        
        /* fetch(`${config.API_ENDPOINT}home/map`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            return res.json()
        })
        .then(res => {
            console.log(res)
        }) */
    }
    
    render() {
        
        return (
            <div className="map_container">
                <div id="map" ref={this.myRef}>
                    <WrappedMap
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${config.GOOGLE_API_KEY}`}
                        loadingElement={<div style={{ height: "100%" }}/>}
                        containerElement={<div style={{ height: "100%" }}/>}
                        mapElement={<div style={{ height: "100%" }}/>}
                    />
                </div>
            </div>
        );
    }
}

export default Home;