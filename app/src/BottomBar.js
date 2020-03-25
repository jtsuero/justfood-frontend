import React, { Component } from 'react';
import Api from './api.js';
import yelpPhoto from './yelp_logo.png';
const photoKey = `AIzaSyC3qAdwyGSoamVwR7DIS5VdmhVZlg1NBic`;

export default class BottomBar extends Component {
  constructor() {
    super();
    this.state = {
      yelpLink: null,
    }
  }

  getDay = () => {
    const date = new Date();
    if(date.getDay() === 0) {
      return 6;
    }
    else {
      return date.getDay() - 1;
    }
  }

  getYelpLink = () => {
    const addressArray = this.props.businessInfo.address.split(', ');
    const phone = this.props.businessInfo.int_phone.replace(' ', '').replace(/-/g, '')
    console.log("fuck");
    Api.getYelpLink(
      // console.log(
      this.props.businessInfo.name,
      //address portion
      addressArray[0],
      //city
      addressArray[1],
      //state
      addressArray[2].substring(0, 2),
      //zip code
      addressArray[2].substring(3),
      phone,
      this.props.businessInfo.coordinates.lat,
      this.props.businessInfo.coordinates.lng,
    )
      .then(yelpLink => {this.setState({yelpLink: yelpLink.businessInfo[0].yelp_url})})
    // .then(yelpLink => {console.log(yelpLink)})
  }

  render() {
    console.log(this.state.yelpLink);
    const day = this.getDay();
    if(this.state.yelpLink ===  null) {
      this.getYelpLink();
    }
    if(this.props.businessInfo !== null) {
      return(
        <div className='bottombar' >
          <div className='restaurant-name'>
            {this.props.businessInfo.name}
          </div>
          <div className='bottombar-business-info'>
            Hours:
            {" " + this.props.businessInfo.hours[this.getDay()] + " "}
            Phone:
            {" " + this.props.businessInfo.phone + " "}
            <a href={this.state.yelpLink}>
              <img className='yelp-logo' src={yelpPhoto} alt={"Yelp"}  />
            </a>
          </div>
          {this.props.businessInfo.photos.map((restaurant, index) => {
            return (
              <div className='bottombar-photo-row' key={restaurant.photo_reference}>
                <img className='bottombar-image' src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${restaurant.photo_reference}&key=${photoKey}`} alt={'new'} />
              </div>
            )
          })}
        </div>
      )
    }
  }
}
