import React, { Component } from "react";
import axios from "axios";
import { Tabs, Tab, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { t } from "react-i18nify";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TablePagination from "@material-ui/core/TablePagination";
import ProjectSummary from "./ProjectSummary";
import Loader from "../../../components/Loader";
import Snackbar from "../../../components/Snackbar";
import TabPanel from "../../../components/TabPanel";


const styles = theme => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "end",
    marginTop: theme.spacing(5),
  },
  button: {
    marginRight: theme.spacing(1),
  },
});

/**
 * Renders a list of all the users projects
 */
class ProjectsDashboard extends Component {
  state = {
    allOwnedProjects: [],
    allToBeGradedProjects: [],
    displayedProjects: [],
    currentPage: 0,
    projectsPerPage: 10,
    isLoading: true,
    oldEndIndex: 0,
    message: "",
    variant: "",
  }

  async componentDidMount() {
    try {
      // fetch data
      const response1 = await axios.get("/projects"); // TODO students
      const ownedProjects = response1.data;

      const response2 = await axios.get("/projects"); // TODO judges
      const toBeGradedProjects = response2.data;

      const { projectsPerPage = 10 } = this.state;

      this.setState({
        allOwnedProjects: ownedProjects,
        displayedProjects: ownedProjects.slice(0, projectsPerPage),
        allToBeGradedProjects: toBeGradedProjects,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        message: t("Errors.FetchDataError"),
        variant: "error",
      });
    }
  }

  handleProjectClick = (id) => {
    const { history = {} } = this.props;
    const { location } = history;
    const { pathname = "" } = location;

    history.push(`${pathname}/${id}`);
  }

  handleAdd = () => {
    const { history = {} } = this.props;
    const { location } = history;
    const { pathname = "" } = location;

    history.push(`${pathname}/add`);
  }

  handleChangePage = (event, nextPage) => {
    // recalculate the start and end index for the displayedProjects
    const {
      tab,
      allOwnedProjects = [],
      allToBeGradedProjects = [],
      projectsPerPage,
      oldEndIndex,
    } = this.state;

    let startIndex = nextPage * projectsPerPage;
    let endIndex = (nextPage + 1) * projectsPerPage;

    if (tab === 0) {
      if (startIndex > allOwnedProjects.length - 1) {
        startIndex = oldEndIndex;
        endIndex = allOwnedProjects.length - 1;
      }

      this.setState({
        currentPage: nextPage,
        displayedProjects: allOwnedProjects.slice(startIndex, endIndex),
        oldEndIndex: endIndex,
      });
    } else if (tab === 1) {
      if (startIndex > allToBeGradedProjects.length - 1) {
        startIndex = oldEndIndex;
        endIndex = allToBeGradedProjects.length - 1;
      }

      this.setState({
        currentPage: nextPage,
        displayedProjects: allToBeGradedProjects.slice(startIndex, endIndex),
        oldEndIndex: endIndex,
      });
    }

  }

  handleChangeRowsPerPage = (event) => {
    this.setState(
      {
        projectsPerPage: event.target.value,
        currentPage: 0,
      },
      () => this.handleChangePage(null, 0), // show / hide the new projects
    );
  }

  handleChange = (event, newTab) => this.setState({
    tab: newTab,
    currentPage: 0,
  });

  render() {
    const { classes } = this.props;

    const {
      tab = 0,
      displayedProjects = [],
      currentPage,
      isLoading = true,
      projectsPerPage,
      allOwnedProjects = [],
      allToBeGradedProjects = [],
      message,
      variant,
    } = this.state;

    return (
      <Loader isLoading={isLoading}>
        <div>
          <div className={classes.tabsRoot}>
            <Tabs
              value={tab}
              onChange={this.handleChange}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
              aria-label="icon tabs example"
            >
              <Tab label={t("Projects.Tabs.Owned")} aria-label={t("Projects.Tabs.Owned")} />
              <Tab label={t("Projects.Tabs.ToBeGraded")} aria-label={t("Projects.Tabs.ToBeGraded")} />
            </Tabs>
            <TabPanel tab={tab} index={0}>
              <div className={classes.header}>
                <Typography variant="h5" >{t("Projects.Dashboard.Projects")}</Typography>
                <Fab
                  size="medium"
                  color="primary"
                  aria-label={t("Projects.Dashboard.Add")}
                  onClick={this.handleAdd}
                >
                  <AddIcon />
                </Fab>
              </div>

              {
                displayedProjects.map(project => <ProjectSummary project={project} handleClick={this.handleProjectClick} key={project.id} />)
              }

              <div className={classes.buttonsContainer}>
                <TablePagination
                  component="nav"
                  page={currentPage}
                  rowsPerPage={projectsPerPage}
                  count={allOwnedProjects.length}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </div>
            </TabPanel>
            <TabPanel tab={tab} index={1}>
              {
                displayedProjects.map(project => <ProjectSummary project={project} handleClick={this.handleProjectClick} key={project.id} />)
              }
              <div className={classes.buttonsContainer}>
                <TablePagination
                  component="nav"
                  page={currentPage}
                  rowsPerPage={projectsPerPage}
                  count={allToBeGradedProjects.length}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </div>
            </TabPanel>
          </div>

          {/* <div className={classes.header}>
            <Typography variant="h5">{t("Projects.Dashboard.Projects")}</Typography>

            <Button onClick={this.handleAdd}>{t("Projects.Dashboard.Add")}</Button>
          </div>

          {
            displayedProjects.map(project => <ProjectSummary project={project} handleClick={this.handleProjectClick} key={project.id} />)
          }

          <div className={classes.buttonsContainer}>
            <TablePagination
              component="nav"
              page={currentPage}
              rowsPerPage={projectsPerPage}
              count={allToBeGradedProjects.length}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </div> */}
        </div>

        <Snackbar
          message={message}
          onClose={() => this.setState({ message: "", variant: "" })}
          variant={variant}
        />
      </Loader>
    );
  }
}

export default withStyles(styles)(ProjectsDashboard);