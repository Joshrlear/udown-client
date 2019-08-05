import React, { Component, useContext } from 'react'
import { Link } from 'react-router-dom';
import UdownContext from '../UdownContext'
import ChatContext from './ChatContext'
import './ChatButton.sass'

export default class ChatButton extends Component {

    static contextType = UdownContext

    // click opens chat and removes nav
    handleClick = (openMsg, navStatus, navOff, navOn) => {

        openMsg()
        // if nav class on turn off after 1 sec
        setTimeout(() => 
            (navStatus === 'nav_on') 
            ? navOff() 
            : navOn()
            , 1000
        )
    }

    render() {
        const buttonClass = !this.context.chatOpened ? "chat_button_container" : "chat_button_container opened"

        return (
            <ChatContext.Consumer>
                { (navStatus, navOff, navOn) => (
                    <UdownContext.Consumer>
                        {(openMsg, msgBtnClass) => (
                            <div className="chat_button_container">
                                <Link to="/chat">
                                    <button 
                                        className={msgBtnClass} 
                                        /* onClick={this.handleClick(openMsg, navStatus, navOff, navOn)} */>
                                    </button>
                                </Link>
                            </div>
                        )}
                    </UdownContext.Consumer>
                )}
            </ChatContext.Consumer>
        );
    } 
}