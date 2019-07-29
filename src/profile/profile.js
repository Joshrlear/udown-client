import React, { Component } from 'react';
import config from '../config';
import UdownContext from '../UdownContext';
import functions from '../functions';
import './profile.css';

const imageHeight = window.outerHeight * 0.35;
const imageWidth = window.innerWidth;

export default class Profile extends Component {

    state = {
      user_id: ''
    }  

    static contextType = UdownContext;

    
    componentWillMount() {
      functions.redirectIfLoggedIn(this.props, this.context.isLoggedIn)
    }
    

    componentDidMount() {
      const path = this.props.location.pathname.split('/')
      const user_id = path[path.length - 1]

      this.setState({
        user_id
      })
    }

    componentDidUpdate() {
      const user_id = this.state.user_id

      fetch(`${config.API_ENDPOINT}profile/${user_id}/images`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "user_id": user_id
        },
        credentials: 'include'
      })
      .then(res => {

          if (!res.ok) {
            return res.json().then(error => {
              if (res.status !== 401) {
                throw error
              }
              else {
                this.props.history.push('/login')
              }
            })
          }
          
          return res.json()
        })
        .then(res => {
          if (res !== undefined) {
           
            const image = res.image.image
            document.getElementById('profile-image').src = `data:image/jpg;base64, ${image}`
          }
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