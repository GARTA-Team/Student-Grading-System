import React, { Component } from "react";
import PropTypes from "prop-types";
import { t } from "react-i18nify";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withStyles, Grid, Button } from "@material-ui/core";
import Overview from "./panels/Overview";
import DeliverablesTab from "./panels/Deliverables";
import TabPanel from "../../../components/TabPanel";
import Loader from "../../../components/Loader";

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
  button: {
    float: "right",
    marginTop: theme.spacing(5),
    marginRight: theme.spacing(6),
  },
});

class ProjectDetails extends Component {
  state = {
    project: {},
    tab: 0,
    isLoading: true,
  }

  async componentDidMount() {
    try {
      const { params } = this.props.match;
      const { projectId } = params;

      const response = await axios.get(`/projects/${projectId}`);
      const project = response.data;

      console.log(project)

      this.setState({ project, isLoading: false });
    } catch (error) {
      // TODO
    }
  }


  handleChange = (event, newTab) => this.setState({ tab: newTab });

  render() {
    const { classes, history } = this.props;

    const { tab = 0, project = {}, isLoading = true } = this.state;
    return (
      <Loader isLoading={isLoading}>
        <Grid container justify="space-between">
          <Grid item xs={6} >
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

          {
            project.type === "STUDENT" || project.type === "PROFESSOR" ? (
              <Grid item xs={6} justify="flex-end">
                <Typography variant="caption">
                  {t("Projects.Details.Grade")}
                </Typography>
                <Typography variant="h5">
                  {project.grade ? project.grade : t("Dashboard.NotGraded")}
                </Typography>
              </Grid>
            ) : null
          }
        </Grid>

        <div className={classes.tabsRoot}>
          <Tabs
            value={tab}
            onChange={this.handleChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            aria-label="tabs"
          >
            <Tab label={t("Projects.Details.Tabs.Overview")} aria-label={t("Projects.Details.Tabs.Overview")} />
            <Tab label={t("Projects.Details.Tabs.Deliverables")} aria-label={t("Projects.Details.Tabs.Deliverables")} />
          </Tabs>
          <TabPanel tab={tab} index={0}>
            <Overview project={project} />
          </TabPanel>
          <TabPanel tab={tab} index={1}>
            <DeliverablesTab project={project} />
          </TabPanel>
        </div>

        <Button variant="contained" onClick={history.goBack} color="secondary" className={classes.button}>
          {t("Projects.Details.Back")}
        </Button>
      </Loader>
    );
  }
}


export default withStyles(styles)(ProjectDetails);
