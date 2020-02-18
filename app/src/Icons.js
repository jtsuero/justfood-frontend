import React, { Component } from 'react';
import './App.css';
const photoKey = '&key=AIzaSyAOnWbA4sdxRvMQWHg_AzoJwB9MBmfe2Qo';

class Icons extends Component {

  onClickPhoto = (businessInfo) => {
    this.props.clickPhoto(businessInfo);
  }

  render(){
    return(
      <img className='food-image'
        src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${this.props.data.photos[0].photo_reference}${photoKey}`}
        alt={'new'}
        onClick={() => {this.onClickPhoto(this.props.data)}}
      />
    )
  }
}

export default Icons;
