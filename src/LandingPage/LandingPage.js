import React from 'react';
import UdownContext from '../UdownContext';
import './LandingPage.css';
import background from './images/tennisGuyHappy.png'
import infoDisplay from './images/infoDisplay@300x.png'
import map from './images/map@300x.png'
import chatToNav from './images/chatToNav.png'
import statusMap from './images/desktop_map-icons-01.png'
import msgs from './images/phone_msgs.png'

export default class LandingPage extends React.Component {

    static contextType = UdownContext;

    render() {
        const containerClass = !this.context.chatOpened ? 'landing-page_container ' : 'landing-page_container off'

        return (
            <div className={ containerClass }>
                <div className="landing-page">
                    <section className="title_section">
                        <div className="title_container">
                            <h1 className="title">udown</h1>
                            <h3 className="subtitle">anytime | anywhere</h3>
                            <a className="demo_link" href="https://youtu.be/B_JTZHo4pgs" target="_blank" rel="noopener noreferrer">See Demo</a>
                        </div>
                        <div className="background_container">
                            <img alt="excited tennis player" className="background" src={ background }/>
                        </div>
                    </section>
                    <section className="map_section">
                        <div className="map_main_container">
                            <div className="phone_container">
                                <img alt="blurred phone displaying map" className="map" src={ map }/>
                                <img alt="phone displaying info of chosen location" className="infoDisplay" src={ infoDisplay }/>
                            </div>
                            <article className="textBox_container">
                                <h3>
                                    udown helps you plan<br/>
                                    events, matches, and<br/>
                                    hangouts now, not later.
                                </h3>
                            </article>
                        </div>
                    </section>
                    <section className="chat_section">
                        <div className="chat_whitespace"/>
                        <div className="chat_main_container">
                            <header className="chat_text_container">
                                <h2 className="chat_text">
                                    Ready. Set. Go!
                                </h2>
                            </header>
                            <div className="chat_img_container">
                                <img alt="phone with three floating screens showing process from text message, to chat, to navigation" className="chat_img" src={ chatToNav }/>
                            </div>
                            <article className="chat_quote_container">
                                <p className="chat_quote">
                                    <em>
                                        "...there really isn't anything<br/>
                                        that brings us together in<br/>
                                        the real world... so I built it."
                                    </em>
                                </p>
                            </article>
                        </div>
                    </section>
                        <section className="map_msgs_section">
                            <img alt="map displaying users and their events" className="status_map" src={ statusMap }/>
                            <img alt="phone displaying chat feature" className="status_msgs" src={ msgs }/>
                        </section>
                        <section className="status_section">
                            <header className="status_header_container">
                                <h2 className="status_project_title">Project udown</h2>
                                <p className="status">| active</p>
                            </header>
                            <article className="status_description_container">
                                <p className="description_title">Description</p>
                                <p className="description">
                                    Do you like planning far out or hate other
                                    people? Then this app is likely not for you
                                    <br/>
                                    <br/>
                                    For those of you who answered no to the
                                    previous question, join us on the platform
                                    built to bring soon to be "besties" together
                                    <br/>
                                    <br/>
                                    udown is a (soon to be) cross-platform app
                                    that connects locasls who are currently, like
                                    right now, looking for others to play tennis,
                                    basketball, go to the gym, bar, or even
                                    protest their current cause with.
                                    <br/>
                                    <br/>
                                    For video on how to use this website click the 
                                    YouTube icon.
                                </p>
                            </article>
                            <footer className="status_icon_links">
                                <a href="https://github.com/Joshrlear/udown-client"><span className="fab fa-github-square fa-2x"/></a>
                                <a href="https://www.facebook.com/josh.lear.7"><span className="fab fa-facebook-square fa-2x"/></a>
                                <a href="https://youtu.be/B_JTZHo4pgs" target="_blank" rel="noopener noreferrer"><span className="fab fa-youtube-square fa-2x"/></a>
                            </footer>
                        </section>
                </div>
            </div>
        )
    }
}