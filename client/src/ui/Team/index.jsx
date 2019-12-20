import React, { Component } from "react";
import Axios from "axios";
import Tabs from './utils/Tabs';

export default class index extends Component {
  state = {
    data: {
      teams: [
        {
          name: "",
          users: []
        }
      ],
    }
  };
  async componentDidMount() {
    const userData = await Axios.get("/user-data");
    const yourTeams = await Axios.get(`/team-api/own/${userData.data.id}`);
    yourTeams.data.forEach(async (team) => {
      const teamData = await Axios.get(`/team-api/teams/${team.teamId}`);
      teamData.data.forEach((team) => {
        console.log(team.name);
      });
    });
  }

  render() {
    return (
      <div>
        <Tabs />
        
      </div>
    );
  }
}
