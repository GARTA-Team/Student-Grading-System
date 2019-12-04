import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import axios from 'axios';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Auth from "./Auth";
import Projects from "./Projects";
import Team from "./Team";
import Drawer from "../layout/Drawer";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#54a75c",
      main: "#2a9134",
      dark: "#1d6524",
    },
    secondary: {
      light: "#3b533e",
      main: "#0b280e",
      dark: "#071c09",
    },
    background: {
      default: "#f7fdf8",
    },
    text: {
      primary: "#061407",
      light: "#f3fcf4",
    },
    typography: {
      color: "#f3fcf4",
    },
  },
});

export default class App extends Component {
  constructor(props) {
    super(props);

    // if for any reason a user becomes logged out redirect him to the Home route: "/"
    axios.interceptors.response.use(
      response => response,
      (error) => {
        if (error.response) {
          const { status } = error.response;

          switch (status) {
            case 401:
              this.setState({ isAuthenticated: false });
              break;

            default:
              break;
          }
        }

        return Promise.reject(error);
      },
    );
  }

  state = {
    isAuthenticated: false,
    dashboardData: [],
  }

  async componentDidMount() {
    this.loadDashboardData();
  }

  loadDashboardData = async () => {
    try {
      const data = await axios.get("/dashboard");

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }


  render() {
    const { isAuthenticated = false } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <Router>
          {
            isAuthenticated ? (
              <Drawer>
                <Switch>
                  <Route isAuthenticated={isAuthenticated} path="/dashboard">
                    <Dashboard />
                  </Route>
                  <Route isAuthenticated={isAuthenticated} path="/login">
                    <Auth />
                  </Route>
                  <Route isAuthenticated={isAuthenticated} path="/projects">
                    <Projects />
                  </Route>
                  <Route isAuthenticated={isAuthenticated} path="/team">
                    <Team />
                  </Route>
                </Switch>
              </Drawer>
            ) : (
              <Home />
            )
          }
        </Router>
      </ThemeProvider>
    );
  }
}