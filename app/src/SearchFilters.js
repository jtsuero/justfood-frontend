import React, {Component} from 'react';
import SearchDistanceButton from './SearchDistanceButton';

class SearchFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      distanceOpen: false,
    };
  }

  dropDownMenu = () => {
    let distances = [1, 2, 5, 10];
    const distanceButtons = distances.map(miles => {
      return (
        <SearchDistanceButton
          miles={miles}
          onClick={this.props.handleDistanceClick.bind(this, miles)}
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
          onClick={() =>
            this.setState({distanceOpen: !this.state.distanceOpen})
          }
        >
          {this.state.distanceOpen ? 'Close' : 'Distance'}
        </div>
        {this.state.distanceOpen && this.dropDownMenu()}
      </div>
    );
  }
}

export default SearchFilters;
