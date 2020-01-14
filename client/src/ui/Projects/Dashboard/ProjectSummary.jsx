import React from "react";
import { t } from "react-i18nify";
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
        title={name}
        subheader={`${t("Projects.Dashboard.By")} ${teamName}`}
      />
      <CardHeader
        title={moment(createdAt).format("DD-MM-YYYY")}
        subheader={t("Projects.Dashboard.CreatedAt")}
        titleTypographyProps={{ variant: "body2" }}
        subheaderTypographyProps={{ variant: "body2" }}
      />

      <CardHeader
        title={moment(deadline).format("DD-MM-YYYY")}
        subheader={t("Projects.Dashboard.Deadline")}
        titleTypographyProps={{ variant: "body2" }}
        subheaderTypographyProps={{ variant: "body2" }}
      />

      <CardHeader
        title={status}
        subheader={t("Projects.Dashboard.Status")}
        titleTypographyProps={{ variant: "body2" }}
        subheaderTypographyProps={{ variant: "body2" }}
      />

      <CardHeader
        title={moment(updatedAt).format("DD-MM-YYYY")}
        subheader={t("Projects.Dashboard.UpdatedAt")}
        titleTypographyProps={{ variant: "body2" }}
        subheaderTypographyProps={{ variant: "body2" }}
      />

      <Button onClick={() => handleClick(id)}>{t("Projects.Dashboard.Details")}</Button>
    </Paper>
  );
}


ProjectSummary.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    teamName: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    deadline: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProjectSummary;

