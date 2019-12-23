import React, { Component } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
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
import { withStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { t } from "react-i18nify";
import axios from "axios";
import FormikTextField from "../../../components/FormFields/TextField";
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
    const { email, password } = user;
    try {
      const response = await axios.post(
        "/login",
        { email, password },
      );
      console.warn(response);
      if (response.status === 202) {
        const { handleLoginSubmit } = this.props;

        handleLoginSubmit();
      }
    } catch (error) {
      console.log(error.response);
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
          }}
          validationSchema={Yup.object({
            email: Yup.string().required("Required").email(t("Auth.InvalidEmail")),
            password: Yup.string(),
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
