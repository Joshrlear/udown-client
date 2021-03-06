import config from './config'

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
                return res
            })
            .catch(err => {
            })
        )
    },

    // Get location photo from google api
    getLocationPhotos(locationPhoto, width) {
      return (
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
              // keep as it will be updated in the future
              res.blob().then(blob => {
                  const objectURL = URL.createObjectURL(blob)
                  return objectURL
              })
            }
          })
          .catch(err => console.log(err))
      )
    }
}

const profileFetches = {
  getProfileImage(user_id, props) {

    return (
      fetch(`${config.API_ENDPOINT}profile/${user_id}/images`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "user_id": user_id
          }
        })
        .then(res => {
            if (!res.ok) {
              return res.json().then(error => {
                if (res.status !== 401) {
                  throw error
                }
                else {
                  props.history.push('/login')
                  return res.json()
                }
              })
            }
            else if (res.status === 204) {
              return res
            }
            else { return res.json() }
            
          })
          .catch(error => {
            console.log(error)
          })
      )
  },

  getProfilePhone(user_id, field) {
    return (
      fetch(`${config.API_ENDPOINT}profile/${user_id}/${field}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "user_id": user_id,
          "field": "phone_number"
        }
      })
      .then(res => {
          if (!res.ok) {
            return res.json().then(error => {
              if (res.status !== 401) {
                throw error
              }
              else {
                return res.json()
              }
            })
          }
          return res.json()
        })
        .catch(error => {
          console.log(error)
        })
    )
  },

  getOtherUsers(user_id, field) {
    return (
      fetch(`${config.API_ENDPOINT}profile/${user_id}/others/${field}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "user_id": user_id,
          "field": "phone_number"
        }
      })
      .then(res => {
          if (!res.ok) {
            return res.json().then(error => {
              if (res.status !== 401) {
                throw error
              }
              else {
                return res.json()
              }
            })
          }
          return res.json()
        })
        .catch(error => {
          console.log(error)
        })
    )
  },

  getUsername(user_id) {
    fetch('/')
  }
}

export default {
    mapFetches,
    profileFetches,
}