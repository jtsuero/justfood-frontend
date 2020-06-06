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
      businessList: null,
      photoLinks: null,
    };
  }

  componentDidMount() {
    this.getBusinesses();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.latitude !== prevProps.latitude ||
      this.props.longitude !== prevProps.longitude ||
      this.props.searchRadius !== prevProps.searchRadius ||
      this.props.searchKeyword !== prevProps.searchKeyword ||
      this.props.openNow !== prevProps.openNow
    ) {
      this.getBusinesses();
    }
  }

  getBusinesses = () => {
    const searchParams = {
      latitude: this.props.latitude,
      longitude: this.props.longitude,
      radius: this.props.searchRadius,
      keyword: this.props.searchKeyword,
      openNow: this.props.openNow,
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
      if (!business || !business.photos || !business.photos[1]) return null;
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
