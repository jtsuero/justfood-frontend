import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


class AreaMap extends Component {
  constructor() {
    super()
    this.state = {
      longitude: null,
      latitude: null,
      zoom: 11,
    }
  }

  componentDidMount() {
    this.getLocation();
  }

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        this.setState({longitude, latitude})
        console.log(`longitude: ${ this.state.longitude } | latitude: ${ this.state.latitude }`);
      });
    } else {
      console.log('error with navigator');
    }


  }

  render() {
    if(this.state.latitude === null || this.state.longitude === null) {
      return(
        <div>
          loading
        </div>
      )
    }
    const props = {
      center: {
        lat: this.state.latitude,
        lng: this.state.longitude,
      },
      zoom: this.state.zoom,
    }
    const PositionMarker = ({ text }) => <div>{text}</div>;
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAOnWbA4sdxRvMQWHg_AzoJwB9MBmfe2Qo' }}
          defaultCenter={props.center}
          defaultZoom={props.zoom}
        >
          <PositionMarker
            lat={this.state.latitude}
            lng={this.state.longitude}
            text="Dis U"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default AreaMap;
