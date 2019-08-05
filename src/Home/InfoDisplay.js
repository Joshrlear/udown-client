import React, { useContext } from 'react'
import config from '../config'
import io from 'socket.io-client'
import LocationContext from './LocationContext'
import './InfoDisplay.css'

export default function InfoDisplay(props) {
    const location = useContext(LocationContext)

    const width = Math.ceil(window.innerWidth)
    const hieght = Math.ceil(window.innerHeight / 3)

    function sendTxt() {
      //const socket = io()
      //console.log('this is the socket: ', socket)
      /* socket.on('smsStatus', (data) => {
        console.log(`text sent to ${data.number}`)
      }) */

      fetch(`${config.API_ENDPOINT}text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
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
        console.log('res is right here: ', res)
      })
      .catch(err => {
        console.log(err)
      })
    }

    return (
        <div className="info_display">
          <img src={`https://via.placeholder.com/${width}x${hieght}`}/>
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
                <p>{location.details || "Location Details"}</p>
              <div className="address">
                <h3>Address:</h3>
                <p>{location.address || "Location Address"}</p>
              </div>
            </section>
          </main>
        </div>
    )
}

