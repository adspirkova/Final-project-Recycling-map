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
            position: {
                lat: 50.06203903000005,
                lng: 14.437462,
            },
        };
    }

    updateBins = (station) => {
        const id = 1433;
        fetch(`http://www.recycling-bins.localhost:8080/bins/${id}`)
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    bins: data.bins
                });
            });
            console.log(this.state.bins)
    };

    updateLocations = () => {
        const { lat, lng } = this.state;

        fetch(`http://www.recycling-bins.localhost:8080/locations/${lat}/${lng}`)
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

    handleToggleOpen(item){
        this.setState({
            active_marker : {
            lat : item.lat,
            lng : item.lng
          },
          cool: item.id,
          title: item.stationName,
        })
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


        let myInfowindow = (
            this.state.active_marker && 
                <InfoWindow
                onCloseClick={ ()=> {this.setState({active_marker:null})} }
                visible={ true }
                position={this.state.active_marker}
                id={this.state.cool}
                title={this.state.title}
                >
                  <div>
                    <h4>{ this.state.title }</h4>
                    { this.state.bins.map((item, index) => 
                      (<p key={index}>{item.trashTypeName}</p>)
                    
                    )}
        
                    <img src="img/icon/1-plastic1.svg" className="menu-image" alt="glass"/>
                  </div>
                    
                </InfoWindow>
        );

        return (
            <GoogleMap
                style={{ width: "100px", height: "100px" }}
                defaultZoom={18}
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
