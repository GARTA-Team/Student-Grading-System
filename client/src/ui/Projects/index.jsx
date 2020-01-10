import React from "react";
import { Switch, Route } from "react-router-dom";
import ProjectsDashboard from "./Dashboard";
import AddProjectPage from "./Add";
import ProjectDetails from "./Details";

export default function ProjectsPage(props) {
  const { history = {}, path = "" } = props;

  return (
    <Switch>
      <Route exact path={path} render={routerProps => (<ProjectsDashboard {...routerProps} history={history} />)} />
      <Route path={`${path}/add`} render={routerProps => (<AddProjectPage {...routerProps} />)} />
      <Route path={`${path}/:projectId`} render={routerProps => (<ProjectDetails {...routerProps} />)} />
    </Switch>
  )
}
