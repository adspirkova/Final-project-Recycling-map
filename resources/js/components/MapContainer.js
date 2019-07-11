import React, { Component } from "react";

//Google Map importing:
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow
} from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

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

    componentDidMount() {
        this.updateLocations();
        this.updateBins();
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
            <GoogleMap
                style={{ width: "100px", height: "100px" }}
                defaultZoom={8}
                defaultCenter={{
                    lat: this.state.lat,
                    lng: this.state.lng
                }}
            >
                <MarkerClusterer
                    onClick={e => {
                        console.log(e);
                    }}
                    averageCenter
                    enableRetinaIcons
                    gridSize={60}
                >
                    {mymarker}
                    {listOfMarkers}
                    {console.log(this.state.locations)}

                    {myInfowindow}
                </MarkerClusterer>
            </GoogleMap>
        );
    }
}
export default withScriptjs(withGoogleMap(MapContainer));
