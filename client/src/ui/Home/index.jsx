import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class index extends Component {
  render() {
    return (
      <div>
        <p>Home</p>
        <NavLink to='/login'>Login</NavLink> {/* // TODO */}
      </div>
    );
  }
}
