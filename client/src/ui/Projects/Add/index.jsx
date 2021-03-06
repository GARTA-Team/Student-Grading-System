import React, { Component } from "react";
import { t, Translate } from "react-i18nify";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
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
import DelivarableFormDialog from "./DelivarableForm";
import FormikTextField from "../../../components/FormFields/TextField";
import FormikSelect from "../../../components/FormFields/Select";
import Snackbar from "../../../components/Snackbar";
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
  deliverablesHeader: {
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

class AddProjectPage extends Component {
  state = {
    initialValues: {
      name: "",
      summary: "",
      team: "",
      professor: "",
      deliverables: [],
    },
    teams: [],
    professors: [],
    isFormOpen: false,
    variant: "",
    message: "",
    open: false,
    deliverableToEdit: null,
    sum: 0,
    isLoading: true,
  }

  async componentDidMount() {
    try {
      // fetch data
      let req = await axios.get("/teams");
      const teams = req.data.map(team => ({ label: team.name, value: team.id }));

      req = await axios.get("/users/professors");
      const professors = req.data;


      this.setState({ teams, professors, isLoading: false });
    } catch (error) {
      this.setState({
        message: t("Errors.FetchDataError"),
        variant: "error",
      });
    }
  }


  handleDeliverableFormOpen = () => this.setState({ isFormOpen: true })

  handleDeliverableFormClose = () => this.setState({ isFormOpen: false })

  handleEdit = (deliverable) => this.setState({ isFormOpen: true, deliverableToEdit: deliverable })

  render() {
    const {
      classes,
      history = {}
    } = this.props;

    const {
      initialValues,
      isFormOpen = false,
      variant,
      message,
      open,
      deliverableToEdit,
      professors = [],
      teams = [],
      isLoading,
    } = this.state;

    return (
      <div>

        <Loader isLoading={isLoading}>
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
              professor: Yup.object({
                label: Yup.string().required(t("Errors.Required")),
                value: Yup.number(t("Errors.Number")).positive(t("Errors.Positive")).required(t("Errors.Required")),
              })
                .required(t("Errors.Required")),
              deliverables: Yup.array()
                .of(
                  Yup.object().shape({
                    name: Yup.string().required(t("Errors.Required")),
                    description: Yup.string().required(t("Errors.Required")),
                    weight: Yup.number(t("Errors.Number")).positive(t("Errors.Pozitive")).min(1, t("Errors.Subunit")).max(100, t("Errors.Subunit")).required(t("Errors.Required")),
                    deadline: Yup.date().min(new Date(), t("Errors.MinDate", { date: new Date() })).required(t("Errors.Required")),
                  }),
                )
                .required(t("Errors.Required"))
                .min(1, t("Errors.Min", { value: 1, name: t("Projects.Add.Deliverables") }))
                .max(6, t("Errors.Max", { value: 6, name: t("Projects.Add.Deliverables") }))
                .test(
                  "sums-to-100",
                  t("Errors.SumTo100"),
                  value => value.reduce((accumulator, currentValue) => accumulator + currentValue.weight, 0) === 100,
                ),
            })}
            onSubmit={async (finalData) => {
              const {
                name,
                deliverables,
                summary,
                team,
                professor,
              } = finalData;

              const { value: teamId } = team;
              const { value: professorId } = professor;

              const response = await axios.post(
                "/projects",
                {
                  name,
                  deliverables,
                  summary,
                  teamId,
                  professorId,
                });

              if (response.status === 201) {
                this.setState(
                  {
                    message: t("Projects.Add.Succes"),
                    variant: "success",
                  },
                  () => setTimeout(history.goBack, 3000) // after the message was shown, redirect
                );
              } else {
                this.setState(
                  {
                    message: t("Projects.Add.Succes"),
                    variant: "success",
                  },
                  () => setTimeout(history.goBack, 3000) // after the message was shown, redirect
                );
              }
            }}
          >
            {({ errors, values, setFieldValue }) => (
              <Form>
                {/* Project data */}
                <Typography variant="h5" className={classes.header}>{t("Projects.Add.ProjectData")}</Typography>
                <Paper>

                  <Grid container>
                    <Grid item xs={12} className={classes.item}>
                      <FormikTextField
                        label={t("Projects.Add.ProjectName")}
                        name="name"
                        type="text"
                      />
                    </Grid>

                    <Grid item xs={12} className={classes.item}>
                      <FormikSelect
                        label={t("Projects.Add.ProjectTeam")}
                        name="team"
                        options={teams}
                      />
                    </Grid>

                    <Grid item xs={12} className={classes.item}>
                      <FormikSelect
                        label={t("Projects.Add.ProjectProfessor")}
                        name="professor"
                        options={professors}
                      />
                    </Grid>

                    <Grid item xs={12} className={classes.item}>
                      <FormikTextField
                        label={t("Projects.Add.ProjectSummary")}
                        name="summary"
                        type="text"
                        multiline
                        rows="10"
                      />
                    </Grid>

                  </Grid>

                </Paper>

                {/* Project deliverables */}
                <div className={classes.deliverablesHeader}>
                  <div className={errors.deliverables ? classes.deliverableError : ""}>
                    <Typography variant="h5">
                      {t("Projects.Add.Deliverables")}
                    </Typography>

                    {errors.deliverables ? (
                      <Typography variant="body2" className={classes.deliverableErrorText}>{JSON.stringify(errors.deliverables)}</Typography>
                    ) : null}
                  </div>

                  <IconButton
                    aria-label={t("Projects.Add.AddDeliverable")}
                    onClick={this.handleDeliverableFormOpen}
                  >
                    <AddIcon />
                  </IconButton>

                </div>

                <Grid container spacing={4}>
                  {values.deliverables.map((deliverable, index) => {

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
                                    <Translate value="Projects.Add.Deliverable.Description" />
                                  </TableCell>
                                  <TableCell>
                                    <Typography variant="body1">
                                      {`${deliverable.description.slice(0, 20)}...`}
                                    </Typography>
                                  </TableCell>
                                </TableRow>
                                <TableRow selected>
                                  <TableCell>
                                    <Translate value="Projects.Add.Deliverable.Deadline" />
                                  </TableCell>
                                  <TableCell>{deliverable.deadline.toString()}</TableCell>
                                </TableRow>
                                <TableRow >
                                  <TableCell>
                                    <Translate value="Projects.Add.Deliverable.Weight" />
                                  </TableCell>
                                  <TableCell>{deliverable.weight}</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>

                          </CardContent>
                          <CardActions disableSpacing>
                            <IconButton aria-label={t("Projects.Add.Deliverable.Edit")} onClick={() => console.log(deliverable) || this.handleEdit(deliverable)}>
                              <EditIcon />
                            </IconButton>
                            <IconButton aria-label={t("Projects.Add.Deliverable.Delete")} onClick={() => {
                              const deliverables = values.deliverables;

                              deliverables.splice(index, 1);

                              setFieldValue("deliverables", deliverables);
                            }}>
                              <DeleteIcon />
                            </IconButton>
                          </CardActions>
                        </Card>
                      </Grid>
                    );
                  })}

                </Grid>

                <DelivarableFormDialog
                  name="deliverables"
                  open={isFormOpen}
                  handleClose={this.handleDeliverableFormClose}
                  initialData={deliverableToEdit}
                />

                <div className={classes.buttonsContainer}>
                  <Button variant="contained" onClick={history.goBack} color="secondary" className={classes.button}>
                    {t("Projects.Add.Cancel")}
                  </Button>
                  <Button variant="contained" color="primary" type="submit" className={classes.button}>
                    {t("Projects.Add.Submit")}
                  </Button>
                </div>



              </Form>
            )
            }
          </Formik>
        </Loader>

        <Snackbar
          variant={variant}
          message={message}
          open={open}
          handleClose={() => this.setState({ open: false })}
        />

      </div>
    );
  }
}

export default withStyles(styles)(AddProjectPage);
