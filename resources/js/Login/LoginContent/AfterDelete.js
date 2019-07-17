import React, { Component } from 'react'
import './BeforeAndAfterLogin.scss';

export default class AfterDelete extends Component {

    logOut(e){
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.handleAuth(null);//this doesn't work
        this.props.history.push(`/login`)
        console.log("Logout");
    }

    render () {
        return (
         <>
        <div id="login-wrap">
            <div className="big-icon">
                <img src="img/icon/deleted.svg" alt="garbage" className="big"/>
            </div>
            <h2>- Account Deleted -</h2>
            <div className="box2">

            <div className="box gray">
              <div className="box-text">
                <h6><b className="red">Your account have been deleted at your request.</b><br/>
                <br/>
                Thank you again for being a part of this community.<br/>
                <br/>
                We hope to see you again!
                </h6>
              </div>
            </div>

                <div className="box-text">
                    <a href="/map#" onClick={this.logOut.bind(this)}>
                        <button type="submit" className="btn btn-gray">
                            <img src="img/icon/map1.svg" alt="map" className="smallIcon" style={{width:'30px'}}/>
                            &ensp;Go back to the top
                        </button>
                    </a>
                </div>

                <br/>
            </div>
        </div>
         </>
        )
    }
}
