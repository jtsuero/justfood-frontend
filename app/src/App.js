import React, { Component } from 'react';
import './App.css';
import AreaMap from './AreaMap.js';
import BottomBar from './BottomBar.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentBusiness: null,
      bottomBarOpen: false,
    };
  }

  closeBottomBar = (prevState) => {
    this.setState((prevState) => {
      if(this.state.bottomBarOpen === true && prevState.currentBusiness.id === this.state.currentBusiness.id) {
        return {bottomBarOpen: false}
      }
    });
  }

  //enables business data to be passed BottomBar component
  onPhotoClick = (newBusiness) => {
    this.setState((prevState) => {
      if(prevState.currentBusiness !== null && prevState.currentBusiness.id === newBusiness.id) {
        return {
          bottomBarOpen: !prevState.bottomBarOpen,
          currentBusiness: newBusiness,
        };
      } else {
        return {
          bottomBarOpen: true,
          currentBusiness: newBusiness,
        }
      }
    });
  }

  render() {
    let bottomBar;

    if(this.state.bottomBarOpen) {
      bottomBar = <BottomBar businessInfo={this.state.currentBusiness} />
    }
    return (
      <div className='main-container'>
        <AreaMap
          clickPhoto={this.onPhotoClick.bind(this)} 
          closeBottomBar={this.closeBottomBar.bind(this)}/>
        {bottomBar}
      </div>
    );
  }
}
export default App;
