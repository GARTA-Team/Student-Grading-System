import { t } from "react-i18nify";

export const columns = [
  { title: t("Home.Table.Project"), field: "name" },
  { title: t("Home.Table.Percentaje"), field: "percentaje" },
  { title: t("Home.Table.Deadline"), field: "deadline", type: "datetime" },
];

export const options = {
  headerStyle: {
    fontWeight: "bold",
    backgroundColor: "#fafafa",
    borderBottom: "2px solid #eeeeee",
  },
};
