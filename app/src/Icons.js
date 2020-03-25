import React, { Component } from 'react';
import './App.css';
const photoKey = `AIzaSyC3qAdwyGSoamVwR7DIS5VdmhVZlg1NBic`;

class Icons extends Component {

  //passes businessInfo back to parent component -- AreaMap
  onClickPhoto = (businessInfo) => {
    this.props.clickPhoto(businessInfo);
  }

  render(){
    if(!this.props.data.photos) return null

    return(
      <img className='map-food-image'
        src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${this.props.data.photos[0].photo_reference}&key=${photoKey}`}
        alt={'new'}
        onClick={() => {this.onClickPhoto(this.props.data)}}
      />
    )
  }
}

export default Icons;
