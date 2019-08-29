import React, { useContext, useEffect, useState } from 'react'
import config from '../config'
import io from 'socket.io-client'
import LocationContext from './LocationContext'
import udownContext from '../UdownContext'
import fetches from '../fetches'
import './InfoDisplay.scss'

let socket
socket = io(config.API_ENDPOINT)

export default function InfoDisplay(props) {
  const width = Math.ceil(window.innerWidth)
  const hieght = Math.ceil(window.innerHeight / 5)
  const location = useContext(LocationContext)
  const chatFuncs = useContext(udownContext)
  const [locationPhoto, setLocationPhoto] = useState(`https://via.placeholder.com/${width}x${hieght}`)

  function sendTxt() {
    const { chatOpened, startChat } = chatFuncs
    const { getOtherUsers } = fetches.profileFetches
    const { user_id } = localStorage

    // get user phone_number
    const phoneResult = Promise.resolve(getOtherUsers(user_id, 'phone_number'))
    phoneResult.then(value => {
      if (value) {
        value.map(user => console.log('getOtherUsers info',user))
        let otherUser
        const users = value.map(user => 
          otherUser = {
            'user_id': user.id,
            'phone': user.phone_number
          })
          console.log(users)
         const reqBody = { 
          'username': localStorage.username, 
          'location': location.name,
          'users': users
        }
        fetch(`${config.API_ENDPOINT}text`, {
              method: 'POST',
              body: JSON.stringify(reqBody),
              headers: {
                'Content-Type': 'application/json'
              }
            })
            .then(res => {
              if(!res.ok) {
                return res.json().then(err => {
                  throw err
                })
              }
              else {
                return res.json()
              }
            })
            .then(res => {
              const user = res.username
              const room = res.roomName
              const loc = {
                name: location.name,
                address: location.address
              }
              //socket.emit('join', { user, room, loc })
              !chatOpened && (startChat(room))
            })
            .catch(err => {
              console.log(err)
            })
      }
      else {console.log('no one has a number :(')}
    }) 
  }

  return (
      <div className={location.name === "Name" ? "info_display" : "info_display active"}>
        {/* <img src={location.photo || `https://via.placeholder.com/${width}x${hieght}`}/> */}
        <div className="info_container">
        <div className="button_container">
          <button className="playBtn" onClick={sendTxt}>PLAY</button>
        </div>
          <main className="info">
            <div className="header-button">
              <header>
                <h2>{location.name || "Location Name"}</h2>
                <p>Currently Available!</p>
              </header>
            </div>
            <section className="main_info">
                <p>{location.hours_of_operations}</p>
              <div className="address">
                <h3>Address:</h3>
                <p>{location.address || "Location Address"}</p>
              </div>
            </section>
          </main>
        </div>
      </div>
  )
}

