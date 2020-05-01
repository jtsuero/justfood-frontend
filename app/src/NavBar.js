import React, { Component } from 'react';
import logo from './just-food-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: null,
      openNow: true,
      radius: null,
    };
  }
  setBusinessDetails = (e) => {
    e.preventDefault();
    //pass data back to parent
    this.props.changeSearch(
      this.state.searchInput,
      this.state.radius,
      this.state.openNow,
    );
  };

  handleSearchChange = (e) => {
    this.setState({ searchInput: e.target.value });
  };

  handleOpenNowChange = (event) => {
    this.setState({ openNow: event.target.checked });
  };

  render() {
    return (
      <div className="navbar-container">
        <img className="navbar-logo" src={logo} alt=""></img>
        <form onSubmit={this.setBusinessDetails} className="navbar-form">
          <input
            type="text"
            onChange={this.handleSearchChange}
            className="navbar-searchbox"
          />
          <button type="submit" value="Search" className="navbar-search-button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>
    );
  }
}
