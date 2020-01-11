import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { t } from "react-i18nify";
import { Typography } from "@material-ui/core";
import ProductHeroLayout from "./ProductHeroLayout";

const styles = theme => ({
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
  slogan: {
    color: theme.palette.typography.color,
    fontWeight: "bold",
    zIndex: 1,
  },
});

function ProductHero(props) {
  const { classes } = props;

  return (
    <ProductHeroLayout>
      {/* Increase the network loading priority of the background image. */}
      <img width="150" className={classes.slogan} src={"images/logo.png"} alt="logo" />
      <Typography color="textPrimary" align="center" variant="h5" className={classes.slogan}>
        {t("Home.UnderS")}
      </Typography>
      {/* <Button
        color="primary"
        variant="contained"
        size="large"
        className={classes.button} component={NavLink} to="/register">
        {"Start"}
      </Button> */}
    </ProductHeroLayout>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHero);
