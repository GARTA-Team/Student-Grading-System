import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import { t } from "react-i18nify";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    alignItems: 'right',
  },

  details: {
    alignItems: 'center',
  },

  column: {
    flexBasis: '20%',
    flexDirection : 'column',
  },

  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 5),
  },

}));

export default function DetailedExpansionPanel() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <div className={classes.root}>
      <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>{t("Team.TeamName")}</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
            <Chip label="GOproiu"  />
            <Chip label="Tudor"  />
            <Chip label="Robert"  />
            <Chip label="Neacsu"  />
            <Chip label="Partenie" />
          <div className={clsx(classes.column, classes.helper)}>
          <div className={classes.column}>
          </div>
            <Chip label="Project1"  />
            <div className={classes.column}>
            <Chip label="Project2"  />
            </div>
            <Chip label="Project3"  />
            <div className={classes.column}></div>
            <Chip label="Project4"  />
          </div>
        </ExpansionPanelDetails>
        <Divider />
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2c-content"
          id="panel2c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>{t("Team.TeamName")}</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
            <Chip label="GOproiu"  />
            <Chip label="Tudor"  />
            <Chip label="Robert"  />
            <Chip label="Neacsu"  />
            <Chip label="Partenie" />
          <div className={clsx(classes.column, classes.helper)}>
          <div className={classes.column}>
          </div>
            <Chip label="Project1"  />
            <div className={classes.column}>
            <Chip label="Project2"  />
            </div>
            <Chip label="Project3"  />
            <div className={classes.column}></div>
            <Chip label="Project4"  />
          </div>
        </ExpansionPanelDetails>
        <Divider />
      </ExpansionPanel>
    </div>
  );
}
