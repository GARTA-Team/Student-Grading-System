import React, { Component } from "react";
import { t } from "react-i18nify";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";

import DelivarableFormDialog from "./DelivarableForm";
import FormikTextField from "../../../components/FormFields/TextField";
import FormikSelect from "../../../components/FormFields/Select";


import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import DeleteIcon from '@material-ui/icons/Delete';

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';



import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { Translate } from "react-i18nify";
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  header: {
    padding: "0.3em",
  },
  item: {
    padding: "0.5em",
  },
  deliverablesHeader: {
    marginTop: theme.spacing(3),
    display: "flex",
    justifyContent: "space-between",
  },
  deliverableContent: {
    padding: 0,
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "end",
  },
  button: {
    marginRight: theme.spacing(1),
  }
});

class AddProject extends Component {
  state = {
    data: {
      name: "",
      summary: "",
      teamId: "",
      deliverables: [
        {
          "name": "todo",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mattis luctus tempor. Nunc ac ultrices lorem. Etiam fringilla lectus non sapien egestas, ut efficitur lorem ultricies. Etiam vel purus id mauris hendrerit porta ac non est. Ut egestas, leo et commodo luctus, mi augue placerat metus, ac hendrerit ligula dui a diam. Aenean tempus dolor ac laoreet sollicitudin. Proin iaculis justo rutrum quam varius lacinia. Phasellus lobortis tortor et augue luctus, id tempor justo facilisis. Aliquam commodo, metus at faucibus pretium, leo ligula tristique justo, nec efficitur ex diam sit amet ligula. Fusce quis odio convallis, ultricies turpis id, placerat diam. Vestibulum commodo purus sit amet nulla fermentum dapibus. Morbi justo dui, commodo et blandit sed, bibendum ac dui. ",
          "weight": ".3",
          "deadline": "2019-12-29T14:43:00.000Z"
        },
        {
          "name": "aaa",
          "description": "1213",
          "weight": ".3",
          "deadline": "2019-12-29T02:44:00.000Z"
        },
        {
          "name": "aaa",
          "description": "1213",
          "weight": ".3",
          "deadline": "2019-12-29T02:44:00.000Z"
        },
        {
          "name": "todo",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mattis luctus tempor. Nunc ac ultrices lorem. Etiam fringilla lectus non sapien egestas, ut efficitur lorem ultricies. Etiam vel purus id mauris hendrerit porta ac non est. Ut egestas, leo et commodo luctus, mi augue placerat metus, ac hendrerit ligula dui a diam. Aenean tempus dolor ac laoreet sollicitudin. Proin iaculis justo rutrum quam varius lacinia. Phasellus lobortis tortor et augue luctus, id tempor justo facilisis. Aliquam commodo, metus at faucibus pretium, leo ligula tristique justo, nec efficitur ex diam sit amet ligula. Fusce quis odio convallis, ultricies turpis id, placerat diam. Vestibulum commodo purus sit amet nulla fermentum dapibus. Morbi justo dui, commodo et blandit sed, bibendum ac dui. ",
          "weight": ".3",
          "deadline": "2019-12-29T14:43:00.000Z"
        },
        {
          "name": "aaa",
          "description": "1213",
          "weight": ".3",
          "deadline": "2019-12-29T02:44:00.000Z"
        },
      ],
    },
    isFormOpen: false,
  }

  handleDeliverableFormOpen = () => this.setState({ isFormOpen: true })

  handleDeliverableFormClose = () => this.setState({ isFormOpen: false })

  handleDeliverableSubmit = deliverable => this.setState(prevState => ({
    isFormOpen: false,
    data: {
      ...prevState.data,
      deliverables: [...prevState.data.deliverables, deliverable],
    },
  }))

  handleSubmit = () => {
    console.log(this.state);
  }

  render() {
    const { classes, history = {} } = this.props;

    const { data = {}, isFormOpen = false } = this.state;
    const { deliverables = [] } = data;


    return (
      <Formik
        initialValues={{
          name: "",
          summary: "",
          team: "",
        }}
        // TODO mesaje eroare
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),
          summary: Yup.string().required("Required"),
          team: Yup.object({
            label: Yup.string().required("Required"),
            value: Yup.number().positive().required(),
          }).required(),
        })}
        onSubmit={(finalData, { setSubmitting }) => {
          // handleSubmit(deliverable);

          const deliverablesSchema = Yup.array()
            .of(Yup.object().shape({
              name: Yup.string().required("Required"),
              description: Yup.string().required("Required"),
              weight: Yup.number().positive().lessThan(1, "TODO").required(),
              deadline: Yup.date().min(new Date()).required(),
            }))
            .required()
            .min(1)
            .max(5);



          console.log(finalData)
          setSubmitting(false);
        }}
      >
        <Form>
          {/* Project data */}
          <Typography variant="h5" className={classes.header}>Project data TODO</Typography>
          <Paper>


            <Grid container>
              {/* TODO mesaje de erroare */}

              <Grid item xs={12} className={classes.item}>
                <FormikTextField
                  label={t("Projects.Add.ProjectName")}
                  name="name"
                  type="text"
                />
              </Grid>

              <Grid item xs={12} className={classes.item}>
                {/* TODO make summary a big text field */}
                <FormikTextField
                  label={t("Projects.Add.ProjectSummary")}
                  name="summary"
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

            </Grid>

          </Paper>

          {/* Project deliverables */}

          <div className={classes.deliverablesHeader}>
            <Typography variant="h5">
              Deliverables TODO
            </Typography>

            <IconButton
              aria-label={t("Projects.Add.DeliverableForm.AddDeliverableToDO")}
              onClick={this.handleDeliverableFormOpen}
            >
              <AddIcon />
            </IconButton>

          </div>

          {/* <ErrorMessage name="deliverables" /> TODO */}

          <Grid container spacing={4}>
            {deliverables.map((deliverable) => {

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
                      <IconButton aria-label="add to favorites"> {/*TODO edit */}
                        <EditIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}

          </Grid>


          <DelivarableFormDialog open={isFormOpen} handleClose={this.handleDeliverableFormClose} handleSubmit={this.handleDeliverableSubmit} />

          <div className={classes.buttonsContainer}>
            <Button variant="contained" onClick={history.goBack} color="secondary" className={classes.button}>
              {t("Projects.Add.DeliverableForm.CancelTODO")}
            </Button>
            <Button variant="contained" color="primary" type="submit" className={classes.button}>
              {t("Projects.Add.DeliverableForm.SubmitTODO")}
            </Button>
          </div>

        </Form>
      </Formik>
    );
  }
}

export default withStyles(styles)(AddProject);
