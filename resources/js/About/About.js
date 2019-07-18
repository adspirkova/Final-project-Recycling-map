import React, { Component } from "react";
import "./About.scss";

export default class About extends Component {
    render() {
        return (
            <div id="about-wrap">
                <div className="big-icon">
                    <img
                        src="img/image-new/garbage.png"
                        alt="garbage"
                        className="big"
                    />
                </div>

                <h2>- About "Find bin" -</h2>
                <div className="col-xs-9 description">
                    Find Bin helps you to find a recycling bin near you in Prague.<br/>
                    A website is made for a mobile phone, but also can be used on your laptop.<br/>
                    It also allows you to add new recycle bin on the map.<br/>
                </div>

                <div className="picturesBox">
                    <div className="row">
                        <div className="col-xs-3 kasen">
                        Type of recycling bins on the map:
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-3">
                            <img
                                src="img/clear-glass2.png"
                                alt="clear glass"
                                className="explainIcon"
                            />
                        </div>
                        <div className="col-xs-9">
                            EN:Clear glass
                            <br />
                            CZ: Čiré sklo
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-3">
                            <img
                                src="img/glass2.png"
                                alt="colored glass"
                                className="explainIcon"
                            />
                        </div>
                        <div className="col-xs-9">
                            EN:Colored glass
                            <br />
                            CZ: Barevné sklo
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-3">
                            <img
                                src="img/can.png"
                                alt="metal"
                                className="explainIcon"
                            />
                        </div>
                        <div className="col-xs-9">
                            EN:Metal
                            <br />
                            CZ: Kovy
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-3">
                            <img
                                src="img/cardboard.png"
                                alt="cardboard"
                                className="explainIcon"
                            />
                        </div>
                        <div className="col-xs-9">
                            EN:Cardboard
                            <br />
                            CZ: Nápojové kartony
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-3">
                            <img
                                src="img/paper.png"
                                alt="paper"
                                className="explainIcon"
                            />
                        </div>
                        <div className="col-xs-9">
                            EN:Paper
                            <br />
                            CZ: Papír
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-3">
                            <img
                                src="img/electric.png"
                                alt="Electric equipment"
                                className="explainIcon"
                            />
                        </div>
                        <div className="col-xs-9">
                            EN:Electric equipment
                            <br />
                            CZ: Elektrozařízení
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-3">
                            <img
                                src="img/water.png"
                                alt="plastic"
                                className="explainIcon"
                            />
                        </div>
                        <div className="col-xs-9">
                            EN:Plastic
                            <br />
                            CZ: Plasty
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <br />
            </div>
        );
    }
}
