import React from 'react'

const LocationContext = React.createContext({
    name: '',
    address: '',
    details: '',
    hours_of_operations: '',
    phone: '',
    isSelected: () => {},
    isUnselected: () => {},
    hasSelection: false
})

export default LocationContext