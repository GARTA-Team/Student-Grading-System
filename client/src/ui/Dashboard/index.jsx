import React from "react";
import { t } from "react-i18nify";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import DoneIcon from "@material-ui/icons/Done";

import DataTable from "../../components/DataTable";
import {columns, options} from "./utils/options";


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

export default function Home() {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={3}>

        <Grid item xs={12} sm={6} lg={4}>
          <Paper className={classes.card}>
            <div>
              <Typography color="textSecondary">
                Proiecte deschise
              </Typography>

              <Typography variant="h4" color="textPrimary">
                500
              </Typography>

            </div>
            <FolderIcon className={classes.icon} />
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} lg={4}>
          <Paper className={classes.card}>
            <div>
              <Typography color="textSecondary">
                To be graded TODO
              </Typography>

              <Typography variant="h4" color="textPrimary">
                500
              </Typography>

            </div>
            <FormatListBulletedIcon className={classes.icon} />
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} lg={4}>
          <Paper className={classes.card}>
            <div>
              <Typography color="textSecondary">
                Completed
              </Typography>

              <Typography variant="h4" color="textPrimary">
                500
              </Typography>

            </div>
            <DoneIcon className={classes.icon} />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <DataTable
            data={[
              { name: "Tehnologii", percentaje: "20", deadline: new Date() },
              { name: "Tehnologii", percentaje: "20", deadline: new Date() },
              { name: "Tehnologii", percentaje: "20", deadline: new Date() },
              { name: "Tehnologii", percentaje: "20", deadline: new Date() },

            ]}
            title={t("Home.Title")}
            columns={columns}
            options={options}
          />
        </Grid>

      </Grid>
    </div>
  );
}
