import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    justifyContent: "center",
    zIndex: 100,
    display: "flex",
    position: "absolute",
    bottom: theme.spacing(1),
    color: theme.palette.typography.color,
  },
}));

export default function AppFooter() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid item>
        <div>
          {"© "}
          <Link color="inherit" href="http://localhost:3000">
            GARTA
          </Link>
          {" "}
          {new Date().getFullYear()}
        </div>
      </Grid>
    </div>
  );
}
