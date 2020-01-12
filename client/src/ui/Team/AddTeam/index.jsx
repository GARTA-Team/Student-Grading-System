import React, { Component } from "react";
import { t, Translate } from "react-i18nify";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Divider from "@material-ui/core/Divider";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddFormDialog from "./AddForm";
import FormikTextField from "../../../components/FormFields/TextField";
import FormikSelect from "../../../components/FormFields/Select";
import ExpansionPanel from "../../../components/ExpansionPanel";
import Snackbar from "../../../components/Snackbar";
import axios from "axios";


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
  deliverableContent: {
    padding: 0,
  },
  button: {
    marginRight: theme.spacing(1),
  },
  deliverableError: {
    color: "red"
  },
  deliverableErrorText: {
    marginLeft: theme.spacing(1),
  }
});

class AddTeamPage extends Component {
  state = {
    initialValues: {
      name: "",
      summary: "",
      teamId: "",
      teamToBeAdded: [],
    },
    isFormOpen: false,
    variant: "",
    message: "",
    open: false,
    students: [],
  };

  async componentDidMount() {
    console.log(this.props);
    const { match = {} } = this.props;
    const { projectId } = match.params;
    try {
      // fetch data
      const response = await axios.get("/user-api/students");
      const students = response.data;

      console.log(students);


      this.setState({
        students,
      });
    } catch (error) {
      // TODO
    }
  }

  // componentDidMount() {
  //   console.log(this.props);
  //   const { match = {} } = this.props;
  //   const { projectId } = match.params;
  //   const response = axios.get("/user-api/students");


  // }


  handleDeliverableFormOpen = () => this.setState({ isFormOpen: true });

  handleDeliverableFormClose = () => this.setState({ isFormOpen: false });

  handleSubmit = () => {
    console.log(this.state);
  };

  render() {
    const {
      classes,
      history = {}
    } = this.props;

    const {
      students,
      initialValues,
      isFormOpen = false,
      variant,
      message,
      open,
    } = this.state;



    return (
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          name: Yup.string().required(t("Errors.Required")),
          summary: Yup.string().required(t("Errors.Required")),
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

          console.log(finalData);
          setSubmitting(false);
        }}
      >
        {({ errors, values }) => (
          <Form>
            {/* Project data */}
            <Typography variant="h5" className={classes.header}>{t("Team.Add.Teams")}</Typography>
            <Paper>

              {/* <Grid container>
                <Grid item xs={12} className={classes.item}>
                  <FormikTextField
                    label={t("Team.Add.Teams")}
                    name="name"
                    type="text"
                  />
                </Grid> */}

              <Grid item xs={12} className={classes.item}>
                <FormikSelect
                  label={t("Team.Add.Team name")}
                  name="team"
                  options={[{ label: "GARTA", value: 1 }]}
                />
              </Grid>

              <Grid item xs={12} className={classes.item}>
                {/* TODO make summary a big text field */}
                <FormikTextField
                  label={t("Team.Add.Team number")}
                  name="summary"
                  type="text"
                  rows="10"
                />
              </Grid>

              {/* </Grid> */}

            </Paper>

            {/* <div className={classes.teamToBeAddedHeaders}>
              <div className={errors.teamToBeAdded ? classes.deliverableError : ""}>
                <Typography variant="h5">
                  {t("Team.Add.TeamToBeAdded")}
                </Typography>

                {errors.teamToBeAdded ? (
                  <Typography variy
                  ant="body2" className={classes.deliverableErrorText}>{JSON.stringify(errors.teamToBeAdded)}</Typography>
                ) : null}
              </div> */}

            <IconButton
              aria-label={t("Team.Add.AddDeliverable")}
              onClick={this.handleDeliverableFormOpen}
            >
              <AddIcon />
            </IconButton>

            {/* </div> */}

            <Grid container spacing={4}>
              {values.teamToBeAdded.map((deliverable) => {

                return (
                  <Grid item xs={6} md={4} justify="space-between">
                    <Card>
                      <CardHeader
                        title={
                          <Typography variant="h5" >
                            {deliverable.name}
                          </Typography>
                        }
                      />

                      <Divider />

                      <CardContent className={classes.deliverableContent}>

                        <Table aria-label="simple table">
                          <TableBody>
                            <TableRow>
                              <TableCell>
                                <Translate value="Team.Add.Deliverable.Members" />
                              </TableCell>
                              <TableCell>
                                <Typography variant="body1">
                                  {`${deliverable.members.slice(0, 20)}...`}
                                </Typography>
                              </TableCell>
                            </TableRow>
                            <TableRow selected>
                              <TableCell>
                                <Translate value="Team.Add.Deliverable.Name" />
                              </TableCell>
                              <TableCell>{deliverable.deadline.toString()}</TableCell>
                            </TableRow>
                            <TableRow >
                              <TableCell>
                                <Translate value="Team.Add.Deliverable.Members" />
                              </TableCell>
                              <TableCell>{deliverable.weight}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>

                      </CardContent>
                      <CardActions disableSpacing>
                        <IconButton aria-label={t("Team.Add.Deliverable.Edit")}>
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label={t("Team.Add.Deliverable.Delete")}>
                          <DeleteIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}

            </Grid>

            <AddFormDialog
              options={students}
              name="teamToBeAdded"
              open={isFormOpen}
              handleClose={this.handleDeliverableFormClose}
            />

            {/* <div className={classes.buttonsContainer}>
              <Button variant="contained" onClick={history.goBack} color="secondary" className={classes.button}>
                {t("Team.Add.Cancel")}
              </Button>
              <Button variant="contained" color="primary" type="submit" className={classes.button}>
                {t("Team.Add.Submit")}
              </Button>
            </div> */}

            <Snackbar
              variant={variant}
              message={message}
              open={open}
              handleClose={() => this.setState({ open: false })}
            />
          </Form>
        )
        }
      </Formik>
    );
  }
}

export default withStyles(styles)(AddTeamPage);
