import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import SearchDistanceButton from './SearchDistanceButton';
import just_food_logo from './just_food_burger.png';
import OpenNowButton from './OpenNowButton.js';

class MobileSearchBox extends Component {
  constructor() {
    super();
    this.state = {
      searchBoxOpen: false,
    };
  }

  distanceButtons = () => {
    let distances = [1, 2, 5, 10];
    const distanceButtons = distances.map(miles => {
      return (
        <SearchDistanceButton
          miles={miles}
          onClick={() => {
            this.props.handleDistanceClick(miles);
          }}
          active={this.props.searchRadius === miles}
          key={miles}
        />
      );
    });
    return (
      <div className="search-dropdown">
        <div className="search-dropdown-distance">{distanceButtons}</div>
      </div>
    );
  };

  handleSearchChange = e => {
    this.props.changeSearchKeyword(e.target.value);
  };

  handleLocationChange = e => {
    this.props.changeCurrentLocation(e.target.value);
  };

  searchForm = () => {
    return (
      <div className="mobile-search">
        <div className="mobile-search-header">
          <div>
            <img className="mobile-logo" src={just_food_logo} alt="" />
          </div>
          <div className="mobile-app-name">just food</div>
        </div>
        <form onSubmit={this.setBusinessDetails} className="mobile-search-form">
          <div className="mobile-searchbox-container">
            <input
              type="text"
              onChange={this.handleSearchChange}
              className="mobile-searchbox"
              placeholder="burgers, sushi, food"
              value={this.props.searchInput}
            />
          </div>
          <div className="mobile-zipbox-container">
            <input
              type="text"
              onChange={this.handleLocationChange}
              className="mobile-zipbox"
              placeholder={'Current Location'}
              value={
                this.props.currentLocation ? this.props.currentLocation : ''
              }
            />
          </div>
          <div className="mobile-search-filters">
            <OpenNowButton
              handleOpenNowChange={this.props.handleOpenNowChange}
              openNow={this.props.openNow}
            />
            {this.distanceButtons()}
          </div>
          <div className="mobile-submit-buttons">
            <button
              className="mobile-cancel-button"
              onClick={e => {
                e.preventDefault();
                this.toggleSearchBox();
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              value="Search"
              className="mobile-search-button"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    );
  };

  setBusinessDetails = e => {
    e.preventDefault();
    this.toggleSearchBox();
    //pass data back to parent
    this.props.submitSearch(
      this.props.searchInput,
      this.props.searchRadius,
      this.props.openNow,
      this.props.currentLocation,
    );
  };

  toggleSearchBox = () => {
    this.setState({searchBoxOpen: !this.state.searchBoxOpen});
  };

  render() {
    let searchBox = null;
    if (this.state.searchBoxOpen) {
      searchBox = (
        <div className="mobile-searchbox-modal-container">
          <div className="mobile-searchbox-modal-background">
            <div className="mobile-searchbox-modal-content">
              {this.searchForm()}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="mobile-searchbox-container">
        <div className="mobile-searchbox-button-container">
          <div
            className="mobile-searchbox-button"
            onClick={this.toggleSearchBox}
          >
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>
        {searchBox}
      </div>
    );
  }
}

export default MobileSearchBox;
