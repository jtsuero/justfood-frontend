import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import SearchDistanceButton from './SearchDistanceButton';
import just_food_logo from './just_food_burger.png';

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
          source="mobile"
        />
      );
    });
    return (
      <div className="mobile-search-distance-container">
        <div className="mobile-search-distance-buttons">{distanceButtons}</div>
      </div>
    );
  };

  openNowButton = () => {
    //button will indicate also showing restaurants that are closed
    let cls = 'mobile-search-open-now';
    if (this.props.openNow) {
      cls += ' active';
    }
    return (
      <div
        className={cls}
        onClick={() => {
          this.props.handleOpenNowChange(!this.props.openNow);
        }}
      >
        Open Now
      </div>
    );
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
            />
          </div>
          <div className="mobile-zipbox-container">
            <input
              type="text"
              onChange={this.handleZipChange}
              className="mobile-zipbox"
              placeholder={
                this.props.searchLocation
                  ? this.props.searchLocation
                  : 'Current Location'
              }
            />
          </div>
          <div className="mobile-search-filters">
            {this.openNowButton()}
            {this.distanceButtons()}
          </div>
          <div className="mobile-submit-buttons">
            <button className="mobile-cancel-button">Cancel</button>
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
