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

  closeBottomBar = () => {
    this.setState({bottomBarOpen: false});
  }

  onPhotoClick = (newBusiness) => {
    this.setState((prevState) => {
      return {
        bottomBarOpen: !prevState.bottomBarOpen,
        currentBusiness: newBusiness,
      };
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
