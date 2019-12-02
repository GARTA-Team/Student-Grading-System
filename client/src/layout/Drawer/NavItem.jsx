import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/MailOutlined";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: "white",
    marginLeft: theme.spacing(1),
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.light,
  },
  activeLink: {
    backgroundColor: theme.palette.primary.dark,
  },
}));

function NavItem({ path, title, exact = false }) {
  const classes = useStyles();

  return (
    <ListItem
      button
      component={NavLink}
      exact={exact}
      to={path}
      className={classes.link}
      activeClassName={classes.activeLink}
    >
      <ListItemIcon>
        <MailIcon className={classes.icon} />
      </ListItemIcon>
      <ListItemText primary={title} />
    </ListItem>
  );
}

NavItem.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  exact: PropTypes.bool,
};


export default NavItem;
