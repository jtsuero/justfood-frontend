import React, {Component} from 'react';
import just_food_logo from './just_food_burger.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {Link, withRouter} from 'react-router-dom';
import SearchFilters from './SearchFilters.js';
import MobileSearchBox from './MobileSearchBox.js';

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: null,
      zipCode: null,
    };
  }

  handleOpenNowChange = openStatus => {
    this.props.changeSearch(
      this.state.searchInput,
      this.props.searchRadius,
      openStatus,
    );
  };

  handleDistanceClick = miles => {
    this.props.changeSearch(this.state.searchInput, miles, this.props.openNow);
  };

  handleSearchChange = e => {
    this.setState({searchInput: e.target.value});
  };

  handleZipChange = e => {
    this.setState({zipCode: e.target.value});
  };

  searchForm = () => {
    return (
      <div className="navbar-search">
        <form onSubmit={this.setBusinessDetails} className="navbar-form">
          <input
            type="text"
            onChange={this.handleSearchChange}
            className="navbar-searchbox"
            placeholder="burgers, sushi, food"
          />
          <input
            type="text"
            onChange={this.handleZipChange}
            className="navbar-zipbox"
            placeholder={
              this.props.searchLocation
                ? this.props.searchLocation
                : 'Current Location'
            }
          />
          <button type="submit" value="Search" className="navbar-search-button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
        <SearchFilters
          handleOpenNowChange={this.handleOpenNowChange.bind(this)}
          handleDistanceClick={this.handleDistanceClick.bind(this)}
          openNow={this.props.openNow}
          searchRadius={this.props.searchRadius}
        />
      </div>
    );
  };

  setBusinessDetails = e => {
    e.preventDefault();
    //pass data back to parent
    this.props.changeSearch(
      this.state.searchInput,
      this.props.searchRadius,
      this.props.openNow,
      this.state.zipCode,
    );
    this.props.history.push('/');
  };

  render() {
    return (
      <div className="navbar-container">
        <Link
          to="/"
          onClick={() => window.location.reload()}
          className="navbar-link"
        >
          <div className="navbar-logo-container">
            <img className="navbar-logo" src={just_food_logo} alt="" />
          </div>
          <div className="navbar-app-name">just food</div>
        </Link>
        {this.searchForm()}
        <MobileSearchBox
          handleOpenNowChange={this.handleOpenNowChange.bind(this)}
          handleDistanceClick={this.handleDistanceClick.bind(this)}
          openNow={this.props.openNow}
          searchRadius={this.props.searchRadius}
          changeSearch={this.props.changeSearch}
          searchLocation={this.props.searchLocation}
        />
      </div>
    );
  }
}
export default withRouter(NavBar);
