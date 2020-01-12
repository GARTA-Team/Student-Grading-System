import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import { Typography } from "@material-ui/core";

function Copyright() {
  return (
    <React.Fragment>
      {"© "}
      <Link color="inherit" href="http://localhost:3000">
        GARTA
      </Link>
      {" "}
      {new Date().getFullYear()}
    </React.Fragment>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.typography.color,
    backgroundColor: theme.palette.primary.main,
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
  },
  container: {
    justifyContent: "center",
    margin: "0 auto",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    display: "flex",
  },
}));


export default function AppFooter() {
  const classes = useStyles();

  return (
    <Typography component="footer" className={classes.root}>
      <Container className={classes.container}>
        <Grid item>
          <Copyright />
        </Grid>
      </Container>
    </Typography>
  );
}
