import React from "react";
import { Translate } from "react-i18nify";
import { t } from "react-i18nify/build/lib/core";

export const columns = [
  { title: <Translate value="Dashboard.Table.Project" />, field: "name" },
  {
    title: <Translate value="Dashboard.Table.Grade" />,
    field: "grade",
    render: rowData => rowData.grade || t("Dashboard.NotGraded"),
  },
  { title: <Translate value="Dashboard.Table.Status" />, field: "status" },
  { title: <Translate value="Dashboard.Table.Deadline" />, field: "deadline", type: "datetime" },
];

export const options = {
  headerStyle: {
    fontWeight: "bold",
    backgroundColor: "#fafafa",
    borderBottom: "2px solid #eeeeee",
  },
};
