import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const backgroundImage = "/images/gartaCorner.png";


const useStyles = makeStyles(theme => ({

  img: {
    flexGrow: 1,
    position: "absolute",
    top: 0,
    left: 0,
    width: 200,
    // zIndex: 9990000,
  },
}));

function Corner(props) {
  const classes = useStyles();

  return (
    <div>
      <img className={classes.img} alt="Corner" src={process.env.PUBLIC_URL + backgroundImage} />
    </div>
  );
}

Corner.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Corner;
