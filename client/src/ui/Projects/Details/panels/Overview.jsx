import React from "react";
import PropTypes from "prop-types";
import { t } from "react-i18nify";
import moment from "moment";

import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, List, ListItem, ListItemText, Card, CardHeader, CardContent } from "@material-ui/core";


const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
  },
  listItem: {
    justifyContent: "space-between",
  },
  cardHeader: {
    paddingBottom: "0",
  },
  cardContent: {
    paddingTop: "0",
  },
  paper: {
    padding: theme.spacing(1),
    height: "100%",
  },
  summary: {
    marginBottom: theme.spacing(1),
  },
}));


function Overview({ project }) {
  const classes = useStyles();

  const { summary = "", members = {}, professorName = "test", nextDeadline, type } = project;

  return (
    <Grid container className={classes.root} spacing={5}>
      {/* Summary */}
      <Grid item xs={8}>
        <Paper className={classes.paper}>
          <Typography variant="h5" className={classes.summary}>
            {t("Projects.Details.Summary")}
          </Typography>

          <Typography variant="body1">
            {summary}
          </Typography>
        </Paper>
      </Grid>

      <Grid item container spacing={5} xs={4}>

        <Grid item xs={12} >
          <Card className={classes.card}>
            <CardHeader
              className={classes.cardHeader}
              subheader={t("Project.Details.Info")}
            />
            <CardContent className={classes.cardContent}>
              <List>
                <ListItem divider className={classes.listItem}>
                  <Typography variant="body1">{t("Projects.Details.Professor")}</Typography>
                  <Typography variant="body1">{professorName}</Typography>
                </ListItem>

                <ListItem divider className={classes.listItem}>
                  <Typography variant="body1">{t("Projects.Details.NextDeadline")}</Typography>
                  {
                    nextDeadline ? (
                      <Typography variant="body1">{moment(nextDeadline).format("DD.MM.YYYY")}</Typography>
                    ) : null
                  }
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {
          type === "STUDENT" || project.type === "PROFESSOR" ? (
            <Grid item xs={12} >
              <Paper>
                <Card className={classes.card}>
                  <CardHeader
                    className={classes.cardHeader}
                    subheader={t("Project.Details.TeamMembers")}
                  />
                  <CardContent className={classes.cardContent}>
                    <List>
                      {
                        members.map(({ username }, index) => (
                          <ListItem divider key={`${index + 1}. ${username}`}>
                            <ListItemText primary={`${index + 1}. ${username}`} />
                          </ListItem>
                        ))
                      }
                    </List>
                  </CardContent>
                </Card>

              </Paper>
            </Grid>
          ) : null
        }


      </Grid>

    </Grid>

  );
}

Overview.propTypes = {
  project: PropTypes.object.isRequired,
};

export default Overview;

