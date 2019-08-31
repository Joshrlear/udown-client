import React, { useContext } from 'react'
import UdownContext from '../UdownContext';

export default function ChatRedirect(props) {
    const { startChat } = useContext(UdownContext)
    const username = props.location.pathname.split('-')[props.location.pathname.split('-').length - 1]
    localStorage.username = username
    startChat()
    props.history.push('/home')

    return (
        
        <h2>This is where you go before redirect to chat</h2>
    )
}