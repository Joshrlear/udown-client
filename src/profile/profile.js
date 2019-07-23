import React, { Component } from 'react';
import './profile.css';

export default class Profile extends Component {

    state = {

    }  


    render() {
        const img = `https://via.placeholder.com/${window.innerWidth}x200`
        
        return (
            <div className="profile_container">
                <div className="profile">
                  <div className="img_container">
                    <img src={img}/>
                    <button id="upload-image" className="upload_image">+ Upload</button>
                  </div>
                  <br/>
                  <form className="profile_info">
                    <div>
                      <label>Username: </label>
                      <input id="username"/>
                    </div>
                    <br/>
                    <div>
                      <label>Headline: </label>
                      <input id="headline" placeholder="I still need to fill this out..."/>
                    </div>
                  </form>
                  <section className="button_container">
                    <button id="save-button" className="save_button">Save</button>
                    <button id="home-button" className="home_button">Home</button>
                 </section>
                </div>
            </div>
        )
    }
}