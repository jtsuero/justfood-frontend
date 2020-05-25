import React, {Component} from 'react';
import './App.css';
import FoodPage from './FoodPage.js';
import NavBar from './NavBar.js';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import BusinessPage from './BusinessPage';

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
            <Route path="/restaurant/:id" component={BusinessPage}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
