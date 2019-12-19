import React from "react";
import clsx from "clsx";
import { t } from "react-i18nify";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
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
import Grid from "@material-ui/core/Grid";
import DashboardIcon from "@material-ui/icons/Dashboard";
import FolderIcon from "@material-ui/icons/Folder";
import GroupIcon from "@material-ui/icons/Group";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import NavItem from "./NavItem";
import LanguagePicker from "../../components/LanguagePicker";


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    color: "#f3fcf4",
  },
  menuButton: {
    marginRight: 36,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    background: theme.palette.secondary.main,
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    background: theme.palette.primary.main,
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: theme.palette.primary.main,
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  chevronColor: {
    color: "white",
  },
  languagePicker: {
    justifyContent: "end",
  },
}));


export default function Layout({ children }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleLogOut = () => {
    Axios.get("/logout").then((res)=>{
      window.location.reload(false);
    });

  }

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar position="fixed" className={classes.appBar}>
        <Grid container justify="space-between">

          <Grid item xs={6}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() => setOpen(!open)}
                edge="start"
                className={classes.menuButton}
              >
                {
                  open
                    ? <ChevronLeftIcon className={classes.chevronColor} />
                    : <MenuIcon />
                }
              </IconButton>

              <Typography variant="h6" noWrap>
                Garta SGS
              </Typography>
            </Toolbar>
          </Grid>

          <Grid item xs={6} alignItems="center">
            <Toolbar className={classes.languagePicker}>
              <LanguagePicker />
            </Toolbar>
          </Grid>

        </Grid>
      </AppBar>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={open}
      >
        <div className={classes.toolbar} />
        <List>
          <NavItem path="/dashboard" exact title={t("Navigation.Dashboard")} Icon={DashboardIcon} />
          <NavItem path="/projects" title={t("Navigation.Projects")} Icon={FolderIcon} />
          <NavItem path="/team" title={t("Navigation.Team")} Icon={GroupIcon} />
          <Divider />
          <NavItem path="/profile" title={t("Navigation.Profile")} Icon={AccountCircleIcon} />
          <NavItem path="/" exact title={t("Navigation.Logout")} Icon={ExitToAppIcon} onClick={handleLogOut} />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div>{children}</div>
      </main>
    </div>
  );
}
