import React, { Component } from "react";
import { t, Translate } from "react-i18nify";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Paper from "@material-ui/core/Paper";
import { withStyles, Fab } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Divider from "@material-ui/core/Divider";
import AddIcon from "@material-ui/icons/Add";
import AddFormDialog from "./AddTeamForm";
import ExpansionPanel from "../../../components/ExpansionPanel";
import Snackbar from "../../../components/Snackbar";
import axios from "axios";
import Loader from "../../../components/Loader";

const styles = theme => ({
  header: {
    padding: "0.3em",
  },
  item: {
    padding: "0.5em",
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "end",
    marginTop: theme.spacing(5),
  },
  teamToBeAddedHeaders: {
    marginTop: theme.spacing(3),
    display: "flex",
    justifyContent: "space-between",
  },
  teamContent: {
    padding: 0,
  },
  button: {
    marginRight: theme.spacing(1),
  },
  teamsError: {
    color: "red"
  },
  teamsErrorText: {
    marginLeft: theme.spacing(1),
  },
  gridSpacing: {
    marginBottom: 10,
  }
});
class AddTeamPage extends Component {
  state = {
    initialValues: {
      name: "",
      teamId: "",
      teamToBeAdded: [],
    },
    isFormOpen: false,
    variant: "",
    message: "",
    open: false,
    students: [],
    teams: [],
    isLoading: true,
  };

  async componentDidMount() {
    console.log(this.props);
    const { match = {} } = this.props;
    try {
      const response = await axios.get("/user-api/students");
      const students = response.data;

      const res = await axios.get("/teams/owned");
      const teams = res.data; //teams by user logged in

      this.setState({
        students,
        teams,
        isLoading: false,
      });
    } catch (error) {
      // TODO
    }
  }

  handleFormOpen = () => this.setState({ isFormOpen: true });

  handleFormClose = () => this.setState({ isFormOpen: false });

  handleSubmit = async () => {
    try {
      const response = await axios.get("/user-api/students");
      const students = response.data;

      const res = await axios.get("/teams/owned");
      const teams = res.data; //teams by user logged in

      this.setState({
        students,
        teams,
      });
    } catch (error) {
      // TODO
      console.log(error);
    }
  };

  render() {
    const { classes } = this.props;

    const {
      students,
      teams,
      initialValues,
      isFormOpen = false,
      variant,
      message,
      open,
      isLoading = true,
    } = this.state;

    return (
      <Loader isLoading={isLoading}>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          name: Yup.string().required(t("Errors.Required")),
          team: Yup.object({
            label: Yup.string().required(t("Errors.Required")),
            value: Yup.number(t("Errors.Number")).positive(t("Errors.Positive")).required(t("Errors.Required")),
          })
            .required(t("Errors.Required")),
          teamToBeAdded: Yup.array()
            .of(
              Yup.object().shape({
                name: Yup.string().required(t("Errors.Required")),
                members: Yup.string().required(t("Errors.Required")),
              })
            )
            .required(t("Errors.Required"))
            .min(1, t("Errors.Min", { value: 1, name: t("Team.Add.teamToBeAdded") }))
            .max(6, t("Errors.Max", { value: 6, name: t("Team.Add.teamToBeAdded") })),
        })}
        onSubmit={(finalData, { setSubmitting }) => {
          this.handleSubmit();
          console.log(finalData);
          setSubmitting(false);
        }}
      >
        <Form>
          <Grid container className={classes.gridSpacing}>
            <Grid item md={8}>
              <Typography variant="h5" className={classes.header}>{t("Team.Add.Teams")}</Typography>
            </Grid>
            <Grid container item md={4} justify="flex-end">
              <Fab
                size="medium"
                color="primary"
                aria-label={t("Team.Add.AddTeamToBeDelivered")}
                onClick={this.handleFormOpen}
              >
                <AddIcon />
              </Fab>
            </Grid>
          </Grid>
          <Paper>

            {teams.map((team) => {
              return (
                <ExpansionPanel team={team} />
              )
            })}
          </Paper>


          <AddFormDialog
            options={students}
            name="teamToBeAdded"
            open={isFormOpen}
            handleClose={this.handleFormClose}
            handleSubmit={this.handleSubmit}
          />

          <Snackbar
            variant={variant}
            message={message}
            open={open}
            handleClose={() => this.setState({ open: false })}
          />
        </Form>


      </Formik>
      </Loader>
    );
  }
}

export default withStyles(styles)(AddTeamPage);
