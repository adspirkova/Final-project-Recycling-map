import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import {getProfile} from './UserFunctions';
import ChangePassword from './ChangePassword';
import DeleteTheAccount from './DeleteTheAccount';
import AfterDelete from "./AfterDelete";
import MapContainer from '../../Map/MapContainer';
import './BeforeAndAfterLogin.scss';

export default class UserPage extends Component {
    constructor(){
        super()
        this.state={
            name:'',
            email:''
        }
    }

    componentDidMount(){
        getProfile().then(res=>{
            console.log(res);
            this.setState({
                name: res.data.user.name,
                email: res.data.user.email,
            })
            console.log("user:", res.data.user.name);
        })
    }

    logOut(e){
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.handleAuth(null);
        this.props.history.push(`/login`)
        console.log("Logout");
    }

    render () {
        return (
        <>
            <>
            <BrowserRouter>
                <Route path="/map" component={MapContainer} />
                <Route path="/changepw" component={ChangePassword} />
                <Route path="/delete" component={DeleteTheAccount} />
                <Route path="/deletedone" component={AfterDelete} />
            </BrowserRouter>
            </>
            <div id="login-wrap">
                <div className="big-icon">
                    <img src="/img/icon/people1.svg" alt="garbage" className="big"/>
                </div>

                <h2>- Welcome, <span className="blue">{this.state.name}</span> ! -</h2>
                <div className="box2">
                    <div className="box-text">
                        <Link to="/addbin">
                            <button type="submit" className="btn btn-gray">
                                <img src="/img/icon/map1.svg" alt="map" className="smallIcon" style={ { width: '30px' } } />
                                &ensp;Add new bin to map
                            </button>
                        </Link>
                    </div>

                    <div className="box-text">
                        <Link to="/changepw">
                            <button type="submit" className="btn btn-gray">
                                <img src="/img/icon/password.svg" alt="login" className="smallIcon" style={ { width: '30px' } } />
                                &ensp;Change the password
                            </button>
                        </Link>
                    </div>

                    <div className="box-text">
                        <a href="/map#" onClick={this.logOut.bind(this)}>
                            <button type="submit" className="btn btn-gray">
                                <img src="/img/icon/logout.svg" alt="logout" className="smallIcon" style={ { width: '30px' } } />
                                &ensp;Logout
                            </button>
                        </a>
                    </div>

                    <div className="box-text">
                        <Link to="/delete">
                            <button type="submit" className="btn btn-gray">
                                <img src="/img/icon/problem3.svg" alt="question" className="smallIcon" style={ { width: '30px' } } />
                                <span className="red">&ensp;Delete the account</span>
                            </button>
                        </Link>
                    </div>
                    <br/><br/>
                </div>
            </div>
        </>
        )
    }
}
