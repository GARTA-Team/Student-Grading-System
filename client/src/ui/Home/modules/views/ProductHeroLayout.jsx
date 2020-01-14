import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
const backgroundImage = "images/homepage.jpeg";

const styles = theme => ({
  root: {
    color: theme.palette.background.default,
    position: "relative",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      height: "85vh",
      minHeight: 500,
      maxHeight: 1300,
    },
  },
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(14),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

  },
  backdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.5,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center bottom',
  },
  arrowDown: {
    position: "absolute",
    bottom: theme.spacing(4),
  },
});

function ProductHeroLayout(props) {
  const { children, classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <div className={classes.background} />
        <div className={classes.backdrop} />
        {children}
      </Container>
    </section>
  );
}

ProductHeroLayout.propTypes = {
  backgroundClassName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHeroLayout);
