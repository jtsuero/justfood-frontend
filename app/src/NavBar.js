import React, {Component} from 'react';
import logo from './just-food-logo.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {Link, withRouter} from 'react-router-dom';

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: null,
      openNow: true,
      radius: null,
    };
  }
  setBusinessDetails = e => {
    e.preventDefault();
    //pass data back to parent
    this.props.changeSearch(
      this.state.searchInput,
      this.props.searchRadius,
      this.props.openNow,
    );
    this.props.history.push('/');
  };

  handleSearchChange = e => {
    this.setState({searchInput: e.target.value});
  };

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

  render() {
    return (
      <div className="navbar-container">
        <Link to="/" className="navbar-logo-container">
          <img className="navbar-logo" src={logo} alt=""></img>
        </Link>
        <div className="navbar-search">
          <form onSubmit={this.setBusinessDetails} className="navbar-form">
            <input
              type="text"
              onChange={this.handleSearchChange}
              className="navbar-searchbox"
            />
            <button
              type="submit"
              value="Search"
              className="navbar-search-button"
            >
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
      </div>
    );
  }
}
export default withRouter(NavBar);
