import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Auth from "./Auth";
import Projects from "./Projects";
import Team from "./Team";
import Drawer from "../layout/Drawer";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#54a75c",
      main: "#2a9134",
      dark: "#1d6524"
    },
    secondary: {
      light: "#3b533e",
      main: "#0b280e",
      dark: "#071c09"
    },
    background: {
      default: "#f7fdf8"
    },
    text: {
      primary: "#061407",
      light: "#f3fcf4"
    },
    typography: {
      color: "#f3fcf4"
    }
  }
});

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Drawer>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/login">
                <Auth />
              </Route>
              <Route path="/projects">
                <Projects />
              </Route>
              <Route path="/team">
                <Team />
              </Route>
            </Switch>
          </Drawer>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
