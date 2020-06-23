import React, {Component} from 'react';
import SearchDistanceButton from './SearchDistanceButton';

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

  openNowButton = () => {
    //button will indicate also showing restaurants that are closed
    let cls = 'search-open-now';
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

  render() {
    return (
      <div className="search-dropdown-container">
        {this.openNowButton()}
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
