import React, {Component} from 'react';
import './App.css';
import FoodPage from './FoodPage.js';
import NavBar from './NavBar.js';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import BusinessPage from './BusinessPage';
import LoadingPage from './LoadingPage';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentBusiness: null,
      searchKeyword: 'restaurants',
      searchRadius: 2,
      openNow: true,
      coordinates: null,
    };
  }

  componentDidMount() {
    this.getLocation();
  }

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const longitude = position.coords.longitude;
          const latitude = position.coords.latitude;
          this.getCoordinates(latitude, longitude);
          this.setState({longitude, latitude});
        },
        err => {
          console.log('error getting location', err);
        },
      );
    } else {
      console.log('error with navigator');
    }
  };

  changeSearch = (searchKeyword, searchRadius, openNow) => {
    this.setState({searchKeyword, searchRadius, openNow});
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
    let foodPage = <LoadingPage />;
    if (this.state.longitude && this.state.latitude) {
      foodPage = (
        <FoodPage
          clickPhoto={this.onPhotoClick.bind(this)}
          getCoordinates={this.getCoordinates.bind(this)}
          searchKeyword={this.state.searchKeyword}
          searchRadius={this.state.searchRadius}
          openNow={this.state.openNow}
          latitude={this.state.latitude}
          longitude={this.state.longitude}
        />
      );
    }
    return (
      <Router>
        <div className="main-container">
          <NavBar changeSearch={this.changeSearch.bind(this)} />
          <Switch>
            <Route path="/" exact>
              {foodPage}
            </Route>
            <Route path="/restaurant/:id" component={BusinessPage}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
