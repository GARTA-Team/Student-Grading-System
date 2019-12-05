import React, { Component } from "react";
import {
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";

export default class index extends Component {
  handleLoginSubmit = async () => {
    const { history, onSucces } = this.props;

    await onSucces();
    history.replace("/dashboard");
  }

  render() {
    return (
      <div>
        <ul>
          <li><Link to="/register">Register</Link></li>
        </ul>
        <p>Authentication</p>
        <Switch>
          <Route exact path="/login">
            <Login handleLoginSubmit={this.handleLoginSubmit} />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
        </Switch>
      </div>
    );
  }
}
