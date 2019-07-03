import React, { Component } from 'react'

//Google Map importing:
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

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
      const listOfMarkers = [
        {key: 1, lat: 50.059862,lng: 14.324908, pet: 'dog', icons: [true,true,true,true]},
        {key: 2, lat: 50.060024,lng:14.324725, pet: 'cat', icons: [true,false,true,true] },
        {key: 3, lat: 50.060281,lng: 14.325643, pet: 'fish', icons: [true,false,false,true]},
        {key: 4,lat: 50.060261,lng:14.324749, pet: 'bird', icons: [true,true,true,false]}
      ];



let mymarker = 
listOfMarkers.map((el) =>
  <Marker
  key={el.key}
  title={el.pet}
  icons={el.icons}
  name={'SOMA'}
  position={{lat: el.lat,lng: el.lng}} 
  onClick={ this.markerClicked.bind(this) }
  >
</Marker>
);

let myInfowindow =
<InfoWindow
marker={ this.state.active_marker }
visible={ true }
>
  <div>
    <h4>{ this.state.active_marker.title }</h4>
    <img src="img/icon/3-glass2.svg" className="menu-image"/>
    <img src="img/icon/3-glass2.svg" className="menu-image"/>
    <img src="img/icon/3-glass2.svg" className="menu-image"/>
    <img src="img/icon/3-glass2.svg" className="menu-image"/>
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
         { mymarker }

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
    apiKey: ("AIzaSyDhycN05oMi7_OYP1z5c4xzjWbhsDCdrsQ")
  })(MapContainer)
