import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Heading from './Heading';
import MapContainer from './MapContainer';
import Menu from './Menu';

export default class App extends Component {
    render() {
        return (
            <div>
                <Heading/>
                <MapContainer/>
                <Menu />
            </div>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
