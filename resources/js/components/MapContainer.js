import React, { Component } from 'react'

//Google Map importing:
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

//API Key


class MapContainer extends Component {
    constructor(props){
      super(props);

      this.state = {
        lat: 50.062059,
        lng: 14.437462,
        active_marker: {},
        locations: [],
        bins: [],
      }
    }

    updateBins = () => {
      fetch(
        'http://www.recycling-bins.localhost:8080/bins')
        .then(resp => resp.json())
        .then(data => {
          this.setState({
            bins: data.bins,
          });
        });
    };

    updateLocations = () => {
      fetch(
        'http://www.recycling-bins.localhost:8080/locations')
        .then(resp => resp.json())
        .then(data => {
          this.setState({
            locations: data.locations,
          });
        });
    };

    componentDidMount(){

      this.updateLocations();
      this.updateBins();
      //Geolocation API
      if (!navigator.geolocation) {
        console.log('Geolocation is not supported by your browser');
      } else {
        console.log('Locating…');
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position);

            this.setState({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
          }, () => {
            console.log('error');
          }
        );
      }
    }

    markerClicked = (props, location) => {
      //console.log('==============================', location);
      this.setState({
        active_marker: location
      })

    }

    render () {
        const listOfLocations = this.state.locations.map((location, index) => {
          //console.log(location.stationName);
          return (
            location.stationName
          );
        });
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
          position={{lat: location.lat,lng: location.lng}}
          onClick={this.markerClicked.bind(this.location)} >
          </Marker>
        )
        }) }
        {console.log(this.state.locations)}

        
        <InfoWindow
        marker={ this.state.active_marker }
        visible={ true }
        >
          <div>
            
            <h4>{ this.state.active_marker.stationName }</h4>
            <img src="img/icon/3-glass2.svg" className="menu-image" alt="glass"/>
            <img src="img/icon/3-glass2.svg" className="menu-image" alt="glass"/>
            <img src="img/icon/3-glass2.svg" className="menu-image" alt="glass"/>
            <img src="img/icon/3-glass2.svg" className="menu-image" alt="glass"/>
          </div>
           {/* <h4>{ this.state.active_marker.stationName }</h4>
            <p>{this.state.active_marker.id}</p> */}
                  
            
              {/* {this.state.bins.filter(({stationId}) => 
              stationId === listOfLocations.filter(this.state.active_marker.title)
            
            ).map((item) => 
              (<>{item.trashTypeName}</>)
            
            )}

            {this.state.bins.filter(({stationId}) => 
              stationId === this.state.active_marker.id
            
            ).map((item) => 
              (<>{item.trashTypeName}</>)
            
            )} */}
            {/* {console.log(this.state.bins)} */}
            {/* {console.log(this.state.active_marker)} */}
            { /*this.state.bins.filter(({stationId}) => 
              stationId === this.state.active_marker.id
            
            ).map((item) => 
              (<>{item.trashTypeName}</>)
            
            )} */}
        </InfoWindow>
        </Map>
        )
        
    }
}
export default GoogleApiWrapper({
    apiKey: "AIzaSyCP1AHOlN6fX05uG3vbo6QLyyaipYQucmU"
  })(MapContainer)
