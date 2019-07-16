import React, { Component } from 'react'
import '../../Contact/Contact.js';


// ******* For the images Start ************
const images = ["img/icon/waste.svg","img/icon/map1.svg","img/icon/3-glass.svg","img/icon/map2.svg","img/icon/login.svg","img/icon/map1.svg"];

class Li extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = { clicked: false };
      this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
      this.setState({ clicked: !this.state.clicked });
    }

    render() {
      const {image} = this.props;
      const background = this.state.clicked ? "#ECE2DD" : "transparent";
      return <img src = {image} style={{ background }} onClick={this.handleClick} className="contact-icon2" alt="problems"/>
    }
  }
// ******* For the images End ************

export default class AddBinForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            location: '',
            problem: '',
            message: '',
            file:'',
            agree:false,
            cities: null,
            stations: null,
            chosencity: 'Praha 1',
        }
        this.handleChange = this.handleChange.bind(this); 
    }

    handleChange(e){
       this.setState({
        chosencity: e.target.value,
       });
       this.updateStations(e.target.value);
    } 

    onSubmit(e){
        e.preventDefault()

        const send = {
            location: this.state.location,
            problem: this.state.problem,
            message: this.state.message,
            file: this.state.file,
            agree: this.state.agree,
        }

    }

    updateCities = () => {
        fetch(
            `http://www.recycling-bins.localhost:8080/cities/`
        )
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                cities: data.cities
            });
        });
    };
    updateStations(item) {
        let lookupcity = item;
        fetch(
            `http://www.recycling-bins.localhost:8080/stations/${lookupcity}`
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



    render (){
        const cities = this.state.cities;
        console.log(cities);
        const stations = this.state.stations;
        console.log(stations);
        return (
            <div className="contact-wrap">
                <div className="contact-title">

                    <div className="big-icon">
                    <img src="img/icon/waste.svg" alt="garbage" className="big"/>
                    </div>

                    <h2>- Add a new Bin -</h2>
                </div>
                    <br/>
                    <form className="contact-form php-mail-form" role="form" action="" method="POST">

                        <div className="form-group">
                        <img src="img/icon/map2.svg" alt="location" className="contact-icon"/>
                            <label htmlFor="contact-name">Location</label>
                            <select className="form-control" onChange={(e) => this.handleChange(e)}  >
                                {cities == null ? (<option>Please wait...</option>): (cities.map((city,index) => {
                                    return (<option key={index} value={city.cityDistrict}>{city.cityDistrict}</option>)
                                }))}
                            </select>
                            <select className="form-control">
                                {stations == null ? (<option >Please choose the city first</option>): (stations.map((station,index) => {
                                    return (<option key={index}>{station.stationName}</option>)
                                }))}
                            </select>
                            <div className="validate"></div>
                        </div>

                        <div className="form-group">
                            <img src="img/icon/problem1.svg" alt="location" className="contact-icon"/>
                            <label htmlFor="contact-name">Add not tracked bins</label>
                            <div className="icons">
                                { images.map((image, index) => <Li key={`${image}-${index}`} image={image}/>) }
                            </div>
                            <div className="validate"></div>
                        </div>

                        <div className="form-group">
                            <img src="img/icon/contact2.svg" alt="location" className="contact-icon"/>
                            <label htmlFor="contact-message">Your Message</label>
                            <textarea className="form-control"
                                        name="message"
                                        id="contact-message"
                                        onChange={this.onChange}
                                        value={ this.state.message }
                                        placeholder="Your Feedback"
                                        rows="5"
                                        data-rule="required"
                                        data-msg="Please write something for us"></textarea>
                            <div className="validate"></div>
                        </div>

                        <div className="form-group">
                            <img src="img/icon/message1.svg" alt="location" className="contact-icon"/>
                            <label htmlFor="uploadFile">Add a file or picture.</label>
                            <input type="file" name="upload" size="30"/>
                            <div className="validate"></div>
                        </div>

                        <div className="form-group">
                            <input id="box1" type="checkbox" />
                            <label htmlFor="contact-agree">I agree with terms & conditions.</label>
                            <br/>
                            <div className="form-send">
                                <button type="submit" className="btn btn-large">Send Message</button>
                            </div>
                        </div>
                        <br/><br/><br/>
                        <div className="loading"></div>
                        <div className="error-message"></div>
                        <div className="sent-message">Your message has been sent. Thank you!</div>
                    </form>
             </div>
        )
    }
}
