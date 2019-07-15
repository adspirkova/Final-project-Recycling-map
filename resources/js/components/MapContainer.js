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

const imageIcon = "/img/favicon2.png";

class MapContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lat: 50.062059,
            lng: 14.437462,
            active_marker: null,
            locations: [],
            bins: [],
            userPosition: {
                lat: 50.06203903000005,
                lng: 14.437462
            },
            currZoom: 18
        };
    }

    updateBins(station) {
        let id = station;
        fetch(`http://www.recycling-bins.localhost:8080/bins/${id}`)
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    bins: data.bins
                });
            });
        console.log(id);
    }

    updateLocations = () => {
        const { lat, lng, currZoom } = this.state;
        fetch(
            `http://www.recycling-bins.localhost:8080/locations/${lat}/${lng}/${currZoom}`
        )
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    locations: data.locations
                });
            });
        console.log(this.state.locations);
    };

    componentWillMount() {
        //Geolocation API
        if (!navigator.geolocation) {
            console.log("Geolocation is not supported by your browser");
        } else {
            console.log("Locating…");
            navigator.geolocation.getCurrentPosition(
                userPosition => {
                    console.log(userPosition);

                    this.setState(
                        {
                            lat: userPosition.coords.latitude,
                            lng: userPosition.coords.longitude
                        },
                        () => {
                            this.updateLocations();
                        }
                    );
                },
                () => {
                    console.log("error");
                }
            );
        }
    }

    binLoading() {
        if (this.state.id === null) {
            return (
                <div>
                    <h4>{this.state.title}</h4>
                    <p>Loading... you</p>
                </div>
            );
        } else {
            return (
                <div>
                    <h4>{this.state.title}</h4>
                    {this.state.bins.map((item, index) => (
                        <p key={index}>{item.trashTypeName}</p>
                    ))}
                    <img
                        src="img/icon/1-plastic1.svg"
                        className="menu-image"
                        alt="glass"
                    />
                </div>
            );
        }
    }

    componentDidMount() {
        this.updateLocations();
    }

    handleToggleOpen(item) {
        this.setState({
            active_marker: {
                lat: item.lat,
                lng: item.lng
            },
            cool: item.id,
            title: item.stationName
        });
        this.updateBins(item.id);
    }

    render() {
        let listOfMarkers = this.state.locations.map(location => {
            return (
                <Marker
                    key={location.id}
                    title={location.stationName}
                    position={{ lat: location.lat, lng: location.lng }}
                    onClick={() => this.handleToggleOpen(location)}
                    icon={imageIcon}
                />
            );
        });

        let myInfowindow = this.state.active_marker && (
            <InfoWindow
                onCloseClick={() => {
                    this.setState({ active_marker: null });
                }}
                visible={true}
                position={this.state.active_marker}
                id={this.state.cool}
                title={this.state.title}
            >
                {this.binLoading()}
            </InfoWindow>
        );
        let mapRef;
        return (
            <GoogleMap
                style={{ width: "100px", height: "100px" }}
                defaultZoom={18}
                ref={ref => {
                    mapRef = ref;
                }}
                onCenterChanged={e => {
                    const center = mapRef.getCenter();
                    this.setState(
                        {
                            lat: center.lat(),
                            lng: center.lng()
                        },
                        () => {
                            console.log(this.state.lat);
                            this.updateLocations();
                        }
                    );
                }}
                onZoomChanged={e => {
                    mapRef.getZoom();
                    console.log(mapRef.getZoom());
                    this.setState(
                        {
                            currZoom: mapRef.getZoom()
                        },
                        () => {
                            this.updateLocations();
                        }
                    );
                }}
                defaultMaxZoom={19}
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
                    {listOfMarkers}
                    {myInfowindow}
                </MarkerClusterer>
            </GoogleMap>
        );
    }
}

export default withScriptjs(withGoogleMap(MapContainer));
