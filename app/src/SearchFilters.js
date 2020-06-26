import React, {Component} from 'react';
import OpenNowButton from './OpenNowButton';
import SearchDistanceButtons from './SearchDistanceButtons';

class SearchFilters extends Component {
  dropDownMenu = () => {};

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
        {this.props.distanceDropdownOpen && (
          <SearchDistanceButtons
            searchRadius={this.props.searchRadius}
            handleDistanceClick={this.props.handleDistanceClick}
            closeDropdown={this.props.closeDropdown}
          />
        )}
      </div>
    );
  }
}

export default SearchFilters;
