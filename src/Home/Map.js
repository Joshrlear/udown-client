import React, { Component, } from 'react';
import { GoogleMap, Marker } from 'react-google-maps';
import uuid from 'uuid/v4';
import LocationContext from './LocationContext'
import UdownContext from '../UdownContext'
import InfoDisplay from './InfoDisplay'
import fetches from '../fetches'

const { getLocations, getLocationPhoto } = fetches.mapFetches
const width = Math.ceil(window.innerWidth)
const hieght = Math.ceil(window.innerHeight / 5)

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLocation: null,
            hasSelection: false,
            setSelection: () => {}, 
            toggleClass: '',
            locations: [],
            locationPhoto: `https://via.placeholder.com/${width}x${hieght}`,
            locationImage: '',
            query: '',
        }
    }
    
    static contextType = UdownContext

    mapClick = (setSelection) => {
        this.setState({
            selectedLocation: null
        })
        setSelection(false)
    }

    setSelectedLocation = (loc, setSelection) => {

        let photo_ref

        // run only if updated hasSelection value
        if (this.state.selectedLocation !== loc) {
            this.setState({
                hasSelection: true,
            })
            setSelection(true)
        } 

        // set state only if loc.photo is truthy
        if (loc.photos) {
            photo_ref = loc.photos[0].photo_reference
            this.setState({
                selectedLocation: loc,
                locationPhoto: photo_ref,
            })
        } 
        // set state only if loc.photo is falsy
        else {
            this.setState({
                selectedLocation: loc
            })
        }


        
        
    }


    componentDidMount() {
        this.runQuerySearch()
    }

    runQuerySearch(){
        const result = Promise.resolve(getLocations(this.state.query))
        result.then((value) => {
            this.setState({
                locations: value.results
            })
        })
    }

    getLocationPhoto = () => {
        if (this.state.selectedLocation) {
            const result = getLocationPhoto(this.state.locationPhoto, width)
            this.setState({
                locationImage: result
            })
        }
    }

    componentDidUpdate() {

        // only starts on query search
        if (this.context.query) {
            // only start on unique query
            new Promise((resolve, reject, next) => {
                if (this.state.query !== this.context.query) {
                    resolve(
                        this.setState({
                            query: this.context.query
                        })
                    )
                }
            })
            .then(() => {
                this.runQuerySearch()
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    
    render() {

        const selectedLocation = this.state.selectedLocation
        //keeping photo_ref references for later updates
        /* const photo_reference = selectedLocation && (
            selectedLocation.photos &&(
                selectedLocation.photos[0].photo_reference
            )
        ) */

        const contextValue = {
            name: selectedLocation ? selectedLocation.name : 'Name',
            address: selectedLocation ? selectedLocation.formatted_address : 'Address',
            details: selectedLocation ? selectedLocation.details : 'Details',
            hours_of_operations: selectedLocation ? selectedLocation.opening_hours ? selectedLocation.opening_hours.open_now ? "Now Open" : "Now Closed" : 'Hours of operation not listed' : 'Open now?',
            phone: selectedLocation ? selectedLocation.phone : 'Phone number',
            photo: selectedLocation? selectedLocation.photos ? this.state.locationImage : null : null
        }

        const center = selectedLocation ? {lat: selectedLocation.geometry.location.lat, lng: selectedLocation.geometry.location.lng} : { lat: 32.8180, lng: -117.0560 }
        const zoom = selectedLocation ? 15 : 13
        return (
            <div className="map_container">
                <LocationContext.Consumer>
                    {({ setSelection }) => (
                    <GoogleMap
                        zoom={zoom}
                        center={center}
                        defaultOptions={{ disableDefaultUI: true }}
                        onClick={() => this.mapClick(setSelection)}
                    >
                    {/* incase there are no locations do nothing 
                    (there should always be locations unless google error) */}
                    {this.state.locations && this.state.locations.map(loc => (
                    
                        <Marker 
                            key={ uuid() }
                            position={{ 
                                lat: loc.geometry.location.lat, 
                                lng: loc.geometry.location.lng 
                            }}
                            onClick={() => {
                                this.setSelectedLocation(loc, setSelection)
                            }}
                            className="marker"
                        />
                    
                    ))}
                    </GoogleMap>
                )}
                </LocationContext.Consumer >
                <LocationContext.Provider value={contextValue}>
                    <InfoDisplay />
                </LocationContext.Provider>
            </div>
        )
    }
}