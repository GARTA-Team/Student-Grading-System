import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";


const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1.5em",
    padding: "0.2em",
  },
}));

/**
 * Represents a project entry in the list
 */
function ProjectSummary({ project, handleClick }) {
  const classes = useStyles();

  const {
    id,
    name,
    teamName,
    status,
    createdAt,
    updatedAt,
    deadline,
  } = project;

  return (
    <Paper className={classes.root}>
      {/* we use card header because it has all the required styling that we need */}
      <CardHeader
        avatar={
          <Avatar alt="Remy Sharp" src="/logo192.png" />
        }
        title={name}
        subheader={`by ${teamName} TODO`}
      />
      <CardHeader
        title={moment(createdAt).format("DD-MM-YYYY")}
        subheader={"Created at todo"}
        titleTypographyProps={{ variant: "body2" }}
        subheaderTypographyProps={{ variant: "body2" }}
      />

      <CardHeader
        title={moment(deadline).format("DD-MM-YYYY")}
        subheader={"Deadline todo"}
        titleTypographyProps={{ variant: "body2" }}
        subheaderTypographyProps={{ variant: "body2" }}
      />

      <CardHeader
        title={moment(status).format("DD-MM-YYYY")}
        subheader={"Project status TODO"}
        titleTypographyProps={{ variant: "body2" }}
        subheaderTypographyProps={{ variant: "body2" }}
      />

      <CardHeader
        title={moment(updatedAt).format("DD-MM-YYYY")}
        subheader={"Updated at TODO"}
        titleTypographyProps={{ variant: "body2" }}
        subheaderTypographyProps={{ variant: "body2" }}
      />

      <Button onClick={() => handleClick(id)}>View TODO</Button>
    </Paper>
  );
}


ProjectSummary.propTypes = {

}

export default ProjectSummary;

