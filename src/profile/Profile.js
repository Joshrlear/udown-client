import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import UdownContext from '../UdownContext';
import functions from '../functions';
import fetches from '../fetches'
import './profile.scss'

const { getProfileImage, getProfilePhone } = fetches.profileFetches
const authFunctions = functions.authFunctions

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_id: '',
      username: 'username',
      phone_number: 'No phone number'
    }
  }

    static contextType = UdownContext;

    
    componentWillMount() {
      authFunctions.redirectIfLoggedIn(this.props, this.context.isLoggedIn)
    }
    

    componentDidMount() {
      // get username
      if (localStorage.username) {
        const username = localStorage.username
        this.setState({
          username
        })
      }

      // get user phone_number
      if (localStorage.user_id) {
        const user_id = localStorage.user_id
        const phoneResult = Promise.resolve(getProfilePhone(user_id, 'phone_number'))
        phoneResult.then(value => {
          if (value) {
            this.state.phone !== value.field && (
              this.setState({
                phone_number: value.field
              })
            )
          }
        })

      }
      
      const user_id = localStorage.user_id
      this.context.setIsLoggedIn()

      const result = Promise.resolve(getProfileImage(user_id, this.props))
      result.then(value => {
        if (value.image) {
          const image = value.image.image
          document.getElementById('profile-image').src = `data:image/jpg;base64, ${image}`
        }
        else { return null }
      })
    }

    render() {

      const imageHeight = Math.ceil(window.outerHeight * 0.35);
      const imageWidth = Math.ceil(window.innerWidth);
      const phonenumber = this.state.phone_number ? this.state.phone_number : 'No phone number'

      return (
          <div className="profile_container">
              <div className="profile">
                <div className="img_container">
                  <img id='profile-image' className="profile_image" src={`https://via.placeholder.com/${imageWidth}x${imageHeight}`} alt="User profile" />
                </div>
                <div className="profile_info">
                  <header className="profile_header">
                    <h3 className="profile_name">{ this.state.username }</h3>
                    <p className="phone_number">{ phonenumber }</p>
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