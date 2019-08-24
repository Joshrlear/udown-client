import React, { useContext } from 'react'
import io from 'socket.io-client'
import UdownContext from '../UdownContext';

let socket
socket = io(':8000')

export default function ChatRedirect(props) {
    const { startChat } = useContext(UdownContext)
    const roomName = props.location.pathname.replace("/chat/", "")
    socket.emit('join_room', ({ room: 'viral-III-35', user: localStorage.username }))
    socket.on(`${localStorage.username} has joined`, () => {
        startChat()
        props.history.push('/home')
    })

    return (
        <h2>This is where you go before redirect to chat</h2>
    )
}