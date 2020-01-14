import React, { Component } from "react";
import axios from "axios";
import { t } from "react-i18nify";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TablePagination from "@material-ui/core/TablePagination";
import ProjectSummary from "./ProjectSummary";
import Loader from "../../../components/Loader";
import Snackbar from "../../../components/Snackbar";


const styles = theme => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1em",
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
    allProjects: [],
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
      const response = await axios.get("/projects");
      const projects = response.data;

      console.log(projects)

      const { projectsPerPage = 10 } = this.state;

      this.setState({
        allProjects: projects,
        displayedProjects: projects.slice(0, projectsPerPage),
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
  }

  render() {
    const { classes } = this.props;

    const {
      displayedProjects = [],
      currentPage,
      isLoading = true,
      projectsPerPage,
      allProjects = [],
      message,
      variant,
    } = this.state;

    return (
      <Loader isLoading={isLoading}>
        <div>

          <div className={classes.header}>
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
              count={allProjects.length}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </div>
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
