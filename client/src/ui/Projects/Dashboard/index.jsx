import React, { Component } from "react";
import axios from "axios";
import { Tabs, Tab, Fab } from "@material-ui/core";
import { t } from "react-i18nify";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TablePagination from "@material-ui/core/TablePagination";
import ProjectSummary from "./ProjectSummary";
import Loader from "../../../components/Loader";
<<<<<<< Updated upstream
import Snackbar from "../../../components/Snackbar";
=======
import TabPanel from "../../../components/TabPanel";
>>>>>>> Stashed changes


const styles = theme => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1em",
    marginTop: "1em",
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
    displayedOwnedProjects: [],
    allToBeGradedProjects: [],
    displayedToBeGradedProjects: [],
    currentPage: 0,
    projectsPerPage: 10,
    isLoading: true,
<<<<<<< Updated upstream
    oldEndIndex: 0,
    message: "",
    variant: "",
=======
    tab: 0,
>>>>>>> Stashed changes
  }

  async componentDidMount() {
    try {
      // fetch data
      const response1 = await axios.get("/projects");
      const ownedProjects = response1.data;

      const response2 = await axios.get("/projects");
      const toBeGradedProjects = response2.data;

      console.log(projects)

      const { projectsPerPage = 10 } = this.state;

      this.setState({
<<<<<<< Updated upstream
        allProjects: projects,
        displayedProjects: projects.slice(0, projectsPerPage),
=======
        allOwnedProjects: ownedProjects,
        displayedOwnedProjects: ownedProjects.slice(0, PROJECTS_PER_PAGE),
        allToBeGradedProjects: toBeGradedProjects,
        displayedToBeGradedProjects: toBeGradedProjects.slice(0, PROJECTS_PER_PAGE),
>>>>>>> Stashed changes
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        message: t("Errors.FetchDataError"),
        variant: "error",
      });
    }
  }

  handleChange = (event, newTab) => this.setState({
    tab: newTab,
    currentPage: 0,
  });

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

<<<<<<< Updated upstream
  handleChangePage = (event, nextPage) => {
    // recalculate the start and end index for the displayedProjects
    const { allProjects = [], projectsPerPage, oldEndIndex } = this.state;

    let startIndex = nextPage * projectsPerPage;
    let endIndex = (nextPage + 1) * projectsPerPage;

    if (startIndex > allProjects.length - 1) {
      startIndex = oldEndIndex;
      endIndex = allProjects.length - 1;
    }

    this.setState({
      currentPage: nextPage,
      displayedProjects: allProjects.slice(startIndex, endIndex),
      oldEndIndex: endIndex,
    });
  }

  handleChangeRowsPerPage = (event) => {
    this.setState(
      {
        projectsPerPage: event.target.value,
        currentPage: 0,
      },
      () => this.handleChangePage(null, 0), // show / hide the new projects
    );
=======
  handleNext = () => {
    const { tab } = this.state;
    if (tab === 0) {
      this.setState(prevState => ({
        currentPage: prevState.currentPage + 1,
        displayedOwnedProjects: prevState.allOwnedProjects.slice((prevState.currentPage + 1) * PROJECTS_PER_PAGE, (prevState.currentPage + 2) * PROJECTS_PER_PAGE),
      }));
    } else if (tab === 1) {
      this.setState(prevState => ({
        currentPage: prevState.currentPage + 1,
        displayedToBeGradedProjects: prevState.allToBeGradedProjects.slice((prevState.currentPage + 1) * PROJECTS_PER_PAGE, (prevState.currentPage + 2) * PROJECTS_PER_PAGE),
      }));
    }
  }

  handleBack = () => {
    const { tab } = this.state;

    if(tab === 0) {
      this.setState(prevState => ({
        currentPage: prevState.currentPage - 1,
        displayedOwnedProjects: prevState.allOwnedProjects.slice((prevState.currentPage - 1) * PROJECTS_PER_PAGE, (prevState.currentPage) * PROJECTS_PER_PAGE),
      }));
    } else if (tab === 1) {
      this.setState(prevState => ({
        currentPage: prevState.currentPage - 1,
        displayedToBeGradedProjects: prevState.allToBeGradedProjects.slice((prevState.currentPage - 1) * PROJECTS_PER_PAGE, (prevState.currentPage) * PROJECTS_PER_PAGE),
      }));
    }
>>>>>>> Stashed changes
  }

  render() {
    const { classes } = this.props;

    const {
      displayedOwnedProjects = [],
      displayedToBeGradedProjects = [],
      currentPage,
      isLoading = true,
<<<<<<< Updated upstream
      projectsPerPage,
      allProjects = [],
      message,
      variant,
=======
      tab = 0,
>>>>>>> Stashed changes
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
                displayedOwnedProjects.map(project => <ProjectSummary project={project} handleClick={this.handleProjectClick} key={project.id} />)
              }

              <Button onClick={this.handleBack}>{t("Projects.Dashboard.Back")}</Button>
              {currentPage}
              <Button onClick={this.handleNext}>{t("Projects.Dashboard.Next")}</Button>
            </TabPanel>
            <TabPanel tab={tab} index={1}>
              {
                displayedToBeGradedProjects.map(project => <ProjectSummary project={project} handleClick={this.handleProjectClick} key={project.id} />)
              }
            </TabPanel>
          </div>

<<<<<<< Updated upstream
          {
            displayedProjects.map(project => <ProjectSummary project={project} handleClick={this.handleProjectClick} key={project.id} />)
          }

          <div className={classes.buttonsContainer}>
            <TablePagination
              component="nav"
              page={currentPage}
              rowsPerPage={projectsPerPage}
              count={allProjects.length}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </div>
=======
>>>>>>> Stashed changes
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
