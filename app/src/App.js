import React, { Component } from 'react';
import './App.css';
import AreaMap from './AreaMap.js';
import BottomBar from './BottomBar.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentBusiness: null,
    };
  }

  onPhotoClick = (newBusiness) => {
    this.setState({currentBusiness: newBusiness});
  }

  render() {
  return (
    <div className='main-container'>
      <AreaMap clickPhoto={this.onPhotoClick.bind(this)}/>
      <BottomBar businessInfo={this.state.currentBusiness} />
    </div>
  );
  }
}
export default App;
