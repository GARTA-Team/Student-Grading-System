import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
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

class Register extends Component {
  state = {
		data: {
			username: "",
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
		const { username, email, password } = data;

		try {
			Axios.post(
				"/signup",
				{ username, email, pass: password },
			).then(response => {
				console.warn(response);
				if (response.status === 201) {
					const { handleRegisterSubmit } = this.props;

					handleRegisterSubmit();
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
					{t("Auth.Register")}
        </Typography>
          <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
					<TextField
              required
              variant="outlined"
              margin="normal"
              fullWidth
              id="standard-required"
              label={t("Auth.Username")}
              name="username"
              autoComplete="username"
              autoFocus
              onChange={this.handleChange("username")}
            />
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {t("Auth.Register")}
          </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                {t("Auth.Forgot")}
              </Link>
              </Grid>
              <Grid item>
                <NavLink href="#" to="/login" variant="body2">
                {t("Auth.RegisterMessage")}
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

export default withStyles(styles)(Register);
