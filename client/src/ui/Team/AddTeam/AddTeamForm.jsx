import React from "react";
import { t } from "react-i18nify";
import { Formik, Form, useFormikContext, useField } from "formik";
import * as Yup from "yup";
import axios from "axios";
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
  const { options, open, handleClose, classes } = props;
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth="true">
      <DialogTitle id="form-dialog-title">{t("Team.Add.TeamToBeAdded.AddYourTeam")}</DialogTitle>
      <DialogContent>

        <Formik
          initialValues={{
            name: "",
            members: [],
          }}
          validationSchema={Yup.object({
            name: Yup.string().min(5, t("Teams.Add.NameLength")).max(20).required(t("Errors.Required")),
            members: Yup.array().of(
              Yup.object().shape({
                id: Yup.number().required(t("Errors.Required")),
                username: Yup.string().required(t("Errors.Required")),
              }),
            )
              .required(t("Errors.Required"))
              .min(1, t("Errors.Min", { value: 1, name: t("Teams.Add.Member") }))
              .max(5, t("Errors.Max", { value: 5, name: t("Teams.Add.Member") })),
          })}
          onSubmit={async (teamToBeAdded, { setSubmitting }) => {
            const { value = [] } = field;
            teamToBeAdded.type = "STUDENT";
            value.push(teamToBeAdded);
            const response = await axios.post("/teams", { teamToBeAdded });
            console.log(response.data);
            setSubmitting(false);
            handleClose();
          }}
        >
          <Form>
            <Grid container>
              <Grid item xs={12} className={classes.item}>
                <FormikTextField
                  label={t("Teams.Add.TeamToBeAdded.Name")}
                  name="name"
                  type="text"
                />
              </Grid>
              <Grid item xs={12} className={classes.item}>
                <FormikMultiselect
                  options={options}
                  label={t("Teams.Add.TeamToBeAdded.Members")}
                  name="members"
                  type="text"
                  rows="5"
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Button variant="contained" onClick={handleClose} color="secondary">
                {t("Teams.Add.Cancel")}
              </Button>
              <Button variant="contained" color="primary" type="submit">
                {t("Teams.Add.Submit")}
              </Button>
            </DialogActions>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default withStyles(styles)(DelivarableFormDialog);
