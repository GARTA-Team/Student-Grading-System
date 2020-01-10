import React, { Component } from "react";
import PropTypes from "prop-types";
import { t } from "react-i18nify";
import Typography from "@material-ui/core/Typography";
import TabPanel from "../../../components/TabPanel";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withStyles, Grid, Box } from "@material-ui/core";

import Overview from "./panels/Overview";

const styles = theme => ({
  status: {
    border: "1px solid rgb(67, 160, 71)",
    color: "rgb(67, 160, 71)",
    height: "20px",
    display: "inline - flex",
    padding: "4px 8px",
    flexGrow: "0",
    fontSize: "10px",
    minWidth: "20px",
    alignItems: "center",
    flexShrink: "0",
    lineHeight: "10px",
    whiteSpace: "nowrap",
    borderRadius: "2px",
    justifyContent: "center",
  },
  tabsRoot: {
    flexGrow: 1,
    marginTop: theme.spacing(3),
  },
});

class ProjectDetails extends Component {
  state = {
    project: {
      name: "TEST",
      status: "Active",
    },
    tab: 0,
  }

  handleChange = (event, newTab) => this.setState({ tab: newTab });

  render() {
    const { classes } = this.props;

    const { tab = 0, project = {} } = this.state;
    return (
      <div>
        <Grid container>
          <Grid item xs={2} >
            <Typography variant="caption">
              {t("Projects.Details.Project")}
            </Typography>

            <Typography variant="h5">
              {project.name}
            </Typography>
            <Typography variant="caption" className={classes.status}>
              {`status: ${t("Project.Status." + project.status)}`}
            </Typography>
          </Grid>
        </Grid>

        <div className={classes.tabsRoot}>
          <Tabs
            value={tab}
            onChange={this.handleChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            aria-label="icon tabs example"
          >
            <Tab label={t("Projects.Details.Tabs.Overview")} aria-label={t("Projects.Details.Tabs.Overview")} />
            <Tab label={t("Projects.Details.Tabs.Data")} aria-label={t("Projects.Details.Tabs.Data")} />
            <Tab label={t("Projects.Details.Tabs.History")} aria-label={t("Projects.Details.Tabs.History")} />
            <Tab label={t("Projects.Details.Tabs.Chat")} aria-label={t("Projects.Details.Tabs.Chat")} />
          </Tabs>
          <TabPanel tab={tab} index={0}>
            <Overview />
          </TabPanel>
          <TabPanel tab={tab} index={1}>
            Item Two
          </TabPanel>
          <TabPanel tab={tab} index={2}>
            Item Three
          </TabPanel>
        </div>
      </div>
    );
  }
}


export default withStyles(styles)(ProjectDetails);


// const project = await axios.get(`/projects/${id}`);

//     console.log(project)