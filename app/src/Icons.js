import React, { Component } from 'react';
import './App.css';
const photoKey = '&key=AIzaSyAOnWbA4sdxRvMQWHg_AzoJwB9MBmfe2Qo';

class Icons extends Component {

  onClickPhoto = (businessInfo) => {
    this.props.clickPhoto(businessInfo);
  }

  render(){
    if(this.props.data.photos) {
      return(
        <img className='map-food-image'
          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${this.props.data.photos[0].photo_reference}&key=${photoKey}`}
          alt={'new'}
          onClick={() => {this.onClickPhoto(this.props.data)}}
        />
      )
    } else {
      return null
    }
  }
}

export default Icons;
