import React, { Component, } from 'react';
import { GoogleMap, Marker } from 'react-google-maps';
import config from '../config'
import uuid from 'uuid/v4';
import LocationContext from './LocationContext'
//import locations from '../data/tennis-courts.json'
import InfoDisplay from './InfoDisplay'

const width = Math.ceil(window.innerWidth)
const hieght = Math.ceil(window.innerHeight / 5)

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLocation: null,
            toggleClass: '',
            locations: [],
            locationPhoto: `https://via.placeholder.com/${width}x${hieght}`,
        }
    }
    
    
    static contextType = LocationContext

    setSelectedLocation = (value) => {
        //console.log('this is the value', value, 'this is the photo', value.photos[0].photo_reference)
        const photo_ref = value.photos[0].photo_reference
        this.setState({
            selectedLocation: value,
            locationPhoto: photo_ref
        })
    }

    componentDidMount() {
        // this fetch request works. commented out for development purposes
        // need to flesh out how people will interact with the data before using actual data
        
        fetch(`${config.API_ENDPOINT}home/map`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            return res.json()
        })
        .then(res => {
            this.setState({
                locations: res.results
            })
            console.log(res)
        })
    }


    // This router should be all good but I am receiving a 403 unauthorized error saying
    // that I have met my quota indicated by the icon in the Network > preview
    // I don't seem to have exceeded anyb quota when looking on google cloud console
    // I have contacted sales to ask about it... consider removing photos for now.
    getLocationPhoto = () => {
        console.log('getting location photo')
        console.log(this.state.locationPhoto)
        this.state.selectedLocation && (
            
            // Get location photo from google api
            fetch(`${config.API_ENDPOINT}home/location-photo`, {
              method: 'POST',
              headers: {
                'ContentType': 'application/json',
                'photo': this.state.locationPhoto,
                'width': width
              }
            })
            .then(res => {
                console.log('here is the response for location-photo: ', res)
              if (!res.ok) {
                return res.json().then(err => {
                  console.log('Error getting photo from google: ', err)
                  throw err
                })
              }
              else {
                  console.log(res.headers.content)
                return res.json()
              }
            })
            .then(res => {
              console.log(res)
              //setLocationPhoto(res)
            })
        )
    }

    // fix this after main functions complete
    /* async function isSelected() {
        setToggleClass(toggleClass === '' ? ' isActive' : '')
        const toBeToggled = await selectedLocation && (selectedLocation.setAttribute('className', `marker ${toggleClass}`))
    } */
    componentDidUpdate() {
        console.log('Map Component Updating')
        const { hasSelection, isSelected, isUnselected } = this.context
        if (this.state.selectedLocation !== null) {
            console.log('running true')
            !hasSelection && (
                isSelected(true)
            )
        } 
        else {
            console.log('running false')
            hasSelection && (
                isUnselected(false)
            )
        }
    }

    mapClick = () => {
        this.setState({
            selectedLocation: null
        })
    }

    
    render() {
        const selectedLocation = this.state.selectedLocation
        const photo_reference = selectedLocation && (
            selectedLocation.photos &&(
                selectedLocation.photos[0].photo_reference
            )
        )

        this.state.selectedLocation && (this.getLocationPhoto())

        const contextValue = {
            name: selectedLocation ? selectedLocation.name : 'Name',
            address: selectedLocation ? selectedLocation.formatted_address : 'Address',
            details: selectedLocation ? selectedLocation.details : 'Details',
            hours_of_operations: selectedLocation ? selectedLocation.opening_hours ? selectedLocation.opening_hours.open_now ? "Now Open" : "Now Closed" : 'Hours of operation not listed' : 'Open now?',
            phone: selectedLocation ? selectedLocation.phone : 'Phone number',
            photo: selectedLocation? selectedLocation.photos ? photo_reference : null : null
        }

        const center = selectedLocation ? {lat: selectedLocation.geometry.location.lat, lng: selectedLocation.geometry.location.lng} : { lat: 32.8180, lng: -117.0560 }
        const zoom = selectedLocation ? 13 : 11
        return (
            <>
                <GoogleMap
                    zoom={zoom}
                    center={center}
                    defaultOptions={{ disableDefaultUI: true }}
                    onClick={this.mapClick}
                >
                    {this.state.locations.map(loc => (
                    
                        <Marker 
                            key={ uuid() }
                            position={{ 
                                lat: loc.geometry.location.lat, 
                                lng: loc.geometry.location.lng 
                            }}
                            onClick={() => {
                                this.setSelectedLocation(loc)
                            }}
                            onCloseClick={() => {
                                this.setSelectedLocation(null, null)
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
}