import React from "react";
import { Translate } from "react-i18nify";

export const columns = [
  { title: <Translate value="Dashboard.Table.Project" />, field: "name" },
  { title: <Translate value="Dashboard.Table.Percentaje" />, field: "percentaje", type: "number" },
  { title: <Translate value="Dashboard.Table.Deadline" />, field: "deadline", type: "datetime" },
];

export const options = {
  headerStyle: {
    fontWeight: "bold",
    backgroundColor: "#fafafa",
    borderBottom: "2px solid #eeeeee",
  },
};
