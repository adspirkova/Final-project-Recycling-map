import React, { Component } from "react";
import { BrowserRouter, Link, Route } from 'react-router-dom';

import Map from '../Map/MapContainer';

import "../About/About";

export default class Thanks extends Component {
    render() {
        
        return (
            <>
            <BrowserRouter>
            <Route path="/map" component={Map} />
            </BrowserRouter>
            <div id="about-wrap">
                <div className="big-icon">
                    <img
                        src="/img/send.png"
                        alt="message"
                        className="big"
                    />
                </div>

                <h2>- Thank you for your feedback! -</h2>
            </div>
            <div>
            <img
                        src="/img/ecologist.png"
                        alt="love"
                        className="big"
                    />
                <Link to="/map" > Go Back to the Map</Link>
            </div>
            </>
        
        );
    }
}
