import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Api from './api.js';
import Icons from './Icons.js';
import marker from './location_map_pin_navy_blue5.png'


class AreaMap extends Component {
  constructor() {
    super()
    this.state = {
      longitude: null,
      latitude: null,
      zoom: 12,
      businessList: null,
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
      });
    } else {
      console.log('error with navigator');
    }
  }

  onPhotoClick = (businessInfo) => {
    this.props.clickPhoto(businessInfo);
  }

  onMapClick = () => {
    this.props.closeBottomBar();
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
      key: 'AIzaSyDg2FbzEo9E49aIjWHigryCDHz1BfBWt3w',
    }

    if(this.state.businessList === null) {
      Api.getBusinesses(this.state.latitude, this.state.longitude)
        .then(data => this.setState({businessList: data.businesses}))
    }
    const PositionMarker = ({ text }) => <img className='marker' src={marker} alt={"You"}></img>;
    if(this.state.businessList === null) return null
    return (
      // Important! Always set the container height explicitly
      <div className='map-container' onClick={this.onMapClick}>
        <GoogleMapReact bootstrapURLKeys={{ key: props.key }} defaultCenter={props.center} defaultZoom={props.zoom}>
          <PositionMarker lat={this.state.latitude} lng={this.state.longitude}  />
          {this.state.businessList.map((restaurant, index) => {
            return (
              <Icons
                key={index}
                lat={restaurant.coordinates.lat}
                lng={restaurant.coordinates.lng}
                data={restaurant}
                clickPhoto={this.onPhotoClick.bind(this)}

              />

            )
          })}
        </GoogleMapReact>
      </div>
    );
  }
}

export default AreaMap;
