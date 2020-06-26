import React, {Component} from 'react';
import SearchDistanceButton from './SearchDistanceButton';
import OpenNowButton from './OpenNowButton';

class SearchFilters extends Component {
  dropDownMenu = () => {
    let distances = [1, 2, 5, 10];
    const distanceButtons = distances.map(miles => {
      return (
        <SearchDistanceButton
          miles={miles}
          onClick={() => {
            this.props.handleDistanceClick(miles);
            this.props.closeDropdown();
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

  render() {
    return (
      <div className="search-dropdown-container">
        <OpenNowButton
          handleOpenNowChange={this.props.handleOpenNowChange}
          openNow={this.props.openNow}
        />
        <div
          className="search-dropdown-button"
          onClick={() => this.props.toggleDropdown()}
        >
          {this.props.distanceDropdownOpen ? 'Close' : 'Distance'}
        </div>
        {this.props.distanceDropdownOpen && this.dropDownMenu()}
      </div>
    );
  }
}

export default SearchFilters;
