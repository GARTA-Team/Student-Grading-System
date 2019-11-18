import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./Home";
import Auth from "./Auth";
import AppBar from "../layout/AppBar"


class App extends Component {
  render() {
    return (
      <Router>
      <AppBar />
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Auth />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;