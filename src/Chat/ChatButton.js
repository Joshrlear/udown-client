import React, { Component, useContext } from 'react'
import { Link } from 'react-router-dom';
import UdownContext from '../UdownContext'
//import newMsgIcon from './new-msg-01.svg'
import './ChatButton.sass'

export default class ChatButton extends Component {

    static contextType = UdownContext

    // click opens chat
    handleClick = () => {
        const { openMsg } = this.context
        openMsg()
    }

    render() {
        const navExpanded = this.context.navExpanded ? "" : "active"
        return (
            <div className={`chat_button_container ${navExpanded}`}>
                
                {/* <img src="C:/Users/Josh/projects/capstones/first-full-capstonenew-msg-01.png"/> */}
                <a 
                    className={`chat_button ${this.context.msgBtnClass}`} 
                    onClick={() => this.handleClick()}>
                    <h2>{`new\nmsg`}</h2>
                </a>
            </div>
        );
    } 
}