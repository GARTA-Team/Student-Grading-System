/* eslint-disable no-nested-ternary */
import React, { useState } from "react";
import { t, Translate } from "react-i18nify";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Divider from "@material-ui/core/Divider";
import SendIcon from "@material-ui/icons/Send";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import clsx from "clsx";
import moment from "moment";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
  },
  deliverableContent: {
    padding: 0,
  },
  tableCell: {
    whiteSpace: "normal",
    wordWrap: "break-word",
  },
  table: {
    tableLayout: "fixed",
  },
  status: {
    border: "1px solid red",
    color: "red",
    height: "20px",
    display: "inline - flex",
    padding: "4px 8px",
    flexGrow: "0",
    fontSize: "10px",
    minWidth: "20px",
    alignItems: "center",
    flexShrink: "0",
    lineHeight: "10px",
    whiteSpace: "nowrap",
    borderRadius: "2px",
    justifyContent: "center",
  },
  headerTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deliverableContentFinished: {
    paddingBottom: "0 !important",
  },
}));

function DeliverablesTab({ project }) {

  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);

  const [finishData, setData] = useState("");
  const [grade, setGrade] = useState(1);

  const [selectedId, setSelectedId] = useState(null);

  const {
    ProjectPhases: deliverables = [],
    type,
  } = project;

  const classes = useStyles();

  const updateDeliverable = async () => {
    try {
      if (type === "student") {
        await axios.patch(
          `/projects/phases/${selectedId}`,
          { data: finishData },
        );

        document.location.reload();
      } else if (type === "judge") {
        await axios.post(
          `/projects/phases/${selectedId}/grade`,
          { grade },
        );

        document.location.reload();
      }
    } catch (error) {
      console.error(JSON.stringify(error));
    }
  };

  return (
    <Grid container spacing={4} className={classes.root}>
      {deliverables.map(deliverable => (
        <Grid item xs={6} md={5} justify="space-between">
          <Card>
            <CardHeader
              title={
                <div className={classes.headerTitle}>
                  <Typography variant="h5" >
                    {deliverable.name}
                  </Typography>
                  {
                    moment(deliverable.deadline).isSameOrBefore(new Date()) ? (
                      <Typography variant="caption" className={classes.status}>
                        {t("Projects.Deliverable.Overdue")}
                      </Typography>
                    ) : null
                  }
                </div>
              }
            />

            <Divider />

            <CardContent
              className={clsx(
                classes.deliverableContent,
                deliverable.data || (type === "judge" && !deliverable.grade) ? classes.deliverableContentFinished : false,
              )}
            >

              <Table className={classes.table}>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Translate value="Projects.Add.Deliverable.Description" />
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Typography>{deliverable.description}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow selected>
                    <TableCell>
                      <Translate value="Projects.Add.Deliverable.Deadline" />
                    </TableCell>
                    <TableCell className={classes.tableCell}>{moment(deliverable.deadline).format("DD.MM.YYYY")}</TableCell>
                  </TableRow>
                  <TableRow >
                    <TableCell>
                      <Translate value="Projects.Add.Deliverable.Weight" />
                    </TableCell>
                    <TableCell>{deliverable.weight}</TableCell>
                  </TableRow>
                  <TableRow selected >
                    <TableCell>
                      <Translate value="Projects.Details.Data " />
                    </TableCell>
                    <TableCell><a href={deliverable.data || ""}>{deliverable.data || ""}</a></TableCell>
                  </TableRow>
                  {
                    deliverable.grade ? (
                      <TableRow >
                        <TableCell>
                          <Translate value="Projects.Details.Grade" />
                        </TableCell>
                        <TableCell>{deliverable.grade}</TableCell>
                      </TableRow>
                    ) : null
                  }
                </TableBody>
              </Table>

            </CardContent>

            {
              type === "student" ? (
                !deliverable.data ? (
                  <CardActions disableSpacing>
                    <IconButton aria-label={t("Projects.Details.FinishDeliverable")} onClick={() => setDialogOpen(true) || setSelectedId(deliverable.id)}>
                      <SendIcon />
                    </IconButton>
                  </CardActions>
                ) : null
              ) : (
                  type === "judge" && deliverable.data ? (
                    <CardActions disableSpacing>
                      <IconButton aria-label={t("Projects.Details.GradeDeliverable")} onClick={() => setDialogOpen(true) || setSelectedId(deliverable.id)}>
                        <SpellcheckIcon />
                      </IconButton>
                    </CardActions>
                  ) : null
                )
            }

          </Card>

        </Grid >
      ))
      }

      {/* input dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(!dialogOpen)} aria-labelledby="form-dialog-title" fullWidth maxWidth={"sm"}>
        <DialogTitle id="form-dialog-title">
          {
            type === "student" ? t("Projects.Details.FinishDeliverable") : t("Projects.Details.GradeDeliverable")
          }
        </DialogTitle>

        {
          type === "student" ? (
            <DialogContent>
              <TextField fullWidth id="link-dialog" label="Link" variant="outlined" value={finishData} onChange={e => setData(e.target.value)} />
            </DialogContent>
          ) : (
              <DialogContent>
                <TextField
                  fullWidth
                  id="grade-dialog"
                  label={t("Projects.Details.Grade")}
                  variant="outlined"
                  value={grade}
                  onChange={e => setGrade(e.target.value)}
                  inputProps={{
                    type: "number",
                    step: "0.01",
                    min: "1",
                    max: "10",
                  }}
                />
              </DialogContent>
            )
        }
        <DialogActions >
          <Button onClick={() => setDialogOpen(false) || setSelectedId(null)} color="primary">
            {t("Projects.Add.Cancel")}
          </Button>
          <Button color="primary" onClick={() => setAlertDialogOpen(true)}>
            {t("Projects.Add.Submit")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* alert dialog */}
      <Dialog open={alertDialogOpen} onClose={() => setAlertDialogOpen(!dialogOpen)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{t("Projects.Details.Sure")}</DialogTitle>

        <DialogActions>
          <Button onClick={() => setAlertDialogOpen(false) || setDialogOpen(false) || setSelectedId(null)} color="primary">
            {t("Projects.Add.Cancel")}
          </Button>
          <Button color="primary" onClick={() => updateDeliverable()}>
            {t("Projects.Add.Submit")}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid >
  );
}

export default DeliverablesTab;
