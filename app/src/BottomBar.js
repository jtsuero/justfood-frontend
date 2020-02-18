import React, { Component } from 'react';

const photoKey = '&key=AIzaSyAOnWbA4sdxRvMQWHg_AzoJwB9MBmfe2Qo';

export default class BottomBar extends Component {

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
          <div>
            Hours:
            {this.props.businessInfo.hours[day]}
            Phone:
            {this.props.businessInfo.phone}
          </div>
          {this.props.businessInfo.photos.map((restaurant, index) => {
            return (
              <div className='bottombar-photo-row' key={restaurant.photo_reference}>
                <img className='bottombar-food' src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${restaurant.photo_reference}${photoKey}`} alt={'new'} />
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
