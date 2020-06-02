import React, {Component} from 'react';
import Api from './api.js';
import LoadingPage from './LoadingPage.js';
import {Link} from 'react-router-dom';

class FoodPage extends Component {
  constructor() {
    super();
    this.state = {
      longitude: null,
      latitude: null,
      searchKeyword: 'restaurant',
      searchRadius: 5000,
      businessList: null,
      photoLinks: null,
    };
  }

  componentDidMount() {
    this.getLocation();
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchKeyword !== prevProps.searchKeyword) {
      this.getBusinesses();
    }
  }

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        this.props.getCoordinates(latitude, longitude);
        this.setState({longitude, latitude}, this.getBusinesses);
      });
    } else {
      console.log('error with navigator');
    }
  };

  getBusinesses = () => {
    const searchParams = {
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      radius: this.state.searchRadius,
      keyword: this.props.searchKeyword,
    };
    Api.getBusinesses(searchParams).then(data =>
      this.setState({businessList: data.businesses}),
    );
  };

  //passes businessInfo back to parent component -- App.js
  onClickPhoto = businessInfo => {
    this.props.clickPhoto(businessInfo);
  };

  getPhotos = () => {
    // gets first photo of 20 businesses
    const photoCollection = this.state.businessList.map(business => {
      if (business.photos && business.photos[1]) {
        return (
          <div className="food-page-single-image-container" key={business.id}>
            <Link
              to={{
                pathname: `/restaurant/${business.id}`,
              }}
              onClick={() => {
                this.onClickPhoto(business);
              }}
            >
              <img
                className="food-page-image"
                src={business.photos[1]}
                alt={''}
              />
            </Link>
          </div>
        );
      } else {
        return null;
      }
    });
    return photoCollection;
  };

  render() {
    if (this.state.businessList === null) {
      return <LoadingPage />;
    }
    return <div className="food-page-images-container">{this.getPhotos()}</div>;
  }
}

export default FoodPage;
