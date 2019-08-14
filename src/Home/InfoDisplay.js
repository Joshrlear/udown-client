import React, { useContext, useEffect, useState } from 'react'
import config from '../config'
import io from 'socket.io-client'
import LocationContext from './LocationContext'
import udownContext from '../UdownContext'
import './InfoDisplay.sass'

let socket
socket = io(':8000')

export default function InfoDisplay(props) {
  const width = Math.ceil(window.innerWidth)
  const hieght = Math.ceil(window.innerHeight / 5)
  const location = useContext(LocationContext)
  const chatFuncs = useContext(udownContext)
  const [locationPhoto, setLocationPhoto] = useState(`https://via.placeholder.com/${width}x${hieght}`)

  function sendTxt() {
    const { chatOpened, startChat } = chatFuncs
    //console.log(location.name)
    
    //console.log('this is the socket: ', socket)
    /* socket.on('smsStatus', (data) => {
      console.log(`text sent to ${data.number}`)
    }) */
    fetch(`${config.API_ENDPOINT}text`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'username': localStorage.username,
        'location': location.name
      }
    })
    .then(res => {
      if(!res.ok) {
        return res.json().then(err => {
          console.log('error here: ', err)
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
      console.log('res is right here: ', res)
      !chatOpened && (startChat(room))
    })
    .catch(err => {
      console.log(err)
    })
  }

  // removing photo till google places api figured out
  return (
      <div className={location.name === "Name" ? "info_display" : "info_display active"}>
        {/* <img src={location.photo || `https://via.placeholder.com/${width}x${hieght}`}/> */}
        <div className="info_container">
        <div className="button_container">
          <button>Directions</button>
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

