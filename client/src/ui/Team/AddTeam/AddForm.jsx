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
import FormikMultiselect from "../../../components/FormFields/Multiselect";

const styles = {
  header: {
    padding: "0.3em",
  },
  item: {
    padding: "0.5em",
  },
  teamToBeAddedRoot: {
    marginTop: "2em",
  },
};

function DelivarableFormDialog(props) {
  const { open, handleClose, classes } = props;
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{t("Projects.Add.TeamToBeAdded.Add your team")}</DialogTitle>
      <DialogContent>

        <Formik
          initialValues={{
            name: "",
            // members: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string().required(t("Errors.Required")),
            // members: Yup.string().required(t("Errors.Required")),
          })}
          onSubmit={(teamToBeAdded, { setSubmitting }) => {
            const { value = [] } = field;

            value.push(teamToBeAdded);

            setFieldValue(field.name, value);

            setSubmitting(false);
            handleClose();
          }}
        >
          <Form>
            <Grid container>

              <Grid item xs={12} className={classes.item}>
                <FormikTextField
                  label={t("Projects.Add.TeamToBeAdded.Name")}
                  name="name"
                  type="text"
                />
              </Grid>

              <Grid item xs={12} className={classes.item}>
                {/* <FormikTextField
                  label={t("Projects.Add.TeamToBeAdded.Members")}
                  name="members"
                  type="text"
                  rows="5"
                /> */}
              </Grid>
              <Grid item xs={12} className={classes.item}>
                <FormikMultiselect
                  label={t("Projects.Add.TeamToBeAdded.Members")}
                  name="members"
                  type="text"
                  rows="5"
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
