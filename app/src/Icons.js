import React, { Component } from 'react';

export default class Icons extends Component {

  render(){
    const image = new Image();
    const divStyle = {
      width: '50px',
      height: '50px',
    };
    image.src = this.props.text;

    return(
      <div>
        <img style={divStyle} src={this.props.text} alt={'new'} />
      </div>
    )
  }
}

