import React, { Component } from 'react'

//Google Map importing:
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './MapContainer.scss';

//API Key
import apiKey from '../../database_import/apikey.js';

class MapContainer extends Component {
    constructor(props){
      super(props);

      this.state = {
        lat: 50.0595854,
        lng: 14.325541,
        active_marker: {}
      }
    }

    componentDidMount(){
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
         { mymarker }

         { myInfowindow }


        <Marker
            title={'The marker`s title will appear as a tooltip.'}
            name={'SOMA'}
            position={{lat: 37.778519, lng: -122.405640}} />

        </Map>
        )
    }
}
export default GoogleApiWrapper({
    apiKey: ("AIzaSyDhycN05oMi7_OYP1z5c4xzjWbhsDCdrsQ")
  })(MapContainer)
