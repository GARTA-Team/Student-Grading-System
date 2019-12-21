import React from "react";
import { t } from "react-i18nify";
import { Formik, Form } from "formik";
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
  const { open, handleClose, classes, handleSubmit } = props;

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{t("Projects.Add.DeliverableForm.Title")}</DialogTitle>
      <DialogContent>

        <Formik
          initialValues={{
            name: "",
            description: "",
            weight: "",
            deadline: new Date(),
          }}
          validationSchema={Yup.object({
            name: Yup.string().required('Required'),
            description: Yup.string().required('Required'),
            weight: Yup.number().positive().lessThan(1, "TODO").required(),
            deadline: Yup.date().min(new Date()).required(),
          })}
          onSubmit={(deliverable, { setSubmitting }) => {
            handleSubmit(deliverable);
            setSubmitting(false);
          }}
        >
          <Form>
            <Grid container>

              {/* TODO mesaje de erroare */}
              <Grid item xs={12} className={classes.item}>
                <FormikTextField
                  label={t("Projects.Add.DeliverableForm.Name")}
                  name="name"
                  type="text"
                />
              </Grid>

              <Grid item xs={12} className={classes.item}>
                <FormikTextField
                  label={t("Projects.Add.DeliverableForm.Description")}
                  name="description"
                  type="text"
                />
              </Grid>

              <Grid item xs={12} className={classes.item}>
                <FormikTextField
                  label={t("Projects.Add.DeliverableForm.Weight")}
                  name="weight"
                  type="text"
                />
              </Grid>

              <Grid item xs={12} className={classes.item}>
                <FormikDateTimePicker
                  label={t("Projects.Add.DeliverableForm.Deadline")}
                  name="deadline"
                  disablePast
                />
              </Grid>

            </Grid>


            <DialogActions>
              <Button onClick={handleClose} color="primary">
                {t("Projects.Add.DeliverableForm.Cancel")}
              </Button>
              <Button /* onClick={handleClose} */ color="primary" type="submit">
                {t("Projects.Add.DeliverableForm.Submit")}
              </Button>
            </DialogActions>


          </Form>
        </Formik>

      </DialogContent>
    </Dialog>
  );
}

export default withStyles(styles)(DelivarableFormDialog);
