import React, {Component} from 'react';
import Api from './api.js';
import loading from './loading.gif';
const photoKey = `AIzaSyC3qAdwyGSoamVwR7DIS5VdmhVZlg1NBic`;

class FoodPage extends Component {
  constructor() {
    super();
    this.state = {
      longitude: null,
      latitude: null,
      searchKeyword: 'restaurant',
      searchRadius: 5000,
      businessList: null,
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
    let photoCollection = [];
    // gets first photo of 20 businesses
    for (let i = 0; i < this.state.businessList.length; i++) {
      if (
        this.state.businessList[i].photos &&
        this.state.businessList[i].photos.length > 1
      ) {
        photoCollection.push(
          <div
            className="food-page-single-image-container"
            key={this.state.businessList[i].id}
          >
            <img
              className="food-page-image"
              src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${this.state.businessList[i].photos[1].photo_reference}&key=${photoKey}`}
              alt={'new'}
              onClick={() => {
                this.onClickPhoto(this.state.businessList[i]);
              }}
            />
          </div>,
        );
      }
    }
    return photoCollection;
  };

  render() {
    let styles = {};
    if (this.props.hidden) {
      styles.display = 'none';
    }
    if (this.state.businessList === null) {
      return (
        <div className="food-page-loading-container">
          <img className="food-page-loading" src={loading} alt="none"></img>
        </div>
      );
    }
    return (
      <div className="food-page-images-container" style={styles}>
        {this.getPhotos()}
      </div>
    );
  }
}

export default FoodPage;
