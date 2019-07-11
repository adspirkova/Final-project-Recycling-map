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
    constructor(props) {
        super(props);

        this.state = {
            lat: 50.062059,
            lng: 14.437462,
            active_marker: {},
            locations: [],
            bins: []
        };
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

    markerClicked = (props, location, event) => {
        //console.log('==============================', location);
        this.setState({
            active_marker: location
        });
    };

    render() {
        let listOfMarkers = this.state.locations.map(location => {
            return (
                <Marker
                    key={location.id}
                    title={location.stationName}
                    position={{ lat: location.lat, lng: location.lng }}
                    onClick={this.markerClicked.bind(this)}
                    icon={imageIcon}
                />
            );
        });

        // *************RANDOM DATA
        const listOfMarkers2 = [
            {
                key: 1,
                lat: 50.059862,
                lng: 14.324908,
                pet: "dog",
                icon: {
                    url: imageIcon
                }
            },
            {
                key: 2,
                lat: 50.060024,
                lng: 14.324725,
                pet: "cat",
                icon: { url: imageIcon }
            },
            {
                key: 3,
                lat: 50.060281,
                lng: 14.325643,
                pet: "fish",
                icon: { url: imageIcon }
            },
            {
                key: 4,
                lat: 50.060261,
                lng: 14.324749,
                pet: "bird",
                icon: { url: imageIcon }
            }
        ];
        let mymarker = listOfMarkers2.map(
            el => (
                <Marker
                    key={el.key}
                    title={el.pet}
                    icon={el.icon}
                    name={"SOMA"}
                    position={{ lat: el.lat, lng: el.lng }}
                    onClick={e => {
                        console.log(e);
                        this.setState({
                            active_marker: { lat: el.lat, lng: el.lng }
                        });
                        //this.markerClicked.bind(this)
                    }}
                />
            )
            // *************   end of RANDOM DATA
        );

        let myInfowindow = (
            <InfoWindow marker={this.state.active_marker} visible={true}>
                <div>
                    {console.log(this.state.active_marker)}
                    <img
                        src="img/icon/3-glass2.svg"
                        className="menu-image"
                        alt="glass"
                    />
                    <img
                        src="img/icon/3-glass2.svg"
                        className="menu-image"
                        alt="glass"
                    />
                    <img
                        src="img/icon/3-glass2.svg"
                        className="menu-image"
                        alt="glass"
                    />
                    <img
                        src="img/icon/3-glass2.svg"
                        className="menu-image"
                        alt="glass"
                    />
                </div>
            </InfoWindow>
        );

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
