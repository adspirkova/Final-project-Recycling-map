import React, { Component } from 'react'
import '../../Contact/Contact.js';


const urlLive = "http://recycling-bins.data4you.cz";
const urlServer = "http://www.recycling-bins.localhost:8080";



// ******* For the images Start ************
const images = [{img: "/img/clear-glass2.png", type: 'Clear glass'}, {img: "/img/glass2.png", type: 'Coloured glass'}, {img: "/img/paper.png", type: 'Paper'}, {img: "/img/water.png", type:'Plastic'},{img: "/img/cardboard.png", type: 'Cardboard'}, {img:"/img/can.png", type: 'Metals'}, {img:"/img/electric.png", type:'Electric equipment'} ];

class Li extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = { 
        clicked: false,
        values: [],
    };
       this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e){
        this.setState(
            { 
            clicked: !this.state.clicked,
        }
        )
    }

    render() {
        console.log(this.props);
      const {image} = this.props;
      const background = this.state.clicked ? "#ECE2DD" : "transparent";
      return (
          <>
            <label htmlFor={"checkbox"+this.props.value}>
                <img className="contact-icon2" src={image} alt={this.props.value} style={{ background }} onClick={this.handleClick}></img>
            </label>
            <input type='checkbox' id={"checkbox"+this.props.value} name="trashTypeName[]" style={{display: 'none'}} value={this.props.value}>
            </input>
          </>
      )
      
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
            `${urlLive}/cities/`
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

    render (){
        let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');  
        const cities = this.state.cities;
        console.log(cities);
        const stations = this.state.stations;
        console.log(stations);
        return (
            <div className="contact-wrap">
                <div className="contact-title">

                    <div className="big-icon">
                    <img src="/img/icon/waste.svg" alt="garbage" className="big"/>
                    </div>

                    <h2>- Add a new Bin -</h2>
                </div>
                    <br/>
                    <form className="contact-form php-mail-form" role="form" action="/addbin/create" method="POST">
                    <input type="hidden" name="_token" value={token}></input>
                        <div className="form-group">
                        <img src="/img/icon/map2.svg" alt="location" className="contact-icon"/>
                            <label htmlFor="contact-name">Location</label>
                            <select className="form-control" onChange={(e) => this.handleChange(e)}  >
                                {cities == null ? (<option>Please wait...</option>): (cities.map((city,index) => {
                                    return (<option key={index} value={city.cityDistrict}>{city.cityDistrict}</option>)
                                }))}
                            </select>
                            <select className="form-control" name="stationId">
                                {stations == null ? (<option >Please choose the city first</option>): (stations.map((station,index) => {
                                    return (<option key={index}  value={station.id}>{station.stationName}</option>)
                                }))}
                            </select>
                            <div className="validate"></div>
                        </div>

                        <div className="form-group">
                            <img src="/img/icon/problem1.svg" alt="location" className="contact-icon"/>
                            <label htmlFor="contact-name">Add not tracked bins</label>
                            <div className="icons">
                                { images.map((image, index) => <Li key={`${image.img}-${index}`} value={image.type} image={image.img}/>)}
                            </div>
                            <div className="validate"></div>
                        </div>
                        <div className="form-group">
                            <input id="box1" type="checkbox" />
                            <label htmlFor="contact-agree">I agree with terms & conditions.</label>
                            <br/>
                            <div className="form-send">
                                <button type="submit" className="btn btn-large">Submit</button>
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
