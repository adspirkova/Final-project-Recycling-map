import React, { Component } from "react";

//Google Map importing:
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

//API Key

const imageIcon = "/img/favicon2.png";
class MapContainer extends Component {
    constructor(props){
      super(props);

      this.state = {
        lat: 50.062059,
        lng: 14.437462,
        active_marker: {},
        locations: [],
        bins: [],
        position: null,
      }
    }

    updateBins = () => {
        fetch("http://www.recycling-bins.localhost:8080/bins")
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    bins: data.bins
                });
            });
    };

    updateLocations = () => {
        fetch("http://www.recycling-bins.localhost:8080/locations")
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    locations: data.locations
                });
            });
    };


    componentWillMount(){
      //Geolocation API
      if (!navigator.geolocation) {
        console.log("Geolocation is not supported by your browser");
    } else {
        console.log("Locating…");
        navigator.geolocation.getCurrentPosition(
            position => {
                console.log(position);

                this.setState({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            },
            () => {
                console.log("error");
            }
        );
    }
    }

    componentDidMount() {
        this.updateLocations();
        this.updateBins();
    }

    markerClicked = (props, location) => {
      //console.log('==============================', location);
      this.setState({
        active_marker: location
      })

    }
    handleToggleOpen(item){
      this.setState({
        position : {
          lat : item.lat,
          lng : item.lng
        },
        id: item.id,
        title: item.stationName,
      })
    }


    render () {
        //console.log(listOfLocations);
        return (        
          <Map
         className={"map-size"}
          google={this.props.google}
          initialCenter={{
            lat: this.state.lat,
            lng: this.state.lng
          }}
          zoom={18}
          onClick={ this.onMapClicked }
        >
        { this.state.locations.map((location, index) => {
        return (
          < Marker 
          key={location.id}
          title={location.stationName}
          icon={imageIcon}
          position={{lat: location.lat,lng: location.lng}}
          onClick={() => this.handleToggleOpen(location)}
          /* onClick={this.markerClicked.bind(this.location)} > */>
          </Marker>
        )
        }) }

      {this.state.position && 
        <InfoWindow
        // marker={ this.state.active_marker }
        visible={ true }
        position={this.state.position}
        id={this.state.id}
        title={this.state.title}
        >
          <div>
            
            <h4>{ this.state.title }</h4>
            { this.state.bins.filter(({stationId}) => 
              stationId === this.state.id
            
            ).map((item, index) => 
              (<>
                <p>{item.trashTypeName}</p></>)
            
            )}

            <img src="img/icon/3-glass2.svg" className="menu-image" alt="glass"/>
            <img src="img/icon/3-glass2.svg" className="menu-image" alt="glass"/>
            <img src="img/icon/3-glass2.svg" className="menu-image" alt="glass"/>
            <img src="img/icon/3-glass2.svg" className="menu-image" alt="glass"/>
          </div>
            
        </InfoWindow>}
        </Map>
        )
        
    }
}
export default GoogleApiWrapper({
    apiKey: "AIzaSyCP1AHOlN6fX05uG3vbo6QLyyaipYQucmU"
})(MapContainer);
