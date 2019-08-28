import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../config'
import UdownContext from '../UdownContext';
import functions from '../functions';
import fetches from '../fetches'
import './profile.scss'
import { thisExpression } from '@babel/types';

const { getProfileImage, getProfilePhone } = fetches.profileFetches
const authFunctions = functions.authFunctions

const imageHeight = Math.ceil(window.outerHeight * 0.35);
const imageWidth = Math.ceil(window.innerWidth);

export default class EditProfile extends Component {
    constructor(props) {
      super(props)
      this.imageUpload = React.createRef()
      this.phoneNumber = React.createRef()
      this.state = {
        user_id: '',
        profileImage: `https://via.placeholder.com/${imageWidth}x${imageHeight}`,
        phone: '',
        imageUpload: 'Upload Image',
      }
    }

    static contextType = UdownContext;
    
    componentDidMount() {

      this.setState({
        "user_id": localStorage.user_id
      })
    }

    componentDidUpdate() {
      const user_id = localStorage.user_id

      // get profile image
      const imageResult = Promise.resolve(getProfileImage(user_id, this.props))
      imageResult.then(value => {
        if (value) {
          const base64Image = value.image.image
          const image = `data:image/jpg;base64, ${base64Image}`
          /* document.getElementById('profile-image').src = `data:image/jpg;base64, ${image}` */
          value && (
            this.state.profileImage !== image  && (
              this.setState({
                profileImage: image
              })
            )
          )
          
        }
      })

      // get user phone_number
      const phoneResult = Promise.resolve(getProfilePhone(user_id, 'phone_number'))
      phoneResult.then(value => {
        if (value) {
          this.state.phone !== value.field && (
            this.setState({
              phone: value.field
            })
          )
        }
      })
    }

    handleSubmit = (e) => {
      e.preventDefault()
      const user_id = localStorage.user_id
      const imageUpload = this.imageUpload.current.files[0] ? this.imageUpload.current.files[0] : null
      const imageName = this.imageUpload.current.files[0] ? `${Date.now()}-${this.imageUpload.current.files[0].name}` : null
      const phoneNumber = this.phoneNumber.current.value ? this.phoneNumber.current.value : null

      const formData = new FormData()
      this.imageUpload.current.files[0] && formData.append('image', imageUpload, imageName)
      formData.append('phone', phoneNumber)
      console.log('LLLLLLLLLLLL',user_id)
      fetch(`${config.API_ENDPOINT}profile/${user_id}`, {
        method: 'POST',
        body: formData,
        headers: { "user_id": user_id }
        //credentials: 'include' 
      })
      .then(res => {
        if (!res.ok) {
          return res.json().then(err => {
            throw err
          })
        }
        else {
          console.log(res)
          return res
        }
      })
      .catch(err => {
        console.log(err)
      })
    }

    handleValue = () => {
      const imgName = this.imageUpload.current.value.split('fakepath\\')[1]
      this.setState({
        imageUpload: imgName
      })
    }

    render() {
        return (
          <div className="edit_profile_container">
            <div className="edit_profile">
                <div className="img_container">
                    <img id='profile-image' className="profile_image" src={this.state.profileImage} alt="User profile" />
                </div>
                <form ref='uploadForm' 
                  id='uploadForm' 
                  onSubmit={e => this.handleSubmit(e)}
                  method='post' 
                  encType="multipart/form-data">
                  <input 
                    ref={ this.imageUpload }
                    onChange={ this.handleValue } 
                    type="file" 
                    name="imageUpload"
                    id="imageUpload" />
                    <label htmlFor="imageUpload" className="imageUpload"><span>{ this.state.imageUpload || 'No Image Selected' }</span></label>
                  <label className="phone_label">Edit Phone:</label>
                  <input 
                    ref={ this.phoneNumber } 
                    className="phone" 
                    placeholder="no number yet..." 
                    defaultValue={ this.state.phone } 
                    disabled={ localStorage.username == "test" }
                  />
                  <div className="input_note_container">
                    <p className="input_note">   
                      <em>
                          Phone number is used to send<br/>
                          invites via text message.
                      </em>
                    </p>
                  </div>
                  <div className="button_rack">
                    {/* <a className="save_btn"> */}
                      <input className="save_btn" type='submit' value='Save' />
                    {/* </a> */}
                  </div>
                </form>
            </div>
          </div>
        )
    }
}