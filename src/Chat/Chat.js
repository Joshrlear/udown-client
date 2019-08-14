import React, { Component } from 'react'
import asyncScriptLoader from 'async-script-loader'
import io from 'socket.io-client'
import UdownContext from '../UdownContext'
import uuid from 'uuid/v4'
import faker from 'faker'
import './Chat.sass'

let socket

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.chatInput = React.createRef()
        this.chatSection = React.createRef()
        this.state = {
            currentMessage: '',
            messages: [],
            userTyping: [],
        }
    }

    static contextType = UdownContext

    componentWillMount() {
        // connect to socket if no socket connected
        !socket && (this.connectSocket())
    }

    connectSocket() {
        socket = io(':8000')
        socket.on('chat_message', msg => {
            //console.log('updating...')
            this.setState({
                messages: [
                    ...this.state.messages, 
                    msg
                ]
            })
        })

        // displays: username is typing...
        socket.on('typing', user => {
            let timeout = null
            // if user not found in state
            if (this.state.userTyping.includes(user)) {
                // clear any previous timeout
                clearTimeout(timeout)
                // begin timeout
                timeout = setTimeout(() => {
                    // need to remove if user clicks off input.
                    // currently if they click off after backspace it
                    // keeps user in "userTyping" state
                    
                    // after 3 seconds all usernames will be removed
                    this.setState({
                        userTyping: []
                    })
                }, 3000)
            }
            else {
                this.setState({
                    userTyping: [...this.state.userTyping, user]
                })
            }
            //console.log(this.state.userTyping)
        })
    }

    closeChat = () => {
        this.context.openMsg()
    }

    handleInput = (message) => {
        const user = localStorage.username
        
        socket.emit('typing', user)
        console.log('inside chat, this is the chatRoomName', this.context.chatRoomName)
        const messageInfo = {
            username: localStorage.username,
            message: message
        }

        this.setState({
            currentMessage: messageInfo
        })
    }

    sendMessage= e => {
        e.preventDefault()
        const newMsg = this.state.currentMessage
        
        //console.log(newMsg)
        this.setState({
            messages: [...this.state.messages, newMsg]
        })

        socket.emit('chat_message', ({room: this.context.chatRoomName, user: localStorage.username, message: newMsg}))
        //socket.in(this.context.chatRoomName).emit('chat_message', newMsg)
        this.chatInput.current.value = ''
    }
    
    render() {
        const chatToggle = !this.context.chatOpened ? 'chat_container' : 'chat_container active'

        return(
        <>
            <div className={ chatToggle }>
                <div className="chat_title_container">
                <div className="back_arrow_container">
                    <a className="close_btn" onClick={this.closeChat}>Close</a>
                </div>
                    <h1 className="chat_title">Chat</h1>
                </div>
                <section ref={ this.chatSection } className="chat_section">
                    {/* need to move this into separate function later */}
                    <ul className="messages">
                        {this.state.messages.map((msg, i) => <li key={i} className="message">
                            <div  className="message_container">
                                <h3 className="from">{msg.username}</h3>
                                <p className="message_text">{msg.message}</p>
                            </div>
                        </li>)}
                    </ul>
                    <ul className="users_typing">
                        {this.state.userTyping.map((user, i) => <li key={i} className="user_typing">
                            <p className="typing_msg"><em>{`${user} is typing...`}</em></p>
                        </li>)}
                    </ul>
                </section>
                <form className="chat_input_section_container"
                onSubmit={e => {this.sendMessage(e)}}>
                    <div className="input_container">
                        <input 
                            ref={ this.chatInput } 
                            className="chat_intput" 
                            placeholder="type message..."
                            onChange={e => this.handleInput(e.target.value)}/>
                    </div>
                    <br/>
                    <div className="button_container">
                        <button 
                            className="send_button" 
                            type="submit">
                                Send
                        </button>
                    </div>
                    
                </form>
            </div>
            </>
    )
    }
}