import React, { Component, Fragment } from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import './App.scss';

import MapContainer from '../Map/MapContainer';
import About from '../About/About';
import Contact from '../Contact/Contact';
import Thanks from '../Contact/ThankYou';

import ForgetPassword from '../Login/LoginContent/ForgetPassword';
import NewAccount from '../Login/LoginContent/NewAccount';
import UserPage from '../Login/LoginContent/UserPage';
import AddBinForm from '../Login/AddBin/AddBinForm';


import ChangePassword from "../Login/LoginContent/ChangePassword";
import DeleteTheAccount from "../Login/LoginContent/DeleteTheAccount";
import AfterDelete from "../Login/LoginContent/AfterDelete";
import BeforeLogin from "../Login/LoginContent/BeforeLogin";

class App extends Component {
    constructor(props){
    super(props);
    let jump = true
    if (window.location.pathname === '/' || window.location.pathname === '/map') {
        jump = false
    }
    this.state = {
        jump: jump,
        auth: localStorage.usertoken,
        page: "map",
        index: true
    };
    }

    onSubmit() {
        this.setState(() => ({
            jump: true
        }));
    };

    render() {
    const beforeLoginTab =(
            <NavLink  activeClassName="activeTab" to="/login">
            <img src="/img/icon/login.svg" alt="login"  className="menu-image"/><br/>
            Login
            </NavLink>)


    const afterLoginTab =(
            <NavLink  activeClassName="activeTab" to="/userpage">
            <img src="/img/icon/user.svg" alt="login"  className="menu-image"/><br/>
            User Page
            </NavLink>)

        console.log(localStorage);
    if (this.state.jump === true) {
        return (
            <Fragment>
                <nav className="menu" id="theMenu">
                    <div className="row">
                        <span className="col-3 menu-bar">
                            <NavLink  activeClassName="activeTab" to="/map">
                            <img src="/img/icon/map1.svg" alt="map" className="menu-image"/><br/>
                            Map
                            </NavLink>
                        </span>
                        <div className="col-3 menu-bar">
                            <NavLink  activeClassName="activeTab" to="/about">
                            <img src="/img/icon/waste2.svg" alt="waste" className="menu-image"/><br/>
                            About
                            </NavLink>
                        </div>
                        <div className="col-3 menu-bar">
                            <NavLink  activeClassName="activeTab" to="/contact">
                            <img src="/img/icon/contact1.svg" alt="contact" className="menu-image"/><br/>
                            Contact
                            </NavLink>
                        </div>
                        <div className="col-3 menu-bar">
                            {this.state.auth ? afterLoginTab : beforeLoginTab }
                        </div>
                    </div>
                </nav>
                <Switch>
                    {/* <Route path="/map" component={MapContainer}/> */}
                    <Route path="/map" component={(props)=> <MapContainer {...props}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB8ise8w4dTdiouN-Xbb6LfpD1ml9fga9U=3.exp&libraries=geometry,drawing,places"
                    loadingElement={
                        <div style={{ height: "100px" }} />
                    }
                    containerElement={
                        <div style={{ height: "90vh" }} />
                    }
                    mapElement={<div style={{ height: "100%" }} /> } /> } />

                    <Route path="/about" component={About} />
                    <Route path="/contact" component={Contact} />
                    
                    <Route path="/login" component={(props) => <BeforeLogin {...props} handleAuth={
                        (token) => {
                            this.setState({auth: token})
                        }
                    } />}/>

                    <Route path="/reset" component={ForgetPassword} />
                    <Route path="/new" component={NewAccount} />
                    <Route path="/userpage" component={(props) => <UserPage {...props} handleAuth={
                        (token) => {
                            this.setState({auth: token})
                        }
                    } />}/>
                    <Route path="/addbin" component={AddBinForm} />
                    <Route path="/changepw" component={ChangePassword} />
                    <Route path="/delete" component={(props) => <DeleteTheAccount {...props} handleAuth={
                        (token) => {
                            this.setState({auth: token})
                        }
                    } />}/>
                    <Route path="/deletedone" component={AfterDelete} />

                </Switch>
            </Fragment>
          )
    }else{
        return(
        <div id="topwrap">
            <h1>Where to put?</h1>
            <h2>-Czech Garbage Bin Site-</h2><br/>
            <img src="/img/post1.png" alt="garbageBin" className="garbageBin"/>

            <div className="dropBin">
                <div className="bin1">
                    <img src="/img/bottle.png"/>
                </div>
                <button type="button" className="btn btn-green" onClick={() => {this.onSubmit()}}>View the map now</button>
            </div>
            <br/><br/>
        </div>
        )}
    }
  }

    ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>, document.getElementById('app'));
