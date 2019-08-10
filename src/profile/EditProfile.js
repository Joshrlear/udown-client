import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../config'
import UdownContext from '../UdownContext';
import functions from '../functions';
import './EditProfile.sass'

const authFunctions = functions.authFunctions

export default class EditProfile extends Component {
    constructor(props) {
    super(props)
    this.phone = React.createRef()
    this.state = {
      user_id: ''
    }
  }

    static contextType = UdownContext;

    
    componentWillMount() {
      console.log('this is trying to mount')
    }
    

    componentDidMount() {
      console.log("localStorage.user_id: ",localStorage.user_id)
      this.setState({
        "user_id": localStorage.user_id
      })
    }

    componentDidUpdate() {
      const user_id = this.state.user_id

      // change endpoint and router to user rather than images 
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
                return res.send('')
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

      const imageHeight = Math.ceil(window.outerHeight * 0.35);
      const imageWidth = Math.ceil(window.innerWidth);
        return (
            <div className="edit_profile_container">
                <div className="img_container">
                    <img id='profile-image' className="profile_image" src={`https://via.placeholder.com/${imageWidth}x${imageHeight}`} alt="User profile" />
                </div>
                <Link
                  to="/profile"
                  className="back_btn">
                  Back
                </Link>
                <form ref='uploadForm' 
                  id='uploadForm' 
                  action={`${config.API_ENDPOINT}profile/` }
                  method='post' 
                  encType="multipart/form-data">
                  <input type="file" name="imageUpload" />
                  <label>Phone: </label>
                  <input ref={ this.phone } className="phone" placeholder="6198821234"/>
                  <div className="input_note_container">
                    <p className="input_note">   
                      <em>
                          Phone number is used to send invites via text message based on you notification preference.
                      </em>
                    </p>
                  </div>
                  {/* <a className="save_btn"> */}
                    <input className="save" type='submit' value='Save' />
                  {/* </a> */}
                </form> 

            </div>
        )
    }
}