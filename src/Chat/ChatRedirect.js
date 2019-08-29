import React, { useContext } from 'react'
import io from 'socket.io-client'
import config from '../config'
import UdownContext from '../UdownContext';

let socket
socket = io(config.API_ENDPOINT)

export default function ChatRedirect(props) {
    const { startChat } = useContext(UdownContext)
    //const roomName = props.location.pathname.replace("/chat/", "")
    //socket.emit('join_room', ({ room: 'viral-III-35', user: localStorage.username }))
    /* socket.on(`${localStorage.username} has joined`, () => {
        
    }) */
    const username = props.location.pathname.split('-')[props.location.pathname.split('-').length - 2]
    console.log(props.location.pathname.split('-'))
    console.log(username)
    localStorage.username = username
    startChat()
    props.history.push('/home')

    return (
        
        <h2>This is where you go before redirect to chat</h2>
    )
}