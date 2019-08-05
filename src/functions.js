import React from 'react';
import config from './config';
import GoogleMapsLoader from 'react-google-maps'

const formFunctions = {

    // validation for all inputs where length of 3 or more characters needed
    inputLengthValidator(inputValue) {
        return Object.entries(inputValue)
            .map(val => val[1].length < 3 
                ? false 
                : true
            )
    },

    inputLength(inputValue) {
        return Object.entries(inputValue)
            .map(val => val[1].length < 3 
                ? val 
                : null
            )
    },
}

const authFunctions = {

    redirectIfLoggedIn(props, context) {
        if (context === true) {
            props.history.push(`/profile/${localStorage.user_id}`)
        }
    },

    setIdRedirect(props, result) {
        localStorage.user_id = result.id
        props.history.push(`/profile/${localStorage.user_id}`)
    },

    logout(props) {
        localStorage.removeItem('user_id')
        fetch(`${config.API_ENDPOINT}logout`, {
            method: 'GET',
            credentials: 'include'
        })
        .then(result => {
            props.history.push('/login')
        })
    }
}

const mapFunctions = {
    createMap(mapDiv) {
        GoogleMapsLoader.load((google) => {
            new google.maps.Map(mapDiv)
        })
    }
}

export default {
    formFunctions,
    authFunctions,
    mapFunctions
}