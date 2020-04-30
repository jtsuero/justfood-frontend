import React, { Component } from "react";
import logo from "./just-food-logo.png";

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
      this.state.openNow
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
        <img className="logo" src={logo} alt=""></img>
        <form onSubmit={this.setBusinessDetails}>
          <input type="text" onChange={this.handleSearchChange} />
          <input
            type="checkbox"
            onChange={this.handleOpenNowChange}
            name="open now"
            checked
          />
          <label for="open now">Open Now</label>
          <input type="submit" value="Search" />
        </form>
      </div>
    );
  }
}
