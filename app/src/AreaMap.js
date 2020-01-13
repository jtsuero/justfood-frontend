import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Api from './api.js';
import Icons from './Icons.js'


class AreaMap extends Component {
  constructor() {
    super()
    this.state = {
      longitude: null,
      latitude: null,
      zoom: 11,
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

    if(this.state.businessList === null) {
      Api.getPhotos(this.state.latitude, this.state.longitude)
        .then(data => this.setState({businessList: data.businesses}))
    }
    const PositionMarker = ({ text }) => <div>{text}</div>;
    if(this.state.businessList === null) return null
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
          {this.state.businessList.map((restaurant, index) => {
            console.log(restaurant);
            return (
              <Icons
                key={index}
                lat={restaurant.coordinates.latitude}
                lng={restaurant.coordinates.longitude}
                text={restaurant.photos[0]} />
            )
          })}
        </GoogleMapReact>
      </div>
    );
  }
}

export default AreaMap;
