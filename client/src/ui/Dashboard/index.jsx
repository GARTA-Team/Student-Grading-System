import React from "react";
import PropTypes from "prop-types";
import { t } from "react-i18nify";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import DoneIcon from "@material-ui/icons/Done";

import DataTable from "../../components/DataTable";
import { columns, options } from "./utils/options";


const useStyles = makeStyles(() => ({
  card: {
    padding: "24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    fontSize: 40,
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();

  const { data } = props;
  const { completedCount, toBeGradedCount, projects = [] } = data;

  return (
    <div>
      <Grid container spacing={3}>

        <Grid item xs={12} sm={6} lg={4}>
          <Paper className={classes.card}>
            <div>
              <Typography color="textSecondary">
                {t("Dashboard.OpenProjects")}
              </Typography>

              <Typography variant="h4" color="textPrimary">
                {projects.length}
              </Typography>

            </div>
            <FolderIcon className={classes.icon} />
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} lg={4}>
          <Paper className={classes.card}>
            <div>
              <Typography color="textSecondary">
                {t("Dashboard.ProjectsToBeGraded")}
              </Typography>

              <Typography variant="h4" color="textPrimary">
                {toBeGradedCount}
              </Typography>

            </div>
            <FormatListBulletedIcon className={classes.icon} />
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} lg={4}>
          <Paper className={classes.card}>
            <div>
              <Typography color="textSecondary">
                {t("Dashboard.CompletedProjects")}
              </Typography>

              <Typography variant="h4" color="textPrimary">
                {completedCount}
              </Typography>

            </div>
            <DoneIcon className={classes.icon} />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <DataTable
            data={projects}
            title={t("Dashboard.Table.Title")}
            columns={columns}
            options={options}
          />
        </Grid>

      </Grid>
    </div>
  );
}

Dashboard.propTypes = {
  data: PropTypes.shape({
    completedCount: PropTypes.number,
    toBeGradedCount: PropTypes.number,
    projects: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};
