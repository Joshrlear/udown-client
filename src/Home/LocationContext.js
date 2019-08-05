import React from 'react'

const LocationContext = React.createContext({
    name: '',
    address: '',
    details: '',
    hours_of_operations: '',
    phone: ''
})

export default LocationContext