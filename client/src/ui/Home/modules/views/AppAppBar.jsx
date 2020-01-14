import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
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
    zIndex: 100,
    display: "flex",
    position: "absolute",
    right: 0,
    top: theme.spacing(1),
  },
}));

function AppAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.tool}>
      <LanguagePicker />
      <Button variant="contained" color="primary" className={classes.menuButton} component={NavLink} to="/login">
        {"Login"}
      </Button>
    </div>
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default AppAppBar;
