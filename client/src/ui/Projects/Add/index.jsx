import React, { Component } from "react";
import { t } from "react-i18nify";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";

import DelivarableFormDialog from "./DelivarableForm";
import DataTable from "../../../components/DataTable";
import { columns, options } from "./utils/options";
import FormikTextField from "../../../components/FormFields/TextField";
import FormikSelect from "../../../components/FormFields/Select";


const styles = {
  header: {
    padding: "0.3em",
  },
  item: {
    padding: "0.5em",
  },
  deliverablesRoot: {
    marginTop: "2em",
  }
};

class AddProject extends Component {
  state = {
    data: {
      name: "",
      summary: "",
      teamId: "",
      deliverables: [],
    },
    isFormOpen: false,
  }

  handleFormOpen = () => this.setState({ isFormOpen: true })

  handleFormClose = () => this.setState({ isFormOpen: false })

  handleFormSubmit = deliverable => this.setState(prevState => ({
    isFormOpen: false,
    data: {
      ...prevState.data,
      deliverables: [...prevState.data.deliverables, deliverable],
    },
  }), () => console.log(this.state))


  render() {
    const { classes } = this.props;

    const { data = {}, isFormOpen = false } = this.state;
    const { deliverables = [] } = data;

    return (
      <Formik
        initialValues={{
          name: "",
          summary: "",
          team: "",
          deliverables: [],
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Required'),
          summary: Yup.string().required('Required'),
          team: Yup.object().shape({
            label: Yup.string().required('Required'),
            value: Yup.number().positive().required(),
          }).required(),
          deliverables: Yup.array()
            .of(Yup.object().shape({
              name: Yup.string().required('Required'),
              description: Yup.string().required('Required'),
              weight: Yup.number().positive().lessThan(1, "TODO").required(),
              deadline: Yup.date().min(new Date()).required(),
            }))
            .required()
            .min(1)
            .max(5),
        })}
        onSubmit={(deliverable, { setSubmitting }) => {
          // handleSubmit(deliverable);
          setSubmitting(false);
        }}
      >
        <Form>
          {/* Project data */}
          <Paper>
            <Typography variant="h5" className={classes.header}>Add TODO</Typography>


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
                  defaultValue={1}
                  name="team"
                  options={[{ label: "1", value: 1 }]}
                />
              </Grid>

            </Grid>

          </Paper>

          {/* Project deliverables */}
          <DataTable
            data={deliverables}
            title={t("Projects.Add.Deliverables")}
            columns={columns}
            options={options}
            className={classes.deliverablesRoot}
            actions={[
              {
                icon: AddIcon,
                tooltip: "Add User TODO",
                isFreeAction: true,
                onClick: this.handleFormOpen,
              }
            ]}
          />

          <DelivarableFormDialog open={isFormOpen} handleClose={this.handleFormClose} handleSubmit={this.handleFormSubmit} />


          <Button /* onClick={()  */ color="primary">
            {t("Projects.Add.DeliverableForm.Cancel")}
          </Button>
          <Button /* onClick={handleClose} */ color="primary" type="submit">
            {t("Projects.Add.DeliverableForm.Submit")}
          </Button>


        </Form>
      </Formik>
    );
  }
}

export default withStyles(styles)(AddProject);
