import React, { Component } from 'react';
import Modal from './Modal.js';
import Api from './api.js';
import yelpPhoto from './yelp_logo.png';
const photoKey = `AIzaSyDg2FbzEo9E49aIjWHigryCDHz1BfBWt3w`;

export default class BottomBar extends Component {
  constructor() {
    super();
    this.state = {
      yelpLink: null,
    }
  }

  // componentDidMount() {
  //   this.getYelpLink();
  // }

  getDay = () => {
    const date = new Date();
    if(date.getDay() === 0) {
      return 6;
    }
    else {
      return date.getDay() - 1;
    }
  }

  render() {
    console.log(this.props.businessInfo);
    const day = this.getDay();
    if(this.props.businessInfo !== null) {
      return(
        <div className='bottombar' >
          <div className='restaurant-name'>
            {this.props.businessInfo.name}
          </div>
          {/* need to add an if statement here? Component!!!  also gotta figure out how to get link to yelp site  */}
          {/* {() => {if(this.props.businessInfo) { return */}
          {/* <div> */}
          {/*   <a href={this.props.businessInfo.website} > Website </a> */}
          {/* </div>  }}} */}
          <div className='bottombar-business-info'>
            Hours:
            {" " + this.props.businessInfo.hours[day] + " "}
            Phone:
            {" " + this.props.businessInfo.phone + " "}
            <a href={this.state.yelpLink}>
              <img className='yelp-logo' src={yelpPhoto} alt={"Yelp"}  />
            </a>
          </div>
          {this.props.businessInfo.photos.map((restaurant, index) => {
            return (
              <div className='bottombar-photo-row' key={restaurant.photo_reference}>
                <img className='bottombar-food' src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${restaurant.photo_reference}&key=${photoKey}`} alt={'new'} />
                {/* <Modal photoreference={restaurant.photo_reference}/> */}
              </div>
            )
          })}
        </div>
      )
    } else {

      return(
        <div className='bottombar'>
          TEST
        </div>
      )
    }


  }
}
