import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { t } from "react-i18nify";
import { NavLink } from "react-router-dom";
import { Typography } from "@material-ui/core";
import ProductHeroLayout from "./ProductHeroLayout";

// const backgroundImage =
//   "https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400&q=80";

const backgroundImage = "images/gartaCorner.png";

const styles = theme => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    // background: theme.palette.primary.dark,
    backgroundPosition: "center",
  },
  button: {
    minWidth: 200,
    background: theme.palette.primary.main,
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(10),
    },
  },
  more: {
    marginTop: theme.spacing(2),
  },
});

function ProductHero(props) {
  const { classes } = props;

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
      {/* <img src={"images/gartaCorner.png"} alt="increase priority" /> */}
      <Typography className={classes.slogan} color="textPrimary" align="center" variant="h2" marked="center">
        {t("Home.Slogan")}
      </Typography>
      <Typography color="textPrimary" align="center" variant="h5" className={classes.h5}>
        {t("Home.UnderS")}
      </Typography>
      <Button
        color="primary"
        variant="contained"
        size="large"
        className={classes.button} component={NavLink} to="/register">
        {"Start"}
      </Button>
      {/* <Typography color="textPrimary" variant="body2" className={classes.more}>
        Discover the experience
      </Typography> */}
    </ProductHeroLayout>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHero);
