import React, { Component } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
import Link from "@material-ui/core/Link";
import { NavLink } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { t } from "react-i18nify";
import axios from "axios";
import FormikTextField from "../../../components/FormFields/TextField";
import FormControlLabel from "../../../components/FormFields/FormControlLabel";
import Snackbar from "../../../components/Snackbar";

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
    variant: "",
    open: false,
    message: "",
  };
  handleSubmit = async (user) => {
    const { email, password, remember } = user;
    try {
      const response = await axios.post(
        "/login",
        { email, password, remember },
      );
      console.warn(response);
      if (response.status === 202) {
        // this dissapears immediately, I think we need to use content-flash with passport to display it on the page we redirect to after login
        // whatever page that may be
        this.setState({
          variant: "success",
          message: `${response.status} ${response.statusText}`,
          open: true,
        });
        const { handleLoginSubmit } = this.props;

        handleLoginSubmit();
      }
    } catch (error) {
      this.setState({
        variant: "error",
        message: `${error.response.status} ${error.response.statusText}`,
        open: true,
      });
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Snackbar
          variant={this.state.variant}
          message={this.state.message}
          open={this.state.open}
          handleClose={() => this.setState({ open: false })}
        />
        <Formik
          initialValues={{
            email: "",
            password: "",
            remember: false,
          }}
          validationSchema={Yup.object({
            email: Yup.string().required("Required").email(t("Auth.InvalidEmail")),
            password: Yup.string(),
            remember: Yup.bool(),
          })}
          onSubmit={async (user, { setSubmitting }) => {
            await this.handleSubmit(user);
            setSubmitting(false);
          }}
        >
          <Form>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  {t("Auth.Login")}
                </Typography>
                <FormikTextField
                  margin="normal"
                  fullWidth
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
                <FormikTextField
                  margin="normal"
                  fullWidth
                  label={t("Auth.Password")}
                  name="password"
                  type="password"
                  autoComplete="current-password"
                />

                <FormControlLabel
                  color="primary"
                  label={t("Auth.Remember")}
                  name="remember"
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
              </div>
              <Box mt={8} />
            </Container>
          </Form>
        </Formik>
      </div>
    );
  }
}

export default withStyles(styles)(Login);
