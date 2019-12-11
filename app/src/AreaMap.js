import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
require('dotenv/config');

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class AreaMap extends Component {
  static defaultProps = {
    center: {
      lat: 47.60,
      lng: -122.33,
    },
    zoom: 11
  };

  render() {
    console.log(process.env.GOOG_API);
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAOnWbA4sdxRvMQWHg_AzoJwB9MBmfe2Qo' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={47.608013}
            lng={-122.335167}
            text='Dis U'
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default AreaMap;
