import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';

class AreaMap extends Component {
  constructor() {
    super();
    this.state = {
      longitude: null,
      latitude: null,
      zoom: 12,
      businessList: null,
    };
  }

  componentDidMount() {
    if (this.props.coordinates !== null) {
      this.setState({
        longitude: this.props.coordinates.longitude,
        latitude: this.props.coordinates.latitude,
      });
    }
  }

  render() {
    if (this.state.latitude === null || this.state.longitude === null) {
      return <div>loading</div>;
    }
    const mapProps = {
      center: {
        lat: this.state.latitude,
        lng: this.state.longitude,
      },
      zoom: this.state.zoom,
      key: 'AIzaSyC3qAdwyGSoamVwR7DIS5VdmhVZlg1NBic',
    };

    const PositionMarker = ({ text }) => (
      <FontAwesomeIcon icon={faLocationArrow} className="map-position-marker" />
    );
    const RestaurantMarker = ({ text }) => (
      <FontAwesomeIcon icon={faUtensils} className="map-restaurant-marker" />
    );
    return (
      // Important! Always set the container height explicitly
      <div className="map-container">
        <GoogleMapReact
          bootstrapURLKeys={{ key: mapProps.key }}
          defaultCenter={mapProps.center}
          defaultZoom={mapProps.zoom}
        >
          <PositionMarker
            lat={this.props.coordinates.latitude}
            lng={this.props.coordinates.longitude}
          />
          <RestaurantMarker
            lat={this.props.restaurantCoordinates.coordinates.lat}
            lng={this.props.restaurantCoordinates.coordinates.lng}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default AreaMap;
