import React, { Component } from 'react';
import './App.css';
const photoKey = `AIzaSyDg2FbzEo9E49aIjWHigryCDHz1BfBWt3w`;

class Icons extends Component {

  //passes businessInfo back to parent component -- AreaMap
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
