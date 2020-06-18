import React, {Component} from 'react';
import './App.css';
import FoodPage from './FoodPage.js';
import NavBar from './NavBar.js';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import BusinessPage from './BusinessPage';
import LoadingPage from './LoadingPage';
import Api from './api.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      ...this.DEFAULT_VALUES,
    };
  }

  DEFAULT_VALUES = {
    currentBusiness: null,
    searchKeyword: 'restaurants',
    searchInput: '',
    searchRadius: 2,
    openNow: true,
    coordinates: null,
    currentLocation: null,
    searchLocation: null,
  };

  componentDidMount() {
    this.getLocation();
  }

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const longitude = position.coords.longitude;
          const latitude = position.coords.latitude;
          this.setState({longitude, latitude});
        },
        err => {
          let zipCode = prompt('Please provide your Zip Code or City, State');
          this.getCoordinates(zipCode);
        },
      );
    } else {
      console.log('error with navigator');
    }
  };

  getCoordinates = address => {
    Api.getCoordinates(address).then(addressDetails =>
      this.setState({
        latitude: addressDetails[0].geometry.location.lat,
        longitude: addressDetails[0].geometry.location.lng,
        formatted_address: addressDetails[0].formatted_address,
      }),
    );
  };

  changeSearch = (searchKeyword, searchRadius, openNow, address) => {
    this.setState({searchKeyword, searchRadius, openNow}, () => {
      if (address) {
        this.getCoordinates(address);
      }
    });
  };

  //enables business data to be passed BottomBar component
  onPhotoClick = newBusiness => {
    this.setState({currentBusiness: newBusiness});
  };

  render() {
    let foodPage = <LoadingPage />;
    if (this.state.longitude && this.state.latitude) {
      foodPage = (
        <FoodPage
          clickPhoto={this.onPhotoClick.bind(this)}
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
          <NavBar
            changeSearch={this.changeSearch.bind(this)}
            searchRadius={this.state.searchRadius}
            openNow={this.state.openNow}
            searchLocation={this.state.formatted_address}
          />
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
