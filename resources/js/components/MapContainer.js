import React, { Component } from 'react'

//Google Map importing:
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

//API Key


class MapContainer extends Component {
    constructor(props){
      super(props);

      this.state = {
        lat: 50.0595854,
        lng: 14.325541,
        active_marker: {},
        locations: [],
      }
    }


    updateLocations = () => {
      fetch(
        'http://www.recycling-bins.localhost:8080/locations')
        .then(resp => resp.json())
        .then(data => {
          console.log(data);
          this.setState({
            locations: data,
          });
        });
    };

    componentDidMount(){

      this.updateLocations();
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

    markerClicked(props, marker, event) {
      console.log('==============================', marker);
      this.setState({
        active_marker: marker
      })

    }

    render () {
      const listOfMarkers = this.state.locations.map((location, index) => {
        return (
          < Marker 
          key={location.id}
          position={{lat: location.lat,lng: location.lng}} >
          </Marker>
        )
      });



        // let mymarker = 
        // listOfMarkers.map((el) =>
        //   <Marker
        //   key={el.key}
        //   title={el.pet}
        //   icons={el.icons}
        //   name={'SOMA'}
        //   position={{lat: el.lat,lng: el.lng}} 
        //   onClick={ this.markerClicked.bind(this) }
        //   >
        // </Marker>
        // );
        
        let myInfowindow =
        <InfoWindow
        marker={ this.state.active_marker }
        visible={ true }
        >
          <div>
            <h4>{ this.state.active_marker.title }</h4>
            <img src="img/icon/3-glass2.svg" className="menu-image" alt="glass"/>
            <img src="img/icon/3-glass2.svg" className="menu-image" alt="glass"/>
            <img src="img/icon/3-glass2.svg" className="menu-image" alt="glass"/>
            <img src="img/icon/3-glass2.svg" className="menu-image" alt="glass"/>
          </div>
        </InfoWindow>

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
        {/* mymarker displays from 1 to many markers */}
         { listOfMarkers }

         { myInfowindow }


    {/* <Marker
    title={'Marker title'}
    name={'Namychka'}
    position={{lat: 50.060000,lng:14.326065}} 
    onClick={ this.markerClicked.bind(this) }
    /> */}
        </Map>

        )
        
    }
}
export default GoogleApiWrapper({
    apiKey: "AIzaSyCP1AHOlN6fX05uG3vbo6QLyyaipYQucmU"
  })(MapContainer)
