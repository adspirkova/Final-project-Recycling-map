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
                        <img src="img/ecologist.svg" alt="message" className="big" />
                    </div>
                    <h2>- Thank You -</h2>
                    <br/><br/>

                    <div className="col-xs-9 description">
                        Your message was successfully sent.<br/>
                        We appreciate your time and we honestly value your opinions.<br/>
                    </div>

                    <br/><br/>

                    <div className="box3">
                        <div className="box-text">
                            <Link to="/map">
                                <button type="submit" className="btn btn-gray">
                                    <img src="img/icon/map3.svg" alt="map" className="smallIcon" style={{width:'30px'}}/>
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
