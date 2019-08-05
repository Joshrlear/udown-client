import React, { Component } from 'react'
import asyncScriptLoader from 'async-script-loader'
import { Link } from 'react-router-dom'
import UdownContext from '../UdownContext'
import './Chat.sass'

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.chatInput = React.createRef()
    }

    static contextType = UdownContext

    componentWillMount() {
        asyncScriptLoader('http://localhost:5000/socket.io/socket.io.js', true)
        .then(() =>{
            console.log('Chat server has loaded!')
        })
        .then(() => {
            asyncScriptLoader('./udown-server/chat/chat-router.js', true)
            .then(() => {
                console.log('loaded chat-router script')
            })
            .catch(err => {
                console.log('Error loading Chat script: ', err)
            })
        })
        .catch(err => {
            console.log('Error loading Chat server: ', err)
        })   
    }

    goBack = () => {
        this.props.history.goBack()
    }

    render() {
        const chatToggle = !this.context.chatOpened ? 'chat_container' : 'chat_container active'

        return(
        <>
            <div className={ chatToggle }>
                <div className="chat_title_container">
                <div className="back_arrow_container">
                    {/* <a href="#">
                    <span className="back_arrow"></span>
                    </a> */}
                    <Link
                        //to={this.context.userHistory.length -1}
                        onClick={this.goBack}
                    >
                        Back
                    </Link>
                </div>
                    <h1 className="chat_title">Chat</h1>
                </div>
                <section className="chat_section">

                </section>
                <section className="chat_input_section_container">
                    <div className="input_container">
                        <input ref={ this.chatInput } className="chat_intput" placeholder="type message"/>
                    </div>
                    <div className="button_container">
                        <button className="send_button" type="button" >Send</button>
                    </div>
                    
                </section>
            </div>
            </>
    )
    }
}