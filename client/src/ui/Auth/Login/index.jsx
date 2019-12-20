import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import { NavLink } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import { t } from "react-i18nify";
import Axios from "axios";

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Login extends Component {
  state = {
    data: {
      email: "",
      password: "",
    }
  };

  handleChange = name => (e) => {
    const { value } = e.target;

    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [name]: value,
      },
    }));
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { data = {} } = this.state;
    const { email, password } = data;

    try {
      Axios.post(
        "/login",
        { email, pass: password },
      ).then(response => {
        console.warn(response);
        if (response.status === 202) {
          const { handleLoginSubmit } = this.props;

          handleLoginSubmit();
        }
      });

    } catch (error) {
      console.error(error);
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          {t("Auth.Login")}
        </Typography>
          <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
            <TextField
              required
              variant="outlined"
              margin="normal"
              fullWidth
              id="standard-required"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={this.handleChange("email")}
            />
            <TextField
              id="standard-password-input"
              label={t("Auth.Password")}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              type="password"
              autoComplete="current-password"
              onChange={this.handleChange("password")}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label={t("Auth.Remember")}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {t("Auth.Login")}
          </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                {t("Auth.Forgot")}
              </Link>
              </Grid>
              <Grid item>
                <NavLink href="#" to="/register" variant="body2">
                {t("Auth.LoginMessage")}
                </NavLink>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
        </Box>
      </Container>
    );
  }
}

export default withStyles(styles)(Login);
