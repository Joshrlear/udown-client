import React, { Component } from 'react';
import config from '../config';
import './profile.css';

const imageHeight = window.outerHeight * 0.35;
const imageWidth = window.innerWidth;

export default class Profile extends Component {

    state = {

    }  

    componentDidMount() {
      const path = this.props.location.pathname.split('/')
      const user_id = path[path.length - 1]
      console.log(user_id)

      this.setState({ user_id })

      fetch(`${config.API_ENDPOINT}images/${user_id}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "user_id": user_id
        }
      })
      .then(res => {
          if (!res.ok) {
            return res.json().then(error => {
              console.log(`Error: ${error}`)
              throw error
            })
          }
          return res.json()
        })
        .then(imageFile => {
          const image = imageFile.image

          this.setState({
            profileImage: image
          })
            document.getElementById('profile-image').src = `data:image/jpg;base64, ${image}`
        })
    }


    render() {
      
      return (
          <div className="profile_container">
              <div className="profile">
                <div className="img_container">
                  <img id='profile-image' className="profile_image" src={`https://via.placeholder.com/${imageWidth}x${imageHeight}`} alt="User profile" />
                </div>
                <form ref='uploadForm' 
                  id='uploadForm' 
                  action={`${config.API_ENDPOINT}profile/` }
                  method='post' 
                  encType="multipart/form-data">
                  <input type="file" name="imageUpload" />
                  <input type='submit' value='Upload!' />
                </form> 

              </div>
          </div>
      )
    }
}