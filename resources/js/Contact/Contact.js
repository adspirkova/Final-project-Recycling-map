import React, { Component } from "react";
import "./Contact.scss";
import { UncontrolledTooltip } from "reactstrap";
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { isJSXExpressionContainer } from "@babel/types";

import Thanks from './ThankYou';


const urlLive = "http://recycling-bins.data4you.cz";
const urlServer = "http://www.recycling-bins.localhost:8080";


// ******* For the images Start ************
const images = [
    {
        image: "/img/image-new/ask.png",
        message: "I couldn't find a bin in this location",
        value: "location not found"
    },
    {
        image: "/img/image-new/cross.png",
        message: "description of the bin is wrong",
        value: "description is wrong"
    },
    {
        image: "/img/image-new/trash (1).png",
        message: "Bin is full",
        value: "bin is full"
    },
    {
        image: "/img/image-new/wrong.png",
        message: "Location of the bin is wrong",
        value: "location is wrong"
    },
    {
        image: "/img/image-new/lock.png",
        message: "Bin is private or hard to access",
        value: "no access or private"
    },
    {
        image: "/img/image-new/pencil.png",
        message:
            "Write for some other reason. For example if you like our website:)",
        value: "Other reason"
    }
];

class Li extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({ clicked: !this.state.clicked });
    }

    

    render() {
        console.log(this.props.value);

        const background = this.state.clicked ? "#ECE2DD" : "transparent";
        

        return (
            <>
                <label htmlFor={"checkbox" + this.props.value}>
                    <img
                        className="contact-icon2"
                        src={this.props.src}
                        alt={this.props.value}
                        style={{ background }}
                        onClick={this.handleClick}
                        id={"UncontrolledTooltipExample" + this.props.index}
                        href="#"
                    />
                </label>
                <input
                    type="checkbox"
                    id={"checkbox" + this.props.value}
                    name="topic[]"
                    style={{ display: "none" }}
                    value={this.props.value}
                />

                <UncontrolledTooltip
                    placement="bottom"
                    target={"UncontrolledTooltipExample" + this.props.index}
                >
                    {this.props.message}
                </UncontrolledTooltip>
            </>
        );
    }
}
// ******* For the images End ************

export default class Contact extends Component {
    constructor(props) {
        super(props);

        this.state = {
            location: "",
            problem: "",
            message: "",
            file: "",
            agree: false,
            cities: null,
            stations: null,
            chosencity: 'Praha 1',
            jump: window.location.search.includes('success=1'),
        };
        this.onChange = this.onChange.bind(this);
        this.onMessageChange = this.onMessageChange.bind(this);
    }

    onChange(e) {
        this.setState({
            chosencity: e.target.value,
           });
        this.updateStations(e.target.value);
    }

    onMessageChange(e) {
        this.setState({
            message: e.target.value,
           });
        console.log(this.state.message);
    }


    onSubmit(e) {
        e.preventDefault();

        const send = {
            location: this.state.location,
            problem: this.state.problem,
            message: this.state.message,
            file: this.state.file,
            agree: this.state.agree
        };
    }
    fileSelectedHandler = e => {
        console.log(e.target.files[0]);
    };

    updateCities = () => {
        console.log(urlServer);
        fetch(
            `${urlLive}/cities/`
        )
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                cities: data.cities
            });
        });
        console.log((this.state.cities))
    };
    updateStations(item) {
        let lookupcity = item;
        fetch(
            `${urlLive}/stations/${lookupcity}`
        )
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                stations: data.stationName
            });
        });
        console.log(this.state.stations);
    };


    componentDidMount(){
        this.updateCities();
        this.updateStations()
    }


    render() {
        let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const cities = this.state.cities;
        console.log(cities);
        const stations = this.state.stations;
        console.log(stations);
        if (this.state.jump === true) {
            return(
                <Thanks/>
            )
        } else {
            return (
                <>
                <div className="contact-wrap">
                    <div className="contact-title">
                        <div className="big-icon">
                            <img
                                src="/img/icon/problem5.svg"
                                alt="garbage"
                                className="big"
                            />
                        </div>
    
                        <h2>- Feed Back Form -</h2>
                    </div>
                    <br />
                    <form
                        className="contact-form php-mail-form"
                        // role="form"
                        action="/contact/create"
                        method="POST"
                    >
                    <input type="hidden" name="_token" value={token}></input>
                        <div className="form-group">
                            <img
                                src="/img/icon/map2.svg"
                                alt="location"
                                className="contact-icon"
                            />
                            <label htmlFor="contact-name">Location</label>
                            <select className="form-control" onChange={(e) => this.onChange(e)}  >
                                    {cities == null ? (<option>Please wait...</option>): (cities.map((city,index) => {
                                        return (<option key={index} value={city.cityDistrict}>{city.cityDistrict}</option>)
                                    }))}
                                </select>
                            <select className="form-control" name="stationId">
                                {stations == null ? (<option >Please choose the city first</option>): (stations.map((station,index) => {
                                    return (<option key={index}  value={station.id}>{station.stationName}</option>)
                                }))}
                            </select>
                            <div className="validate" />
                        </div>
    
                        <div className="form-group">
                            <img
                                src="/img/icon/problem1.svg"
                                alt="location"
                                className="contact-icon"
                            />
                            <label htmlFor="contact-name">
                                Choose the problem.
                            </label>
                            <div className="icons">
                                {images.map((icon, index) => {
                                    return (
                                        <Li
                                            key={index}
                                            index={index}
                                            src={icon.image}
                                            alt={icon.value}
                                            message={icon.message}
                                            value={icon.value}
                                        />
                                    );
                                })}
                            </div>
                            <div className="validate" />
                        </div>
    
                        <div className="form-group">
                            <img
                                src="/img/icon/contact2.svg"
                                alt="location"
                                className="contact-icon"
                            />
                            <label htmlFor="contact-message">Your Message</label>
                            <textarea
                                className="form-control"
                                name="message"
                                id="contact-message"
                                onChange={this.onMessageChange}
                                placeholder="Your Feedback"
                                rows="5"
                                data-rule="required"
                                data-msg="Please write something for us"
                            />
                            <div className="validate" />
                        </div>
    
                        <div className="form-group">
                            <img
                                src="/img/icon/message1.svg"
                                alt="location"
                                className="contact-icon"
                            />
                            {/* upload File thing */}
                            <label htmlFor="uploadFile">
                                Add a file or picture.
                            </label>
                            <input
                                type="file"
                                onChange={this.fileSelectedHandler}
                                name="upload"
                                size="30"
                            />
                            <div className="validate" />
                        </div>
    
                        <div className="form-group">
                            <input id="box1" type="checkbox" />
                            <label htmlFor="contact-agree">
                                I agree with terms & conditions.
                            </label>
                            <br />
                            <div className="form-send">
                                <button type="submit" className="btn btn-large" >
                                Send 
                                </button>
                            </div>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className="loading" />
                        <div className="error-message" />
                        <div className="sent-message">
                            Your message has been sent. Thank you!
                        </div>
                    </form>
                </div>
                </>
            );
        }
        
    }
}
