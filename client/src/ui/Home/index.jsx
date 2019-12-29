import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppAppBar from "./modules/views/AppAppBar";
import ProductHero from "./modules/views/ProductHero";
import AppFooter from "./modules/views/AppFooter";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: theme.palette.background.default,
    // height: "100vh",
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
  },
}));

export default function Home(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppAppBar />
      <ProductHero />
      <AppFooter />
    </div>
  );
}
