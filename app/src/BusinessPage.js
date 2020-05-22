import React, {Component} from 'react';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import {faTimes} from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal.js';
const photoKey = `AIzaSyC3qAdwyGSoamVwR7DIS5VdmhVZlg1NBic`;

export default class BusinessPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yelpLink: null,
      businessPhotos: [],
      modalIsOpen: false,
    };
  }

  getDay = () => {
    const date = new Date();
    if (date.getDay() === 0) {
      return 6;
    } else {
      return date.getDay() - 1;
    }
  };

  filterProps = prop => {
    let filteredProp = '';
    let temp = '';
    for (let i = 0; i < prop.length; i++) {
      if (prop[i] === ' ') {
        filteredProp += temp + '+';
        temp = '';
      } else if (i === prop.length - 1) {
        filteredProp += temp + prop[i];
      } else {
        temp += prop[i];
      }
    }
    return filteredProp;
  };

  generateDirectionsUrl = () => {
    let googleUrl = 'https://www.google.com/maps/dir//';
    googleUrl +=
      this.filterProps(this.props.businessInfo.name) +
      ',' +
      this.filterProps(this.props.businessInfo.address) +
      '/@' +
      this.props.businessInfo.coordinates.lat +
      ',' +
      this.props.businessInfo.coordinates.lng;
    return googleUrl;
  };

  openModal = photoLink => {
    this.setState({modalIsOpen: true, photoLink});
  };

  closeModal = () => {
    this.setState({modalIsOpen: false});
  };

  render() {
    let phone = 'N/A';
    let modal = null;
    if (this.props.businessInfo.phone) {
      phone = ' ' + this.props.businessInfo.phone + ' ';
    }
    if (this.state.modalIsOpen) {
      modal = (
        <Modal closeModal={this.closeModal} photoLink={this.state.photoLink} />
      );
    }
    if (this.props.businessInfo !== null) {
      return (
        <div className="business-page">
          {modal}
          <div className="business-page-business-info">
            <div className="restaurant-name">
              {this.props.businessInfo.name}
            </div>
            <div className="business-specifics">
              Hours:
              {' ' + this.props.businessInfo.hours[this.getDay()] + ' '}
              <div>
                Phone:
                {phone}
              </div>
              <div>
                Address:
                {' ' + this.props.businessInfo.address}
                <div>
                  <a href={this.generateDirectionsUrl()}>Get Directions</a>
                </div>
              </div>
            </div>
          </div>
          <div className="business-page-photo-row-container">
            {this.props.businessInfo.photos.map((restaurant, index) => {
              let photoLink = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${restaurant.photo_reference}&key=${photoKey}`;
              return (
                <div
                  className="business-page-photo-row"
                  key={restaurant.photo_reference}
                >
                  <img
                    className="business-page-image"
                    src={photoLink}
                    alt={''}
                    onClick={() => {
                      this.openModal(photoLink);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      );
    } else {
      return <div>Error Loading!</div>;
    }
  }
}
