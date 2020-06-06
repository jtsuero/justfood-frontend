import React, {Component} from 'react';
import SearchDistanceButton from './SearchDistanceButton';

class SearchFilters extends Component {
  constructor() {
    super();
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
          onClick={this.handleDistanceClick.bind(this, miles)}
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

  handleDistanceClick = miles => {
    this.props.handleDistanceClick(miles);
  };

  openNowButton = () => {
    let style;
    let openNowButton = (
      <div
        className="search-open-now"
        onClick={() => {
          this.props.handleOpenNowChange(!this.props.openNow);
        }}
      >
        Open Now
      </div>
    );
    //button will indicate also showing restaurants that are closed
    if (!this.props.openNow) {
      style = {background: 'white'};
      openNowButton = (
        <div
          className="search-open-now"
          style={{background: 'white'}}
          onClick={() => {
            this.props.handleOpenNowChange(!this.props.openNow);
          }}
        >
          Open Now
        </div>
      );
    }
    return openNowButton;
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
