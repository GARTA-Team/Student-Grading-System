import React, { Component } from "react";
import { t } from "react-i18nify";
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
  };

  handleRegisterSubmit = async () => {
    const { history, onSucces } = this.props;

    history.replace("/login");
  };

  render() {
    return (
      <div>
        <ul>
          <li><Link to="/register">{t("Auth.Register")}</Link></li>
          <li><Link to="/login">{t("Auth.Login")}</Link></li>
        </ul>
        <p>{t("Auth.Authentication")}</p>
        <Switch>
          <Route exact path="/login">
            <Login handleLoginSubmit={this.handleLoginSubmit} />
          </Route>
          <Route exact path="/register">
            <Register handleRegisterSubmit={this.handleRegisterSubmit} />
          </Route>
        </Switch>
      </div>
    );
  }
}
