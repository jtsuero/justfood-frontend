import React, {Component} from 'react';
import logo from './just-food-logo.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {Link, withRouter} from 'react-router-dom';
import SearchFilters from './SearchFilters.js';

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: null,
      zipCode: null,
    };
  }
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
          />
          <input
            type="text"
            onChange={this.handleZipChange}
            className="navbar-zipbox"
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
        {this.searchForm()}
      </div>
    );
  }
}
export default withRouter(NavBar);
