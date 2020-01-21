import React, { Component } from 'react';
import './App.css';

class Icons extends Component {
  constructor() {
    super()
    this.state = {
      hover: false,
      clicked: false,
    }
  }

  convertTime = (time) => {
    const adjustedTime = parseInt(time);

    if(adjustedTime <= 1159) {
      return adjustedTime + 'am' + ' ';
    }
      return ' ' + adjustedTime - 1200 + 'pm';
  }

  render(){

    if(this.state.hover === true) {
      return(
        <div>
          <img className='food-image' src={this.props.data.photos[0]} alt={'new'} onClick={() => this.setState({clicked:true})} />
        </div>
      )
    } else if(this.state.clicked === true) {
      const date = new Date();
      // console.log(this.props.data);
      // console.log(this.props.data.hours[0].open);
      // console.log(this.props.data.hours[0].open[date.getDay()]);
      //write if to catch if hours are null
      return(
        <div className='image-container'>
          <div className='restaurant-name'>
            {this.props.data.name}
          </div>
          <div className='photo-row'>
            <div className='photo-clicked'>
              <img className='clicked-image' src={this.props.data.photos[0]} alt={'new'} onClick={() => this.setState({clicked:false})} />
            </div>
            <div className='photo-clicked'>
              <img className='clicked-image' src={this.props.data.photos[1]} alt={'new'} />
            </div>
            <div className='photo-clicked'>
              <img className='clicked-image' src={this.props.data.photos[2]} alt={'new'} />
            </div>
          </div>
          <div className='restaurant-hours'>
            Open:
            {this.convertTime(this.props.data.hours[0].open[date.getDay()].start)}
            Close:
            {this.convertTime(this.props.data.hours[0].open[date.getDay()].end)}
          </div>
          {/* <img className='clicked-image' src={this.props.data.photos[0]} alt={'new'} onClick={() => this.setState({clicked:false})} /> */}
          {/* <div> */}
          {/*   {this.props.data.is_open_now} */}
          {/* </div> */}
        </div>
      )
    } else {
      return(
        <img className='food-image' src={this.props.data.photos[0]} alt={'new'} onClick={() => this.setState({clicked:true})} />
      )
    }
  }
}

export default Icons;
