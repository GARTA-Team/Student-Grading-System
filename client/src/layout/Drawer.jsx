import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/MailOutlined";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    color: "#f3fcf4"
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    background: theme.palette.secondary.main
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    background: theme.palette.primary.main
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    background: theme.palette.primary.main,
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  icon: {
    color: "white",
    marginLeft: theme.spacing(1)
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.light
  },
  activeLink: {
    backgroundColor: theme.palette.primary.dark
  },
  chevronColor: {
    color: "white",
  }
}));

export default function MiniDrawer({ children }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(!open)}
            edge="start"
            className={classes.menuButton}
          >
            {open ? (
              <ChevronLeftIcon className={classes.chevronColor} />
            ) : (
              <MenuIcon />
            )}
          </IconButton>
          <Typography variant="h6" noWrap>
            Garta SGS
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
        open={open}
      >
        <div className={classes.toolbar} />
        <List>
          <ListItem
            button
            key="Home"
            component={NavLink}
            exact
            to="/"
            className={classes.link}
            activeClassName={classes.activeLink}
          >
            <ListItemIcon>
              <MailIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            button
            key="Projects"
            component={NavLink}
            to="/projects"
            className={classes.link}
            activeClassName={classes.activeLink}
          >
            <ListItemIcon>
              <MailIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary="Projects" />
          </ListItem>
          <ListItem
            button
            key="Team"
            component={NavLink}
            to="/team"
            className={classes.link}
            activeClassName={classes.activeLink}
          >
            <ListItemIcon>
              <MailIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary="Team" />
          </ListItem>
          <Divider />
          <ListItem
            button
            key="Profile"
            component={NavLink}
            to="/profile"
            className={classes.link}
            activeClassName={classes.activeLink}
          >
            <ListItemIcon>
              <MailIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem
            button
            key="Logout"
            component={NavLink}
            to="/logout"
            className={classes.link}
            activeClassName={classes.activeLink}
          >
            <ListItemIcon>
              <MailIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div>{children}</div>
      </main>
    </div>
  );
}
