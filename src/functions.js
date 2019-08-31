import config from './config';
import GoogleMapsLoader from 'react-google-maps'

const formFunctions = {

    // validation for all inputs where length of 3 or more characters needed
    inputLengthValidator(inputValue) {
        return Object.entries(inputValue)
            .map(val => val[1].length < 3 
                ? val[0] === 'retype_password' ? 'retyped password' : val[0]
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

    redirectIfLoggedIn(props, loggedIn) {
        // if user is logged in
        if (loggedIn === true) {
            localStorage.user_id && props.history.push(`/profile/${localStorage.user_id}`)
        }
        // if user not logged in and user trys to go to profile/editProfile
        else if (props.location) {
            const pathname = props.location.pathname
            pathname.match(/\b(\w*profile\w*)\b/ig) && props.history.push(`/login`)
        }
    },

    setIdRedirect(props, data) {
        localStorage.user_id = data.user_id
        localStorage.username = data.username
        props.history.push(`/profile/${localStorage.user_id}`)
    },

    logout(props) {
        localStorage.removeItem('user_id')
        localStorage.removeItem('username')
        fetch(`${config.API_ENDPOINT}logout`, {
            method: 'GET'
        })
        .then(result => {
            props.history.push('/')
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