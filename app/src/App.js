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
      originalLatitude: null,
      originalLongitude: null,
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
    distanceDropdownOpen: false,
  };

  componentDidMount() {
    this.getLocation();
  }

  changeSearchKeyword = input => {
    this.setState({searchInput: input});
  };

  changeCurrentLocation = input => {
    this.setState({currentLocation: input});
  };

  closeDropdown = () => {
    setTimeout(() => {
      this.setState({distanceDropdownOpen: false});
    }, 100);
  };

  resetDefaultSearch = () => {
    this.setState({
      searchKeyword: this.DEFAULT_VALUES.searchKeyword,
      searchInput: this.DEFAULT_VALUES.searchInput,
      searchRadius: this.DEFAULT_VALUES.searchRadius,
      openNow: this.DEFAULT_VALUES.openNow,
      distanceDropdownOpen: this.DEFAULT_VALUES.distanceDropdownOpen,
      currentLocation: this.DEFAULT_VALUES.currentLocation,
      searchLocation: this.DEFAULT_VALUES.searchLocation,
      longitude: this.state.originalLongitude,
      latitude: this.state.originalLatitude,
    });
  };

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const longitude = position.coords.longitude;
          const latitude = position.coords.latitude;
          this.setState({longitude, latitude});
        },
        err => {
          let currentLocation = prompt(
            'Please provide your Zip Code or City, State',
          );
          this.getCoordinates(currentLocation);
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
        searchLocation: addressDetails[0].formatted_address,
      }),
    );
  };

  submitSearch = (searchKeyword, searchRadius, openNow, address) => {
    this.setState(
      {searchKeyword: this.state.searchInput, searchRadius, openNow},
      () => {
        if (address) {
          this.getCoordinates(address);
        }
      },
    );
  };

  toggleDistanceDropdown = () => {
    this.setState({distanceDropdownOpen: !this.state.distanceDropdownOpen});
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
            submitSearch={this.submitSearch.bind(this)}
            changeSearchKeyword={this.changeSearchKeyword}
            changeCurrentLocation={this.changeCurrentLocation}
            searchRadius={this.state.searchRadius}
            searchKeyword={this.state.searchKeyword}
            searchInput={this.state.searchInput}
            currentLocation={this.state.currentLocation}
            openNow={this.state.openNow}
            searchLocation={this.state.searchLocation}
            resetDefaultSearch={this.resetDefaultSearch}
            distanceDropdownOpen={this.state.distanceDropdownOpen}
            closeDropdown={this.closeDropdown}
            toggleDropdown={this.toggleDistanceDropdown}
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
