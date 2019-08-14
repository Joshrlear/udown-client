import config from '../config'

const mapFetches = {
    
    // get map markers based on query
    getLocations(query) {
        
        return (
            fetch(`${config.API_ENDPOINT}home/map`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'query': query
                }
            })
            .then(res => {
                if (!res.ok) { return res.json().then(err => {
                     throw err 
                    })
                }
                else {
                    return res.json() 
                }
            })
            .then(res => {
                console.log('mapFetches/getLocations res: ', res)
                return res
            })
            .catch(err => {
                console.log('Error: ', err)
            })
        )
    },

    // Get location photo from google api
    getLocationPhotos(locationPhoto, width) {
        fetch(`${config.API_ENDPOINT}home/location-photo`, {
            method: 'POST',
            headers: {
              //'ContentType': 'application/json',
              'photo': locationPhoto,
              'width': width
            }
          })
          .then(res => {
              if(!res.ok) { res.json().then(err => { throw err }) }
              else {
              // currently it is not receiving info from server.
              // the objectURL is just a link to my website showing only nav bar...
              console.log('here! ', res.headers)
              res.blob().then(blob => {
                  const objectURL = URL.createObjectURL(blob)
                  {
                      /* this.setState({
                      locationImage: objectURL
                  }) */
                }
                  return objectURL
              })
            }
          })
          /* .then(results => console.log('here is the response for location-photo: ', results)) */
          .catch(err => console.log(err))
    }
}


export default {
    mapFetches,
}