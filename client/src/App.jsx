import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Home from "./ui/Home";
import Dashboard from "./ui/Dashboard";
import Auth from "./ui/Auth";
import Projects from "./ui/Projects";
import Team from "./ui/Team";
import Drawer from "./layout/Drawer";
import Loader from "./components/Loader";

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
    isLoading: true,
    isAuthenticated: false,
    dashboardData: [],
  }

  async componentDidMount() {
    this.loadDashboardData();
  }

  loadDashboardData = async () => {
    try {
      const { data = {} } = await axios.get("/dashboard"); // TODO change when server is done

      this.setState({ isLoading: false, isAuthenticated: true, dashboardData: data });
    } catch (error) {
      this.setState({ isLoading: false });

      console.error(error);
    }
  }


  render() {
    const { isAuthenticated = false, isLoading = true, dashboardData = {} } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <Loader isLoading={isLoading}>
          <Router>
            {
              isAuthenticated ? (
                <Drawer>
                  <Switch>
                    <Route exact path="/" render={routerProps => (<Redirect {...routerProps} to="/dashboard" />)} />
                    <Route path="/dashboard" render={routerProps => (<Dashboard {...routerProps} data={dashboardData} />)} />
                    <Route path="/projects" render={routerProps => (<Projects {...routerProps} />)} />
                    <Route path="/team" render={routerProps => (<Team {...routerProps} />)} />
                  </Switch>
                </Drawer>
              ) : (
                  <Switch>
                    <Route path="/login" render={routerProps => (<Auth {...routerProps} onSucces={this.loadDashboardData} />)} />
                    <Route
                      path="/"
                      render={routerProps => (
                        <>
                          <Redirect to="/" />
                          <Home {...routerProps} />
                        </>
                      )}
                    />
                  </Switch>
                )
            }
          </Router>
        </Loader>
      </ThemeProvider>
    );
  }
}
