import React, { Component } from "react";
import logo from "./just-food-logo.png";

export default class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: null,
      radius: null
    };
  }
  setBusinessDetails = e => {
    e.preventDefault();
    //pass data back to parent
    console.log("test");
    this.props.changeSearch(this.state.searchInput, this.state.radius);
  };

  handleSearchChange = e => {
    this.setState({ searchInput: e.target.value });
  };

  render() {
    return (
      <div className="navbar-container">
        <img className="logo" src={logo}></img>
        <form onSubmit={this.setBusinessDetails}>
          <input type="text" onChange={this.handleSearchChange} />
          <input type="submit" value="Search" />
        </form>
      </div>
    );
  }
}
