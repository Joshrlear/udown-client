import React, { Component, useContext } from 'react'
import { Link } from 'react-router-dom';
import UdownContext from '../UdownContext'
import ChatContext from './ChatContext'
//import newMsgIcon from './new-msg-01.svg'
import './ChatButton.sass'

export default class ChatButton extends Component {

    static contextType = UdownContext

    // click opens chat and removes nav
    handleClick = () => {
        const { openMsg } = this.context
        openMsg()
    }

    render() {

        //console.log(this.context.msgBtnClass)
        return (
            <div className="chat_button_container">
                
                {/* <img src="C:/Users/Josh/projects/capstones/first-full-capstonenew-msg-01.png"/> */}
                <a 
                    className={this.context.msgBtnClass} 
                    onClick={() => this.handleClick()}>
                    <h2>{`new\nmsg`}</h2>
                </a>
            </div>
        );
    } 
}