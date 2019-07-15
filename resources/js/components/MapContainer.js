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
const myPositionicon = "/img/street-view.png";
const imageIcon = "/img/favicon2.png";
const plasticBottle = "img/water.png";
const glassBottle = "img/glass.png";
const alumCan = "img/can.png";
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
    // textToImage($a)
    // {
    //     $trashTypeimage = [
    //         'Paper' => 'img/water.png',
    //         'Coloured glass' => 'img/icon/3-glass2.svg',
    //         'Plastic' => 'img/water.png',
    //         'Electric equipment' => 'img/water.png',
    //         'Cardboard' => 'img/icon/3-glass2.svg',
    //         'Clear glass' => 'img/icon/3-glass2.svg',
    //         'Metals' => 'img/water.png',
    //     ];

    //     return $trashTypeimage[$a];
    // }
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
                    {this.state.bins.map((item, index) => {
                        let img = null;
                        switch (item.trashTypeName) {
                            case "Clear glass":
                                img = (
                                    <img
                                        src={alumCan}
                                        className="menu-image"
                                        alt="Clear glass"
                                    />
                                );
                                break;
                            case "Metals":
                                img = (
                                    <img
                                        src={alumCan}
                                        className="menu-image"
                                        alt="Metals"
                                    />
                                );
                                break;
                            case "Cardboard":
                                img = (
                                    <img
                                        src="img/cardboard.png"
                                        className="menu-image"
                                        alt="Cardboard"
                                    />
                                );
                                break;
                            case "Paper":
                                img = (
                                    <img
                                        src="img/paper.png"
                                        className="menu-image"
                                        alt="Paper"
                                    />
                                );
                                break;

                            case "Coloured glass":
                                img = (
                                    <img
                                        src={glassBottle}
                                        className="menu-image"
                                        alt="Coloured glass"
                                    />
                                );
                                break;
                            case "Plastic":
                                img = (
                                    <img
                                        src={plasticBottle}
                                        className="menu-image"
                                        alt="Plastic"
                                    />
                                );
                                break;
                            case "Electric equipment":
                                img = (
                                    <img
                                        src={plasticBottle}
                                        className="menu-image"
                                        alt="Electric equipment"
                                    />
                                );
                                break;
                            default:
                                img = "";
                        }
                        return (
                            <p key={index}>
                                {item.trashTypeName}
                                {img}
                            </p>
                        );
                    })}
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
        let myPosition = (
            <Marker
                icon={myPositionicon}
                name={"SOMA"}
                position={{ lat: this.state.lat, lng: this.state.lng }}

                //this.markerClicked.bind(this)
            />
        );
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
                    {myPosition}
                </MarkerClusterer>
            </GoogleMap>
        );
    }
}

export default withScriptjs(withGoogleMap(MapContainer));
