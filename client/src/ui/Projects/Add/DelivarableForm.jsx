import React from "react";
import { t } from "react-i18nify";
import { Formik, Form, useFormikContext, useField } from "formik";
import * as Yup from "yup";
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import FormikTextField from "../../../components/FormFields/TextField";
import FormikDateTimePicker from "../../../components/FormFields/DateTimePicker";


const styles = {
  header: {
    padding: "0.3em",
  },
  item: {
    padding: "0.5em",
  },
  deliverablesRoot: {
    marginTop: "2em",
  },
};

function DelivarableFormDialog(props) {
  const { open, handleClose, classes } = props;
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{t("Projects.Add.Deliverable.Title")}</DialogTitle>
      <DialogContent>

        <Formik
          initialValues={{
            name: "",
            description: "",
            weight: "",
            deadline: new Date(),
          }}
          validationSchema={Yup.object({
            name: Yup.string().required(t("Errors.Required")),
            description: Yup.string().required(t("Errors.Required")),
            weight: Yup.number(t("Errors.Number")).positive(t("Errors.Pozitive")).lessThan(1, t("Errors.Subunit")).required(t("Errors.Required")),
            deadline: Yup.date().min(new Date(), t("Errors.MinDate", { date: new Date() })).required(t("Errors.Required")),
          })}
          onSubmit={(deliverable, { setSubmitting }) => {
            const { value = [] } = field;

            value.push(deliverable);

            setFieldValue(field.name, value);

            setSubmitting(false);
            handleClose();
          }}
        >
          <Form>
            <Grid container>

              <Grid item xs={12} className={classes.item}>
                <FormikTextField
                  label={t("Projects.Add.Deliverable.Name")}
                  name="name"
                  type="text"
                />
              </Grid>

              <Grid item xs={12} className={classes.item}>
                <FormikTextField
                  label={t("Projects.Add.Deliverable.Description")}
                  name="description"
                  type="text"
                  multiline
                  rows="5"
                />
              </Grid>

              <Grid item xs={12} className={classes.item}>
                <FormikTextField
                  label={t("Projects.Add.Deliverable.Weight")}
                  name="weight"
                  type="text"
                />
              </Grid>

              <Grid item xs={12} className={classes.item}>
                <FormikDateTimePicker
                  label={t("Projects.Add.Deliverable.Deadline")}
                  name="deadline"
                  disablePast
                />
              </Grid>

            </Grid>


            <DialogActions>
              <Button onClick={handleClose} color="primary">
                {t("Projects.Add.Cancel")}
              </Button>
              <Button color="primary" type="submit">
                {t("Projects.Add.Submit")}
              </Button>
            </DialogActions>


          </Form>
        </Formik>

      </DialogContent>
    </Dialog>
  );
}

export default withStyles(styles)(DelivarableFormDialog);
