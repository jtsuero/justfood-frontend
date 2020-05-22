import React, {Component} from 'react';
import './App.css';
import AreaMap from './AreaMap.js';
import BottomBar from './BottomBar.js';
import FoodPage from './FoodPage.js';
import NavBar from './NavBar.js';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentBusiness: null,
      bottomBarOpen: false,
      searchKeyword: 'restaurants',
      searchRadius: 5000,
      openNow: true,
      coordinates: null,
    };
  }

  changeSearch = (searchKeyword, searchRadius, openNow) => {
    this.setState({searchKeyword, searchRadius, openNow});
  };

  closeBottomBar = prevState => {
    this.setState({bottomBarOpen: false});
  };

  getCoordinates = (latitude, longitude) => {
    this.setState({
      coordinates: {latitude, longitude},
    });
  };

  //enables business data to be passed BottomBar component
  onPhotoClick = newBusiness => {
    this.setState({currentBusiness: newBusiness, bottomBarOpen: true});
  };

  render() {
    let bottomBar = (
      <BottomBar
        businessInfo={this.state.currentBusiness}
        closeBottomBar={this.closeBottomBar.bind(this)}
      />
    );
    // let map = null;

    //alternate view once photo is clicked on landing page
    if (this.state.bottomBarOpen) {
      bottomBar = (
        <BottomBar
          businessInfo={this.state.currentBusiness}
          closeBottomBar={this.closeBottomBar.bind(this)}
        />
      );
      // map = (
      //   <AreaMap
      //     coordinates={this.state.coordinates}
      //     restaurantCoordinates={this.state.currentBusiness}
      //   />
      // );
    }
    let foodPage = (
      <FoodPage
        clickPhoto={this.onPhotoClick.bind(this)}
        getCoordinates={this.getCoordinates.bind(this)}
        searchKeyword={this.state.searchKeyword}
      />
    );
    return (
      <Router>
        <div className="main-container">
          <NavBar changeSearch={this.changeSearch.bind(this)} />
          <Switch>
            <Route path="/" exact>
              {foodPage}
            </Route>
            <Route path="/restaurant">{bottomBar}</Route>
          </Switch>
          {/* {foodPage} */}
          {/* {bottomBar} */}
        </div>
      </Router>
    );
  }
}
export default App;
