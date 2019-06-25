import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import MapContainer from './MapContainer';
import About from './About';
import Contact from './Contact';
import Login from './Login';
import AfterLogin from './AfterLogin';
import Index from './Index';

export default class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            page: 'map',
            index: true
        }
    }

    render() {
        if(this.state.index)
            return (<Index handleClick={() => { this.setState({index:false})}}/>)

        return (
            <div>
                {
                    (()=>{
                        if(this.state.page == 'map')
                                return (<MapContainer/>);
                            else if(this.state.page == 'about')
                                return (<About/>)
                            else if(this.state.page == 'contact')
                                return (<Contact/>)
                            else if(this.state.page == 'login')
                                return (<Login/>)
                    })()
                }
  
                <nav className="menu" id="theMenu">
                    <div className="row">
                        <div className="col-3 menu-bar">
                        <a href="#" onClick={()=>{
                            this.setState({
                                page: 'map'
                            })
                        }}>
                            <img src="img/icon/map1.svg" alt="map" className="menu-image"/><br/>
                            Map
                        </a>
                        </div>
                        <div className="col-3 menu-bar ">
                        <a href="#" onClick={()=>{
                            this.setState({
                                page: 'about'
                            })
                        }}>
                            <img src="img/icon/waste2.svg" alt="waste" className="menu-image"/><br/>
                            About
                        </a>
                        </div>
                        <div className="col-3 menu-bar">
                        <a href="#" onClick={()=>{
                            this.setState({
                                page: 'contact'
                            })
                        }}>
                            <img src="img/icon/contact1.svg" alt="contact" className="menu-image"/><br/>
                            Contact
                        </a>
                        </div>
                        <div className="col-3 menu-bar">
                        <a href="#" onClick={()=>{
                            this.setState({
                                page: 'login'
                            })
                        }}>
                            <img src="img/icon/login.svg" alt="login"  className="menu-image"/><br/>
                            Login
                        </a>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
