import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ProjectSummary from "./ProjectSummary";

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1em",
  }
};

const PROJECTS_PER_PAGE = 10;

/**
 * Renders a list of all the users projects
 */
class ProjectsDashboard extends Component {
  state = {
    allProjects: [
      {
        id: 1,
        name: "Test",
        summary: "Proiect test",
        teamName: "Garta",
        status: "status Test",
        createdAt: new Date(),
        updatedAt: new Date(),
        deadline: new Date(),
      },
      {
        id: 2,
        name: "Test",
        summary: "Proiect test",
        teamName: "Garta",
        status: "status Test",
        createdAt: new Date(),
        updatedAt: new Date(),
        deadline: new Date(),
      },
      {
        id: 3,
        name: "Test",
        summary: "Proiect test",
        teamName: "Garta",
        status: "status Test",
        createdAt: new Date(),
        updatedAt: new Date(),
        deadline: new Date(),
      },
      {
        id: 4,
        name: "Test",
        summary: "Proiect test",
        teamName: "Garta",
        status: "status Test",
        createdAt: new Date(),
        updatedAt: new Date(),
        deadline: new Date(),
      },
    ],
    displayedProjects: [
      {
        id: 5,
        name: "Test",
        summary: "Proiect test",
        teamName: "Garta",
        status: "status Test",
        createdAt: new Date(),
        updatedAt: new Date(),
        deadline: new Date(),
      },
      {
        id: 6,
        name: "Test",
        summary: "Proiect test",
        teamName: "Garta",
        status: "status Test",
        createdAt: new Date(),
        updatedAt: new Date(),
        deadline: new Date(),
      },
      {
        id: 7,
        name: "Test",
        summary: "Proiect test",
        teamName: "Garta",
        status: "status Test",
        createdAt: new Date(),
        updatedAt: new Date(),
        deadline: new Date(),
      },
      {
        id: 8,
        name: "Test",
        summary: "Proiect test",
        teamName: "Garta",
        status: "status Test",
        createdAt: new Date(),
        updatedAt: new Date(),
        deadline: new Date(),
      },
    ],
    currentPage: 0,
  }

  componentDidMount() {

  }

  handleClick = (id) => {
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

  render() {
    const { classes } = this.props;

    const {
      displayedProjects = [],
      currentPage,
    } = this.state;

    return (
      <div>

        <div className={classes.header}>
          <Typography variant="h5">ProjectsTODO</Typography>

          <Button onClick={this.handleAdd}>Add TODO</Button>
        </div>

        {
          displayedProjects.map(project => <ProjectSummary project={project} handleClick={this.handleClick} key={project.id} />)
        }

        <Button>NextTODO</Button>
        {currentPage}
        <Button>BackTODO</Button>

      </div>
    );
  }
}

export default withStyles(styles)(ProjectsDashboard);
