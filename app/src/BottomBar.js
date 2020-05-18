import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import Api from './api.js';
const photoKey = `AIzaSyC3qAdwyGSoamVwR7DIS5VdmhVZlg1NBic`;

export default class BottomBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yelpLink: null,
      businessPhotos: [],
    };
  }

  componentDidMount() {
    this.getPhotos();
  }

  getDay = () => {
    const date = new Date();
    if (date.getDay() === 0) {
      return 6;
    } else {
      return date.getDay() - 1;
    }
  };

  render() {
    let phone = 'N/A';
    if (this.props.businessInfo.phone) {
      phone = ' ' + this.props.businessInfo.phone + ' ';
    }
    if (this.props.businessInfo !== null) {
      return (
        <div className="bottombar">
          <FontAwesomeIcon
            className="close-button-bottombar"
            icon={faTimes}
            onClick={this.props.closeBottomBar}
          />
          <div className="bottombar-business-info">
            <div className="restaurant-name">
              {this.props.businessInfo.name}
            </div>
            <div className="business-specifics">
              Hours:
              {' ' + this.props.businessInfo.hours[this.getDay()] + ' '}
              Phone:
              {phone}
            </div>
          </div>
          <div className="bottombar-photo-row-container">
            {this.props.businessInfo.photos.map((restaurant, index) => {
              return (
                <div
                  className="bottombar-photo-row"
                  key={restaurant.photo_reference}
                >
                  <img
                    className="bottombar-image"
                    src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${restaurant.photo_reference}&key=${photoKey}`}
                    alt={''}
                  />
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }
}
