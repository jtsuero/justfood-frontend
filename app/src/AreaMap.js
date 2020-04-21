import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import Api from "./api.js";
import Icons from "./Icons.js";
import marker from "./location_map_pin_navy_blue5.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";

class AreaMap extends Component {
  constructor() {
    super();
    this.state = {
      longitude: null,
      latitude: null,
      zoom: 12,
      businessList: null
    };
  }

  componentDidMount() {
    if (this.props.coordinates !== null) {
      this.setState({
        longitude: this.props.coordinates.longitude,
        latitude: this.props.coordinates.latitude
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
        lng: this.state.longitude
      },
      zoom: this.state.zoom,
      key: "AIzaSyC3qAdwyGSoamVwR7DIS5VdmhVZlg1NBic"
    };

    const PositionMarker = ({ text }) => (
      <FontAwesomeIcon icon={faLocationArrow} />
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
            lat={this.state.latitude}
            lng={this.state.longitude}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default AreaMap;
