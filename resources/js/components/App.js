import React, { Component, Fragment } from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, NavLink, Route, Switch } from 'react-router-dom';
import './App.scss';

import MapContainer from '../Map/MapContainer';
import About from '../About/About';
import Contact from '../Contact/Contact';

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
    this.state = {
        jump: false,
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
            <img src="img/icon/login.svg" alt="login"  className="menu-image"/><br/>
            Login
            </NavLink>)


    const afterLoginTab =(
            <NavLink  activeClassName="activeTab" to="/userpage">
            <img src="img/icon/user.svg" alt="login"  className="menu-image"/><br/>
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
                            <img src="img/icon/map1.svg" alt="map" className="menu-image"/><br/>
                            Map
                            </NavLink>
                        </span>
                        <div className="col-3 menu-bar">
                            <NavLink  activeClassName="activeTab" to="/about">
                            <img src="img/icon/waste2.svg" alt="waste" className="menu-image"/><br/>
                            About
                            </NavLink>
                        </div>
                        <div className="col-3 menu-bar">
                            <NavLink  activeClassName="activeTab" to="/contact">
                            <img src="img/icon/contact1.svg" alt="contact" className="menu-image"/><br/>
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
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCP1AHOlN6fX05uG3vbo6QLyyaipYQucmU&v=3.exp&libraries=geometry,drawing,places"
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
                    <Route path="/delete" component={DeleteTheAccount} />
                    <Route path="/deletedone" component={AfterDelete} />

                </Switch>
            </Fragment>
          )
    }else{
        return(
        <div id="topwrap">
            <h1>Where to put?</h1>
            <h2>-Czech Garbage Bin Site-</h2><br/>
            <img src="img/post1.png" alt="garbageBin" className="garbageBin"/>

            <div className="dropBin">
                <div className="bin1">
                    <img src="img/bottle.png"/>
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

// Old Version(Please don't use it again since we can't make any link in other pages in this way)***************************
// export default class App extends Component {
//     constructor(props){
//         super(props);

//         this.state = {
//             page: 'map',
//             index: true
//         }
//     }

//     render() {
//         if(this.state.index)
//             return (<Index handleClick={() => { this.setState({index:false})}}/>)

//         return (
//             <div>
//                 <BrowserRouter>
//                     {
//                         (()=>{
//                             if(this.state.page == 'map')
//                                     return (<MapContainer/>);
//                                 else if(this.state.page == 'about')
//                                     return (<About/>)
//                                 else if(this.state.page == 'contact')
//                                     return (<Contact/>)
//                                 else if(this.state.page == 'login')
//                                     return (<Login/>)
//                                 else if(this.state.page == 'afterLogin')
//                                     return (<AfterLogin/>)
//                                 else if(this.state.page == 'newAccount')
//                                     return (<NewAccount/>)
//                                 else if(this.state.page == 'changePassword')
//                                     return (<ChangePassword/>)
//                         })()
//                     }
//                 </BrowserRouter>
//                 <nav className="menu" id="theMenu">
//                     <div className="row">
//                         <div className="col-3 menu-bar">
//                             <a href="#" onClick={()=>{
//                                 this.setState({
//                                     page: 'map'
//                                 })
//                             }}>
//                                 <img src="img/icon/map1.svg" alt="map" className="menu-image"/><br/>
//                                 Map
//                             </a>
//                         </div>
//                         <div className="col-3 menu-bar ">
//                             <a href="#" onClick={()=>{
//                                 this.setState({
//                                     page: 'about'
//                                 })
//                             }}>
//                                 <img src="img/icon/waste2.svg" alt="waste" className="menu-image"/><br/>
//                                 About
//                             </a>
//                         </div>
//                         <div className="col-3 menu-bar">
//                             <a href="#" onClick={()=>{
//                                 this.setState({
//                                     page: 'contact'
//                                 })
//                             }}>
//                                 <img src="img/icon/contact1.svg" alt="contact" className="menu-image"/><br/>
//                                 Contact
//                             </a>
//                         </div>
//                         <div className="col-3 menu-bar">
//                             <a href="#" onClick={()=>{
//                                 this.setState({
//                                     page: 'login'
//                                 })
//                             }}>
//                                 <img src="img/icon/login.svg" alt="login"  className="menu-image"/><br/>
//                                 Login
//                             </a>
//                         </div>
//                     </div>
//                 </nav>
//             </div>
//         );
//     }
// }
