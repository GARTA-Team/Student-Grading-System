import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import LanguagePicker from "../../../../components/LanguagePicker";


const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    color: theme.palette.typography.color,
  },
  title: {
    color: theme.palette.typography.color,
  },
  tool: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
}));

function AppAppBar(props) {
  const classes = useStyles();

  return (
    <div>
      <Grid item xs={12}>
        <AppBar elevation={0} position="sticky">
          <Toolbar className={classes.tool}>
            <LanguagePicker />
            <Button className={classes.menuButton} component={NavLink} to="/login">
              {"Login"}
            </Button>
          </Toolbar>
        </AppBar>
      </Grid>
      <div className={classes.placeholder} />
    </div>
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default AppAppBar;
