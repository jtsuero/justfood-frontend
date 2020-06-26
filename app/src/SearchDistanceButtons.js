import React, {Component} from 'react';
import SearchDistanceButton from './SearchDistanceButton';

class SearchDistanceButtons extends Component {
  render() {
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
  }
}

export default SearchDistanceButtons;
