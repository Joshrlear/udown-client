import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import config from '../config';
import UdownContext from '../UdownContext';
import functions from '../functions';
import fetches from '../fetches'
import EditProfile from './EditProfile'
import './profile.scss'

const { getProfileImage } = fetches.profileFetches
const authFunctions = functions.authFunctions

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_id: ''
    }
  }

    static contextType = UdownContext;

    
    componentWillMount() {
      authFunctions.redirectIfLoggedIn(this.props, this.context.isLoggedIn)
    }
    

    componentDidMount() {
      const user_id = localStorage.user_id

      const result = Promise.resolve(getProfileImage(user_id, this.props))
      result.then(value => {
        if (value) {
          const image = value.image.image
          document.getElementById('profile-image').src = `data:image/jpg;base64, ${image}`
        }
      })
    }

    render() {

      const imageHeight = Math.ceil(window.outerHeight * 0.35);
      const imageWidth = Math.ceil(window.innerWidth);

      return (
          <div className="profile_container">
              <div className="profile">
                <div className="img_container">
                  <img id='profile-image' className="profile_image" src={`https://via.placeholder.com/${imageWidth}x${imageHeight}`} alt="User profile" />
                </div>
                <div className="profile_info">
                  <header className="profile_header">
                    <h3 className="profile_name">Name</h3>
                  </header>
                </div>
                <Link
                  to="/profileEdit"
                  className="edit_btn">
                  Edit
                </Link>
              </div>
          </div>
      )
    }
}