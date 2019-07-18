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
                <div className="col-xs-9">
                    <p>
                        Find Bin helps you to find a recycling bin near you in
                        Prague. A website is made for a mobile phone, but also
                        can be used on your laptop. Also it allows you to add
                        new recycle bin on the map .
                        <br />
                        Type of recycling bins that you can see on the map:
                    </p>
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
                        CZ:
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
                        CZ:
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
                        CZ:-
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
                        CZ:
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
                        CZ:
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
                        CZ:-
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
                        CZ:-
                    </div>
                </div>
                <br />
                <br />
                <br />
            </div>
        );
    }
}
