import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { t } from "react-i18nify";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import LanguagePicker from "../../components/LanguagePicker";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: theme.palette.background.default,
    height: "100vh",

  },
  menuButton: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    color: theme.palette.typography.color,
  },
  title: {
    flexGrow: 1,
    color: theme.palette.typography.color,
  },
  slogan: {
    paddingTop: "5rem",
  }
}));

export default function Home(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid item xs={12}>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6">
              {t("Home.Title")}
            </Typography>
            <LanguagePicker />
            <Button className={classes.menuButton} component={NavLink} to="/login">
              {"Login"}
            </Button>
          </Toolbar>
        </AppBar>
      </Grid>

      <Grid item xs={12}>
        <Container maxWidth="sm">
          <Typography className={classes.slogan} variant="h4" color="textPrimary">
            {t("Home.Slogan")}
          </Typography>
        </Container>
      </Grid>
    </div>
  );
}
