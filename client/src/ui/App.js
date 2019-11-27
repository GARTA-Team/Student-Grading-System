import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./Home";
import Auth from "./Auth";
import Drawer from "../layout/Drawer";
import List from '@material-ui/core/List';


class App extends Component {
  render() {
    return (
      <Router>
      <Drawer >
        <p>reactul e smecher</p>
      </Drawer>
      
        

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
      </Router>
    );
  }
}

export default App;