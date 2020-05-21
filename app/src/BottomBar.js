import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal.js';
const photoKey = `AIzaSyC3qAdwyGSoamVwR7DIS5VdmhVZlg1NBic`;

export default class BottomBar extends Component {
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
        <div className="bottombar">
          {modal}
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
              let photoLink = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${restaurant.photo_reference}&key=${photoKey}`;
              return (
                <div
                  className="bottombar-photo-row"
                  key={restaurant.photo_reference}
                >
                  <img
                    className="bottombar-image"
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
    }
  }
}
