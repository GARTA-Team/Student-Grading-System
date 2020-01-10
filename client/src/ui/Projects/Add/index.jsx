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
import DelivarableFormDialog from "./DelivarableForm";
import FormikTextField from "../../../components/FormFields/TextField";
import FormikSelect from "../../../components/FormFields/Select";
import Snackbar from "../../../components/Snackbar";

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
      teamId: "",
      deliverables: [],
    },
    isFormOpen: false,
    variant: "",
    message: "",
    open: false,
  }

  componentDidMount() {
    console.log(this.props)
    const { match = {} } = this.props;
    const { projectId } = match.params;

    if (projectId) {
      
    }
  }


  handleDeliverableFormOpen = () => this.setState({ isFormOpen: true })

  handleDeliverableFormClose = () => this.setState({ isFormOpen: false })

  handleSubmit = () => {
    console.log(this.state);
  }

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
          deliverables: Yup.array()
            .of(
              Yup.object().shape({
                name: Yup.string().required(t("Errors.Required")),
                description: Yup.string().required(t("Errors.Required")),
                weight: Yup.number(t("Errors.Number")).positive(t("Errors.Pozitive")).lessThan(1, t("Errors.Subunit")).required(t("Errors.Required")),
                deadline: Yup.date().min(new Date(), t("Errors.MinDate", { date: new Date() })).required(t("Errors.Required")),
              })
            )
            .required(t("Errors.Required"))
            .min(1, t("Errors.Min", { value: 1, name: t("Projects.Add.Deliverables") }))
            .max(6, t("Errors.Max", { value: 6, name: t("Projects.Add.Deliverables") })),
        })}
        onSubmit={(finalData, { setSubmitting }) => {


          console.log(finalData)
          setSubmitting(false);
        }}
      >
        {({ errors, values }) => (
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
                    options={[{ label: "GARTA", value: 1 }]}
                  />
                </Grid>

                <Grid item xs={12} className={classes.item}>
                  {/* TODO make summary a big text field */}
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
              {values.deliverables.map((deliverable) => {

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
                                <Translate value="Projects.Add.Deliverable.Name" />
                              </TableCell>
                              <TableCell>{deliverable.deadline.toString()}</TableCell>
                            </TableRow>
                            <TableRow >
                              <TableCell>
                                <Translate value="Projects.Add.Deliverable.Description" />
                              </TableCell>
                              <TableCell>{deliverable.weight}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>

                      </CardContent>
                      <CardActions disableSpacing>
                        <IconButton aria-label={t("Projects.Add.Deliverable.Edit")}>
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label={t("Projects.Add.Deliverable.Delete")}>
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
            />

            <div className={classes.buttonsContainer}>
              <Button variant="contained" onClick={history.goBack} color="secondary" className={classes.button}>
                {t("Projects.Add.Cancel")}
              </Button>
              <Button variant="contained" color="primary" type="submit" className={classes.button}>
                {t("Projects.Add.Submit")}
              </Button>
            </div>


            {/* general error snackbar */}
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

export default withStyles(styles)(AddProjectPage);
