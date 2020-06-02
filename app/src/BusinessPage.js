import React, {Component} from 'react';
import Modal from './Modal.js';
import Api from './api.js';
import LoadingPage from './LoadingPage.js';

export default class BusinessPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businessPhotos: [],
      businessInfo: null,
      modalIsOpen: false,
      photoIndex: null,
    };
  }

  componentDidMount() {
    const {
      match: {params},
    } = this.props;
    this.getBusinessInfo(params.id);
  }

  getBusinessInfo = businessId => {
    Api.getBusiness(businessId).then(businessInfo =>
      this.setState({businessInfo: businessInfo.business.json.result}),
    );
  };

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
      this.filterProps(this.state.businessInfo.name) +
      ',' +
      this.filterProps(this.state.businessInfo.formatted_address) +
      '/@' +
      this.state.businessInfo.geometry.location.lat +
      ',' +
      this.state.businessInfo.geometry.location.lng;
    return googleUrl;
  };

  openModal = photoIndex => {
    this.setState({modalIsOpen: true, photoIndex});
  };

  closeModal = () => {
    this.setState({modalIsOpen: false});
  };

  render() {
    let phone = 'N/A';
    let modal = null;
    if (
      this.state.businessInfo &&
      this.state.businessInfo.formatted_phone_number
    ) {
      phone = ' ' + this.state.businessInfo.formatted_phone_number + ' ';
    }
    if (this.state.modalIsOpen) {
      modal = (
        <Modal
          closeModal={this.closeModal}
          photos={this.state.businessInfo.photos}
          photoIndex={this.state.photoIndex}
        />
      );
    }
    if (this.state.businessInfo !== null) {
      return (
        <div className="business-page">
          {modal}
          <div className="business-page-business-info">
            <div className="restaurant-name">
              {this.state.businessInfo.name}
            </div>
            <div className="business-specifics">
              Hours:
              {' ' +
                this.state.businessInfo.opening_hours.weekday_text[
                  this.getDay()
                ] +
                ' '}
              <div>
                Phone:
                {phone}
              </div>
              <div>
                Address:
                {' ' + this.state.businessInfo.formatted_address}
                <div>
                  <a href={this.generateDirectionsUrl()}>Get Directions</a>
                </div>
              </div>
            </div>
          </div>
          <div className="business-page-photo-row-container">
            {this.state.businessInfo.photos.map((photoUrl, index) => {
              let photoLink = photoUrl;
              return (
                <div className="business-page-photo-row">
                  <img
                    className="business-page-image"
                    src={photoLink}
                    alt={''}
                    onClick={() => {
                      this.openModal(index);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      );
    } else {
      return <LoadingPage />;
    }
  }
}
