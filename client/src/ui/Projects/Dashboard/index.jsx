import React, { Component } from "react";
import axios from "axios";
import { t } from "react-i18nify";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ProjectSummary from "./ProjectSummary";
import Loader from "../../../components/Loader";


const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1em",
  },
};

const PROJECTS_PER_PAGE = 10;

/**
 * Renders a list of all the users projects
 */
class ProjectsDashboard extends Component {
  state = {
    allProjects: [],
    displayedProjects: [],
    currentPage: 0,
    isLoading: true,
  }

  async componentDidMount() {
    try {
      // fetch data
      const response = await axios.get("/projects");
      const projects = response.data;

      this.setState({
        allProjects: projects,
        displayedProjects: projects.slice(0, PROJECTS_PER_PAGE),
        isLoading: false,
      });
    } catch (error) {
      // TODO
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

  handleNext = () => this.setState(prevState => ({
    currentPage: prevState.currentPage + 1,
    displayedProjects: prevState.allProjects.slice((prevState.currentPage + 1) * PROJECTS_PER_PAGE, (prevState.currentPage + 2) * PROJECTS_PER_PAGE),
  }))

  handleBack = () => this.setState(prevState => ({
    currentPage: prevState.currentPage - 1,
    displayedProjects: prevState.allProjects.slice((prevState.currentPage - 1) * PROJECTS_PER_PAGE, (prevState.currentPage) * PROJECTS_PER_PAGE),
  }))

  render() {
    const { classes } = this.props;

    const {
      displayedProjects = [],
      currentPage,
      isLoading = true,
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

          <Button onClick={this.handleBack}>{t("Projects.Dashboard.Back")}</Button>
          {currentPage}
          <Button onClick={this.handleNext}>{t("Projects.Dashboard.Next")}</Button>

        </div>
      </Loader>
    );
  }
}

export default withStyles(styles)(ProjectsDashboard);
