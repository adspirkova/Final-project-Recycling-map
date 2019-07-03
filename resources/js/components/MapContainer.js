import React, { Component } from 'react'

//Google Map importing:
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class MapContainer extends Component {
    constructor(props){
      super(props);

      this.state = {
        lat: 50.0595854,
        lng: 14.325541
      }
    }

    componentDidMount(){


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

    render () {
        return (          
          <Map
         className={"map-size"}
          google={this.props.google}
          initialCenter={{
            lat: this.state.lat,
            lng: this.state.lng
          }}
          zoom={15}
          onClick={this.onMapClicked}
        >

<Marker
    title={'The marker`s title will appear as a tooltip.'}
    name={'SOMA'}
    position={{lat: 37.778519, lng: -122.405640}} />
        </Map>

        )
        
    }
}
export default GoogleApiWrapper({
    apiKey: ("AIzaSyCP1AHOlN6fX05uG3vbo6QLyyaipYQucmU")
  })(MapContainer)