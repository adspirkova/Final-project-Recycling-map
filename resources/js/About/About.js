import React, { Component } from 'react'
import './About.scss';

export default class About extends Component {

    render () {
        return (
            <div id="about-wrap">
                <div className="big-icon">
                    <img src="img/icon/search3.svg" alt="garbage" className="big"/>
                </div>

                <h2>- About Bin Icon -</h2>

                <div className="row">
                    <div className="col-xs-3">
                    <img src="img/icon/1-plastic1.svg" alt="plastic" className="explainIcon"/>
                    </div>
                    <div className="col-xs-9">
                    EN:Plastic<br/>
                    CZ:Plasly
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-3">
                    <img src="img/icon/2-namagomi2.svg" alt="namagomi" className="explainIcon"/>
                    </div>
                    <div className="col-xs-9">
                    EN:Food Scrap<br/>
                    CZ:-
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-3">
                        <img src="img/icon/3-glass2.svg" alt="glass" className="explainIcon"/>
                    </div>
                    <div className="col-xs-9">
                    EN:Transparent Glass<br/>
                    CZ:Bile Sklo
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-3">
                        <img src="img/icon/4-glass1.svg" alt="plastic" className="explainIcon"/>
                    </div>
                    <div className="col-xs-9">
                    EN:Colorful Glass<br/>
                    CZ:Barevne Sklo
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-3">
                        <img src="img/icon/5-paper1.svg" alt="plastic" className="explainIcon"/>
                    </div>
                    <div className="col-xs-9">
                    EN:Paper<br/>
                    CZ:Papir
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-3">
                    <img src="img/icon/6-battery1.svg" alt="plastic" className="explainIcon"/>
                    </div>
                    <div className="col-xs-9">
                    EN:Battery<br/>
                    CZ:-
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-3">
                    <img src="img/icon/7-can1.svg" alt="plastic" className="explainIcon"/>
                    </div>
                    <div className="col-xs-9">
                    EN:Metal Can<br/>
                    CZ:-
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-3">
                    <img src="img/icon/8-textil1.svg" alt="plastic" className="explainIcon"/>
                    </div>
                    <div className="col-xs-9">
                    EN:Textil<br/>
                    CZ:-
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-3">
                    <img src="img/icon/9-cloth1.svg" alt="plastic" className="explainIcon"/>
                    </div>
                    <div className="col-xs-9">
                    EN:Cloth<br/>
                    CZ:-
                    </div>
                </div>
                <br/><br/><br/>
            </div>
        )

    }
}
