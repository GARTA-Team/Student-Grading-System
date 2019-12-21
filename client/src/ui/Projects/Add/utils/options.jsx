import React from "react";
import { Translate } from "react-i18nify";

export const columns = [
  { title: <Translate value="Projects.Add.Deliverable.Name" />, field: "name" },
  { title: <Translate value="Projects.Add.Deliverable.Description" />, field: "description" },
  { title: <Translate value="Projects.Add.Deliverable.Deadline" />, field: "deadline", type: "datetime" },
  { title: <Translate value="Projects.Add.Deliverable.Weight" />, field: "weight", type: "numeric" },
];

export const options = {
  headerStyle: {
    fontWeight: "bold",
    backgroundColor: "#fafafa",
    borderBottom: "2px solid #eeeeee",
  },
};
