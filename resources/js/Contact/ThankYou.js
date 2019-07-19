import React, { Component } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";

import Map from "../Map/MapContainer";

import "./ThankYou.scss";

export default class Thanks extends Component {
    render() {
        return (
            <>
                <BrowserRouter>
                    <Route path="/map" component={Map} />
                </BrowserRouter>
                <div id="thankyou-wrap">
                    <div className="big-icon">
                        <img src="img/send.png" alt="message" className="big" />
                    </div>
                    <h2>- Thank you for your feedback! -</h2>
                    <br/><br/><br/>
                    <div className="box3">
                        <div className="box-text">
                            <Link to="/map">
                                <button type="submit" className="btn btn-gray">
                                    <img src="img/ecologist.png" alt="love" className="smallIcon" style={{width:'30px'}}/>
                                    &ensp;Go Back to the Map
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
