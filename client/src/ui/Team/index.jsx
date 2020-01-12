import React from "react";
import { Switch, Route } from "react-router-dom";
import AddTeamPage from "./AddTeam";
// import ProjectDetails from "./Details";

export default function ProjectsPage(props) {
  const { history = {}, path = "" } = props;

  return (
    <Switch>
      <Route exact path={path} render={routerProps => (<AddTeamPage {...routerProps} history={history} />)} />
      <Route path={`${path}/add`} render={routerProps => (<AddTeamPage {...routerProps} />)} />
    </Switch>
  )
}

